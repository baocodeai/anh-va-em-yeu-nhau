/**
 * =========================================================================
 * BẢN ĐỒ KỶ NIỆM: NHỮNG KHOẢNH KHẮC CỦA AI & MAZE
 * =========================================================================
 * Mỗi kỷ niệm là một trang nhật ký tình yêu chứa ảnh bìa nổi bật,
 * cảm xúc, bài viết dài và bộ sưu tập ảnh khoảnh khắc cùng ngày.
 */

export interface JournalPhoto {
  id: string;
  url: string;
  caption?: string;
}

export interface PhotoMemory {
  id: string;
  date: string;
  title: string;
  location: string;
  caption: string; // Tóm tắt ngắn hiển thị ngoài thẻ Polaroid
  imageUrl: string; // Ảnh bìa nổi bật (Featured Cover Image)
  highlight?: boolean;
  isPinned?: boolean; // Ghim bài viết lên đầu trang
  journalContent?: string; // Nội dung bài viết nhật ký dài chi tiết
  mood?: string; // Tâm trạng lúc đó
  weather?: string; // Thời tiết hôm ấy
  author?: 'ai' | 'maze' | 'both'; // Ai là người ghi lại
  galleryImages?: JournalPhoto[]; // Bộ ảnh chèn thêm trong bài viết
}

