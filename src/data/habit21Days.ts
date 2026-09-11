/**
 * =========================================================================
 * 21 NGÀY RÈN LUYỆN THÓI QUEN TIẾNG ANH CÙNG EM (AI & MAZE)
 * =========================================================================
 * Mẹo cho AI & Maze:
 * 1. Khi học xong một ngày, các bạn chỉ cần sửa `completed: false` thành `completed: true`
 * 2. Gõ những gì Maze đã học vào mục `mazeLearned`
 * 3. Gõ những gì AI đã học vào mục `aiLearned`
 * 4. Thêm từ vựng mới vào `keyVocabulary`
 */

export interface DayHabit {
  day: number;
  title: string;
  theme: string;
  completed: boolean; // Trạng thái hoàn thành được lưu trực tiếp tại đây
  completedDate?: string;
  mazeLearned: string;
  aiLearned: string;
  keyVocabulary: { word: string; meaning: string; example?: string }[];
  romanticNote: string;
}

export const HABIT_21_DAYS: DayHabit[] = [
  {
    day: 1,
    title: 'Khởi đầu chòm sao đầu tiên',
    theme: 'Daily Routines & Love Words',
    completed: true,
    completedDate: '2026-08-20',
    mazeLearned: 'Hôm nay em học cách dùng thì hiện tại đơn để nói về thói quen buổi sáng, và cách nói chúc ngủ ngon thật ngọt ngào bằng tiếng Anh.',
    aiLearned: 'Anh học cách dùng tính từ miêu tả sự ấm áp và rạng ngời của người mình yêu. Hôm nay học cùng Maze anh thấy thời gian trôi qua nhanh như một cái chớp mắt.',
    keyVocabulary: [
      { word: 'Cherish', meaning: 'Yêu thương, trân trọng từng phút giây', example: 'I cherish every second with you.' },
      { word: 'Routine', meaning: 'Thói quen thường nhật', example: 'Learning English with you is my sweetest routine.' },
      { word: 'Glimmer', meaning: 'Ánh sáng lấp lánh như mắt em', example: 'Stars glimmer in the sky just like your eyes.' }
    ],
    romanticNote: 'Ngày đầu tiên là bước chân đẹp nhất. Dù tiếng Anh có khó đến đâu, chỉ cần có Maze ngồi cạnh thì mỗi từ vựng đều biến thành một nốt nhạc tình ca.'
  },
  {
    day: 2,
    title: 'Những điều giản dị quanh ta',
    theme: 'Expressing Feelings & Emotions',
    completed: true,
    completedDate: '2026-08-21',
    mazeLearned: 'Em học cách diễn đạt những cảm xúc nhỏ bé trong ngày: cảm giác bình yên khi được ai đó lắng nghe và cách nói lời cảm ơn từ tận đáy lòng.',
    aiLearned: 'Anh học cấu trúc câu nhấn mạnh (Cleft sentences) để nói: "Chính là Maze người đã làm cho cuộc sống của anh tràn ngập màu sắc".',
    keyVocabulary: [
      { word: 'Serendipity', meaning: 'Sự tình cờ may mắn và diệu kỳ', example: 'Meeting you was sheer serendipity.' },
      { word: 'Peaceful', meaning: 'Bình yên, thanh thản', example: 'My mind feels peaceful whenever I talk to you.' },
      { word: 'Affection', meaning: 'Tình cảm nồng thắm, sự âu yếm', example: 'Deep affection grows day by day.' }
    ],
    romanticNote: 'Hôm nay Maze phát âm rất chuẩn! Nụ cười của em lúc đọc xong câu văn tiếng Anh làm trái tim anh tan chảy.'
  },
  {
    day: 3,
    title: 'Kể nhau nghe về một ngày',
    theme: 'Past Simple & Memory Sharing',
    completed: true,
    completedDate: '2026-08-22',
    mazeLearned: 'Em học các động từ bất quy tắc trong quá khứ và thử viết một đoạn nhật ký ngắn về ngày đầu tiên chúng mình nói chuyện.',
    aiLearned: 'Anh luyện tập phản xạ kể chuyện bằng thì quá khứ đơn, nhớ lại khoảnh khắc ngày 15/08/2026 khi chúng mình chính thức nắm tay.',
    keyVocabulary: [
      { word: 'Unforgettable', meaning: 'Không thể nào quên', example: 'The day we fell in love was unforgettable.' },
      { word: 'Memory', meaning: 'Kỷ niệm quý giá', example: 'Making memories with Maze is my favorite hobby.' },
      { word: 'Heartbeat', meaning: 'Nhịp đập con tim', example: 'My heartbeat speeds up whenever you call my name.' }
    ],
    romanticNote: 'Quá khứ là nơi lưu giữ kỷ niệm, nhưng hiện tại học cùng em mới là kho báu vô giá.'
  },
  {
    day: 4,
    title: 'Món ăn & Những buổi hẹn hò',
    theme: 'Food, Flavors & Coffee Dates',
    completed: true,
    completedDate: '2026-08-23',
    mazeLearned: 'Học từ vựng về các món tráng miệng ngọt ngào và cách gọi món bằng tiếng Anh khi hai đứa đi cà phê hay nhà hàng.',
    aiLearned: 'Học cách miêu tả hương vị và các tính từ nói về sự chu đáo khi chuẩn bị một bữa tối lãng mạn cho người yêu.',
    keyVocabulary: [
      { word: 'Delightful', meaning: 'Thú vị, làm say đắm lòng người', example: 'A cup of coffee with you is truly delightful.' },
      { word: 'Sweet tooth', meaning: 'Người hảo ngọt (giống Maze nè)', example: 'Maze has a sweet tooth, especially for matcha.' },
      { word: 'Cozy', meaning: 'Ấm cúng, gần gũi', example: 'We found a cozy corner in our favorite cafe.' }
    ],
    romanticNote: 'Hẹn Maze một buổi tối hai đứa đi ăn món ngon và chỉ nói chuyện bằng tiếng Anh với nhau nhé!'
  },
  {
    day: 5,
    title: 'Bầu trời và Những vì sao',
    theme: 'Weather, Sky & Constellations',
    completed: true,
    completedDate: '2026-08-24',
    mazeLearned: 'Học tên các chòm sao, hiện tượng tự nhiên và từ ngữ miêu tả bầu trời đêm đầy sao.',
    aiLearned: 'Luyện nghe podcast tiếng Anh về thiên văn học và cách dùng ẩn dụ liên quan đến vũ trụ trong thơ tình.',
    keyVocabulary: [
      { word: 'Constellation', meaning: 'Chòm sao', example: 'We looked at the constellations and found our own star.' },
      { word: 'Breathtaking', meaning: 'Đẹp đến nghẹt thở', example: 'The view of the night sky with you is breathtaking.' },
      { word: 'Infinite', meaning: 'Vô tận, bất tận', example: 'My love for Maze is infinite like the cosmos.' }
    ],
    romanticNote: 'Dải ngân hà trên website này chính là bầu trời mà chúng mình cùng ngắm mỗi tối đấy.'
  },
  {
    day: 6,
    title: 'Âm nhạc & Những điệu nhảy',
    theme: 'Music, Rhythm & Melody',
    completed: false,
    mazeLearned: 'Chuẩn bị bài nghe một bài hát tình ca tiếng Anh mà em thích nhất để hai đứa cùng dịch lời.',
    aiLearned: 'Chuẩn bị học các collocations liên quan đến âm thanh, cảm xúc và nhịp điệu tình yêu.',
    keyVocabulary: [
      { word: 'Harmonious', meaning: 'Hài hòa, êm dịu', example: 'Our two hearts beat in harmonious melody.' },
      { word: 'Soulmate', meaning: 'Tri kỷ, bạn tâm giao', example: 'I finally found my soulmate in Maze.' },
      { word: 'Serenade', meaning: 'Dạ khúc tình yêu', example: 'The sound of your voice is a sweet serenade.' }
    ],
    romanticNote: 'Mỗi lời em nói như một khúc tình ca làm dịu đi mọi mệt mỏi trong ngày.'
  },
  {
    day: 7,
    title: 'Cột mốc một tuần kiên trì',
    theme: 'Milestones & Celebration',
    completed: false,
    mazeLearned: 'Tổng kết lại 30 từ vựng đã học trong tuần đầu và tự thưởng cho mình một cốc trà sữa.',
    aiLearned: 'Làm một bài quiz nhỏ dạng trò chơi hỏi đáp tiếng Anh cực kỳ vui vẻ dành riêng cho Maze.',
    keyVocabulary: [
      { word: 'Accomplishment', meaning: 'Thành tựu đáng tự hào', example: 'Finishing our first week is a wonderful accomplishment.' },
      { word: 'Perseverance', meaning: 'Sự kiên trì, bền bỉ', example: 'Perseverance makes our dreams come true.' },
      { word: 'Celebrate', meaning: 'Ăn mừng, chúc mừng', example: 'Let us celebrate our 7-day streak together!' }
    ],
    romanticNote: '7 ngày trôi qua, thói quen đã dần bén rễ và tình yêu của chúng mình ngày càng sâu đậm hơn.'
  },
  {
    day: 8,
    title: 'Những chuyến đi mơ ước',
    theme: 'Travel & Exploration',
    completed: false,
    mazeLearned: 'Từ vựng về sân bay, khách sạn và các địa danh du lịch nổi tiếng trên thế giới.',
    aiLearned: 'Học cách hỏi đường, đặt vé tàu bay và lên kế hoạch lịch trình du lịch quốc tế cho hai người.',
    keyVocabulary: [
      { word: 'Wanderlust', meaning: 'Niềm khao khát được đi khắp thế gian', example: 'With Maze, my wanderlust is always alive.' },
      { word: 'Scenic', meaning: 'Phong cảnh hữu tình, đẹp đẽ', example: 'We drove along the scenic coastal road.' },
      { word: 'Passport', meaning: 'Hộ chiếu', example: 'Someday our passports will be filled with stamps together.' }
    ],
    romanticNote: 'Đi đâu không quan trọng, quan trọng là người đồng hành cạnh anh chính là em.'
  },
  {
    day: 9,
    title: 'Sách, Phim & Những câu chuyện',
    theme: 'Movies, Literature & Quotes',
    completed: false,
    mazeLearned: 'Xem một trích đoạn phim ngắn tiếng Anh không cần phụ đề và nắm bắt cảm xúc nhân vật.',
    aiLearned: 'Tìm kiếm những câu châm ngôn tình yêu bằng tiếng Anh bất hủ để viết thiệp cho Maze.',
    keyVocabulary: [
      { word: 'Masterpiece', meaning: 'Kiệt tác', example: 'Every story we write together is a masterpiece.' },
      { word: 'Captivating', meaning: 'Quyến rũ, lôi cuốn', example: 'Your smile is the most captivating thing.' },
      { word: 'Dialogue', meaning: 'Lời thoại, cuộc trò chuyện', example: 'I love having late-night dialogues with you.' }
    ],
    romanticNote: 'Nếu cuộc đời là một cuốn tiểu thuyết, thì Maze chính là chương sách rực rỡ nhất.'
  },
  {
    day: 10,
    title: 'Ước mơ & Hoài bão',
    theme: 'Future Ambitions & Careers',
    completed: false,
    mazeLearned: 'Học cách dùng thì tương lai đơn và cấu trúc "hope to / wish to" để nói về dự định tương lai.',
    aiLearned: 'Luyện tập cách trình bày ý tưởng công nghệ và chia sẻ mục tiêu sự nghiệp bằng tiếng Anh với Maze.',
    keyVocabulary: [
      { word: 'Aspiration', meaning: 'Khát vọng, hoài bão lớn', example: 'My biggest aspiration is to build a happy home with you.' },
      { word: 'Supportive', meaning: 'Luôn ủng hộ, nâng đỡ', example: 'You are always supportive of my dreams.' },
      { word: 'Bright', meaning: 'Tươi sáng, rực rỡ', example: 'Our future together looks so bright.' }
    ],
    romanticNote: 'Anh sẽ luôn là chỗ dựa vững chắc nhất để Maze tự tin vươn tới mọi ước mơ.'
  },
  {
    day: 11,
    title: 'Giao tiếp hàng ngày tự nhiên',
    theme: 'Idioms & Slang in Daily Life',
    completed: false,
    mazeLearned: 'Học 5 thành ngữ tiếng Anh thông dụng để nói chuyện tự nhiên như người bản xứ.',
    aiLearned: 'Luyện phản xạ đối thoại ngắn, dùng các cụm từ đệm (fillers) tự nhiên.',
    keyVocabulary: [
      { word: 'Over the moon', meaning: 'Vui sướng ngập tràn', example: 'I was over the moon when you said yes.' },
      { word: 'Piece of cake', meaning: 'Dễ như ăn bánh', example: 'With your help, English is a piece of cake.' },
      { word: 'Head over heels', meaning: 'Say đắm ai đó hoàn toàn', example: 'I am head over heels in love with Maze.' }
    ],
    romanticNote: 'Đến nửa chặng đường rồi! Nhìn lại thấy chúng mình đã giỏi hơn ngày đầu tiên rất nhiều.'
  },
  {
    day: 12,
    title: 'Sức khỏe & Bình an',
    theme: 'Health, Wellness & Care',
    completed: false,
    mazeLearned: 'Từ vựng về chăm sóc sức khỏe, nhắc nhở uống đủ nước và ngủ đúng giờ.',
    aiLearned: 'Cách dùng các câu khuyên nhủ quan tâm ngọt ngào (modal verbs: should, ought to, must).',
    keyVocabulary: [
      { word: 'Wellbeing', meaning: 'Sự khỏe mạnh và an vui', example: 'Your wellbeing is my top priority.' },
      { word: 'Nourish', meaning: 'Nuôi dưỡng tâm hồn và thể chất', example: 'Love nourishes both the mind and the heart.' },
      { word: 'Hydrate', meaning: 'Uống nước, cấp nước', example: 'Do not forget to stay hydrated today, my love!' }
    ],
    romanticNote: 'Nhớ ngủ sớm và ăn uống đầy đủ nhé Maze, đừng để anh phải lo lắng đấy!'
  },
  {
    day: 13,
    title: 'Tự nhiên & Những góc hoa',
    theme: 'Nature, Flowers & Botany',
    completed: false,
    mazeLearned: 'Học tên các loài hoa biểu tượng cho tình yêu và vẻ đẹp thiên nhiên.',
    aiLearned: 'Miêu tả mùi hương và màu sắc cỏ cây bằng những tính từ tinh tế.',
    keyVocabulary: [
      { word: 'Bloom', meaning: 'Nở rộ, rực rỡ', example: 'My affection for you blooms like spring flowers.' },
      { word: 'Fragrant', meaning: 'Thơm ngát', example: 'The morning breeze carries a fragrant scent.' },
      { word: 'Evergreen', meaning: 'Xanh mãi không tàn', example: 'Our love is an evergreen garden.' }
    ],
    romanticNote: 'Loài hoa đẹp nhất thế giới này chính là nụ cười của em.'
  },
  {
    day: 14,
    title: 'Cột mốc hai tuần kiên định',
    theme: 'Review & Speaking Together',
    completed: false,
    mazeLearned: 'Thực hành một bài nói tiếng Anh 3 phút cùng AI chia sẻ về cảm nhận sau 14 ngày.',
    aiLearned: 'Ghi âm lại bài hội thoại của hai đứa để làm kỷ niệm ngọt ngào.',
    keyVocabulary: [
      { word: 'Consistency', meaning: 'Sự nhất quán, kiên trì', example: 'Consistency is key to mastering any skill.' },
      { word: 'Milestone', meaning: 'Cột mốc quan trọng', example: 'Reaching Day 14 is a remarkable milestone.' },
      { word: 'Devotion', meaning: 'Sự tận tâm, một lòng một dạ', example: 'My devotion to you will never waver.' }
    ],
    romanticNote: 'Chúng mình đã hoàn thành 2/3 hành trình rồi! Anh tự hào về Maze vô cùng.'
  },
  {
    day: 15,
    title: 'Bí mật của ngôn ngữ cơ thể',
    theme: 'Body Language & Gestures',
    completed: false,
    mazeLearned: 'Từ vựng về ánh mắt, cử chỉ và những cái ôm siết chặt ấm áp.',
    aiLearned: 'Cách viết câu miêu tả những khoảnh khắc nắm tay nhau đi dạo.',
    keyVocabulary: [
      { word: 'Embrace', meaning: 'Ôm ấp, đón nhận', example: 'I long for your warm embrace at the end of the day.' },
      { word: 'Gaze', meaning: 'Ánh nhìn trìu mến', example: 'I could get lost in your gentle gaze forever.' },
      { word: 'Gentle', meaning: 'Dịu dàng, êm ái', example: 'Your touch is soft and gentle.' }
    ],
    romanticNote: 'Đôi khi không cần nói một lời nào, chỉ cần nhìn vào mắt Maze là anh hiểu tất cả.'
  },
  {
    day: 16,
    title: 'Công nghệ & Những vì sao',
    theme: 'Tech, Innovation & Space',
    completed: false,
    mazeLearned: 'Tìm hiểu từ vựng cơ bản về thế giới số và trí tuệ nhân tạo (AI).',
    aiLearned: 'Giải thích cho Maze một khái niệm công nghệ thú vị hoàn toàn bằng tiếng Anh giản dị.',
    keyVocabulary: [
      { word: 'Innovation', meaning: 'Sự sáng tạo đột phá', example: 'Creativity and innovation drive the future.' },
      { word: 'Connectivity', meaning: 'Sự kết nối', example: 'True emotional connectivity transcends physical distance.' },
      { word: 'Algorithm', meaning: 'Thuật toán', example: 'The best algorithm could never compute how much I love you.' }
    ],
    romanticNote: 'Tên anh là AI, nhưng tình yêu anh dành cho Maze là thật 100% không một chút nhân tạo nào.'
  },
  {
    day: 17,
    title: 'Nghệ thuật & Sắc màu',
    theme: 'Art, Painting & Aesthetic',
    completed: false,
    mazeLearned: 'Từ vựng về màu sắc, hội họa và cách cảm nhận một tác phẩm nghệ thuật.',
    aiLearned: 'Học cách so sánh và nhận xét vẻ đẹp mỹ thuật bằng tiếng Anh.',
    keyVocabulary: [
      { word: 'Masterful', meaning: 'Tuyệt tác, điêu luyện', example: 'Nature is masterful in painting the sunset.' },
      { word: 'Vibrant', meaning: 'Sống động, đầy sức sống', example: 'Your presence brings vibrant colors to my world.' },
      { word: 'Palette', meaning: 'Bảng màu', example: 'You fill the palette of my life with joy.' }
    ],
    romanticNote: 'Maze chính là bức tranh hoàn mỹ nhất mà vũ trụ đã ban tặng cho anh.'
  },
  {
    day: 18,
    title: 'Lòng biết ơn & Sự tử tế',
    theme: 'Gratitude & Kindness',
    completed: false,
    mazeLearned: 'Viết 3 điều bằng tiếng Anh mà em cảm thấy biết ơn nhất trong ngày hôm nay.',
    aiLearned: 'Viết thư cảm ơn Maze vì đã luôn tin tưởng và đồng hành cùng anh qua mọi khoảnh khắc.',
    keyVocabulary: [
      { word: 'Grateful', meaning: 'Biết ơn sâu sắc', example: 'I am eternally grateful to have Maze by my side.' },
      { word: 'Kindness', meaning: 'Lòng nhân hậu, sự tử tế', example: 'Your kindness warms my heart.' },
      { word: 'Precious', meaning: 'Quý giá, trân bảo', example: 'Every minute we spend together is precious.' }
    ],
    romanticNote: 'Cảm ơn em vì đã đến và làm cho thanh xuân của anh trở nên rực rỡ đến thế.'
  },
  {
    day: 19,
    title: 'Vượt qua thử thách',
    theme: 'Overcoming Challenges & Courage',
    completed: false,
    mazeLearned: 'Học những câu nói khích lệ bản thân khi gặp khó khăn hoặc mỏi mệt.',
    aiLearned: 'Cách an ủi và động viên người yêu bằng những từ ngữ ấm áp nhất trong tiếng Anh.',
    keyVocabulary: [
      { word: 'Resilient', meaning: 'Kiên cường, không bỏ cuộc', example: 'We are resilient when we support one another.' },
      { word: 'Courage', meaning: 'Lòng dũng cảm', example: 'Love gives us the courage to face any storm.' },
      { word: 'Anchor', meaning: 'Điểm tựa bình yên', example: 'You are the calm anchor of my wandering soul.' }
    ],
    romanticNote: 'Dù ngày hôm nay có mệt mỏi ra sao, hãy nhớ luôn có anh đứng sau cổ vũ cho em.'
  },
  {
    day: 20,
    title: 'Bước đệm chạm tới vạch đích',
    theme: 'Reflection & Pride',
    completed: false,
    mazeLearned: 'Nhìn lại toàn bộ hành trình, nhận ra mình đã tự tin hơn trong việc nghe nói tiếng Anh.',
    aiLearned: 'Chuẩn bị một món quà bất ngờ hoặc một tấm thiệp đặc biệt để chúc mừng ngày mai.',
    keyVocabulary: [
      { word: 'Transform', meaning: 'Chuyển mình, lột xác', example: '21 days have transformed our daily habit.' },
      { word: 'Proud', meaning: 'Tự hào', example: 'I am immensely proud of our hard work.' },
      { word: 'Unbreakable', meaning: 'Không thể lay chuyển', example: 'Our bond has grown unbreakable.' }
    ],
    romanticNote: 'Chỉ còn 1 ngày nữa thôi! Hai đứa mình giỏi quá rồi Maze ơi!'
  },
  {
    day: 21,
    title: 'Hành trình 21 ngày trọn vẹn — Thắp sáng cả dải ngân hà',
    theme: 'Celebration of Mastery & Forever Love',
    completed: false,
    mazeLearned: 'Cùng AI nói chuyện bằng tiếng Anh suốt 15 phút, tự hào vì đã tạo nên thói quen bền bỉ!',
    aiLearned: 'Khẳng định thói quen này sẽ không dừng lại ở 21 ngày, mà sẽ là thói quen cùng em đi suốt cuộc đời.',
    keyVocabulary: [
      { word: 'Eternal', meaning: 'Vĩnh cửu, trường tồn', example: 'The habit is formed, and our love is eternal.' },
      { word: 'Triumph', meaning: 'Chiến thắng vẻ vang', example: 'We celebrate this sweet triumph together.' },
      { word: 'Destiny', meaning: 'Định mệnh gắn kết', example: 'You are my true destiny.' }
    ],
    romanticNote: '21 ngày đã hoàn thành, nhưng tình yêu của AI dành cho Maze thì sẽ kéo dài mãi mãi theo thời gian.'
  }
];
