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
    if (raw) return JSON.parse(raw);
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
  avatars?: {
    ai?: string;
    maze?: string;
  };
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

export function normalizeCoupleCloudPayload(raw: any): CoupleCloudPayload {
  if (!raw || typeof raw !== 'object') return {};
  return {
    bucketList: raw.bucketList !== undefined ? normalizeArray(raw.bucketList) : undefined,
    bucketCategories: raw.bucketCategories !== undefined ? normalizeArray(raw.bucketCategories) : undefined,
    habit21: raw.habit21 !== undefined ? normalizeArray(raw.habit21) : undefined,
    habitStartDate: typeof raw.habitStartDate === 'string' ? raw.habitStartDate : undefined,
    habitStartDateLocked: typeof raw.habitStartDateLocked === 'boolean' ? raw.habitStartDateLocked : undefined,
    habitShields: raw.habitShields && typeof raw.habitShields === 'object' ? {
      ai: typeof raw.habitShields.ai === 'number' ? raw.habitShields.ai : 2,
      maze: typeof raw.habitShields.maze === 'number' ? raw.habitShields.maze : 2
    } : undefined,
    habitTargetDays: typeof raw.habitTargetDays === 'number' ? raw.habitTargetDays : undefined,
    memories: raw.memories !== undefined ? normalizeArray(raw.memories) : undefined,
    trashBin: raw.trashBin !== undefined ? normalizeArray(raw.trashBin) : undefined,
    passcode: typeof raw.passcode === 'string' ? raw.passcode : undefined,
    avatars: raw.avatars && typeof raw.avatars === 'object' ? raw.avatars : undefined,
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
      'trashBin',
      'passcode',
      'avatars'
    ];

    for (const key of keys) {
      if (payload[key] !== undefined) {
        const childRef = ref(db, `${DB_NODE_PATH}/${key}`);
        const val = payload[key];
        promises.push(set(childRef, val === undefined ? null : val));
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
