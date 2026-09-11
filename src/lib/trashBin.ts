/**
 * =========================================================================
 * TRASH & RECOVERY SYSTEM FOR AI & MAZE
 * Quản lý kho lưu trữ và khôi phục các mục đã xóa (Kỷ niệm, Bucket list)
 * =========================================================================
 */
import { pushDataToFirebase } from './firebaseClient';

export interface DeletedTrashItem {
  id: string; // e.g. trash-1725...
  originalId: string;
  type: 'memory' | 'bucket_list' | 'habit';
  title: string;
  previewImage?: string;
  subtitle?: string;
  deletedAt: string;
  deletedAtFormatted: string;
  data: any; // Full serialized item
}

export const TRASH_STORAGE_KEY = 'couple_trash_bin';
export const MEMORIES_STORAGE_KEY = 'couple_memories';
export const BUCKET_STORAGE_KEY = 'couple_bucket_list';

export function getStoredTrash(): DeletedTrashItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(TRASH_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

export function saveStoredTrash(list: DeletedTrashItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TRASH_STORAGE_KEY, JSON.stringify(list));
  pushDataToFirebase({ trashBin: list, lastUpdatedBy: 'TrashBin' }).catch(() => {});
  window.dispatchEvent(new CustomEvent('couple-trash-updated', { detail: { trash: list } }));
}

/**
 * Di chuyển một mục vào thùng rác & hiển thị Toast thông báo kèm nút Hoàn tác
 */
export function moveItemToTrash(
  item: Omit<DeletedTrashItem, 'id' | 'deletedAt' | 'deletedAtFormatted'>,
  options?: { showToast?: boolean; onUndo?: () => void }
): DeletedTrashItem {
  const now = new Date();
  const trashItem: DeletedTrashItem = {
    ...item,
    id: 'trash-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    deletedAt: now.toISOString(),
    deletedAtFormatted:
      now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) +
      ' ' +
      now.toLocaleDateString('vi-VN')
  };

  const list = getStoredTrash();
  list.unshift(trashItem);
  saveStoredTrash(list);

  if (options?.showToast !== false) {
    const typeName = item.type === 'memory' ? 'kỷ niệm' : item.type === 'bucket_list' ? 'điều ước' : 'mục';
    showToastNotification({
      message: `Đã chuyển ${typeName} "${item.title}" vào Thùng Rác`,
      undoLabel: '↩️ Hoàn tác',
      onUndo: () => {
        restoreTrashItem(trashItem.id);
        if (options?.onUndo) options.onUndo();
      }
    });
  }

  return trashItem;
}

/**
 * Khôi phục một mục từ thùng rác trở về danh sách hoạt động tương ứng
 */
export function restoreTrashItem(trashId: string): boolean {
  const trashList = getStoredTrash();
  const targetIndex = trashList.findIndex((t) => t.id === trashId);
  if (targetIndex === -1) return false;

  const item = trashList[targetIndex];

  if (item.type === 'memory') {
    try {
      const memsRaw = localStorage.getItem(MEMORIES_STORAGE_KEY);
      const mems = memsRaw ? JSON.parse(memsRaw) : [];
      const existingIdx = mems.findIndex((m: any) => m.id === item.originalId);
      if (existingIdx !== -1) {
        mems[existingIdx] = item.data;
      } else {
        mems.unshift(item.data);
      }
      localStorage.setItem(MEMORIES_STORAGE_KEY, JSON.stringify(mems));
      pushDataToFirebase({ memories: mems, lastUpdatedBy: 'RestoreTrash' }).catch(() => {});
      window.dispatchEvent(
        new CustomEvent('couple-item-restored', { detail: { type: 'memory', item: item.data } })
      );
    } catch (e) {
      console.error('Error restoring memory:', e);
    }
  } else if (item.type === 'bucket_list') {
    try {
      const bucketRaw = localStorage.getItem(BUCKET_STORAGE_KEY);
      const bucketList = bucketRaw ? JSON.parse(bucketRaw) : [];
      const existingIdx = bucketList.findIndex((b: any) => b.id === item.originalId);
      if (existingIdx !== -1) {
        bucketList[existingIdx] = item.data;
      } else {
        bucketList.unshift(item.data);
      }
      localStorage.setItem(BUCKET_STORAGE_KEY, JSON.stringify(bucketList));
      pushDataToFirebase({ bucketList, lastUpdatedBy: 'RestoreTrash' }).catch(() => {});
      window.dispatchEvent(
        new CustomEvent('couple-item-restored', { detail: { type: 'bucket_list', item: item.data } })
      );
    } catch (e) {
      console.error('Error restoring bucket item:', e);
    }
  }

  // Remove from trash
  trashList.splice(targetIndex, 1);
  saveStoredTrash(trashList);

  showToastNotification({
    message: `✨ Đã khôi phục thành công "${item.title}"!`,
    icon: '💖'
  });

  return true;
}

/**
 * Xóa vĩnh viễn 1 mục khỏi thùng rác
 */
export function deleteTrashItemPermanently(trashId: string): boolean {
  const trashList = getStoredTrash();
  const updated = trashList.filter((t) => t.id !== trashId);
  if (updated.length === trashList.length) return false;
  saveStoredTrash(updated);
  return true;
}

/**
 * Dọn sạch toàn bộ thùng rác
 */
export function emptyAllTrash(): void {
  saveStoredTrash([]);
  showToastNotification({
    message: '🧹 Đã dọn sạch toàn bộ thùng rác!',
    icon: '✨'
  });
}

/**
 * Toast thông báo sang trọng có nút Hoàn tác
 */
export function showToastNotification(options: {
  message: string;
  icon?: string;
  undoLabel?: string;
  onUndo?: () => void;
  duration?: number;
}): void {
  if (typeof document === 'undefined') return;

  let toastContainer = document.getElementById('couple-global-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'couple-global-toast-container';
    toastContainer.className = 'couple-toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'couple-toast romantic-card';

  const iconText = options.icon || '🗑️';
  toast.innerHTML = `
    <div class="toast-left">
      <span class="toast-icon">${iconText}</span>
      <span class="toast-msg">${options.message}</span>
    </div>
    ${
      options.undoLabel
        ? `<button type="button" class="toast-undo-btn">${options.undoLabel}</button>`
        : `<button type="button" class="toast-close-btn">&times;</button>`
    }
  `;

  if (options.undoLabel && options.onUndo) {
    const undoBtn = toast.querySelector('.toast-undo-btn');
    if (undoBtn) {
      undoBtn.addEventListener('click', () => {
        options.onUndo?.();
        removeToast();
      });
    }
  } else {
    const closeBtn = toast.querySelector('.toast-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => removeToast());
    }
  }

  toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('is-visible');
  });

  const duration = options.duration || 5000;
  const timer = setTimeout(() => {
    removeToast();
  }, duration);

  function removeToast() {
    clearTimeout(timer);
    toast.classList.remove('is-visible');
    toast.classList.add('is-leaving');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }
}
