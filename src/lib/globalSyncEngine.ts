/**
 * =========================================================================
 * GLOBAL REALTIME SYNC ENGINE FOR AI & MAZE
 * Tự động chạy ngầm trên mọi trang:
 * 1. Lắng nghe thay đổi Realtime từ Firebase
 * 2. Cập nhật LocalStorage và kích hoạt sự kiện `couple-cloud-updated`
 * 3. Hỗ trợ xoá, thêm, sửa đồng bộ tức thì 100% giữa hai thiết bị
 * =========================================================================
 */
import { subscribeToRealtimeSync, isFirebaseConfigured, type CoupleCloudPayload } from './firebaseClient';

let isInitialized = false;

export function initGlobalSyncEngine(): void {
  if (typeof window === 'undefined') return;
  if (isInitialized) return;
  isInitialized = true;

  if (!isFirebaseConfigured()) {
    console.info('[SyncEngine] Firebase chưa được cấu hình, chạy ở chế độ LocalStorage');
    return;
  }

  subscribeToRealtimeSync((cloudData: CoupleCloudPayload) => {
    if (!cloudData) return;
    let hasChanges = false;

    // 1. Memories / Bài viết kỷ niệm
    if (cloudData.memories !== undefined && Array.isArray(cloudData.memories)) {
      const current = localStorage.getItem('couple_memories');
      const next = JSON.stringify(cloudData.memories);
      if (current !== next) {
        localStorage.setItem('couple_memories', next);
        hasChanges = true;
      }
    }

    // 2. Bucket List / Điều ước
    if (cloudData.bucketList !== undefined && Array.isArray(cloudData.bucketList)) {
      const current = localStorage.getItem('couple_bucket_list');
      const next = JSON.stringify(cloudData.bucketList);
      if (current !== next) {
        localStorage.setItem('couple_bucket_list', next);
        hasChanges = true;
      }
    }

    // 3. Bucket Categories / Danh mục điều ước
    if (cloudData.bucketCategories !== undefined && Array.isArray(cloudData.bucketCategories)) {
      const current = localStorage.getItem('couple_bucket_categories');
      const next = JSON.stringify(cloudData.bucketCategories);
      if (current !== next) {
        localStorage.setItem('couple_bucket_categories', next);
        hasChanges = true;
      }
    }

    // 4. 21 Days Habits / Thói quen học tiếng Anh
    if (cloudData.habit21 !== undefined && Array.isArray(cloudData.habit21)) {
      const current = localStorage.getItem('couple_habit_21');
      const next = JSON.stringify(cloudData.habit21);
      if (current !== next) {
        localStorage.setItem('couple_habit_21', next);
        hasChanges = true;
      }
    }

    // 4.1. 21 Days Start Date / Ngày bắt đầu
    if (cloudData.habitStartDate !== undefined && typeof cloudData.habitStartDate === 'string') {
      const current = localStorage.getItem('couple_habit_start_date');
      if (current !== cloudData.habitStartDate) {
        localStorage.setItem('couple_habit_start_date', cloudData.habitStartDate);
        hasChanges = true;
      }
    }

    // 5. Trash Bin / Thùng rác
    if (cloudData.trashBin !== undefined && Array.isArray(cloudData.trashBin)) {
      const current = localStorage.getItem('couple_trash_bin');
      const next = JSON.stringify(cloudData.trashBin);
      if (current !== next) {
        localStorage.setItem('couple_trash_bin', next);
        hasChanges = true;
      }
    }

    // 6. Couple Avatars
    if (cloudData.avatars !== undefined && typeof cloudData.avatars === 'object') {
      const current = localStorage.getItem('couple_avatars');
      const next = JSON.stringify(cloudData.avatars);
      if (current !== next) {
        localStorage.setItem('couple_avatars', next);
        hasChanges = true;
      }
    }

    // 7. Custom Passcode / Mật mã tình yêu
    if (cloudData.passcode !== undefined && typeof cloudData.passcode === 'string') {
      const current = localStorage.getItem('couple_custom_passcode');
      if (current !== cloudData.passcode) {
        localStorage.setItem('couple_custom_passcode', cloudData.passcode);
        hasChanges = true;
      }
    }

    if (hasChanges) {
      window.dispatchEvent(new CustomEvent('couple-cloud-updated', { detail: cloudData }));
    }
  });
}
