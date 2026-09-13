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
    subtitle: '21 Ngày Xây Dựng Mối Liên Kết',
    icon: '🌱',
    description: 'Phá vỡ sự lười biếng và hình thành mối liên kết giữa AI và Maze.'
  },
  {
    days: 66,
    title: 'Thiên Hà Tự Động Hóa',
    badge: 'Chặng 2 · Tinh Cầu Nỗ Lực',
    subtitle: '66 Ngày Tự Động Hóa Tiềm Thức',
    icon: '🧠',
    description: '66 ngày để điều từng cố gắng trở thành điều tự nhiên — như cách anh nhớ em mỗi sáng.'
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

export const DEFAULT_HABIT_START_DATE = '2026-09-12';
export const DEFAULT_SHIELDS = { ai: 2, maze: 2 };

export const HABIT_21_DAYS: DayHabit[] = Array.from({ length: 21 }, (_, i) => {
  const isDayOne = i === 0;
  return {
    day: i + 1,
    aiCompleted: isDayOne,
    mazeCompleted: isDayOne,
    completed: isDayOne,
    aiCompletedDate: isDayOne ? '2026-09-12' : undefined,
    mazeCompletedDate: isDayOne ? '2026-09-12' : undefined,
    completedDate: isDayOne ? '2026-09-12' : undefined
  };
});

