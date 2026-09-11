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
  title: string;
  subtitle: string;
  description: string;
  boysInfo: PartnerInfo;
  girlsInfo: PartnerInfo;
  loveDeclaration: string;
  musicUrl?: string; // Tùy chọn bài hát nền
}

export const COUPLE_CONFIG: CoupleConfig = {
  // Ngày chính thức yêu nhau: 15 tháng 8 năm 2026
  anniversaryDate: '2026-08-15',

  title: '21 Ngày Cùng Em — AI & Maze',
  subtitle: 'Hành Trình Tình Yêu & Thói Quen Giữa Ngân Hà',
  description: 'Cuốn nhật ký tinh cầu lưu giữ 21 ngày rèn luyện thói quen tiếng Anh và những điều ước sẽ làm cùng nhau của AI và Maze.',

  // Thông tin về Chàng
  boysInfo: {
    name: 'AI',
    nickname: 'Chàng Kỹ Sư Vũ Trụ',
    role: 'Anh',
    birthday: '2005-09-28', // 28/09/2005
    zodiac: 'Thiên Bình (Libra)',
    avatar: '/photos/ai-avatar.svg',
    bio: 'Chàng trai luôn muốn dùng cả bầu trời ngân hà và sự kiên trì của mình để che chở và đồng hành cùng Maze.',
    color: '#38bdf8' // Xanh ánh sao lấp lánh
  },

  // Thông tin về Nàng
  girlsInfo: {
    name: 'Maze',
    nickname: 'Nàng Tinh Cầu Rực Rỡ',
    role: 'Em',
    birthday: '2005-12-11', // 11/12/2005
    zodiac: 'Nhân Mã (Sagittarius)',
    avatar: '/photos/maze-avatar.svg',
    bio: 'Cô gái dịu dàng, nụ cười thắp sáng những vì sao, nguồn cảm hứng ngọt ngào nhất trong từng ngày của AI.',
    color: '#f43f5e' // Hồng thạch anh ấm áp
  },

  // Lời tựa tình yêu
  loveDeclaration: 'Giữa vũ trụ bao la với hàng tỷ thiên hà và triệu năm ánh sáng, gặp được em là điều kỳ diệu nhất. 21 ngày học cùng nhau không chỉ là thói quen của một ngôn ngữ, mà là thói quen có em trong từng nhịp thở mỗi ngày.',
};
