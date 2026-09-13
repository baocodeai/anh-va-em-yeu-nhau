/**
 * =========================================================================
 * CẤU HÌNH TÌNH YÊU DÀNH RIÊNG CHO AI & MAZE
 * =========================================================================
 * Hai bạn chỉ cần chỉnh sửa các thông tin ở file này khi cần thay đổi.
 */

export interface PartnerInfo {
  name: string;
  nickname: string;
  role: string;
  birthday: string; // YYYY-MM-DD
  zodiac: string;
  avatar: string;
  bio: string;
  color: string;
}

export interface CoupleConfig {
  anniversaryDate: string; // YYYY-MM-DD (Thời khắc bắt đầu yêu nhau)
  birthdayUnlockDate?: string; // YYYY-MM-DDTHH:mm:ss (Thời điểm mở khóa sinh nhật)
  title: string;
  subtitle: string;
  description: string;
  boysInfo: PartnerInfo;
  girlsInfo: PartnerInfo;
  loveDeclaration: string;
  musicUrl?: string; // Tùy chọn bài hát nền
  musicTitle?: string; // Tên bài hát hiển thị
}

export const COUPLE_CONFIG: CoupleConfig = {
  // Ngày chính thức yêu nhau: 15 tháng 8 năm 2026
  anniversaryDate: '2026-08-15',
  // Ngày mở khóa sinh nhật của AI: 28 tháng 9 năm 2026 lúc 00:00:00
  birthdayUnlockDate: '2026-09-28T00:00:00',

  title: 'Nơi Bí Mật Của Hai Ta',
  subtitle: 'Hành Trình Tình Yêu & Thói Quen Giữa Ngân Hà',
  description: 'Cuốn nhật ký tinh cầu lưu giữ 21 ngày rèn luyện thói quen tiếng Anh và những điều ước sẽ làm cùng nhau của AI và Maze.',

  // Thông tin về Chàng
  boysInfo: {
    name: 'AI',
    nickname: 'Chàng Kỹ Sư Tình Yêu',
    role: 'Anh',
    birthday: '2005-09-28', // 28/09/2005
    zodiac: 'Thiên Bình',
    avatar: '/assets/ai.png',
    bio: 'Chàng trai ấm áp luôn muốn dành tất cả của mình cùng sự kiên trì để che chở và đồng hành cùng Maze.',
    color: '#38bdf8' // Xanh ánh sao lấp lánh
  },

  // Thông tin về Nàng
  girlsInfo: {
    name: 'Maze',
    nickname: 'Nàng Kiến Tạo Yêu Thương',
    role: 'Em',
    birthday: '2005-12-11', // 11/12/2005
    zodiac: 'Nhân Mã',
    avatar: '/assets/maze.jpg',
    bio: 'Cô gái dịu dàng, dễ thương và thông minh cùng với nụ cười thắp sáng những vì sao, nguồn cảm hứng ngọt ngào nhất trong từng ngày của anh.',
    color: '#f43f5e' // Hồng thạch anh ấm áp
  },

  // Lời tựa tình yêu
  loveDeclaration: 'Tu trăm năm mới chung một thuyền, tu ngàn năm mới chung chăn gối.\n Hơn 8 tỷ người, tại sao hai ta gặp nhau nhỉ ?',

  // Nhạc nền lãng mạn dành riêng cho hai đứa (có thể thay đổi bài hát bất kỳ lúc nào)
  musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
  musicTitle: 'Giai Điệu Tình Yêu Của Hai Đứa 🎶'
};
