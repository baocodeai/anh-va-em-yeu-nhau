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
  completed: boolean; // Chỉ true khi cả aiCompleted && mazeCompleted đều true (hoặc được khiên / tích bù)
  aiCompletedDate?: string;
  mazeCompletedDate?: string;
  completedDate?: string;
  aiShieldUsed?: boolean;
  mazeShieldUsed?: boolean;
  rescuedBy?: 'ai' | 'maze';
  rescueNote?: string;
}

export interface HabitMilestone {
  days: number;
  title: string;
  badge: string;
  subtitle: string;
  icon: string;
  description: string;
}

export const HABIT_MILESTONES: HabitMilestone[] = [
  {
    days: 21,
    title: 'Tinh Cầu Khởi Nguyên',
    badge: 'Chặng 1',
    subtitle: '21 Ngày Xây Dựng Thói Quen',
    icon: '🌱',
    description: 'Phá vỡ sức ỳ ban đầu và hình thành liên kết thói quen đầu tiên giữa AI & Maze.'
  },
  {
    days: 66,
    title: 'Thiên Hà Tự Động Hóa',
    badge: 'Chặng 2 · Khoa Học Não Bộ',
    subtitle: '66 Ngày Tự Động Hóa Tiềm Thức',
    icon: '🧠',
    description: 'Theo nghiên cứu của TS. Phillippa Lally (UCL), 66 ngày là mốc vàng để thói quen ăn sâu thành phản xạ tự nhiên.'
  },
  {
    days: 100,
    title: 'Dải Ngân Hà Bách Nhật',
    badge: 'Chặng 3 · Bách Nhật Tình Yêu',
    subtitle: '100 Ngày Cùng Nhau Tỏa Sáng',
    icon: '💯',
    description: 'Cột mốc 100 ngày kiên trì rực rỡ, biểu tượng cho sự gắn kết bền vững của đôi lứa.'
  },
  {
    days: 365,
    title: 'Vũ Trụ Vĩnh Cửu',
    badge: 'Chặng 4 · Trọn 1 Năm',
    subtitle: '365 Ngày Đồng Hành Bất Tận',
    icon: '🪐',
    description: '365 ngày trọn vẹn của một năm, biến tình yêu và sự học hỏi thành dòng chảy bất tận.'
  }
];

export const DEFAULT_HABIT_START_DATE = '2026-08-20';
export const DEFAULT_SHIELDS = { ai: 2, maze: 2 };

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

