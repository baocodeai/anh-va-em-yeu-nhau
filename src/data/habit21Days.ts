/**
 * =========================================================================
 * 21 NGÀY RÈN LUYỆN THÓI QUEN TIẾNG ANH CÙNG EM (AI & MAZE)
 * =========================================================================
 * Theo dõi tiến độ 21 ngày và đánh dấu hoàn thành mỗi ngày.
 */

export interface DayHabit {
  day: number;
  aiCompleted: boolean;
  mazeCompleted: boolean;
  completed: boolean; // Chỉ true khi cả aiCompleted && mazeCompleted đều true
  aiCompletedDate?: string;
  mazeCompletedDate?: string;
  completedDate?: string;
}

export const DEFAULT_HABIT_START_DATE = '2026-08-20';

export const HABIT_21_DAYS: DayHabit[] = Array.from({ length: 21 }, (_, i) => {
  const isSampleDone = i < 4;
  const isPartialDone = i === 4;
  return {
    day: i + 1,
    aiCompleted: isSampleDone || isPartialDone,
    mazeCompleted: isSampleDone,
    completed: isSampleDone,
    aiCompletedDate: isSampleDone || isPartialDone ? `2026-08-${20 + i}` : undefined,
    mazeCompletedDate: isSampleDone ? `2026-08-${20 + i}` : undefined,
    completedDate: isSampleDone ? `2026-08-${20 + i}` : undefined
  };
});
