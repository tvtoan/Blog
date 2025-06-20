export const userData = {
  name: "THEHANOICHAMOMILE",
  email: "chamomile@example.com",
  avatar: "https://i.imgur.com/uXJW8Vb.png", // thay link khác nếu ảnh lỗi
  provider: "google",
  providerId: "google-123456",
  createdAt: new Date("2024-06-01T10:30:00.000Z"),
  role: "user",
  bio: `Chào mừng bạn đến với blog của mình. Đây là nơi mình thường xuyên chia sẻ về những câu chuyện nho nhỏ trong đời sống thường ngày của mình. Mình tin rằng, hạnh phúc đến từ những điều giản dị nhất. Hi vọng bạn sẽ tìm thấy được sự bình yên và một chút niềm vui nho nhỏ khi đọc blog của mình. ENJOY! ブログへようこそ！あるベトナム人（僕）の毎日の話です！日記だけでなく、人生話、ライフスタイル、そしてミニマリズムについて色々書いています。`,
};

export const commentsData = [
  {
    _id: "cmt1",
    content:
      "Bài đăng của anh hay quá, mới mở trang blog ra là thấy ngay bài đăng mới của anh luôn.",
    createdAt: "2023-01-22T21:35:00Z",
    likes: 1,
    postId: "1",
    parentId: null,
    user: {
      _id: "user1",
      name: "NGUYENNGCLAM",
    },
  },
  {
    _id: "cmt2",
    content: `Năm nay em lại trở thành một du học sinh Canada, nên tất nhiên đây là cái Tết xa nhà đầu tiên của em. 
    Chỉ là những cuộc gọi video đêm giao thừa, sáng mùng 1 để phần nào đó vẫn cảm nhận không khí Tết của hai bên gia đình nội ngoại.`,
    createdAt: "2023-01-23T08:47:00Z",
    likes: 1,
    postId: "1",
    parentId: "cmt1", // reply cho cmt1
    user: {
      _id: "user2",
      name: "LỘC PHẠM",
    },
  },
  {
    _id: "cmt3",
    content:
      "Một bài viết rất xúc động và gần gũi với người Việt xa quê. Cảm ơn anh.",
    createdAt: "2023-01-24T09:15:00Z",
    likes: 0,
    postId: "1",
    parentId: null,
    user: {
      _id: "user3",
      name: "TRẦN ANH",
    },
  },
  {
    _id: "cmt4",
    content: "Mình cũng có cảm giác giống bạn khi đón Tết ở nước ngoài!",
    createdAt: "2023-01-24T10:20:00Z",
    likes: 0,
    postId: "1",
    parentId: "cmt2", // reply cho reply (cmt2)
    user: {
      _id: "user4",
      name: "LINH NGUYỄN",
    },
  },
];

