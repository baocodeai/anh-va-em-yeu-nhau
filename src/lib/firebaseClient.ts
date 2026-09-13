/**
 * =========================================================================
 * FIREBASE REALTIME CLIENT FOR AI & MAZE
 * =========================================================================
 */
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, type Database, type Unsubscribe } from 'firebase/database';
import { DEFAULT_FIREBASE_CONFIG, type FirebaseConfig } from '../firebase.config';

const STORAGE_FIREBASE_KEY = 'ai_maze_firebase_config';
const DB_NODE_PATH = 'couple_data';

export function getSavedFirebaseConfig(): FirebaseConfig | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_FIREBASE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && (parsed.databaseURL || (parsed.apiKey && parsed.projectId))) {
        return parsed;
      }
    }
  } catch {}
  if (DEFAULT_FIREBASE_CONFIG.databaseURL || DEFAULT_FIREBASE_CONFIG.apiKey) {
    return DEFAULT_FIREBASE_CONFIG;
  }
  return null;
}

export function saveFirebaseConfig(config: FirebaseConfig): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_FIREBASE_KEY, JSON.stringify(config));
}

export function isFirebaseConfigured(): boolean {
  const cfg = getSavedFirebaseConfig();
  return Boolean(cfg && (cfg.databaseURL || (cfg.apiKey && cfg.projectId)));
}

let cachedDb: Database | null = null;

export function initFirebaseClient(): Database | null {
  if (typeof window === 'undefined') return null;
  if (cachedDb) return cachedDb;

  const config = getSavedFirebaseConfig();
  if (!config || (!config.databaseURL && !config.apiKey)) {
    return null;
  }

  try {
    let app: FirebaseApp;
    if (getApps().length > 0) {
      app = getApp();
    } else {
      app = initializeApp(config);
    }
    if (config.databaseURL) {
      cachedDb = getDatabase(app, config.databaseURL);
    } else {
      cachedDb = getDatabase(app);
    }
    return cachedDb;
  } catch (err) {
    console.warn('[Firebase] Khởi tạo thất bại:', err);
    return null;
  }
}

export interface SurpriseLetterPayload {
  enabled: boolean;
  title: string;
  content: string;
  sender?: 'ai' | 'maze';
  recipient?: 'ai' | 'maze' | 'both';
  waxColor?: string; // 'ruby' | 'rose' | 'gold'
  showOnce?: boolean;
  readAt?: string;
  readBy?: string;
  updatedAt?: string;
  badgeText?: string;
  salutation?: string;
  bottomQuote?: string;
  signatureSignoff?: string;
  signatureName?: string;
  btnReadText?: string;
  btnFoldText?: string;
  showBadge?: boolean;
  showDate?: boolean;
  showSalutation?: boolean;
  showQuote?: boolean;
  showSignature?: boolean;
  showFoldBtn?: boolean;
  showPostage?: boolean;
  showCornerMarks?: boolean;
}

export interface CoupleCloudPayload {
  habit21?: any[];
  habitStartDate?: string;
  habitStartDateLocked?: boolean;
  habitShields?: {
    ai: number;
    maze: number;
  };
  habitTargetDays?: number;
  bucketList?: any[];
  bucketCategories?: string[];
  memories?: any[];
  trashBin?: any[];
  passcode?: string;
  passcodeVersion?: number;
  avatars?: {
    ai?: string;
    maze?: string;
  };
  musicUrl?: string;
  musicTitle?: string;
  surpriseLetter?: SurpriseLetterPayload;
  lastUpdatedBy?: string;
  updatedAt?: string;
}

export function normalizeArray(val: any): any[] {
  if (!val) return [];
  if (Array.isArray(val)) {
    return val.filter((item) => item !== null && item !== undefined);
  }
  if (typeof val === 'object') {
    return Object.values(val).filter((item) => item !== null && item !== undefined);
  }
  return [];
}

