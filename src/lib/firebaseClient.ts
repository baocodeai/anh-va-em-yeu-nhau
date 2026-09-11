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
  bucketList?: any[];
  memories?: any[];
  trashBin?: any[];
  avatars?: {
    ai?: string;
    maze?: string;
  };
  lastUpdatedBy?: string;
  updatedAt?: string;
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
          const val = snapshot.val() as CoupleCloudPayload;
          callback(val);
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
 * Đẩy dữ liệu mới nhất lên Firebase Realtime Database
 */
export async function pushDataToFirebase(payload: CoupleCloudPayload): Promise<boolean> {
  const db = initFirebaseClient();
  if (!db) return false;

  try {
    const dataRef = ref(db, DB_NODE_PATH);
    const dataToSave = {
      ...payload,
      updatedAt: new Date().toISOString()
    };
    await set(dataRef, dataToSave);
    return true;
  } catch (err) {
    console.error('[Firebase] Lỗi đẩy dữ liệu:', err);
    return false;
  }
}
