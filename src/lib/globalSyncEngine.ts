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

    const safeSetItem = (key: string, value: string) => {
      try {
        localStorage.setItem(key, value);
      } catch (err) {
        console.warn(`[SyncEngine] LocalStorage quota exceeded for key ${key}:`, err);
      }
    };

    // 1. Memories / Bài viết kỷ niệm
    if (cloudData.memories !== undefined && Array.isArray(cloudData.memories)) {
      const current = localStorage.getItem('couple_memories');
      const next = JSON.stringify(cloudData.memories);
      if (current !== next) {
        safeSetItem('couple_memories', next);
        hasChanges = true;
      }
    }

    // 2. Bucket List / Điều ước
    if (cloudData.bucketList !== undefined && Array.isArray(cloudData.bucketList)) {
      const current = localStorage.getItem('couple_bucket_list');
      const next = JSON.stringify(cloudData.bucketList);
      if (current !== next) {
        safeSetItem('couple_bucket_list', next);
        hasChanges = true;
      }
    }

    // 3. Bucket Categories / Danh mục điều ước
    if (cloudData.bucketCategories !== undefined && Array.isArray(cloudData.bucketCategories)) {
      const current = localStorage.getItem('couple_bucket_categories');
      const next = JSON.stringify(cloudData.bucketCategories);
      if (current !== next) {
        safeSetItem('couple_bucket_categories', next);
        hasChanges = true;
      }
    }

    // 4. 21 Days Habits / Thói quen học tiếng Anh
    if (cloudData.habit21 !== undefined && Array.isArray(cloudData.habit21)) {
      const current = localStorage.getItem('couple_habit_21');
      const next = JSON.stringify(cloudData.habit21);
      if (current !== next) {
        safeSetItem('couple_habit_21', next);
        hasChanges = true;
      }
    }

    // 4.1. 21 Days Start Date / Ngày bắt đầu
    if (cloudData.habitStartDate !== undefined && typeof cloudData.habitStartDate === 'string') {
      const current = localStorage.getItem('couple_habit_start_date');
      if (current !== cloudData.habitStartDate) {
        safeSetItem('couple_habit_start_date', cloudData.habitStartDate);
        hasChanges = true;
      }
    }

    // 4.1.1. Start Date Locked State / Trạng thái khóa ngày bắt đầu
    if (cloudData.habitStartDateLocked !== undefined && typeof cloudData.habitStartDateLocked === 'boolean') {
      const current = localStorage.getItem('couple_habit_start_date_locked');
      const next = cloudData.habitStartDateLocked ? 'true' : 'false';
      if (current !== next) {
        safeSetItem('couple_habit_start_date_locked', next);
        hasChanges = true;
      }
    }

    // 4.2. Habit Shields / Khiên bảo vệ
    if (cloudData.habitShields !== undefined && typeof cloudData.habitShields === 'object') {
      const current = localStorage.getItem('couple_habit_shields');
      const next = JSON.stringify(cloudData.habitShields);
      if (current !== next) {
        safeSetItem('couple_habit_shields', next);
        hasChanges = true;
      }
    }

    // 4.3. Habit Target Days / Chặng Milestone
    if (cloudData.habitTargetDays !== undefined && typeof cloudData.habitTargetDays === 'number') {
      const current = localStorage.getItem('couple_habit_target_days');
      const next = String(cloudData.habitTargetDays);
      if (current !== next) {
        safeSetItem('couple_habit_target_days', next);
        hasChanges = true;
      }
    }

    // 5. Trash Bin / Thùng rác
    if (cloudData.trashBin !== undefined && Array.isArray(cloudData.trashBin)) {
      const current = localStorage.getItem('couple_trash_bin');
      const next = JSON.stringify(cloudData.trashBin);
      if (current !== next) {
        safeSetItem('couple_trash_bin', next);
        hasChanges = true;
      }
    }

    // 6. Couple Avatars
    if (cloudData.avatars !== undefined && typeof cloudData.avatars === 'object') {
      const current = localStorage.getItem('couple_avatars');
      const next = JSON.stringify(cloudData.avatars);
      if (current !== next) {
        safeSetItem('couple_avatars', next);
        hasChanges = true;
      }
    }

    // 7. Custom Passcode / Mật mã tình yêu & Passcode Version
    if (cloudData.passcode !== undefined && typeof cloudData.passcode === 'string') {
      const current = localStorage.getItem('couple_custom_passcode');
      if (current !== cloudData.passcode) {
        safeSetItem('couple_custom_passcode', cloudData.passcode);
        hasChanges = true;
      }
    }

    if (cloudData.passcodeVersion !== undefined && typeof cloudData.passcodeVersion === 'number') {
      const localVersionStr = localStorage.getItem('couple_auth_passcode_version');
      const cloudVersionStr = String(cloudData.passcodeVersion);

      // Nếu máy này đang mở khoá nhưng phiên bản passcode cục bộ khác phiên bản cloud -> Buộc khoá lại
      if (localVersionStr && localVersionStr !== cloudVersionStr) {
        safeSetItem('couple_auth_passcode_version', cloudVersionStr);
        if (typeof (window as any).lockCoupleApp === 'function') {
          (window as any).lockCoupleApp('Mật mã PIN đã được đổi từ thiết bị khác. Vui lòng nhập mã PIN mới! 🔒');
        }
      } else if (!localVersionStr) {
        safeSetItem('couple_auth_passcode_version', cloudVersionStr);
      }
    }

    if (hasChanges) {
      window.dispatchEvent(new CustomEvent('couple-cloud-updated', { detail: cloudData }));
    }
  });
}