export function normalizeSubTasks(rawSubTasks: any): any[] {
  if (!rawSubTasks) return [];
  const list = normalizeArray(rawSubTasks);
  return list.map((st: any) => {
    if (!st || typeof st !== 'object') return st;
    const normalizedSt: any = {
      id: String(st.id || `st-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`),
      title: String(st.title || ''),
      completed: Boolean(st.completed),
      completedDate: typeof st.completedDate === 'string' ? st.completedDate : undefined
    };
    if (st.children) {
      normalizedSt.children = normalizeSubTasks(st.children);
    }
    return normalizedSt;
  });
}

export function normalizeBucketList(rawBucketList: any): any[] {
  if (!rawBucketList) return [];
  const list = normalizeArray(rawBucketList);
  return list.map((item: any) => {
    if (!item || typeof item !== 'object') return item;
    const normalizedItem: any = {
      id: String(item.id || `bl-${Date.now()}`),
      title: String(item.title || ''),
      description: typeof item.description === 'string' ? item.description : '',
      category: typeof item.category === 'string' ? item.category : 'Hẹn hò lãng mạn',
      completed: Boolean(item.completed),
      createdAt: typeof item.createdAt === 'string' ? item.createdAt : undefined,
      completedDate: typeof item.completedDate === 'string' ? item.completedDate : undefined,
      memoryNote: typeof item.memoryNote === 'string' ? item.memoryNote : undefined,
      photoUrl: typeof item.photoUrl === 'string' ? item.photoUrl : undefined
    };
    if (item.subTasks) {
      normalizedItem.subTasks = normalizeSubTasks(item.subTasks);
    }
    return normalizedItem;
  });
}

export function sanitizeForFirebase(obj: any): any {
  if (obj === undefined) return null;
  if (obj === null) return null;
  if (Array.isArray(obj)) {
    return obj.map(sanitizeForFirebase);
  }
  if (typeof obj === 'object') {
    const cleaned: Record<string, any> = {};
    for (const [k, v] of Object.entries(obj)) {
      if (v !== undefined) {
        cleaned[k] = sanitizeForFirebase(v);
      }
    }
    return cleaned;
  }
  return obj;
}

export function normalizeMemories(rawMemories: any): any[] {
  if (!rawMemories) return [];
  const list = normalizeArray(rawMemories);
  return list.map((mem: any) => {
    if (!mem || typeof mem !== 'object') return mem;
    const rawGallery = mem.galleryImages;
    const normalizedGallery = Array.isArray(rawGallery)
      ? rawGallery
      : rawGallery && typeof rawGallery === 'object'
      ? Object.values(rawGallery)
      : [];

    return {
      ...mem,
      id: String(mem.id || `mem-${Date.now()}`),
      title: String(mem.title || ''),
      caption: typeof mem.caption === 'string' ? mem.caption : '',
      imageUrl: typeof mem.imageUrl === 'string' ? mem.imageUrl : '/photos/anniversary.svg',
      date: typeof mem.date === 'string' ? mem.date : undefined,
      location: typeof mem.location === 'string' ? mem.location : undefined,
      journalContent: typeof mem.journalContent === 'string' ? mem.journalContent : '',
      mood: typeof mem.mood === 'string' ? mem.mood : undefined,
      weather: typeof mem.weather === 'string' ? mem.weather : undefined,
      author: mem.author || 'both',
      isPinned: Boolean(mem.isPinned),
      galleryImages: normalizedGallery
        .filter((img: any) => img && (img.url || typeof img === 'string'))
        .map((img: any, idx: number) => {
          if (typeof img === 'string') {
            return {
              id: `g-${idx + 1}`,
              url: img,
              caption: ''
            };
          }
          return {
            id: String(img.id || `g-${idx + 1}-${Date.now()}`),
            url: String(img.url || ''),
            caption: typeof img.caption === 'string' ? img.caption : ''
          };
        })
    };
  });
}

