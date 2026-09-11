/**
 * =========================================================================
 * BUCKET LIST: NHỮNG ĐIỀU SẼ LÀM CÙNG NHAU TRONG LÚC YÊU (AI & MAZE)
 * =========================================================================
 * Hỗ trợ danh sách mục tiêu phân cấp đa tầng (Nested Tree Checklist):
 * Điều ước lớn -> Nhóm/Chặng lớn -> Các địa điểm/mục tiêu con nhỏ hơn.
 * Khi hoàn thành tất cả các mục con, nhóm cha và điều ước lớn sẽ tự động hoàn thành!
 */

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  completedDate?: string;
  children?: SubTask[]; // Nhánh con lồng nhau
}

export interface BucketItem {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  createdAt?: string;
  completedDate?: string;
  memoryNote?: string;
  photoUrl?: string;
  subTasks?: SubTask[];
}

export const BUCKET_LIST: BucketItem[] = [
  // HẸN HÒ LÃNG MẠN
  {
    id: 'bl-1',
    title: 'Cùng nhau ngắm hoàng hôn bên bờ biển',
    description: 'Ngồi sát bên nhau, nghe tiếng sóng vỗ rì rào và ngắm mặt trời đỏ rực chìm dần xuống đường chân trời.',
    category: 'Hẹn hò lãng mạn',
    completed: true,
    createdAt: '2026-08-15',
    completedDate: '2026-08-25',
    memoryNote: 'Buổi chiều hôm ấy gió biển thổi tung mái tóc em, và anh biết đây chính là khoảnh khắc mình muốn giữ lại suốt đời.',
    photoUrl: '/photos/sunset.svg'
  },
  {
    id: 'bl-2',
    title: 'Nấu một bữa tối lãng mạn dưới ánh nến',
    description: 'AI và Maze cùng vào bếp, cùng đeo tạp dề nấu món mì Ý và uống một ly vang ngọt ngào.',
    category: 'Hẹn hò lãng mạn',
    completed: true,
    createdAt: '2026-08-16',
    completedDate: '2026-08-30',
    memoryNote: 'Maze nấu ăn ngon hơn anh tưởng rất nhiều! Bữa tối ấm cúng nhất trần đời.',
    photoUrl: '/photos/dinner.svg'
  },
  {
    id: 'bl-3',
    title: 'Một buổi tối cắm trại ngắm sao trời',
    description: 'Dựng lều trên ngọn đồi lộng gió, đắp chung một chiếc chăn ấm và chỉ tay lên những chòm sao chỉ riêng hai đứa biết.',
    category: 'Hẹn hò lãng mạn',
    completed: false,
    createdAt: '2026-08-17',
    memoryNote: 'Đang ấp ủ cho một đêm thu se lạnh ở Đà Lạt hoặc Ba Vì.'
  },
  {
    id: 'bl-4',
    title: 'Chạy xe máy quanh phố phường đêm khuya',
    description: 'Khi phố phường đã lên đèn và vắng lặng, Maze ngồi sau ôm thật chặt và AI chở em đi qua từng con ngõ nhỏ.',
    category: 'Hẹn hò lãng mạn',
    completed: true,
    createdAt: '2026-08-18',
    completedDate: '2026-09-02',
    memoryNote: 'Gió đêm se lạnh nhưng vòng tay ôm từ phía sau của em thì ấm áp vô cùng.',
    photoUrl: '/photos/night-ride.svg'
  },

  // DU LỊCH & KHÁM PHÁ - ĐA TẦNG PHÂN CẤP (NESTED CHECKLIST)
  {
    id: 'bl-vn',
    title: 'Hành trình cùng em đi khắp Việt Nam',
    description: 'Cùng nhau đặt chân đến từng miền đất hình chữ S, lưu giữ thanh xuân và tình yêu trên mọi nẻo đường.',
    category: 'Du lịch & Khám phá',
    completed: false,
    createdAt: '2026-08-19',
    subTasks: [
      {
        id: 'st-vn-north',
        title: 'Miền Bắc',
        completed: false,
        children: [
          { id: 'st-vn-hn', title: 'Hà Nội 36 phố phường & Hồ Tây chiều thu', completed: true, completedDate: '2026-08-20' },
          { id: 'st-vn-hg', title: 'Hà Giang: Cột cờ Lũng Cú & Đèo Mã Pí Lèng', completed: false },
          { id: 'st-vn-sp', title: 'Sa Pa sương mù & Chinh phục đỉnh Fansipan', completed: false },
          { id: 'st-vn-nb', title: 'Ninh Bình non nước hữu tình (Tràng An - Tam Cốc)', completed: false },
          { id: 'st-vn-hl', title: 'Vịnh Hạ Long: Du thuyền ngắm hoàng hôn trên vịnh', completed: false }
        ]
      },
      {
        id: 'st-vn-central',
        title: 'Miền Trung',
        completed: false,
        children: [
          { id: 'st-vn-dn', title: 'Đà Nẵng: Cầu Rồng phun lửa & Bán đảo Sơn Trà', completed: false },
          { id: 'st-vn-ha', title: 'Phố Cổ Hội An: Thả đèn hoa đăng lung linh', completed: false },
          { id: 'st-vn-hue', title: 'Cố Đô Huế: Thưởng thức ca Huế trên sông Hương', completed: false },
          { id: 'st-vn-qn', title: 'Quy Nhơn & Phú Yên: Eo Gió - Kỳ Co xanh ngắt', completed: false },
          { id: 'st-vn-dl', title: 'Đà Lạt: Đồi thông săn mây & Vườn hoa cẩm tú cầu', completed: false }
        ]
      },
      {
        id: 'st-vn-south',
        title: 'Miền Nam & Biển Đảo',
        completed: false,
        children: [
          { id: 'st-vn-sg', title: 'Sài Gòn: Cà phê bệt Nhà Thờ Đức Bà & Landmark 81', completed: false },
          { id: 'st-vn-vt', title: 'Vũng Tàu: Đón gió ngọn hải đăng & Tắm biển Bãi Sau', completed: false },
          { id: 'st-vn-pq', title: 'Đảo Ngọc Phú Quốc: Ngắm hoàng hôn tại Sunset Sanato', completed: false },
          { id: 'st-vn-west', title: 'Miền Tây sông nước: Chợ nổi Cái Răng Cần Thơ', completed: false }
        ]
      }
    ]
  },
  {
    id: 'bl-7',
    title: 'Cùng nhau đi du lịch nước ngoài',
    description: 'Cầm cuốn hộ chiếu có dấu visa đôi, tay trong tay khám phá những nền văn hoá và danh lam thắng cảnh khắp năm châu.',
    category: 'Du lịch & Khám phá',
    completed: false,
    createdAt: '2026-08-21',
    subTasks: [
      {
        id: 'st-os-sea',
        title: 'Đông Nam Á',
        completed: false,
        children: [
          { id: 'st-sea-thai', title: 'Thái Lan: Thả đèn trời Chiang Mai & Phố đêm Bangkok', completed: false },
          { id: 'st-sea-sg', title: 'Singapore: Khám phá Gardens by the Bay & Marina Bay Sands', completed: false },
          { id: 'st-sea-bali', title: 'Bali (Indonesia): Ngắm xích đu giữa rừng nhiệt đới Ubud', completed: false }
        ]
      },
      {
        id: 'st-os-ea',
        title: 'Đông Á',
        completed: false,
        children: [
          { id: 'st-ea-kr', title: 'Hàn Quốc: Dạo bước dưới hàng cây ngân hạnh đảo Nami', completed: false },
          { id: 'st-ea-jp', title: 'Nhật Bản: Ngắm hoa anh đào Tokyo & Đền cổ Kyoto', completed: false },
          { id: 'st-ea-tw', title: 'Đài Loan: Thả đèn trời Thập Phần & Làng cổ Cửu Phần', completed: false }
        ]
      },
      {
        id: 'st-os-eu',
        title: 'Trung Đông & Châu Âu',
        completed: false,
        children: [
          { id: 'st-eu-paris', title: 'Pháp: Nắm tay nhau dưới chân tháp Eiffel Paris', completed: false },
          { id: 'st-eu-swiss', title: 'Thụy Sĩ: Ngắm đỉnh núi tuyết Jungfrau & Ngôi làng cổ tích', completed: false },
          { id: 'st-eu-dubai', title: 'Dubai: Trải nghiệm sa mạc cát vàng & Toà tháp Burj Khalifa', completed: false }
        ]
      }
    ]
  },
  {
    id: 'bl-5',
    title: 'Chuyến du lịch xa đầu tiên chỉ có hai đứa',
    description: 'Xách vali lên và cùng nhau khám phá một vùng đất mới, chụp hàng trăm bức ảnh đôi đáng nhớ.',
    category: 'Du lịch & Khám phá',
    completed: false,
    createdAt: '2026-08-19',
    memoryNote: 'Dự định sẽ là Đà Nẵng - Hội An hoặc Sa Pa sương mù.'
  },
  {
    id: 'bl-6',
    title: 'Ngắm bình minh trên đỉnh núi mây mù',
    description: 'Thức dậy từ 4 giờ sáng, leo lên mỏm đá đón những tia nắng đầu tiên xuyên qua biển mây bồng bềnh.',
    category: 'Du lịch & Khám phá',
    completed: false,
    createdAt: '2026-08-20',
    memoryNote: 'Sẽ cùng nhau săn mây ở Tà Xùa hoặc Fansipan!'
  },

  // TRẢI NGHIỆM MỚI LẠ
  {
    id: 'bl-8',
    title: 'Làm đồ gốm đôi bằng tay',
    description: 'Hai bàn tay lấm lem đất sét, cùng nhau nặn ra hai chiếc cốc uống nước khắc tên AI & Maze.',
    category: 'Trải nghiệm mới lạ',
    completed: true,
    createdAt: '2026-08-22',
    completedDate: '2026-09-06',
    memoryNote: 'Chiếc cốc của Maze méo mó một chút nhưng dễ thương không để đâu cho hết!',
    photoUrl: '/photos/pottery.svg'
  },
  {
    id: 'bl-9',
    title: 'Mặc áo đôi đi dạo giữa trung tâm thương mại',
    description: 'Bỏ qua ngại ngùng, mặc bộ đồ đôi thật nổi bật và tự hào khoe với cả thế giới mình thuộc về nhau.',
    category: 'Trải nghiệm mới lạ',
    completed: false,
    createdAt: '2026-08-23',
    memoryNote: 'Đã sắm áo đôi rồi, chỉ chờ ngày hai đứa diện chung thôi!'
  },
  {
    id: 'bl-10',
    title: 'Cùng thức trắng đêm xem trọn một bộ phim',
    description: 'Pha một âu bỏng ngô lớn, bật máy chiếu lên tường và cùng ôm nhau xem trọn một trilogy yêu thích.',
    category: 'Trải nghiệm mới lạ',
    completed: false,
    createdAt: '2026-08-24',
    memoryNote: 'Sẽ là phim Interstellar hoặc một series tình cảm lãng mạn.'
  },
  {
    id: 'bl-11',
    title: 'Nuôi chung một chú cún hoặc bé mèo',
    description: 'Cùng chăm sóc một người bạn bốn chân nhỏ bé, gọi nhau là ba và mẹ của bé cưng.',
    category: 'Trải nghiệm mới lạ',
    completed: false,
    createdAt: '2026-08-25',
    memoryNote: 'Maze thích mèo lông ngắn, AI sẽ chuẩn bị một căn phòng thật ấm cho bé.'
  },

  // TƯƠNG LAI ĐÔI LỨA
  {
    id: 'bl-12',
    title: 'Cùng nhau kỷ niệm các cột mốc ngày yêu',
    description: 'Mỗi năm đều quay lại xem website này, đếm lại số ngày và bổ sung thêm những ước mơ mới.',
    category: 'Tương lai đôi lứa',
    completed: false,
    createdAt: '2026-08-26',
    subTasks: [
      { id: 'st-an-1', title: 'Kỷ niệm 1 năm ngày yêu (15/08/2027)', completed: false },
      { id: 'st-an-2', title: 'Kỷ niệm 3 năm ngày yêu (15/08/2029)', completed: false },
      { id: 'st-an-3', title: 'Kỷ niệm 5 năm ngày yêu (15/08/2031)', completed: false }
    ]
  },
  {
    id: 'bl-13',
    title: 'Cùng thiết kế và trang trí căn nhà đầu tiên',
    description: 'Tự tay chọn màu sơn tường, sắp xếp giá sách, góc làm việc của AI và góc trang điểm xinh đẹp của Maze.',
    category: 'Tương lai đôi lứa',
    completed: false,
    createdAt: '2026-08-27',
    memoryNote: 'Ngôi nhà đầy ắp tiếng cười và hương thơm cà phê buổi sớm.'
  },
  {
    id: 'bl-14',
    title: 'Nắm tay nhau bước vào lễ đường thiêng liêng',
    description: 'Khoảnh khắc Maze mặc chiếc váy cưới trắng tinh khôi, và AI hứa sẽ yêu thương em trọn đời trước tất cả mọi người.',
    category: 'Tương lai đôi lứa',
    completed: false,
    createdAt: '2026-08-28',
    memoryNote: 'Đích đến thiêng liêng và ngọt ngào nhất của tình yêu chúng mình.'
  }
];
