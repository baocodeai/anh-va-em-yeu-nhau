/**
 * =========================================================================
 * 21 NGÀY RÈN LUYỆN THÓI QUEN TIẾNG ANH CÙNG EM (AI & MAZE)
 * =========================================================================
 * Theo dõi tiến độ 21 ngày và đánh dấu hoàn thành mỗi ngày.
 */

export interface DayHabit {
  day: number;
  completed: boolean;
  completedDate?: string;
}

export const HABIT_21_DAYS: DayHabit[] = Array.from({ length: 21 }, (_, i) => ({
  day: i + 1,
  completed: i < 5,
  completedDate: i < 5 ? `2026-08-${20 + i}` : undefined
}));