export function normalizeCoupleCloudPayload(raw: any): CoupleCloudPayload {
  if (!raw || typeof raw !== 'object') return {};
  return {
    bucketList: raw.bucketList !== undefined ? normalizeBucketList(raw.bucketList) : undefined,
    bucketCategories: raw.bucketCategories !== undefined ? normalizeArray(raw.bucketCategories) : undefined,
    habit21: raw.habit21 !== undefined ? normalizeArray(raw.habit21) : undefined,
    habitStartDate: typeof raw.habitStartDate === 'string' ? raw.habitStartDate : undefined,
    habitStartDateLocked: typeof raw.habitStartDateLocked === 'boolean' ? raw.habitStartDateLocked : undefined,
    habitShields: raw.habitShields && typeof raw.habitShields === 'object' ? {
      ai: typeof raw.habitShields.ai === 'number' ? raw.habitShields.ai : 2,
      maze: typeof raw.habitShields.maze === 'number' ? raw.habitShields.maze : 2
    } : undefined,
    habitTargetDays: typeof raw.habitTargetDays === 'number' ? raw.habitTargetDays : undefined,
    memories: raw.memories !== undefined ? normalizeMemories(raw.memories) : undefined,
    trashBin: raw.trashBin !== undefined ? normalizeArray(raw.trashBin) : undefined,
    passcode: typeof raw.passcode === 'string' ? raw.passcode : undefined,
    passcodeVersion: typeof raw.passcodeVersion === 'number' ? raw.passcodeVersion : undefined,
    avatars: raw.avatars && typeof raw.avatars === 'object' ? raw.avatars : undefined,
    musicUrl: typeof raw.musicUrl === 'string' ? raw.musicUrl : undefined,
    musicTitle: typeof raw.musicTitle === 'string' ? raw.musicTitle : undefined,
    surpriseLetter: raw.surpriseLetter && typeof raw.surpriseLetter === 'object' ? {
      enabled: Boolean(raw.surpriseLetter.enabled),
      title: typeof raw.surpriseLetter.title === 'string' ? raw.surpriseLetter.title : 'Thư Tình Gửi Em',
      content: typeof raw.surpriseLetter.content === 'string' ? raw.surpriseLetter.content : '',
      sender: raw.surpriseLetter.sender || 'ai',
      recipient: raw.surpriseLetter.recipient || 'maze',
      waxColor: raw.surpriseLetter.waxColor || 'ruby',
      showOnce: raw.surpriseLetter.showOnce !== undefined ? Boolean(raw.surpriseLetter.showOnce) : true,
      readAt: typeof raw.surpriseLetter.readAt === 'string' ? raw.surpriseLetter.readAt : undefined,
      readBy: typeof raw.surpriseLetter.readBy === 'string' ? raw.surpriseLetter.readBy : undefined,
      updatedAt: typeof raw.surpriseLetter.updatedAt === 'string' ? raw.surpriseLetter.updatedAt : undefined,
      badgeText: typeof raw.surpriseLetter.badgeText === 'string' ? raw.surpriseLetter.badgeText : undefined,
      salutation: typeof raw.surpriseLetter.salutation === 'string' ? raw.surpriseLetter.salutation : undefined,
      bottomQuote: typeof raw.surpriseLetter.bottomQuote === 'string' ? raw.surpriseLetter.bottomQuote : undefined,
      signatureSignoff: typeof raw.surpriseLetter.signatureSignoff === 'string' ? raw.surpriseLetter.signatureSignoff : undefined,
      signatureName: typeof raw.surpriseLetter.signatureName === 'string' ? raw.surpriseLetter.signatureName : undefined,
      btnReadText: typeof raw.surpriseLetter.btnReadText === 'string' ? raw.surpriseLetter.btnReadText : undefined,
      btnFoldText: typeof raw.surpriseLetter.btnFoldText === 'string' ? raw.surpriseLetter.btnFoldText : undefined,
      showBadge: raw.surpriseLetter.showBadge !== undefined ? Boolean(raw.surpriseLetter.showBadge) : true,
      showDate: raw.surpriseLetter.showDate !== undefined ? Boolean(raw.surpriseLetter.showDate) : true,
      showSalutation: raw.surpriseLetter.showSalutation !== undefined ? Boolean(raw.surpriseLetter.showSalutation) : true,
      showQuote: raw.surpriseLetter.showQuote !== undefined ? Boolean(raw.surpriseLetter.showQuote) : true,
      showSignature: raw.surpriseLetter.showSignature !== undefined ? Boolean(raw.surpriseLetter.showSignature) : true,
      showFoldBtn: raw.surpriseLetter.showFoldBtn !== undefined ? Boolean(raw.surpriseLetter.showFoldBtn) : true,
      showPostage: raw.surpriseLetter.showPostage !== undefined ? Boolean(raw.surpriseLetter.showPostage) : true,
      showCornerMarks: raw.surpriseLetter.showCornerMarks !== undefined ? Boolean(raw.surpriseLetter.showCornerMarks) : true
    } : undefined,
    lastUpdatedBy: typeof raw.lastUpdatedBy === 'string' ? raw.lastUpdatedBy : undefined,
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : undefined
  };
}