export const PHOTO_MEMORIES: PhotoMemory[] = [
  {
    id: 'mem-1',
    date: '15/08/2026',
    title: 'Khoảnh khắc vũ trụ se duyên',
    location: 'Nơi câu chuyện bắt đầu',
    caption: 'Ngày 15/08/2026, ngày mà hai trái tim chính thức rung lên cùng một nhịp đập, mở ra thiên hà tình yêu của AI & Maze.',
    imageUrl: '/photos/anniversary.svg',
    highlight: true,
    isPinned: true,
    mood: 'Ngập tràn hạnh phúc 🥰',
    weather: 'Đêm thu se lạnh đầy sao 🌌',
    author: 'both',
    journalContent: `Có những ngày trôi qua như một cái chớp mắt, nhưng ngày 15 tháng 8 năm 2026 sẽ mãi là cột mốc vĩnh cửu trong thiên hà ký ức của hai đứa mình.

Đó là một buổi tối mùa thu dịu mát. Khi ánh đèn đường bắt đầu thắp sáng những góc phố quen, cũng là lúc hai bàn tay ngập ngừng tìm thấy nhau. Cái chạm tay đầu tiên ấy vừa bẽn lẽn, vừa ấm áp đến mức xua tan đi mọi âu lo của những ngày tháng trước đó.

"Từ hôm nay, mình cùng nhau bước qua mọi chông gai nhé!" — câu nói ngắn gọn nhưng như một lời hẹn ước chân thành nhất mà vũ trụ đã lắng nghe và khắc ghi. Cảm ơn em, Maze nhỏ bé, đã bước vào cuộc đời anh và biến những ngày bình thường nhất trở thành chuỗi ngày rực rỡ ngập tràn ánh sáng.`,
    galleryImages: [
      {
        id: 'img-1-1',
        url: '/photos/sunset.svg',
        caption: 'Ánh hoàng hôn buông xuống ngay trước khoảnh khắc tỏ tình ngọt ngào.'
      },
      {
        id: 'img-1-2',
        url: '/photos/dinner.svg',
        caption: 'Bàn ăn nhỏ ấm áp đánh dấu ngày đầu tiên hai đứa chính thức bên nhau.'
      }
    ]
  },
  {
    id: 'mem-2',
    date: '25/08/2026',
    title: 'Hoàng hôn bên bờ biển vắng',
    location: 'Bờ biển chiều lộng gió',
    caption: 'Mặt trời có thể lặn ở phía tây, nhưng tình yêu của anh dành cho em thì luôn rạng ngời như ban mai.',
    imageUrl: '/photos/sunset.svg',
    mood: 'Bình yên & Lãng mạn 💫',
    weather: 'Gió biển mơn man, ráng chiều đỏ rực 🌅',
    author: 'ai',
    journalContent: `Chiều hôm ấy, hai đứa trốn cả thế giới để chạy xe ra bờ biển. Tiếng sóng vỗ rì rào hòa cùng tiếng cười trong veo của Maze làm lòng anh thấy bình yên đến lạ kỳ.

Chúng mình cùng nhau cởi giày, để đôi chân trần chạm vào bãi cát mịn màng còn vương chút hơi ấm của nắng chiều. Nhìn Maze nghiêng đầu đón gió, mái tóc bay bay trong ánh hoàng hôn màu cam đỏ, anh chỉ muốn thời gian ngừng lại ở giây phút này mãi mãi.

Dù mai này cuộc sống có bao nhiêu thăng trầm, chỉ cần được nắm tay em đứng trước biển cả bao la, anh biết mình luôn có một chốn bình yên nhất để trở về.`,
    galleryImages: [
      {
        id: 'img-2-1',
        url: '/photos/anniversary.svg',
        caption: 'Dấu chân đôi in trên cát mịn bên mép sóng.'
      }
    ]
  },
  {
    id: 'mem-3',
    date: '30/08/2026',
    title: 'Bữa tối ngọt ngào dưới ánh nến',
    location: 'Căn bếp ấm áp',
    caption: 'Món ăn do hai đứa cùng nấu, nụ cười của em là gia vị tuyệt vời nhất trên đời.',
    imageUrl: '/photos/dinner.svg',
    mood: 'Ấm cúng & Vui vẻ 🍝',
    weather: 'Mưa rào tí tách ngoài hiên cửa sổ 🌧️',
    author: 'maze',
    journalContent: `Một ngày mưa rào rả rích, hai đứa quyết định không ra ngoài mà biến căn bếp nhỏ thành "nhà hàng 5 sao" của riêng mình!

AI thì loay hoay nấu nước sốt mì Ý, thỉnh thoảng lại lúng túng làm rơi thìa khiến em cười không ngớt. Còn em thì cẩn thận trang trí từng đĩa salad nhỏ. Dưới ánh nến lung linh và giai điệu bài hát jazz êm dịu, món ăn dù có hơi mặn một xíu nhưng lại ngon hơn bất kỳ bữa tiệc thịnh soạn nào ngoài phố.

Hạnh phúc đôi khi chỉ đơn giản là cùng một người chia sẻ chiếc tạp dề, cùng rửa bát và nhìn nhau mỉm cười qua làn hơi nước ấm.`,
    galleryImages: [
      {
        id: 'img-3-1',
        url: '/photos/pottery.svg',
        caption: 'Góc bàn ăn ấm áp do chính tay hai đứa chuẩn bị.'
      }
    ]
  },
  {
    id: 'mem-4',
    date: '06/09/2026',
    title: 'Làm gốm đôi bằng tay',
    location: 'Góc xưởng gốm nhỏ',
    caption: 'Chiếc cốc in tên hai đứa, vụng về một chút nhưng đong đầy tình cảm chân thành.',
    imageUrl: '/photos/pottery.svg',
    mood: 'Sáng tạo & Đáng yêu 🎨',
    weather: 'Nắng thu hanh vàng dịu ngọt ☀️',
    author: 'both',
    journalContent: `Chuyến trải nghiệm làm gốm đầu tiên cùng nhau đã đem lại biết bao khoảnh khắc đáng nhớ!

Bàn xoay quay tít mù, bùn đất dính đầy trên tay và cả trên chóp mũi của Maze. Hai đứa loay hoay mãi mới vuốt được hình hài cho hai chiếc cốc đôi. Chiếc thì hơi méo một góc, chiếc thì quai cầm hơi to, nhưng khi khắc hai cái tên "AI" và "MAZE" lên đáy cốc, chúng mình biết rằng đây là món đồ độc nhất vô nhị trên thế gian.

Mỗi khi cầm chiếc cốc này uống nước, hai đứa lại nhớ về nụ cười lấm lem đất sét và ánh mắt đầy ắp thương yêu của ngày hôm ấy.`,
    galleryImages: [
      {
        id: 'img-4-1',
        url: '/photos/sunset.svg',
        caption: 'Thành quả chiếc cốc gốm đôi sau khi hoàn thành công đoạn tạo hình.'
      }
    ]
  }
];