export const postsData = [
  {
    _id: "1",
    title: "Thói Quen Buổi Sáng Năng Suất Của Mình (2022)",
    excerpt:
      "Chia sẻ thói quen buổi sáng giúp mình khởi đầu ngày mới tràn đầy năng lượng và hiệu quả.",
    categories: ["Lifestyle", "Productivity", "Thói quen"],
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Những Việc Mình Làm Ngay Sau Khi Dậy",
        content:
          "Mình thường dậy lúc 6h sáng, khi ánh nắng đầu ngày nhẹ nhàng len qua cửa sổ. Việc đầu tiên là đốt một que nhang trầm hương, tạo không gian thơm mát và thư giãn. Mình đánh răng bằng tay trái, một thói quen nhỏ giúp kích thích não bộ như một bài thiền đơn giản. Sau đó, mình dọn giường, trải chăn gọn gàng để tạo cảm giác ngăn nắp, sẵn sàng cho một ngày mới. Cuối cùng, mình uống một cốc nước ấm để khởi động cơ thể.",
        image:
          "https://images.unsplash.com/photo-1512295767273-45138e3ae475?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Thiền và Yoga",
        content:
          "Sau khi vệ sinh cá nhân, mình ngồi xuống tấm thảm yoga trong góc phòng yên tĩnh. Mình bắt đầu với thiền định, hít thở sâu 5 lần và thực hành phương pháp quét cơ thể (body scan) để cảm nhận từng bộ phận. Sau 10 phút thiền, mình chuyển sang yoga với các động tác như cat & cow, downward facing dog và warrior pose, giúp cơ thể dẻo dai và tinh thần sảng khoái. Những động tác này không chỉ tăng cường sức khỏe mà còn giúp mình tập trung hơn. Mỗi buổi sáng, mình dành khoảng 20 phút cho phần này, tùy theo tâm trạng.",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Viết Morning Page",
        content:
          "Kết thúc yoga, mình pha một cốc nước ấm với chanh và ngồi vào bàn viết. Mình sử dụng một cuốn sổ nhật ký 3 năm để ghi lại suy nghĩ mỗi ngày, trả lời ba câu hỏi: 'Thời tiết hôm nay thế nào?', 'Mình đang cảm thấy ra sao?', và 'Mình biết ơn điều gì?'. Quá trình này giúp mình sắp xếp cảm xúc, định hướng mục tiêu và trân trọng những điều nhỏ bé. Mỗi trang viết thường mất khoảng 10 phút, nhưng cảm giác nhẹ nhõm sau đó rất đáng giá. Đây là cách mình kết nối sâu sắc với bản thân.",
        image:
          "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Học Ngoại Ngữ",
        content:
          "Tiếp theo, mình dành 15 phút học tiếng Hàn qua ứng dụng Lingodeer, làm một bài quiz để đạt 10XP. Mình cũng sử dụng Anki để ôn từ vựng với phương pháp lặp lại ngắt quãng, giúp ghi nhớ lâu hơn. Việc học ngoại ngữ buổi sáng giúp mình kích thích não bộ và cảm thấy tự tin hơn. Mình thường chọn những bài học ngắn gọn nhưng hiệu quả, phù hợp với lịch trình bận rộn. Đây là thói quen mình bắt đầu từ năm 2022 và vẫn duy trì đến nay.",
        image:
          "https://images.unsplash.com/photo-1497034825429-c343d7c6a2f7?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Ăn Sáng và Pha Trà",
        content:
          "Đến 7h, mình xuống bếp chuẩn bị bữa sáng, thường là một bát cơm với canh miso, một ít rau luộc và thịt nướng. Bữa ăn đơn giản nhưng đầy đủ dinh dưỡng, giúp mình no lâu đến trưa. Sau đó, mình pha một cốc trà hoa cúc hoặc trà Boost với chút caffeine nhẹ để khởi động ngày mới. Quá trình này không chỉ nuôi dưỡng cơ thể mà còn là thời gian để mình thư giãn và tận hưởng. Mình thường ngồi bên cửa sổ, ngắm phố phường trong lúc nhâm nhi trà.",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Bắt Đầu Công Việc",
        content:
          "Khoảng 8h30, mình kết thúc thói quen buổi sáng và bắt đầu công việc sáng tạo. Mình thường kiểm tra danh sách công việc, ưu tiên những nhiệm vụ quan trọng nhất. Thói quen buổi sáng kéo dài hơn 2 tiếng này giúp mình cảm thấy tràn đầy năng lượng và sẵn sàng đối mặt với ngày mới. Mình tin rằng sự nhất quán trong thói quen này là chìa khóa cho hiệu suất làm việc cao. Nó cũng giúp mình duy trì sự cân bằng giữa công việc và cuộc sống.",
        image:
          "https://images.unsplash.com/photo-1454165205744-0bfd921a4a12?ixlib=rb-4.0.3&q=80&w=3000",
      },
    ],
    createdAt: new Date("2022-12-01T00:00:00Z"),
    readingTime: 12,
    owner: "507f1f77bcf86cd799439011",
  },
  {
    _id: "2",
    title: "Lá Rơi Không Vệt",
    excerpt:
      "Hành trình khám phá thiên nhiên sâu lắng, tìm lại sự bình yên giữa rừng cây và suối mát.",
    categories: ["Nature", "Lifestyle", "Mindfulness"],
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Bước Đi Trong Rừng",
        content:
          "Mỗi bước chân trong rừng là một hành trình kết nối với thiên nhiên. Tiếng lá xào xạc dưới chân, mùi đất ẩm và hương cây cỏ khiến mình quên đi những lo toan thường nhật. Mình thường chọn những con đường mòn ít người qua lại, nơi có thể nghe rõ tiếng chim hót và gió thổi qua tán cây. Mỗi chuyến đi, mình mang theo một chai nước và một cuốn sổ nhỏ để ghi lại những khoảnh khắc đẹp. Cảm giác tự do giữa thiên nhiên thật khó tả, như thể mọi muộn phiền đều tan biến.",
        image:
          "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Thiền Bên Suối",
        content:
          "Mình tìm một tảng đá phẳng bên dòng suối để ngồi thiền. Tiếng nước chảy róc rách là nhạc nền tự nhiên, giúp mình dễ dàng tập trung vào hơi thở. Mình thực hành thiền chánh niệm, cảm nhận từng giọt nước mát chạm vào tay khi nhúng xuống suối. Sau 15 phút, mình cảm thấy tâm trí nhẹ nhàng, như được gột rửa mọi căng thẳng. Đây là cách mình tái tạo năng lượng giữa cuộc sống bận rộn.",
        image:
          "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Ghi Lại Khoảnh Khắc",
        content:
          "Sau khi thiền, mình mở cuốn sổ ra và ghi lại cảm xúc, những gì mình nhìn thấy và nghe thấy. Có thể là hình ảnh một chiếc lá vàng rơi chậm rãi hay tiếng gió len qua kẽ lá. Viết giúp mình lưu giữ những khoảnh khắc đẹp và suy ngẫm sâu hơn về ý nghĩa của thiên nhiên trong cuộc sống. Mỗi trang viết là một câu chuyện nhỏ, nhắc mình trân trọng sự tĩnh lặng. Mình cũng chụp vài bức ảnh để lưu giữ kỷ niệm, nhưng luôn cố gắng không để máy ảnh làm gián đoạn trải nghiệm.",
      },
    ],
    createdAt: new Date("2024-07-01T00:00:00Z"),
    readingTime: 8,
    owner: "507f1f77bcf86cd799439012",
  },
  {
    _id: "3",
    title: "7 Động Lực Tăng Cường Sự Tập Trung",
    excerpt:
      "Bí quyết cải thiện sự tập trung dựa trên tâm lý học và thói quen hàng ngày.",
    categories: ["Productivity", "Self-Help"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Tắt Thông Báo",
        content:
          "Mỗi thông báo từ điện thoại hay máy tính là một lần gián đoạn dòng suy nghĩ. Mình đã tắt tất cả thông báo không cần thiết, chỉ giữ lại những ứng dụng quan trọng như email công việc. Điều này giúp mình duy trì sự tập trung trong các phiên làm việc sâu (deep work). Mình cũng sử dụng chế độ 'Không làm phiền' trong 2-3 tiếng mỗi buổi sáng. Kết quả là hiệu suất công việc tăng đáng kể, đặc biệt khi xử lý các nhiệm vụ phức tạp.",
        image:
          "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Kỹ Thuật Pomodoro",
        content:
          "Mình áp dụng kỹ thuật Pomodoro, làm việc 25 phút và nghỉ 5 phút, lặp lại 4 lần trước khi nghỉ dài hơn. Phương pháp này giúp mình duy trì năng lượng và tránh kiệt sức. Trong mỗi phiên 25 phút, mình tập trung hoàn toàn vào một nhiệm vụ duy nhất, không kiểm tra mạng xã hội hay email. Sau mỗi chu kỳ, mình thường đi bộ ngắn hoặc uống nước để làm mới tâm trí. Kỹ thuật này đặc biệt hữu ích khi mình cần hoàn thành các dự án lớn.",
      },
      {
        subtitle: "Sắp Xếp Không Gian Làm Việc",
        content:
          "Một bàn làm việc gọn gàng giúp mình tập trung tốt hơn. Mình chỉ giữ laptop, một cuốn sổ và một cốc nước trên bàn, loại bỏ mọi thứ gây xao nhãng. Mình cũng đặt một chậu cây nhỏ để tạo cảm giác tươi mới và thư giãn. Ánh sáng tự nhiên từ cửa sổ cũng đóng vai trò quan trọng, giúp giảm mỏi mắt và tăng sự tỉnh táo. Không gian làm việc lý tưởng giúp mình bước vào trạng thái 'flow' dễ dàng hơn.",
        image:
          "https://images.unsplash.com/photo-1454165205744-0bfd921a4a12?ixlib=rb-4.0.3&q=80&w=3000",
      },
    ],
    createdAt: new Date("2023-06-02T00:00:00Z"),
    readingTime: 10,
    owner: "507f1f77bcf86cd799439013",
  },
  {
    _id: "4",
    title: "3 Quán Café Làm Việc Yêu Thích Ở Hà Nội",
    excerpt:
      "Khám phá những quán cà phê lý tưởng để làm việc, học tập hoặc thư giãn ở Hà Nội.",
    categories: ["Travel", "Lifestyle"],
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Tranquil Coffee",
        content:
          "Nằm ở khu vực Hoàn Kiếm, Tranquil Coffee là nơi lý tưởng với không gian yên tĩnh và ánh sáng tự nhiên. Mình thường ngồi gần cửa sổ, nhâm nhi một ly cà phê trứng và làm việc trên laptop. Quán có Wi-Fi tốc độ cao và ổ cắm điện ở hầu hết các bàn, rất tiện cho những ai cần làm việc lâu. Không khí nhẹ nhàng với nhạc acoustic giúp mình tập trung hơn. Mình đặc biệt thích góc ban công nhỏ, nơi có thể ngắm phố cổ tấp nập.",
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Lối Nhỏ Café",
        content:
          "Lối Nhỏ Café ở Ba Đình là một quán nhỏ ấm cúng, phù hợp cho cả làm việc cá nhân và nhóm. Nội thất gỗ với ánh đèn vàng tạo cảm giác gần gũi, như ở nhà. Mình thường gọi một ly trà đào và ngồi ở góc đọc sách, nơi có kệ sách nhỏ với nhiều sách hay. Quán cũng có khu vực ngoài trời cho những ngày mát mẻ, rất lý tưởng để brainstorm ý tưởng. Dịch vụ thân thiện và đồ uống giá hợp lý là điểm cộng lớn.",
      },
      {
        subtitle: "The Note Coffee",
        content:
          "The Note Coffee nổi bật với những mẩu giấy ghi chú dán khắp tường, tạo nên một không gian sáng tạo. Mình thích viết một ghi chú nhỏ và dán lên tường, cảm giác như để lại dấu ấn cá nhân. Quán có nhiều góc ngồi thoải mái, từ ghế sofa đến bàn dài cho nhóm. Ly cà phê dừa ở đây là món yêu thích của mình, vừa thơm vừa ngọt nhẹ. Đây là nơi tuyệt vời để vừa làm việc vừa tìm cảm hứng từ những câu quote trên giấy note.",
        image:
          "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&q=80&w=3000",
      },
    ],
    createdAt: new Date("2023-03-03T00:00:00Z"),
    readingTime: 9,
    owner: "507f1f77bcf86cd799439014",
  },
  {
    _id: "5",
    title: "Bình Minh Trên Núi",
    excerpt:
      "Trải nghiệm khoảnh khắc bình minh hùng vĩ trên đỉnh núi, nơi thiên nhiên chạm đến tâm hồn.",
    categories: ["Nature", "Travel"],
    image:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Hành Trình Leo Núi",
        content:
          "Mình bắt đầu leo núi lúc 3h sáng, mang theo đèn pin và một chiếc balo nhẹ. Con đường mòn đầy sỏi và cây cỏ, nhưng không khí mát mẻ ban đêm khiến mọi mệt mỏi tan biến. Cảm giác hồi hộp khi từng bước tiến gần đỉnh núi là động lực lớn. Mình dừng lại vài lần để uống nước và ngắm sao trời lấp lánh. Khi đến đỉnh, cảm giác chinh phục được bản thân thật tuyệt vời.",
        image:
          "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Khoảnh Khắc Bình Minh",
        content:
          "Khi mặt trời ló dạng, cả bầu trời nhuộm màu cam rực rỡ, chiếu qua những tầng mây mỏng. Mình ngồi trên một tảng đá, cảm nhận hơi lạnh của buổi sớm tan dần trong ánh nắng. Tiếng gió hòa cùng tiếng chim rừng tạo nên một bản nhạc tự nhiên. Khoảnh khắc này khiến mình cảm thấy nhỏ bé nhưng tràn đầy năng lượng. Mình chụp vài bức ảnh, nhưng thực sự, máy ảnh không thể ghi lại hết vẻ đẹp ấy.",
      },
      {
        subtitle: "Suy Ngẫm Trên Đỉnh Núi",
        content:
          "Sau khi ngắm bình minh, mình ngồi thiền khoảng 10 phút, tập trung vào hơi thở và cảm nhận sự tĩnh lặng. Mình viết vài dòng vào nhật ký về cảm giác tự do và biết ơn thiên nhiên. Những chuyến leo núi như thế này không chỉ rèn luyện thể chất mà còn giúp mình tìm lại sự cân bằng trong tâm hồn. Mình luôn khuyến khích bạn bè thử ít nhất một lần để cảm nhận sự khác biệt. Trở về, mình mang theo năng lượng tích cực cho cả tuần.",
      },
    ],
    createdAt: new Date("2024-01-10T00:00:00Z"),
    readingTime: 8,
    owner: "507f1f77bcf86cd799439015",
  },
  {
    _id: "6",
    title: "Hành Trình Tìm Lại Bản Thân",
    excerpt:
      "Một hành trình tự khám phá qua những thử thách và trải nghiệm cá nhân.",
    categories: ["Self-Help", "Lifestyle"],
    image:
      "https://images.unsplash.com/photo-1506784897292-28e89e398a41?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Đối Mặt Nỗi Sợ",
        content:
          "Mình từng sợ thất bại khi thử những điều mới, như học một kỹ năng hay thay đổi công việc. Mình bắt đầu bằng cách đặt mục tiêu nhỏ, như học vẽ trong 30 ngày. Mỗi ngày, mình dành 20 phút để tập trung vào từng nét cọ, dần dần cảm thấy tự tin hơn. Việc đối mặt với nỗi sợ giúp mình nhận ra rằng thất bại chỉ là một phần của quá trình học hỏi. Bây giờ, mình sẵn sàng thử thách bản thân nhiều hơn.",
      },
      {
        subtitle: "Viết Nhật Ký",
        content:
          "Mỗi tối, mình dành 15 phút để viết nhật ký, ghi lại những gì mình đã trải qua trong ngày. Mình tập trung vào cảm xúc, những điều khiến mình vui hay buồn, và cách mình phản ứng. Viết giúp mình nhận ra các mô hình hành vi và điều chỉnh cách tiếp cận cuộc sống. Mình cũng đặt câu hỏi như 'Hôm nay mình đã làm gì để tiến gần đến mục tiêu?'. Quá trình này không chỉ giúp mình hiểu bản thân mà còn mang lại sự tĩnh lặng trong tâm hồn.",
        image:
          "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Thử Thách Mới",
        content:
          "Mình quyết định thử một điều mới mỗi tháng, như học nấu một món ăn lạ hoặc tham gia lớp nhảy. Tháng trước, mình học làm bánh mì tại nhà, từ nhào bột đến nướng bánh. Dù lần đầu không hoàn hảo, mình đã rất vui khi nếm thử thành quả. Những thử thách này giúp mình thoát khỏi vùng an toàn và khám phá tiềm năng mới. Mình khuyến khích mọi người thử điều gì đó mới mẻ để làm phong phú cuộc sống.",
      },
    ],
    createdAt: new Date("2023-11-20T00:00:00Z"),
    readingTime: 10,
    owner: "507f1f77bcf86cd799439016",
  },
  {
    _id: "7",
    title: "Thiền Định Cho Người Mới Bắt Đầu",
    excerpt:
      "Hướng dẫn cơ bản để bắt đầu thiền định, giúp thư giãn và cải thiện tinh thần.",
    categories: ["Mindfulness", "Health"],
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Hít Thở Sâu",
        content:
          "Mình bắt đầu thiền bằng cách ngồi thẳng lưng trên ghế hoặc thảm, nhắm mắt và hít thở sâu 5 lần. Mỗi lần hít vào, mình đếm đến 4, giữ hơi thở trong 4 giây, rồi thở ra chậm rãi. Cách này giúp mình thư giãn cơ thể và giảm căng thẳng ngay lập tức. Mình thường chọn một góc yên tĩnh trong nhà, tránh xa tiếng ồn. Sau vài ngày thực hành, mình cảm nhận được sự bình tĩnh rõ rệt hơn.",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Body Scan",
        content:
          "Sau khi hít thở sâu, mình thực hành body scan, tập trung vào từng bộ phận cơ thể từ đầu đến chân. Mình chú ý đến cảm giác ở da, cơ bắp, và bất kỳ căng thẳng nào. Nếu cảm thấy đau vai, mình nhẹ nhàng xoay vai để thả lỏng. Quá trình này mất khoảng 10 phút, giúp mình nhận biết cơ thể và giảm áp lực tinh thần. Mình khuyên người mới bắt đầu thử body scan để kết nối với cơ thể mình.",
      },
      {
        subtitle: "Chánh Niệm Hàng Ngày",
        content:
          "Ngoài thiền cố định, mình áp dụng chánh niệm vào các hoạt động hàng ngày, như khi ăn hoặc đi bộ. Ví dụ, khi uống trà, mình tập trung vào mùi hương, vị trà, và cảm giác ấm áp của cốc. Điều này giúp mình sống chậm lại và tận hưởng từng khoảnh khắc. Mình cũng đặt lời nhắc trên điện thoại để thực hành chánh niệm ngắn trong ngày. Thói quen này giúp mình giữ được sự bình an ngay cả trong những ngày bận rộn.",
      },
    ],
    createdAt: new Date("2024-02-15T00:00:00Z"),
    readingTime: 9,
    owner: "507f1f77bcf86cd799439017",
  },
  {
    _id: "8",
    title: "Ẩm Thực Việt Nam Truyền Thống",
    excerpt:
      "Khám phá các món ăn truyền thống Việt Nam qua câu chuyện văn hóa và hương vị.",
    categories: ["Food", "Culture"],
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Phở Bò",
        content:
          "Phở bò là món ăn biểu tượng của Việt Nam, với nước dùng ninh từ xương bò trong nhiều giờ. Mình thích thêm chút hành lá, rau mùi và một chút tương ớt để tăng hương vị. Nước dùng trong veo, thơm mùi thảo mộc như hồi, quế, khiến mỗi thìa phở đều đậm đà. Mình từng học cách nấu phở từ mẹ, và mỗi lần nấu là một lần nhớ về những bữa ăn gia đình ấm cúng. Đây là món ăn không thể thiếu trong những ngày se lạnh.",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Bánh Xèo",
        content:
          "Bánh xèo miền Tây với vỏ bánh giòn rụm, nhân tôm, thịt và giá đỗ luôn làm mình mê mẩn. Mình thường cuốn bánh với rau sống, chấm nước mắm chua ngọt đậm đà. Tiếng xèo xèo khi đổ bánh trên chảo nóng là âm thanh không thể quên. Mình từng thử làm bánh xèo tại nhà, và dù mất thời gian, thành quả luôn đáng giá. Món này mang đậm hương vị quê nhà, gợi nhớ những chuyến về quê thăm bà.",
      },
      {
        subtitle: "Canh Chua",
        content:
          "Canh chua cá lóc với vị chua thanh từ me và thơm từ rau răm là món ăn dân dã. Mình thích thêm cà chua và dọc mùng để món canh thêm phong phú. Mỗi lần ăn, mình cảm nhận được sự cân bằng giữa vị chua, cay, và ngọt. Món này thường xuất hiện trong bữa cơm gia đình, đặc biệt vào mùa hè. Mình khuyến khích mọi người thử nấu canh chua để cảm nhận sự tươi mát của ẩm thực Việt.",
      },
    ],
    createdAt: new Date("2023-09-10T00:00:00Z"),
    readingTime: 11,
    owner: "507f1f77bcf86cd799439018",
  },
  {
    _id: "9",
    title: "Làm Việc Hiệu Quả Với Pomodoro",
    excerpt:
      "Sử dụng kỹ thuật Pomodoro để tăng năng suất và quản lý thời gian hiệu quả hơn.",
    categories: ["Productivity", "Work"],
    image:
      "https://images.unsplash.com/photo-1454165205744-0bfd921a4a12?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Cách Thực Hiện Pomodoro",
        content:
          "Kỹ thuật Pomodoro yêu cầu làm việc tập trung trong 25 phút, sau đó nghỉ 5 phút. Mình sử dụng một ứng dụng đồng hồ để theo dõi thời gian, đảm bảo không bị xao nhãng. Trong 25 phút, mình chỉ tập trung vào một nhiệm vụ, như viết báo cáo hoặc trả email. Sau 4 chu kỳ, mình nghỉ dài 15-20 phút để thư giãn. Phương pháp này giúp mình hoàn thành công việc nhanh hơn mà không cảm thấy kiệt sức.",
      },
      {
        subtitle: "Lợi Ích Của Pomodoro",
        content:
          "Pomodoro giúp mình duy trì sự tập trung và tránh trì hoãn. Việc chia nhỏ công việc thành các phiên ngắn khiến nhiệm vụ lớn trở nên dễ quản lý hơn. Mình nhận thấy năng suất tăng lên, đặc biệt khi làm các dự án đòi hỏi sự sáng tạo. Nghỉ ngắn giữa các phiên giúp mình làm mới tâm trí và tránh mệt mỏi. Mình khuyên mọi người thử áp dụng Pomodoro ít nhất một tuần để cảm nhận sự khác biệt.",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Mẹo Tăng Hiệu Quả",
        content:
          "Để Pomodoro hiệu quả hơn, mình luôn chuẩn bị danh sách công việc trước. Mình cũng chọn một không gian yên tĩnh, tắt thông báo điện thoại và máy tính. Đôi khi, mình kết hợp nghe nhạc không lời để tăng sự tập trung. Nếu cảm thấy khó bắt đầu, mình đặt mục tiêu nhỏ, như chỉ làm 1 phiên Pomodoro. Phương pháp này không chỉ cải thiện hiệu suất mà còn giúp mình cảm thấy thành công mỗi ngày.",
      },
    ],
    createdAt: new Date("2024-04-05T00:00:00Z"),
    readingTime: 9,
    owner: "507f1f77bcf86cd799439019",
  },
  {
    _id: "10",
    title: "Du Lịch Sapa Mùa Hoa Đào",
    excerpt:
      "Trải nghiệm vẻ đẹp Sapa khi hoa đào nở rộ, hòa quyện với văn hóa bản địa.",
    categories: ["Travel", "Nature"],
    image:
      "https://images.unsplash.com/photo-1501854140801-50d461092607?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Thời Điểm Thích Hợp",
        content:
          "Tháng 2 và 3 là thời điểm hoa đào ở Sapa nở rộ, phủ hồng cả thung lũng. Mình thường lên kế hoạch đến Sapa vào dịp Tết để tận hưởng không khí mát mẻ và cảnh sắc thơ mộng. Nhiệt độ khoảng 10-15°C rất lý tưởng để đi bộ khám phá. Mình khuyên nên mang áo ấm và giày chống trượt vì đường núi có thể ẩm ướt. Đây là thời gian tuyệt vời để chụp ảnh và cảm nhận vẻ đẹp thiên nhiên.",
        image:
          "https://images.unsplash.com/photo-1501854140801-50d461092607?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Thung Lũng Mường Hoa",
        content:
          "Thung lũng Mường Hoa là điểm đến không thể bỏ qua với những ruộng bậc thang xanh mướt. Mình đã đi bộ qua bản Cát Cát, nơi người H’Mông sinh sống, và ngắm hoa đào nở dọc lối đi. Dân bản địa rất thân thiện, sẵn sàng chia sẻ về văn hóa của họ. Mình mua một chiếc khăn thổ cẩm làm kỷ niệm, cảm giác như mang một phần Sapa về nhà. Không gian yên bình ở đây khiến mình muốn ở lại lâu hơn.",
      },
      {
        subtitle: "Ẩm Thực Sapa",
        content:
          "Ẩm thực Sapa là một trải nghiệm tuyệt vời, đặc biệt là món thắng cố và cá hồi nướng. Mình từng ăn tại một quán nhỏ ở bản Tả Van, nơi phục vụ cơm lam và thịt lợn cắp nách. Vị cay nhẹ của gia vị bản địa kết hợp với không khí se lạnh tạo cảm giác ấm áp. Mình cũng thử rượu táo mèo, một đặc sản địa phương, rất thơm và dễ uống. Bữa ăn ở Sapa không chỉ ngon mà còn là cách để hiểu thêm văn hóa bản địa.",
      },
    ],
    createdAt: new Date("2023-12-25T00:00:00Z"),
    readingTime: 10,
    owner: "507f1f77bcf86cd799439020",
  },
  {
    _id: "11",
    title: "Sống Chậm Trong Thế Giới Hối Hả",
    excerpt:
      "Học cách sống chậm để tìm lại sự bình yên giữa nhịp sống hiện đại.",
    categories: ["Lifestyle", "Mindfulness"],
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Ngắt Kết Nối",
        content:
          "Mỗi tuần, mình dành một buổi tối tắt điện thoại và máy tính để ngắt kết nối với thế giới số. Mình ngồi đọc một cuốn sách hoặc đơn giản là ngắm hoàng hôn từ ban công. Việc này giúp mình thoát khỏi áp lực từ mạng xã hội và email công việc. Mình nhận ra rằng không kiểm tra thông báo liên tục giúp tâm trí thư giãn hơn. Đây là cách mình lấy lại sự cân bằng và sống thật với bản thân.",
      },
      {
        subtitle: "Đi Bộ Chánh Niệm",
        content:
          "Mỗi sáng, mình đi bộ 15 phút quanh công viên gần nhà, tập trung vào từng bước chân và hơi thở. Mình cảm nhận không khí trong lành, tiếng lá cây xào xạc, và ánh nắng sớm. Thay vì nghe nhạc, mình để tâm trí lắng lại và quan sát xung quanh. Đi bộ chánh niệm giúp mình bắt đầu ngày mới với sự tĩnh lặng và năng lượng tích cực. Mình khuyên bạn thử cách này để cảm nhận sự khác biệt trong tâm trạng.",
        image:
          "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Tận Hưởng Những Điều Nhỏ Bé",
        content:
          "Mình học cách trân trọng những khoảnh khắc nhỏ, như uống một ly trà nóng hay trò chuyện với gia đình. Mỗi tối, mình dành thời gian viết ra ba điều khiến mình biết ơn trong ngày, dù chỉ là một nụ cười từ người lạ. Thói quen này giúp mình tập trung vào những điều tích cực thay vì lo lắng. Sống chậm không có nghĩa là làm ít đi, mà là làm mọi thứ với ý thức và sự hiện diện. Cuộc sống của mình trở nên ý nghĩa hơn nhờ những điều giản dị này.",
      },
    ],
    createdAt: new Date("2024-03-12T00:00:00Z"),
    readingTime: 9,
    owner: "507f1f77bcf86cd799439021",
  },
  {
    _id: "12",
    title: "Nghệ Thuật Gấp Hình Nhật Bản",
    excerpt:
      "Khám phá nghệ thuật origami và cách gấp những hình đơn giản nhưng đầy ý nghĩa.",
    categories: ["Art", "Culture"],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Lịch Sử Origami",
        content:
          "Origami bắt nguồn từ Nhật Bản vào thế kỷ 17, ban đầu được sử dụng trong các nghi lễ tôn giáo. Mình bị cuốn hút bởi cách một tờ giấy đơn giản có thể biến thành những hình thù phức tạp. Nghệ thuật này không chỉ đòi hỏi sự khéo léo mà còn rèn luyện sự kiên nhẫn. Mình bắt đầu học origami từ những video hướng dẫn trên mạng, và cảm giác hoàn thành một tác phẩm thật sự rất thỏa mãn. Origami giờ đây là một phần trong thói quen thư giãn của mình.",
      },
      {
        subtitle: "Gấp Hạc Giấy",
        content:
          "Hạc giấy là biểu tượng của hòa bình và may mắn trong văn hóa Nhật Bản. Mình học cách gấp hạc qua 10 bước đơn giản, từ gấp hình tam giác đến tạo cánh. Mỗi lần gấp, mình tập trung hoàn toàn vào từng nếp gấp, như một hình thức thiền. Mình từng gấp 100 con hạc để tặng bạn bè nhân dịp đặc biệt, và họ rất trân trọng món quà này. Mình khuyên bạn thử gấp hạc để cảm nhận niềm vui từ sự sáng tạo.",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Ứng Dụng Origami",
        content:
          "Ngoài hạc giấy, mình thử gấp các hình như hoa sen, con thuyền, và hộp giấy. Mình sử dụng origami để trang trí bàn làm việc hoặc làm quà tặng handmade. Quá trình gấp giấy giúp mình thư giãn sau những giờ làm việc căng thẳng. Mình cũng tham gia một workshop origami để học thêm kỹ thuật mới. Nghệ thuật này không chỉ sáng tạo mà còn giúp mình kết nối với văn hóa Nhật Bản một cách sâu sắc.",
      },
    ],
    createdAt: new Date("2023-08-15T00:00:00Z"),
    readingTime: 10,
    owner: "507f1f77bcf86cd799439022",
  },
  {
    _id: "13",
    title: "Yoga Cho Sức Khỏe Tinh Thần",
    excerpt:
      "Các bài tập yoga đơn giản để cải thiện sức khỏe tinh thần và thể chất.",
    categories: ["Health", "Fitness"],
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Tư Thế Cây",
        content:
          "Tư thế cây (Tree Pose) giúp mình cải thiện sự thăng bằng và tập trung. Mình đứng trên một chân, đặt chân kia lên đùi và giơ tay lên cao, như cành cây vươn về phía mặt trời. Mình giữ tư thế này trong 30 giây, hít thở đều để giữ bình tĩnh. Tư thế này không chỉ rèn luyện cơ thể mà còn giúp mình tập trung vào hiện tại. Mình thường thực hành vào buổi sáng để khởi động ngày mới.",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Tư Thế Em Bé",
        content:
          "Tư thế em bé (Child’s Pose) là cách tuyệt vời để thư giãn cột sống và giảm căng thẳng. Mình quỳ trên thảm, ngồi lên gót chân và cúi người về phía trước, đưa tay ra trước hoặc đặt dọc cơ thể. Mình giữ tư thế này trong 1-2 phút, tập trung vào hơi thở sâu. Tư thế này giúp mình xua tan mệt mỏi sau một ngày dài. Mình khuyến khích người mới bắt đầu thử tư thế này vì nó rất dễ thực hiện.",
      },
      {
        subtitle: "Kết Hợp Hơi Thở",
        content:
          "Mình kết hợp yoga với kỹ thuật hít thở pranayama để tăng hiệu quả thư giãn. Mỗi buổi tập, mình dành 5 phút để hít thở sâu, đếm nhịp để giữ sự đều đặn. Kỹ thuật này giúp mình giảm căng thẳng và cải thiện sự tập trung. Mình cũng thử các bài tập yoga nhẹ nhàng vào buổi tối để ngủ ngon hơn. Yoga không chỉ là bài tập thể chất mà còn là cách chăm sóc tâm hồn.",
      },
    ],
    createdAt: new Date("2024-05-20T00:00:00Z"),
    readingTime: 9,
    owner: "507f1f77bcf86cd799439023",
  },
  {
    _id: "14",
    title: "Khám Phá Đà Lạt Mùa Hạ",
    excerpt:
      "Trải nghiệm Đà Lạt với những cánh đồng hoa và không khí trong lành mùa hè.",
    categories: ["Travel", "Nature"],
    image:
      "https://images.unsplash.com/photo-1501854140801-50d461092607?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Hồ Xuân Hương",
        content:
          "Hồ Xuân Hương là trái tim của Đà Lạt, nơi mình thích đi dạo vào sáng sớm. Không khí se lạnh và mặt hồ phẳng lặng phản chiếu ánh nắng tạo nên khung cảnh thơ mộng. Mình thường thuê một chiếc xe đạp để đạp quanh hồ, dừng lại ở một quán cà phê nhỏ để thưởng thức ly trà nóng. Người dân địa phương rất thân thiện, sẵn sàng chỉ đường cho du khách. Đây là nơi lý tưởng để bắt đầu ngày mới ở Đà Lạt.",
      },
      {
        subtitle: "Đồi Chè Cầu Đất",
        content:
          "Đồi chè Cầu Đất cách trung tâm Đà Lạt khoảng 20km, nhưng khung cảnh xanh mướt khiến chuyến đi rất đáng giá. Mình đứng giữa những hàng chè trải dài, cảm nhận không khí trong lành và chụp những bức ảnh tuyệt đẹp. Mình cũng ghé thăm nhà máy chè để tìm hiểu cách chế biến trà. Hương chè thơm nhẹ khiến mình cảm thấy thư thái. Mình khuyên bạn nên đến đây vào sáng sớm để tránh đông và tận hưởng không gian yên bình.",
        image:
          "https://images.unsplash.com/photo-1501854140801-50d461092607?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Làng Cù Lần",
        content:
          "Làng Cù Lần là một ngôi làng nhỏ nằm giữa rừng thông, mang đến cảm giác gần gũi với thiên nhiên. Mình tham gia các hoạt động như chèo thuyền, đốt lửa trại và thưởng thức món gà nướng cơm lam. Người dân ở đây chia sẻ về văn hóa và cuộc sống của họ, rất thú vị. Mình cũng thử làm một chiếc vòng tay thủ công để làm kỷ niệm. Làng Cù Lần là nơi lý tưởng để thoát khỏi sự ồn ào của thành phố.",
      },
    ],
    createdAt: new Date("2023-07-10T00:00:00Z"),
    readingTime: 10,
    owner: "507f1f77bcf86cd799439024",
  },
  {
    _id: "15",
    title: "Cách Viết Nhật Ký Hiệu Quả",
    excerpt:
      "Học cách viết nhật ký để ghi lại cảm xúc, suy nghĩ và định hướng cuộc sống.",
    categories: ["Self-Help", "Productivity"],
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Chọn Một Quyển Sổ",
        content:
          "Mình chọn một quyển sổ bìa cứng với giấy lót lưới để viết nhật ký, vì nó bền và dễ viết. Mình thích những quyển sổ có thiết kế tối giản, giúp mình tập trung vào nội dung hơn là hình thức. Mỗi tối, mình dành 10-15 phút để viết, thường ở một góc yên tĩnh với ánh đèn dịu. Việc chọn một quyển sổ yêu thích khiến mình háo hức viết hơn. Mình cũng mang theo một cây bút mực tốt để viết mượt mà hơn.",
        image:
          "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Đặt Câu Hỏi Hướng Dẫn",
        content:
          "Để viết nhật ký hiệu quả, mình thường trả lời các câu hỏi như 'Hôm nay mình đã học được gì?', 'Điều gì khiến mình hạnh phúc?', hoặc 'Mình muốn cải thiện điều gì?'. Những câu hỏi này giúp mình suy ngẫm sâu sắc hơn về ngày đã qua. Mình cũng ghi lại các mục tiêu nhỏ cho ngày hôm sau để giữ động lực. Viết theo câu hỏi giúp mình không bị bí ý tưởng và làm nội dung phong phú hơn. Đây là cách mình khám phá bản thân mỗi ngày.",
      },
      {
        subtitle: "Duy Trì Thói Quen",
        content:
          "Mình đặt mục tiêu viết nhật ký ít nhất 5 ngày/tuần để duy trì thói quen. Nếu bận, mình chỉ cần viết vài dòng ngắn, nhưng vẫn cố gắng giữ sự nhất quán. Mình cũng đọc lại các trang cũ mỗi tháng để thấy sự tiến bộ của bản thân. Viết nhật ký không chỉ là cách ghi lại kỷ niệm mà còn giúp mình hiểu rõ cảm xúc và mục tiêu. Mình khuyên bạn bắt đầu với chỉ 5 phút mỗi ngày để hình thành thói quen này.",
      },
    ],
    createdAt: new Date("2024-06-01T00:00:00Z"),
    readingTime: 9,
    owner: "507f1f77bcf86cd799439025",
  },
  {
    _id: "16",
    title: "Ẩm Thực Đường Phố Hà Nội",
    excerpt:
      "Khám phá những món ăn đường phố đặc trưng của Hà Nội, từ bún chả đến phở.",
    categories: ["Food", "Culture"],
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Bún Chả",
        content:
          "Bún chả Hà Nội là món ăn yêu thích của mình, với thịt nướng thơm lừng và nước mắm chua ngọt. Mình thường ghé một quán nhỏ ở phố cổ, nơi thịt được nướng trên than hoa, tỏa mùi thơm khó cưỡng. Mỗi suất bún chả đi kèm rau sống tươi và bún rối mềm. Mình thích chấm chả nướng vào nước mắm rồi cuốn cùng rau thơm. Món này không chỉ ngon mà còn mang đậm hương vị truyền thống Hà Nội.",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Phở Gà",
        content:
          "Phở gà là lựa chọn hoàn hảo cho bữa sáng ở Hà Nội, đặc biệt vào những ngày se lạnh. Nước dùng ngọt thanh, ninh từ xương gà và thảo mộc, kết hợp với bánh phở mềm và thịt gà ta dai ngon. Mình thường thêm chút hành lá, quẩy và một ít tương ớt để tăng hương vị. Quán phở quen của mình nằm ở khu vực Hàng Bông, luôn đông khách nhưng rất đáng để chờ. Mỗi bát phở là một trải nghiệm ấm áp, gần gũi.",
      },
      {
        subtitle: "Bánh Cuốn",
        content:
          "Bánh cuốn mỏng, mềm với nhân thịt băm và mộc nhĩ là món ăn sáng nhẹ nhàng. Mình thích nhìn cô bán hàng tráng bánh trên bếp, khéo léo cuốn từng chiếc bánh nóng hổi. Nước chấm bánh cuốn với vài giọt tinh dầu cà cuống tạo nên hương vị đặc biệt. Mình thường ăn kèm chả quế để tăng độ đậm đà. Món này nhắc mình về những buổi sáng thong thả ở Hà Nội, ngồi bên vỉa hè nhâm nhi.",
      },
    ],
    createdAt: new Date("2023-10-05T00:00:00Z"),
    readingTime: 11,
    owner: "507f1f77bcf86cd799439026",
  },
  {
    _id: "17",
    title: "Tập Thể Dục Tại Nhà",
    excerpt:
      "Hướng dẫn tập thể dục tại nhà không cần dụng cụ, phù hợp cho người bận rộn.",
    categories: ["Health", "Fitness"],
    image:
      "https://images.unsplash.com/photo-1532417344469-368f8cf6f1d0?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Plank",
        content:
          "Plank là bài tập tuyệt vời để tăng cường sức mạnh cơ bụng và lưng. Mình bắt đầu với 30 giây mỗi ngày, giữ cơ thể thẳng như một tấm ván, tập trung vào hơi thở. Dần dần, mình tăng thời gian lên 1 phút khi đã quen. Bài tập này không cần dụng cụ, chỉ cần một tấm thảm là đủ. Mình thường thực hành plank vào buổi sáng để khởi động cơ thể trước khi làm việc.",
        image:
          "https://images.unsplash.com/photo-1532417344469-368f8cf6f1d0?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Squats",
        content:
          "Squats giúp mình cải thiện sức mạnh chân và mông, đồng thời tăng sự linh hoạt. Mình thực hiện 3 hiệp, mỗi hiệp 15 lần, đảm bảo đầu gối không vượt quá mũi chân để tránh chấn thương. Mình thích kết hợp squats với nhạc sôi động để tăng hứng thú. Bài tập này không chỉ đơn giản mà còn giúp mình cảm thấy khỏe khoắn hơn mỗi ngày. Mình khuyên bạn thử squats vào buổi sáng để khởi động năng lượng.",
      },
      {
        subtitle: "Push-Ups",
        content:
          "Mình bắt đầu với push-ups gối để làm quen, sau đó chuyển sang push-ups chuẩn. Mỗi ngày, mình thực hiện 2 hiệp, mỗi hiệp 10 lần, tập trung vào kỹ thuật để tối đa hóa hiệu quả. Push-ups giúp tăng cường cơ ngực, vai và tay. Mình thường tập vào buổi tối để thư giãn sau ngày dài. Bài tập này rất linh hoạt, có thể thực hiện ở bất kỳ đâu trong nhà.",
      },
    ],
    createdAt: new Date("2024-02-10T00:00:00Z"),
    readingTime: 9,
    owner: "507f1f77bcf86cd799439027",
  },
  {
    _id: "18",
    title: "Vẽ Tranh Nước Cơ Bản",
    excerpt:
      "Học cách vẽ tranh nước với các kỹ thuật đơn giản cho người mới bắt đầu.",
    categories: ["Art", "Lifestyle"],
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Chọn Màu Nước",
        content:
          "Mình bắt đầu với một bộ màu nước cơ bản, gồm 12 màu chính, đủ để thử nghiệm các kỹ thuật. Mình chọn giấy chuyên dụng cho màu nước để màu lên đều và đẹp hơn. Trước khi vẽ, mình thử pha màu trên giấy nháp để hiểu cách chúng hòa quyện. Mình thích sử dụng cọ lông mềm để tạo hiệu ứng mượt mà. Bộ dụng cụ đơn giản này giúp mình dễ dàng bắt đầu mà không tốn quá nhiều chi phí.",
      },
      {
        subtitle: "Kỹ Thuật Pha Màu",
        content:
          "Pha màu là phần thú vị nhất khi vẽ tranh nước. Mình học cách tạo hiệu ứng gradient bằng cách thêm nước vào màu để tạo độ loang tự nhiên. Ví dụ, để vẽ bầu trời hoàng hôn, mình pha màu cam với xanh dương, để màu chảy vào nhau trên giấy ướt. Quá trình này cần kiên nhẫn, nhưng kết quả rất đáng giá. Mình thường dành cuối tuần để thử các kỹ thuật mới, cảm giác như đang khám phá một thế giới màu sắc.",
        image:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Vẽ Phong Cảnh",
        content:
          "Mình thích vẽ phong cảnh đơn giản, như cây cối hoặc mặt hồ, để làm quen với màu nước. Mình bắt đầu bằng cách phác thảo nhẹ bằng bút chì, sau đó thêm màu từng lớp mỏng. Kỹ thuật wet-on-wet giúp tạo hiệu ứng mây trời mềm mại, trong khi wet-on-dry phù hợp cho chi tiết như cành cây. Mỗi bức tranh mất khoảng 1-2 giờ, nhưng mình cảm thấy rất thư giãn. Vẽ tranh nước là cách tuyệt vời để giải tỏa căng thẳng.",
      },
    ],
    createdAt: new Date("2023-11-15T00:00:00Z"),
    readingTime: 10,
    owner: "507f1f77bcf86cd799439028",
  },
  {
    _id: "19",
    title: "Du Lịch Phú Quốc",
    excerpt:
      "Khám phá vẻ đẹp biển đảo Phú Quốc với bãi biển trong xanh và ẩm thực độc đáo.",
    categories: ["Travel", "Nature"],
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Bãi Sao",
        content:
          "Bãi Sao là bãi biển đẹp nhất Phú Quốc với cát trắng mịn và nước biển trong vắt. Mình thích nằm trên ghế dài dưới bóng dừa, nghe tiếng sóng vỗ nhẹ nhàng. Mình từng thử chèo kayak ở đây, cảm giác lướt trên mặt nước thật thú vị. Bãi Sao cũng là nơi lý tưởng để ngắm hoàng hôn, khi mặt trời nhuộm vàng cả bầu trời. Mình khuyên bạn đến sớm để tránh đông và tận hưởng không gian yên bình.",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Chợ Đêm Dinh Cậu",
        content:
          "Chợ đêm Dinh Cậu là thiên đường ẩm thực với các quầy hải sản tươi sống. Mình đã thử tôm hùm nướng và mực nướng mọi, chấm với muối ớt xanh đặc trưng. Không khí nhộn nhịp, mùi hải sản nướng thơm lừng khiến mình không thể cưỡng lại. Mình cũng mua một ít ngọc trai làm quà, vì Phú Quốc nổi tiếng với nghề nuôi trai. Chợ đêm là nơi tuyệt vời để cảm nhận nhịp sống địa phương vào buổi tối.",
      },
      {
        subtitle: "Lặn Ngắm San Hô",
        content:
          "Mình tham gia một tour lặn ngắm san hô ở Hòn Thơm, nơi có hệ sinh thái biển phong phú. Dưới làn nước trong, mình nhìn thấy những rặng san hô đầy màu sắc và đàn cá bơi lội. Hướng dẫn viên rất nhiệt tình, đảm bảo an toàn cho người mới lặn như mình. Trải nghiệm này giúp mình trân trọng hơn vẻ đẹp của đại dương. Mình khuyên bạn nên thử lặn ít nhất một lần khi đến Phú Quốc.",
      },
    ],
    createdAt: new Date("2024-03-25T00:00:00Z"),
    readingTime: 10,
    owner: "507f1f77bcf86cd799439029",
  },
  {
    _id: "20",
    title: "Quản Lý Thời Gian Hiệu Quả",
    excerpt:
      "Mẹo quản lý thời gian để cân bằng công việc và cuộc sống cá nhân.",
    categories: ["Productivity", "Work"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Lập Kế Hoạch Hàng Ngày",
        content:
          "Mỗi tối, mình dành 10 phút để lập danh sách công việc cho ngày hôm sau. Mình sử dụng một cuốn sổ nhỏ, chia công việc thành ba loại: quan trọng, trung bình, và ít ưu tiên. Việc này giúp mình biết rõ nên tập trung vào đâu khi bắt đầu ngày mới. Mình cũng ghi chú thời gian ước tính cho từng nhiệm vụ để tránh làm quá tải. Lập kế hoạch giúp mình cảm thấy kiểm soát được thời gian và giảm căng thẳng.",
      },
      {
        subtitle: "Ưu Tiên Công Việc Quan Trọng",
        content:
          "Mình áp dụng quy tắc 80/20, tập trung 80% thời gian vào 20% công việc mang lại kết quả lớn. Ví dụ, nếu đang làm dự án, mình ưu tiên hoàn thành các phần cốt lõi trước. Mình cũng sử dụng kỹ thuật 'Eat That Frog', làm nhiệm vụ khó nhất vào đầu ngày khi năng lượng còn cao. Cách này giúp mình hoàn thành các mục tiêu lớn mà không bị trì hoãn. Mình khuyên bạn xác định 1-2 việc quan trọng nhất mỗi ngày để tập trung.",
        image:
          "https://images.unsplash.com/photo-1454165205744-0bfd921a4a12?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Nghỉ Ngơi Hợp Lý",
        content:
          "Mình luôn dành thời gian nghỉ ngơi để tránh kiệt sức, thường là 10 phút sau mỗi 90 phút làm việc. Trong giờ nghỉ, mình đi bộ nhẹ, uống nước, hoặc đơn giản là nhắm mắt thư giãn. Mình cũng cố gắng ngủ đủ 7-8 tiếng mỗi đêm để đảm bảo năng lượng. Nghỉ ngơi hợp lý giúp mình duy trì sự tập trung và sáng tạo trong công việc. Mình tin rằng quản lý thời gian không chỉ là làm việc mà còn là chăm sóc bản thân.",
      },
    ],
    createdAt: new Date("2023-12-10T00:00:00Z"),
    readingTime: 10,
    owner: "507f1f77bcf86cd799439030",
  },
  {
    _id: "21",
    title: "Sống Xanh Trong Thành Phố",
    excerpt:
      "Hướng dẫn sống xanh, thân thiện với môi trường ngay trong đô thị bận rộn.",
    categories: ["Lifestyle", "Nature"],
    image:
      "https://images.unsplash.com/photo-1501854140801-50d461092607?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Phân Loại Rác",
        content:
          "Mình bắt đầu sống xanh bằng cách phân loại rác tại nhà, chia thành rác tái chế, rác hữu cơ và rác thải thường. Mình sử dụng ba thùng rác riêng biệt và nghiên cứu cách xử lý rác tái chế ở địa phương. Việc này không chỉ giúp giảm rác thải mà còn khiến mình ý thức hơn về thói quen tiêu dùng. Mình cũng mang rác tái chế đến các điểm thu gom trong khu phố. Phân loại rác là bước nhỏ nhưng có tác động lớn đến môi trường.",
      },
      {
        subtitle: "Trồng Cây Trong Nhà",
        content:
          "Mình trồng một vài chậu cây nhỏ như trầu bà, lưỡi hổ và sen đá để làm sạch không khí. Mỗi tuần, mình dành thời gian tưới cây và chăm sóc chúng, cảm giác như chăm sóc một phần thiên nhiên trong nhà. Cây xanh không chỉ cải thiện không gian sống mà còn giúp mình thư giãn. Mình cũng thử làm phân hữu cơ từ vỏ rau củ để bón cây. Trồng cây là cách tuyệt vời để sống gần gũi hơn với thiên nhiên trong thành phố.",
        image:
          "https://images.unsplash.com/photo-1501854140801-50d461092607?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Mua Sắm Bền Vững",
        content:
          "Mình giảm mua đồ dùng một lần, như ống hút nhựa hay ly cà phê giấy, và thay bằng các sản phẩm tái sử dụng. Mình luôn mang theo túi vải và bình nước cá nhân khi ra ngoài. Khi mua sắm, mình chọn các thương hiệu thân thiện với môi trường và ưu tiên sản phẩm địa phương. Việc này giúp mình giảm lượng rác thải và hỗ trợ cộng đồng. Sống xanh không chỉ tốt cho môi trường mà còn mang lại cảm giác ý nghĩa trong cuộc sống.",
      },
    ],
    createdAt: new Date("2024-04-15T00:00:00Z"),
    readingTime: 10,
    owner: "507f1f77bcf86cd799439031",
  },
  {
    _id: "22",
    title: "Nấu Ăn Giản Dị Cho Người Bận Rộn",
    excerpt: "Công thức nấu ăn nhanh chóng, dinh dưỡng cho những ngày bận rộn.",
    categories: ["Food", "Health"],
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Salad Gà Nướng",
        content:
          "Salad gà nướng là món ăn yêu thích của mình khi cần bữa trưa nhanh. Mình ướp đùi gà với dầu ô liu, muối và tiêu, nướng trong lò 20 phút. Sau đó, mình trộn gà với rau xà lách, cà chua bi, dưa leo và một ít sốt mù tạt mật ong. Món này chỉ mất 15 phút chuẩn bị nhưng đầy đủ protein và rau xanh. Mình thường làm sẵn vào tối để mang đi làm, vừa tiện lợi vừa ngon miệng.",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Cơm Chiên Rau Củ",
        content:
          "Cơm chiên rau củ là món cứu tinh khi tủ lạnh chỉ còn ít nguyên liệu. Mình xào cà rốt, đậu Hà Lan và ngô với cơm nguội, thêm một quả trứng gà cho đậm đà. Mình nêm một chút nước tương và dầu mè để tăng hương vị. Món này mất chưa đến 10 phút nhưng rất thơm ngon và đủ dinh dưỡng. Mình thích thêm chút hành lá để món ăn thêm màu sắc và tươi mới.",
      },
      {
        subtitle: "Sinh Tố Bữa Sáng",
        content:
          "Khi không có thời gian ăn sáng, mình làm một ly sinh tố với chuối, sữa chua, yến mạch và một thìa bơ đậu phộng. Mình xay tất cả trong 2 phút, tạo ra một bữa sáng đầy năng lượng. Sinh tố này giúp mình no đến trưa mà không cần ăn vặt. Mình cũng thử thêm các loại quả như dâu hoặc xoài để đổi vị. Đây là cách tuyệt vời để bắt đầu ngày mới khi lịch trình dày đặc.",
      },
    ],
    createdAt: new Date("2023-09-20T00:00:00Z"),
    readingTime: 9,
    owner: "507f1f77bcf86cd799439032",
  },
  {
    _id: "23",
    title: "Thiền Định Dưới Ánh Trăng",
    excerpt:
      "Trải nghiệm thiền định dưới ánh trăng để tìm sự tĩnh lặng trong tâm hồn.",
    categories: ["Mindfulness", "Nature"],
    image:
      "https://images.unsplash.com/photo-1504328345606-7fced2a4fb7d?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Chuẩn Bị Không Gian",
        content:
          "Mình chọn một góc yên tĩnh ngoài trời, như sân sau hoặc công viên gần nhà, để thiền vào ban đêm. Mình mang theo một tấm thảm nhỏ và một chiếc khăn để giữ ấm. Ánh trăng dịu dàng và không khí mát mẻ tạo cảm giác thư giãn tuyệt vời. Mình tắt hết đèn xung quanh để tập trung vào ánh sáng tự nhiên của trăng. Chuẩn bị không gian giúp mình dễ dàng đi vào trạng thái thiền sâu hơn.",
        image:
          "https://images.unsplash.com/photo-1504328345606-7fced2a4fb7d?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Thiền Chánh Niệm",
        content:
          "Mình ngồi khoanh chân, nhắm mắt và tập trung vào hơi thở, cảm nhận không khí mát lành của đêm. Tiếng côn trùng và gió nhẹ trở thành nhạc nền tự nhiên, giúp mình thả lỏng tâm trí. Mình tưởng tượng ánh trăng đang bao bọc mình, mang lại sự bình an. Mỗi phiên thiền kéo dài 15-20 phút, giúp mình giải tỏa căng thẳng và ngủ ngon hơn. Thiền dưới ánh trăng là trải nghiệm độc đáo mà mình rất trân trọng.",
      },
      {
        subtitle: "Suy Ngẫm Sau Thiền",
        content:
          "Sau khi thiền, mình viết vài dòng về cảm giác và suy nghĩ của mình dưới ánh trăng. Mình ghi lại những khoảnh khắc khiến mình biết ơn, như sự tĩnh lặng của đêm hay vẻ đẹp của thiên nhiên. Viết giúp mình củng cố trải nghiệm và cảm nhận sâu sắc hơn. Mình cũng thích nhâm nhi một ly trà thảo mộc sau thiền để kéo dài cảm giác thư giãn. Đây là cách mình kết nối với bản thân và thiên nhiên.",
      },
    ],
    createdAt: new Date("2024-01-30T00:00:00Z"),
    readingTime: 8,
    owner: "507f1f77bcf86cd799439033",
  },
  {
    _id: "24",
    title: "Khám Phá Văn Hóa Huế",
    excerpt: "Tìm hiểu văn hóa Huế qua di sản, ẩm thực và nhịp sống chậm rãi.",
    categories: ["Culture", "Travel"],
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Đại Nội Huế",
        content:
          "Đại Nội Huế là nơi lưu giữ lịch sử và kiến trúc của triều Nguyễn. Mình đi bộ qua các cổng thành cổ kính, cảm nhận không khí trang nghiêm của kinh thành xưa. Các cung điện và đền đài được bảo tồn tốt, với hoa văn tinh xảo trên tường. Mình đặc biệt ấn tượng với Tử Cấm Thành, nơi hoàng đế từng sinh sống. Tham quan Đại Nội giúp mình hiểu thêm về lịch sử và văn hóa Việt Nam.",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Ẩm Thực Huế",
        content:
          "Ẩm thực Huế nổi bật với sự tinh tế, từ bún bò Huế đến bánh bèo. Mình từng thử một bữa cơm cung đình tại một nhà hàng truyền thống, với các món được trình bày đẹp như tranh. Bún bò Huế cay nồng, thơm mùi sả và mắm ruốc, là món không thể bỏ qua. Mình cũng thích bánh khoái giòn rụm, chấm với nước lèo đặc biệt. Mỗi món ăn ở Huế đều kể một câu chuyện về văn hóa và con người nơi đây.",
      },
      {
        subtitle: "Sông Hương",
        content:
          "Mình đi thuyền trên sông Hương vào buổi chiều, ngắm hoàng hôn phủ vàng trên mặt nước. Tiếng đàn ca Huế trên thuyền mang đến cảm giác thư thái, như đưa mình về thời xưa. Mình dừng lại ở chùa Thiên Mụ, một ngôi chùa cổ kính với tháp Phước Duyên nổi bật. Không khí yên bình của sông Hương khiến mình muốn quay lại Huế nhiều lần hơn. Đây là trải nghiệm không thể thiếu khi khám phá văn hóa Huế.",
      },
    ],
    createdAt: new Date("2023-08-25T00:00:00Z"),
    readingTime: 11,
    owner: "507f1f77bcf86cd799439034",
  },
  {
    _id: "25",
    title: "Tập Trung Với Âm Nhạc",
    excerpt:
      "Sử dụng âm nhạc để tăng cường sự tập trung và nâng cao hiệu suất làm việc.",
    categories: ["Productivity", "Art"],
    image:
      "https://images.unsplash.com/photo-1510915361894-db8b80fce76a?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Nhạc Không Lời",
        content:
          "Mình thường nghe nhạc không lời, như nhạc cổ điển hoặc lo-fi, khi làm việc sâu. Những bản nhạc của Ludovico Einaudi hay Chillhop Music giúp mình duy trì trạng thái tập trung. Âm nhạc nhẹ nhàng tạo một lớp nền, che đi tiếng ồn xung quanh mà không làm mình phân tâm. Mình thường sử dụng tai nghe để có trải nghiệm tốt hơn. Nhạc không lời là công cụ tuyệt vời để mình bước vào trạng thái 'flow'.",
        image:
          "https://images.unsplash.com/photo-1510915361894-db8b80fce76a?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Tạo Danh Sách Nhạc",
        content:
          "Mình tạo một danh sách nhạc riêng trên Spotify, với các bài phù hợp với tâm trạng và công việc. Ví dụ, khi viết lách, mình chọn nhạc piano nhẹ; khi thiết kế, mình chọn lo-fi sôi động hơn. Mình tránh các bài có lời để không bị phân tâm bởi ca từ. Mỗi danh sách dài khoảng 2-3 tiếng, đủ cho một phiên làm việc. Tạo danh sách nhạc giúp mình cá nhân hóa trải nghiệm và làm việc hiệu quả hơn.",
      },
      {
        subtitle: "Thử Nhạc Thiên Nhiên",
        content:
          "Đôi khi, mình chuyển sang nhạc thiên nhiên, như tiếng sóng biển hoặc mưa rơi, để thư giãn. Những âm thanh này giúp mình cảm thấy như đang ở một không gian khác, xa rời áp lực công việc. Mình từng thử một playlist tiếng rừng nhiệt đới, rất hiệu quả khi cần tập trung lâu. Âm thanh thiên nhiên cũng giúp mình thiền ngắn giữa các phiên làm việc. Mình khuyên bạn thử các loại nhạc khác nhau để tìm ra phong cách phù hợp nhất.",
      },
    ],
    createdAt: new Date("2024-05-10T00:00:00Z"),
    readingTime: 9,
    owner: "507f1f77bcf86cd799439035",
  },
  {
    _id: "26",
    title: "Du Lịch Miền Tây",
    excerpt:
      "Khám phá sông nước miền Tây với chợ nổi và văn hóa địa phương độc đáo.",
    categories: ["Travel", "Nature"],
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Chợ Nổi Cái Răng",
        content:
          "Chợ nổi Cái Răng ở Cần Thơ là điểm đến không thể bỏ qua khi đến miền Tây. Mình đi thuyền vào sáng sớm, khi chợ nhộn nhịp với ghe thuyền chở hoa quả, bánh kẹo và đồ ăn. Mình mua một tô bún nước lèo nóng hổi, ăn ngay trên thuyền, cảm giác rất thú vị. Người bán hàng thân thiện, sẵn sàng kể chuyện về cuộc sống trên sông. Chợ nổi mang đến trải nghiệm văn hóa độc đáo mà mình chưa từng thấy ở nơi nào khác.",
        image:
          "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Làng Nổi Tân Lập",
        content:
          "Làng nổi Tân Lập là khu rừng tràm xanh mướt, với những con kênh nhỏ len lỏi giữa cây cối. Mình chèo thuyền kayak qua rừng, ngắm nhìn những cây tràm cao vút và nghe tiếng chim hót. Không khí trong lành và yên bình khiến mình quên đi sự ồn ào của thành phố. Mình dừng lại để chụp ảnh những tán cây phản chiếu trên mặt nước, tạo nên khung cảnh như tranh vẽ. Đây là nơi lý tưởng để kết nối với thiên nhiên và thư giãn tâm hồn.",
        image:
          "https://images.unsplash.com/photo-1501854140801-50d461092607?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Ẩm Thực Miền Tây",
        content:
          "Ẩm thực miền Tây làm mình mê mẩn với bánh xèo giòn rụm và lẩu mắm đậm đà. Mình từng thử lẩu mắm ở một quán nhỏ ven sông, với cá tươi, rau đồng và nước dùng thơm lừng. Bánh xèo được ăn kèm rau rừng, chấm nước mắm chua ngọt, tạo nên hương vị khó quên. Mình cũng thích nhâm nhi trái cây tươi như chôm chôm và sầu riêng ở chợ địa phương. Ẩm thực miền Tây không chỉ ngon mà còn phản ánh sự phong phú của vùng sông nước.",
      },
    ],
    createdAt: new Date("2023-06-15T00:00:00Z"),
    readingTime: 10,
    owner: "507f1f77bcf86cd799439036",
  },
  {
    _id: "27",
    title: "Học Chụp Ảnh Với Điện Thoại",
    excerpt:
      "Mẹo chụp ảnh đẹp bằng điện thoại, từ bố cục đến chỉnh sửa ánh sáng.",
    categories: ["Photography", "Art"],
    image:
      "https://images.unsplash.com/photo-1519638399536-2be641d5dd25?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Bố Cục Ảnh",
        content:
          "Mình học cách áp dụng quy tắc 1/3 để bố cục ảnh hài hòa hơn trên điện thoại. Mình bật lưới trên camera để chia khung hình thành 9 phần và đặt chủ thể ở các điểm giao nhau. Điều này giúp bức ảnh cân đối và thu hút ánh nhìn. Mình cũng thử chụp từ các góc thấp hoặc cao để tạo hiệu ứng độc đáo. Bố cục tốt là bước đầu tiên để có một bức ảnh đẹp mà không cần chỉnh sửa quá nhiều.",
        image:
          "https://images.unsplash.com/photo-1519638399536-2be641d5dd25?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Tận Dụng Ánh Sáng Tự Nhiên",
        content:
          "Ánh sáng tự nhiên là chìa khóa để ảnh điện thoại trông chuyên nghiệp. Mình thường chụp vào giờ vàng (sáng sớm hoặc hoàng hôn) để có ánh sáng mềm mại, không gắt. Mình tránh ánh sáng trực tiếp giữa trưa vì nó tạo bóng đổ cứng trên chủ thể. Khi chụp trong nhà, mình đứng gần cửa sổ để tận dụng ánh sáng dịu. Hiểu cách sử dụng ánh sáng giúp mình nâng tầm chất lượng ảnh mà không cần thiết bị đắt tiền.",
      },
      {
        subtitle: "Chỉnh Sửa Ảnh",
        content:
          "Mình sử dụng các ứng dụng như Snapseed hoặc Lightroom Mobile để chỉnh sửa ảnh sau khi chụp. Mình điều chỉnh độ sáng, tương phản và độ bão hòa để làm nổi bật màu sắc. Mình cũng thích thêm hiệu ứng vignette nhẹ để tập trung vào chủ thể. Việc chỉnh sửa chỉ mất vài phút nhưng giúp bức ảnh trông ấn tượng hơn. Mình khuyên bạn thử các công cụ miễn phí để khám phá phong cách chỉnh sửa riêng của mình.",
        image:
          "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&q=80&w=3000",
      },
    ],
    createdAt: new Date("2024-02-20T00:00:00Z"),
    readingTime: 9,
    owner: "507f1f77bcf86cd799439037",
  },
  {
    _id: "28",
    title: "Chăm Sóc Da Cơ Bản",
    excerpt:
      "Hướng dẫn chăm sóc da đơn giản cho người mới bắt đầu, phù hợp với mọi loại da.",
    categories: ["Health", "Lifestyle"],
    image:
      "https://images.unsplash.com/photo-1596753384166-8d59e0b4e9ae?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Làm Sạch Da",
        content:
          "Mình bắt đầu routine chăm sóc da bằng cách rửa mặt hai lần mỗi ngày với sữa rửa mặt dịu nhẹ. Mình chọn loại không chứa hương liệu để tránh kích ứng, đặc biệt là với da nhạy cảm. Rửa mặt giúp loại bỏ bụi bẩn và dầu thừa, giữ da thông thoáng. Mình luôn dùng nước ấm thay vì nước nóng để không làm khô da. Làm sạch da là bước quan trọng nhất để có làn da khỏe mạnh.",
        image:
          "https://images.unsplash.com/photo-1596753384166-8d59e0b4e9ae?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Dưỡng Ẩm",
        content:
          "Sau khi rửa mặt, mình thoa kem dưỡng ẩm để khóa ẩm và bảo vệ da. Mình chọn kem dưỡng có thành phần như hyaluronic acid hoặc ceramide, phù hợp với da dầu hoặc da khô. Mình massage nhẹ nhàng để kem thấm sâu, giúp da mềm mịn hơn. Dưỡng ẩm không chỉ ngăn ngừa khô da mà còn giúp da trông căng bóng tự nhiên. Mình khuyên bạn chọn sản phẩm phù hợp với loại da để đạt hiệu quả tốt nhất.",
      },
      {
        subtitle: "Chống Nắng",
        content:
          "Mình không bao giờ ra ngoài mà không thoa kem chống nắng, kể cả ngày râm mát. Mình dùng kem có SPF 30 trở lên, thoa lại sau mỗi 2-3 tiếng nếu ở ngoài lâu. Kem chống nắng bảo vệ da khỏi tia UV, nguyên nhân chính gây lão hóa và thâm nám. Mình thích loại kem chống nắng dạng gel vì nó thấm nhanh và không gây bết dính. Chống nắng là bí quyết để giữ da khỏe và trẻ trung lâu dài.",
        image:
          "https://images.unsplash.com/photo-1596753384166-8d59e0b4e9ae?ixlib=rb-4.0.3&q=80&w=3000",
      },
    ],
    createdAt: new Date("2023-11-30T00:00:00Z"),
    readingTime: 9,
    owner: "507f1f77bcf86cd799439038",
  },
  {
    _id: "29",
    title: "Làm Đồ Handmade Từ Vải Vụn",
    excerpt:
      "Tái chế vải vụn thành những món đồ handmade độc đáo và thân thiện với môi trường.",
    categories: ["Art", "Lifestyle"],
    image:
      "https://images.unsplash.com/photo-1587049633310-3e329e809e56?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Làm Túi Vải",
        content:
          "Mình sử dụng vải vụn từ quần áo cũ để may túi vải đơn giản, thay thế túi nhựa khi đi chợ. Mình cắt vải thành hình chữ nhật, may hai bên và thêm quai từ vải thừa. Túi vải không chỉ bền mà còn mang phong cách riêng, tùy vào màu sắc và hoa văn của vải. Quá trình may mất khoảng 30 phút, nhưng mình rất thích cảm giác sáng tạo. Mình khuyến khích bạn thử làm túi vải để vừa tiết kiệm vừa bảo vệ môi trường.",
        image:
          "https://images.unsplash.com/photo-1587049633310-3e329e809e56?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Khăn Lót Ly",
        content:
          "Mình cắt vải vụn thành các ô vuông nhỏ, may viền để làm khăn lót ly handmade. Mình chọn những mảnh vải có hoa văn tươi sáng để bàn ăn thêm sinh động. Khăn lót ly dễ làm, chỉ cần biết may cơ bản hoặc dùng keo dán vải nếu không có máy may. Mình tặng vài chiếc cho bạn bè, và họ rất thích món quà độc đáo này. Đây là cách tuyệt vời để tái sử dụng vải và trang trí nhà cửa.",
      },
      {
        subtitle: "Trang Trí Vải",
        content:
          "Mình dùng vải vụn để làm tranh treo tường, bằng cách dán các mảnh vải thành hình hoa hoặc phong cảnh trên khung gỗ. Mình chọn vải có màu sắc tương phản để tạo hiệu ứng nổi bật. Quá trình này giống như vẽ tranh, nhưng thay vì dùng màu, mình dùng vải để kể chuyện. Mình cũng thử may các mảnh vải thành vòng hoa để treo cửa. Làm đồ từ vải vụn không chỉ mình sáng tạo mà còn giúp mình thư giãn sau giờ làm việc.",
      },
    ],
    createdAt: new Date("2024-03-05T00:00:00Z"),
    readingTime: "10",
    owner: "507f1f77bcaaa123cd799439",
  },
  {
    _id: "30",
    title: "Tìm Bình Yên Qua Trà Đạo",
    excerpt:
      "Khám phá nghệ thuật trà đạo Nhật Bản để tìm sự tĩnh lặng và cân bằng trong cuộc sống.",
    categories: ["Cultura", "Mindfulness"],
    image:
      "https://images.unsplash.com/photo-1547141571-86cbaa1b9e4f?ixlib=rb-4.0.3&q=80&w=3000",
    sections: [
      {
        subtitle: "Chuẩn Bị Trà",
        content:
          "Mình học cách pha trà matcha theo phong cách Nhật Bản, bắt đầu bằng cách làm nóng chén và đánh bột trà với nước nóng. Mình dùng chổi tre (chasen) để tạo bọt mịn, đảm bảo trà có vị đậm đà. Quá trình này đòi hỏi sự tập trung và nhẹ nhàng, như một nghi thức thiền. Mình chọn một không gian yên tĩnh, thường là góc ban công, để pha trà vào buổi chiều. Chuẩn bị trà là bước đầu tiên để bước vào thế giới của trà đạo.",
        image:
          "https://images.unsplash.com/photo-1547141571-86c7b0f1b9e4f?ixlib=rb-4.0.3&q=80&w=3000",
      },
      {
        subtitle: "Thưởng Thức Trà",
        content:
          "Khi thưởng thức trà, mình ngồi khoanh chân và nhâm nhi từng ngụm nhỏ, cảm nhận vị đắng nhẹ và mùi thơm của matcha. Mình tập trung vào cảm giác ấm nóng của chén trà trong tay và sự tĩnh lặng của không gian. Trà đạo dạy mình về sự hiện diện và trân trọng khoảnh khắc hiện tại. Mình thường kết hợp thưởng trà với việc nghe nhạc không lời để tăng sự thư giãn. Đây là cách mình tìm lại sự bình yên sau những ngày bận rộn.",
      },
      {
        subtitle: "Triết Lý Trà Đạo",
        content:
          "Trà đạo không chỉ là pha và uống trà, mà còn là cách sống với sự hài hòa, tôn kính và thanh tịnh. Mình học được rằng mỗi hành động trong trà đạo, từ lau chén đến rót nước, đều mang ý nghĩa sâu sắc. Mình cố gắng áp dụng triết lý này vào cuộc sống, sống chậm lại và trân trọng những điều nhỏ bé. Mình từng tham gia một buổi trà đạo tại một trung tâm văn hóa, và trải nghiệm ấy rất đáng nhớ. Trà đạo là hành trình khám phá bản thân và kết nối với văn hóa Nhật Bản.",
        image:
          "https://images.unsplash.com/photo-1547141571-86c7b0f1b9e4f?ixlib=rb-4.0.3&q=80&w=3000",
      },
    ],
    createdAt: new Date("2023-07-05T00:00:00Z"),
    readingTime: 10,
    owner: "507f1f77bcf86cd799439040",
  },
];