/**
 * Lắng nghe thay đổi dữ liệu từ Firebase theo thời gian thực (Real-time).
 * Khi Maze hoặc AI cập nhật bất kỳ thông tin nào, callback sẽ được gọi ngay lập tức!
 */
export function subscribeToRealtimeSync(callback: (payload: CoupleCloudPayload) => void): Unsubscribe | null {
  const db = initFirebaseClient();
  if (!db) return null;

  try {
    const dataRef = ref(db, DB_NODE_PATH);
    const unsub = onValue(
      dataRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const raw = snapshot.val();
          const normalized = normalizeCoupleCloudPayload(raw);
          callback(normalized);
        }
      },
      (error) => {
        console.warn('[Firebase] Lỗi kết nối Realtime:', error);
      }
    );
    return unsub;
  } catch (err) {
    console.warn('[Firebase] Lỗi đăng ký listener:', err);
    return null;
  }
}

/**
 * Đẩy dữ liệu mới nhất lên Firebase Realtime Database.
 * Sử dụng set() trực tiếp trên từng nhánh con để đảm bảo việc xoá / cập nhật danh sách
 * được ghi đè hoàn toàn mà không bị sót phần tử cũ (ghost items / trailing array indices).
 */
export async function pushDataToFirebase(payload: CoupleCloudPayload): Promise<boolean> {
  const db = initFirebaseClient();
  if (!db) return false;

  try {
    const updatedAt = new Date().toISOString();
    const promises: Promise<any>[] = [];

    const keys: (keyof CoupleCloudPayload)[] = [
      'memories',
      'bucketList',
      'bucketCategories',
      'habit21',
      'habitStartDate',
      'habitStartDateLocked',
      'habitShields',
      'habitTargetDays',
      'trashBin',
      'passcode',
      'passcodeVersion',
      'avatars',
      'musicUrl',
      'musicTitle',
      'surpriseLetter'
    ];

    for (const key of keys) {
      if (payload[key] !== undefined) {
        const childRef = ref(db, `${DB_NODE_PATH}/${key}`);
        const val = payload[key];
        const sanitized = sanitizeForFirebase(val);
        promises.push(set(childRef, sanitized));
      }
    }

    promises.push(set(ref(db, `${DB_NODE_PATH}/updatedAt`), updatedAt));
    if (payload.lastUpdatedBy) {
      promises.push(set(ref(db, `${DB_NODE_PATH}/lastUpdatedBy`), payload.lastUpdatedBy));
    }

    await Promise.all(promises);
    return true;
  } catch (err) {
    console.error('[Firebase] Lỗi đẩy dữ liệu:', err);
    return false;
  }
}

/**
 * Chuyển đổi link chia sẻ Google Drive thành link phát trực tiếp cho trình phát audio:
 * - https://drive.google.com/file/d/FILE_ID/view... -> https://docs.google.com/uc?export=download&id=FILE_ID
 * - https://drive.google.com/open?id=FILE_ID -> https://docs.google.com/uc?export=download&id=FILE_ID
 */
export function convertDriveLinkToDirectAudio(rawUrl: string): string {
  if (!rawUrl) return '';
  const trimmed = rawUrl.trim();

  // Pattern 1: https://drive.google.com/file/d/FILE_ID/view...
  const fileIdMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    return `https://docs.google.com/uc?export=download&id=${fileIdMatch[1]}`;
  }

  // Pattern 2: https://drive.google.com/open?id=FILE_ID
  const openIdMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (openIdMatch && openIdMatch[1] && trimmed.includes('drive.google.com')) {
    return `https://docs.google.com/uc?export=download&id=${openIdMatch[1]}`;
  }

  return trimmed;
}

