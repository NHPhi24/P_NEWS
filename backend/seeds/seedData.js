import { sql } from "../config/db.js";

// --- DỮ LIỆU MẪU ---

const SAMPLE_USERS = [
  { username: "admin", password: "admin123", email: "admin@baiviet.vn", role: "admin", avatar_url: "https://i.pravatar.cc/150?img=9" },
  { username: "vanlong_tacgia", password: "user123", email: "vanlong@baiviet.vn", role: "user", avatar_url: "https://i.pravatar.cc/150?img=8" },
  { username: "lananh_tacgia", password: "author123", email: "lananh@baiviet.vn", role: "author", avatar_url: "https://i.pravatar.cc/150?img=1" },
  { username: "minhtuan_tacgia", password: "author123", email: "minhtuan@baiviet.vn", role: "author", avatar_url: "https://i.pravatar.cc/150?img=2" },
  { username: "thuhang_tacgia", password: "author123", email: "thuhang@baiviet.vn", role: "author", avatar_url: "https://i.pravatar.cc/150?img=3" },
  { username: "quocbao_tacgia", password: "author123", email: "quocbao@baiviet.vn", role: "author", avatar_url: "https://i.pravatar.cc/150?img=4" },
  { username: "ngocanh_tacgia", password: "author123", email: "ngocanh@baiviet.vn", role: "author", avatar_url: "https://i.pravatar.cc/150?img=5" },
  { username: "hoangnam_tacgia", password: "author123", email: "hoangnam@baiviet.vn", role: "author", avatar_url: "https://i.pravatar.cc/150?img=6" },
  { username: "thuydung_tacgia", password: "author123", email: "thuydung@baiviet.vn", role: "author", avatar_url: "https://i.pravatar.cc/150?img=7" },
];

const SAMPLE_CATEGORIES = [
  { name: "Công nghệ" },
  { name: "Thể thao" },
  { name: "Giải trí" },
  { name: "Chính trị" },
  { name: "Sức khỏe" },
  { name: "Khoa học" },
  { name: "Kinh doanh" },
  { name: "Du lịch" },
  { name: "Giáo dục" },
];

// 9 tác giả
const SAMPLE_AUTHORS = [
  { name: "Nguyễn Lan Anh", bio: "Nhà báo công nghệ", username: "lananh_tacgia" },
  { name: "Trần Minh Tuấn", bio: "Phóng viên thể thao", username: "minhtuan_tacgia" },
  { name: "Lê Thu Hằng", bio: "Chuyên gia và cây bút sức khỏe", username: "thuhang_tacgia" },
  { name: "Phạm Quốc Bảo", bio: "Người truyền thông khoa học", username: "quocbao_tacgia" },
  { name: "Vũ Ngọc Anh", bio: "Nhà phân tích kinh doanh", username: "ngocanh_tacgia" },
  { name: "Đỗ Hoàng Nam", bio: "Blogger du lịch", username: "hoangnam_tacgia" },
  { name: "Phan Thùy Dung", bio: "Chuyên gia giáo dục", username: "thuydung_tacgia" },
  { name: "Ngô Văn Long", bio: "Nhà phân tích chính trị", username: "vanlong_tacgia" },
  { name: "Quản trị viên", bio: "Quản lý và biên tập nội dung trang", username: "admin" },
];

const SAMPLE_NEWS = [
  { 
    title: "Xu hướng công nghệ mới nhất", 
    content: "Năm 2025 đánh dấu một bước ngoặt lớn trong lĩnh vực công nghệ toàn cầu, khi trí tuệ nhân tạo (AI) không còn là khái niệm xa vời mà đã thực sự bước vào đời sống hàng ngày. Các tập đoàn công nghệ hàng đầu như Google, Microsoft và OpenAI tiếp tục cạnh tranh khốc liệt trong việc phát triển các mô hình AI ngày càng thông minh và linh hoạt hơn. Xu hướng nổi bật nhất năm nay chính là sự tích hợp AI vào mọi thiết bị thông minh, từ điện thoại, máy tính bảng cho đến các thiết bị gia dụng. Điện toán đám mây cũng có những bước tiến vượt bậc, với tốc độ xử lý nhanh hơn và chi phí thấp hơn, giúp các doanh nghiệp vừa và nhỏ dễ dàng tiếp cận công nghệ hiện đại. Bên cạnh đó, công nghệ blockchain tiếp tục khẳng định vị thế trong lĩnh vực tài chính và bảo mật dữ liệu. Các chuyên gia dự đoán rằng, trong vòng 5 năm tới, công nghệ lượng tử sẽ bắt đầu được ứng dụng rộng rãi, mở ra kỷ nguyên mới cho ngành công nghệ thông tin. Tuy nhiên, đi kèm với những tiến bộ này là những thách thức về bảo mật thông tin và quyền riêng tư, đòi hỏi các nhà phát triển phải không ngừng cải tiến giải pháp bảo vệ dữ liệu người dùng.", 
    authorName: "Nguyễn Lan Anh", 
    categoryName: "Công nghệ", 
    image_url: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg", 
    is_hot: true, 
    views: 120 
  },
  { 
    title: "Điểm nhấn thể thao 2025", 
    content: "Năm 2025 hứa hẹn là một năm bùng nổ của làng thể thao thế giới với hàng loạt sự kiện lớn được tổ chức. Giải vô địch bóng đá thế giới 2026 đang đến gần, các đội tuyển quốc gia đã bắt đầu chuẩn bị từ bây giờ với những trận giao hữu chất lượng cao. Tại châu Á, SEA Games 2025 được tổ chức tại Thái Lan hứa hẹn mang đến nhiều màn so tài kịch tính giữa các vận động viên trong khu vực. Ở môn điền kinh, kỷ lục thế giới tiếp tục bị phá vỡ với sự xuất hiện của thế hệ vận động viên mới được đào tạo bài bản với công nghệ hiện đại. Thể thao điện tử (eSports) cũng không ngừng phát triển, thu hút hàng triệu người xem trên toàn cầu. Các giải đấu Liên Minh Huyền Thoại, DOTA 2 và Valorant có tổng giải thưởng lên đến hàng chục triệu USD. Bên cạnh đó, xu hướng kết hợp công nghệ vào thể thao ngày càng rõ nét, với việc sử dụng AI để phân tích phong độ vận động viên, VAR trong bóng đá và công nghệ Hawk-Eye trong quần vợt. Thể thao không chỉ là cuộc thi về sức mạnh mà còn là cuộc chạy đua công nghệ giữa các quốc gia.", 
    authorName: "Trần Minh Tuấn", 
    categoryName: "Thể thao", 
    image_url: "https://images.pexels.com/photos/209841/pexels-photo-209841.jpeg", 
    is_hot: false, 
    views: 80 
  },
  { 
    title: "Bản tin giải trí tuần qua", 
    content: "Tuần qua, làng giải trí thế giới chứng kiến nhiều sự kiện đáng chú ý. Lễ trao giải Oscar 2025 vừa diễn ra tại Los Angeles với chiến thắng thuộc về bộ phim 'The Last Symphony' của đạo diễn Christopher Nolan. Phim không chỉ đoạt giải Phim hay nhất mà còn mang về cho nam diễn viên chính Timothée Chalamet tượng vàng Oscar đầu tiên trong sự nghiệp. Trong làng nhạc, album mới của Taylor Swift 'Midnight Memories' đã phá vỡ kỷ lục streaming toàn cầu chỉ sau 24 giờ phát hành. Tại Việt Nam, liveshow 'Điều Còn Mãi' của ca sĩ Mỹ Tâm thu hút hơn 50.000 khán giả tại sân vận động Mỹ Đình, chứng tỏ sức hút không hề giảm sút của diva làng nhạc Việt. Về phim ảnh, phần mới của series 'Stranger Things' cuối cùng cũng đã có trailer chính thức, hứa hẹn mang đến cho khán giả những tình tiết bất ngờ và cảm xúc mạnh mẽ. Trong lĩnh vực game, tựa game 'Cyberpunk 2077: Phoenix Rising' nhận được đánh giá tích cực từ giới phê bình, khôi phục danh tiếng cho nhà phát triển CD Projekt Red.", 
    authorName: "Nguyễn Lan Anh", 
    categoryName: "Giải trí", 
    image_url: "https://images.pexels.com/photos/1647161/pexels-photo-1647161.jpeg", 
    is_hot: false, 
    views: 90 
  },
  { 
    title: "Toàn cảnh tranh luận chính trị 2025", 
    content: "Bối cảnh chính trị thế giới năm 2025 tiếp tục diễn biến phức tạp với nhiều cuộc tranh luận nóng bỏng về các vấn đề toàn cầu. Hội nghị thượng đỉnh G20 vừa diễn ra tại Nhật Bản với trọng tâm thảo luận về biến đổi khí hậu và an ninh năng lượng. Các nhà lãnh đạo đã có những phát biểu mạnh mẽ về việc cần giảm 50% lượng khí thải carbon toàn cầu vào năm 2030. Trong khi đó, căng thẳng địa chính trị tại khu vực Biển Đông tiếp tục là chủ đề nóng khi Mỹ và Trung Quốc tổ chức các cuộc tập trận hải quân quy mô lớn. Ở châu Âu, cuộc khủng hoảng di cư tiếp tục làm sâu sắc thêm sự chia rẽ giữa các quốc gia thành viên EU. Tại Việt Nam, Quốc hội đang thảo luận sôi nổi về dự thảo Luật Đất đai sửa đổi, với nhiều ý kiến trái chiều về quyền sử dụng đất và bồi thường giải phóng mặt bằng. Các chuyên gia nhận định, năm 2025 sẽ là năm của sự điều chỉnh chiến lược giữa các cường quốc, với sự dịch chuyển quyền lực từ Tây sang Đông ngày càng rõ rệt.", 
    authorName: "Ngô Văn Long", 
    categoryName: "Chính trị", 
    image_url: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg", 
    is_hot: true, 
    views: 200 
  },
  { 
    title: "Tổng kết giải vô địch 2025", 
    content: "Giải vô địch bóng đá thế giới 2025 đã khép lại với nhiều dấu ấn đáng nhớ. Đội tuyển Brazil đã xuất sắc giành chức vô địch sau khi đánh bại Pháp với tỷ số 3-2 trong trận chung kết kịch tính. Siêu sao Neymar Jr., ở tuổi 33, đã chứng minh đẳng cấp khi lập cú đúp và mang về chiếc cúp vàng danh giá cho đội tuyển. Giải đấu năm nay được đánh giá cao về chất lượng chuyên môn với 172 bàn thắng được ghi, trung bình 2.7 bàn/trận. Công nghệ VAR tiếp tục chứng minh giá trị khi giúp các trọng tài đưa ra nhiều quyết định chính xác trong các tình huống tranh cãi. Đáng chú ý, đội tuyển Việt Nam đã có màn trình diễn ấn tượng khi lần đầu tiên trong lịch sử lọt vào vòng 1/8, dừng chân trước Argentina với tỷ số 2-1. Giải đấu cũng chứng kiến sự trỗi dậy của các tài năng trẻ như Jude Bellingham (Anh) và Pedri (Tây Ban Nha), những người hứa hẹn sẽ thống trị làng bóng đá thế giới trong thập kỷ tới. Thành công của giải đấu không chỉ nằm ở những trận cầu hay mà còn ở tinh thần thể thao cao thượng được thể hiện xuyên suốt.", 
    authorName: "Trần Minh Tuấn", 
    categoryName: "Thể thao", 
    image_url: "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg", 
    is_hot: false, 
    views: 75 
  },
  { 
    title: "Top 10 bộ phim nổi bật 2025", 
    content: "Năm 2025 chứng kiến sự bùng nổ của ngành công nghiệp điện ảnh với hàng loạt tác phẩm để đời. Đứng đầu danh sách là 'The Quantum Paradox' - bộ phim khoa học viễn tưởng với kỹ xảo đỉnh cao và cốt truyện hấp dẫn, thu về 2.5 tỷ USD toàn cầu. Vị trí thứ hai thuộc về 'Eternal Sunshine', bộ phim tâm lý tình cảm khai thác sâu sắc mối quan hệ gia đình, nhận được 10 đề cử Oscar. 'Asian Dynasty' xếp thứ ba, đánh dấu sự trở lại của dòng phim lịch sử với kinh phí đầu tư khủng. Đáng chú ý, 'The Hanoi Story' - bộ phim Việt Nam đầu tiên lọt vào top 10, kể về hành trình của một gia đình Hà Nội qua ba thế hệ, nhận được sự đánh giá cao từ giới phê bình quốc tế. Các vị trí tiếp theo thuộc về 'Cyber Revolution', 'The Last Samurai 2', 'Ocean's Depth', 'Midnight in Paris 2', 'The Dragon's Legacy' và 'Silent Whispers'. Điểm chung của các phim trong top 10 là sự đầu tư kỹ lưỡng về kịch bản, diễn xuất xuất sắc và áp dụng công nghệ hiện đại trong sản xuất. Năm 2025 thực sự là một năm thành công rực rỡ của điện ảnh thế giới.", 
    authorName: "Nguyễn Lan Anh", 
    categoryName: "Giải trí", 
    image_url: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg", 
    is_hot: false, 
    views: 60 
  },
  { 
    title: "5 thói quen lành mạnh cho năm mới", 
    content: "Để có một năm 2025 tràn đầy năng lượng và sức khỏe, các chuyên gia y tế khuyến cáo người dân nên duy trì 5 thói quen lành mạnh sau. Thứ nhất, ngủ đủ 7-8 tiếng mỗi đêm giúp cơ thể phục hồi và tái tạo năng lượng. Giấc ngủ chất lượng không chỉ cải thiện trí nhớ mà còn tăng cường hệ miễn dịch. Thứ hai, uống đủ 2 lít nước mỗi ngày để duy trì hoạt động của các cơ quan, đặc biệt là thận và da. Thứ ba, tập thể dục 30 phút mỗi ngày với các bài tập phù hợp như đi bộ, yoga hoặc bơi lội giúp tim mạch khỏe mạnh và giảm căng thẳng. Thứ tư, ăn uống cân bằng với nhiều rau xanh, trái cây và hạn chế thực phẩm chế biến sẵn. Một chế độ ăn Địa Trung Hải với cá, dầu ô liu và ngũ cốc nguyên hát được khuyến khích. Thứ năm, thực hành chánh niệm và thiền định 10-15 phút mỗi ngày giúp giảm stress và cải thiện sức khỏe tinh thần. Những thói quen này tuy đơn giản nhưng nếu duy trì đều đặn sẽ mang lại hiệu quả bất ngờ cho sức khỏe tổng thể.", 
    authorName: "Lê Thu Hằng", 
    categoryName: "Sức khỏe", 
    image_url: "https://images.pexels.com/photos/374837/pexels-photo-374837.jpeg", 
    is_hot: false, 
    views: 85 
  },
  { 
    title: "Tương lai của giáo dục hiện đại", 
    content: "Giáo dục năm 2025 đang trải qua cuộc cách mạng chuyển đổi số mạnh mẽ. Các lớp học truyền thống dần được thay thế bằng mô hình hybrid - kết hợp học trực tuyến và trực tiếp. Trí tuệ nhân tạo được tích hợp vào hệ thống giáo dục, cung cấp lộ trình học tập cá nhân hóa cho từng học sinh dựa trên năng lực và sở thích. Các nền tảng học tập thích ứng (adaptive learning) sử dụng AI để phân tích điểm mạnh, điểm yếu của người học và điều chỉnh nội dung giảng dạy phù hợp. Ở bậc đại học, chương trình đào tạo tập trung vào phát triển kỹ năng mềm như tư duy phản biện, sáng tạo và hợp tác - những kỹ năng thiết yếu trong thời đại số. Micro-learning (học tập vi mô) trở thành xu hướng, cho phép người học tiếp thu kiến thức thông qua các bài học ngắn 5-10 phút trên thiết bị di động. Tại Việt Nam, Bộ Giáo dục đã triển khai chương trình 'Trường học số' trên toàn quốc, trang bị cơ sở hạ tầng công nghệ cho 90% trường học. Giáo dục không còn giới hạn trong bốn bức tường mà mở rộng ra toàn cầu, kết nối học sinh Việt Nam với các chuyên gia quốc tế thông qua các dự án hợp tác trực tuyến.", 
    authorName: "Phan Thùy Dung", 
    categoryName: "Giáo dục", 
    image_url: "https://images.pexels.com/photos/4145195/pexels-photo-4145195.jpeg", 
    is_hot: false, 
    views: 100 
  },
  { 
    title: "Top điểm đến du lịch 2025", 
    content: "Năm 2025 mở ra nhiều điểm đến du lịch hấp dẫn cho những tín đồ xê dịch. Đứng đầu danh sách là Iceland - vùng đất của băng và lửa với hiện tượng cực quang tuyệt đẹp và các suối nước nóng tự nhiên. Tiếp theo là Nhật Bản, nơi du khách có thể trải nghiệm văn hóa truyền thống đan xen hiện đại, từ các ngôi đền cổ kính đến công nghệ tiên tiến. Bali, Indonesia tiếp tục là thiên đường nghỉ dưỡng với những bãi biển hoang sơ và văn hóa độc đáo. Ở châu Âu, Hy Lạp thu hút với các hòn đảo xinh đẹp như Santorini và Mykonos, cùng di sản văn hóa phong phú. Tại Đông Nam Á, Việt Nam nổi lên như điểm đến không thể bỏ qua với Vịnh Hạ Long, Phong Nha - Kẻ Bàng và phố cổ Hội An. New Zealand hấp dẫn những ai yêu thiên nhiên với phong cảnh núi non hùng vĩ và các hoạt động phiêu lưu. Costa Rica là điểm đến lý tưởng cho du lịch sinh thái với rừng nhiệt đới và đa dạng sinh học. Maroc mang đến trải nghiệm văn hóa phương Đông độc đáo với các khu chợ truyền thống và kiến trúc Hồi giáo. Canada thu hút với thiên nhiên hoang dã và các thành phố hiện đại. Cuối cùng, Nam Phi với safari ngắm thú hoang và vườn nho nổi tiếng.", 
    authorName: "Đỗ Hoàng Nam", 
    categoryName: "Du lịch", 
    image_url: "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg", 
    is_hot: true, 
    views: 145 
  },
  { 
    title: "Hiểu đúng về dinh dưỡng – Phá bỏ những lầm tưởng phổ biến", 
    content: "Trong thời đại thông tin tràn lan, nhiều quan niệm sai lầm về dinh dưỡng vẫn tồn tại và ảnh hưởng đến sức khỏe cộng đồng. Một trong những lầm tưởng phổ biến nhất là 'ăn sau 8 giờ tối sẽ gây béo'. Thực tế, cân nặng phụ thuộc vào tổng lượng calo tiêu thụ trong ngày chứ không phải thời điểm ăn. Quan niệm 'chất béo luôn có hại' cũng không chính xác - chất béo tốt từ cá hồi, bơ và các loại hạt rất cần thiết cho sức khỏe tim mạch và não bộ. Nhiều người tin rằng 'ăn kiêng low-carb là cách giảm cân hiệu quả nhất', nhưng carbohydrate phức hợp từ ngũ cốc nguyên hát lại cung cấp năng lượng bền vững cho cơ thể. 'Uống nước detox thanh lọc cơ thể' là một ngộ nhận khác - gan và thận đã có chức năng thải độc tự nhiên. Quan niệm 'trái cây nhiều đường nên tránh' cũng sai lầm, vì đường trong trái cây là đường tự nhiên kèm chất xơ và vitamin. 'Ăn nhiều protein sẽ tăng cơ nhanh' chỉ đúng khi kết hợp với tập luyện, nếu không sẽ gây hại cho thận. Hiểu đúng về dinh dưỡng giúp chúng ta xây dựng chế độ ăn khoa học, bền vững cho sức khỏe lâu dài.", 
    authorName: "Lê Thu Hằng", 
    categoryName: "Sức khỏe", 
    image_url: "https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg", 
    is_hot: false, 
    views: 95 
  },
  { 
    title: "Cuộc Cách Mạng Robot AI", 
    content: "Năm 2025 chứng kiến bước tiến vượt bậc trong lĩnh vực robot tích hợp trí tuệ nhân tạo. Các robot thế hệ mới không chỉ thực hiện nhiệm vụ lặp đi lặp lại mà còn có khả năng học hỏi và thích nghi với môi trường phức tạp. Trong y tế, robot phẫu thuật như da Vinci XI đạt độ chính xác đến micromet, giúp thực hiện những ca mổ phức tạp với tỷ lệ thành công cao. Ở lĩnh vực dịch vụ, robot tiếp tân có thể giao tiếp tự nhiên với khách hàng, xử lý đặt phòng và cung cấp thông tin 24/7. Ngành nông nghiệp ứng dụng robot thu hoạch tự động, sử dụng camera và AI để nhận diện trái cây chín và thu hoạch với hiệu suất gấp 10 lần con người. Trong sản xuất, robot hợp tác (cobots) làm việc cùng công nhân, nâng cao năng suất và an toàn lao động. Các robot cứu hộ được trang bị cảm biến đa dạng có thể hoạt động trong môi trường nguy hiểm như động đất, hỏa hoạn. Tuy nhiên, sự phát triển này cũng đặt ra thách thức về đạo đức và việc làm. Các chuyên gia kêu gọi xây dựng khung pháp lý để đảm bảo robot AI phát triển vì lợi ích con người, đồng thời có chính sách đào tạo lại lực lượng lao động cho kỷ nguyên số.", 
    authorName: "Nguyễn Lan Anh", 
    categoryName: "Công nghệ", 
    image_url: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg", 
    is_hot: true, 
    views: 150 
  },
  { 
    title: "Trí Tuệ Nhân Tạo Trong Y Tế", 
    content: "Ứng dụng trí tuệ nhân tạo trong y tế năm 2025 đã đạt đến những thành tựu đáng kinh ngạc. Các thuật toán AI có thể chẩn đoán bệnh từ hình ảnh y tế với độ chính xác lên đến 98%, vượt trội so với khả năng của con người. Hệ thống AI phân tích dữ liệu gen giúp dự đoán nguy cơ mắc các bệnh di truyền và đề xuất phác đồ điều trị cá nhân hóa. Trong lĩnh vực dược phẩm, AI rút ngắn thời gian nghiên cứu thuốc mới từ 10 năm xuống còn 2-3 năm bằng cách mô phỏng tương tác thuốc và phân tích dữ liệu lâm sàng. Các chatbot y tế thông minh cung cấp tư vấn sức khỏe 24/7, giảm tải cho hệ thống y tế và giúp bệnh nhân tiếp cận thông tin nhanh chóng. Ở Việt Nam, Bệnh viện Bạch Mai đã triển khai hệ thống AI hỗ trợ chẩn đoán ung thư, giúp phát hiện sớm và tăng tỷ lệ điều trị thành công. Thiết bị đeo thông minh tích hợp AI theo dõi sức khỏe người dùng liên tục, cảnh báo sớm các dấu hiệu bất thường. Tuy nhiên, thách thức lớn nhất vẫn là bảo mật dữ liệu bệnh nhân và đào tạo nhân lực y tế về công nghệ mới. AI không thay thế bác sĩ mà trở thành trợ thủ đắc lực, giúp nâng cao chất lượng chăm sóc sức khỏe toàn diện.", 
    authorName: "Lê Thu Hằng", 
    categoryName: "Sức khỏe", 
    image_url: "https://images.pexels.com/photos/276287/pexels-photo-276287.jpeg", 
    is_hot: true, 
    views: 180 
  },
  { 
    title: "Phát Triển Thành Phố Thông Minh", 
    content: "Khái niệm thành phố thông minh (smart city) năm 2025 không còn là tương lai mà đã trở thành hiện thực tại nhiều quốc gia. Các thành phố áp dụng công nghệ IoT (Internet of Things) để kết nối mọi thứ từ đèn đường, camera an ninh đến hệ thống giao thông. Hệ thống quản lý giao thông thông minh sử dụng AI phân tích lưu lượng xe, điều chỉnh đèn tín hiệu theo thời gian thực, giảm ùn tắc đến 40%. Mạng lưới cảm biến môi trường theo dõi chất lượng không khí, mức độ ô nhiễm tiếng ồn và cảnh báo khi vượt ngưỡng cho phép. Ở Singapore, hệ thống giao thông công cộng tích hợp thanh toán không tiền mặt và lộ trình tối ưu qua ứng dụng di động. Tại Việt Nam, TP.HCM và Hà Nội đang triển khai dự án 'Thành phố thông minh' với trung tâm điều hành tập trung, kết nối dữ liệu từ 20 sở ngành. Các tòa nhà thông minh sử dụng năng lượng mặt trời, hệ thống quản lý năng lượng tự động và vật liệu xây dựng thân thiện môi trường. Thách thức lớn nhất là bảo mật dữ liệu và chi phí đầu tư hạ tầng. Thành phố thông minh không chỉ là công nghệ cao mà còn là nơi đáp ứng nhu cầu người dân, nâng cao chất lượng sống và phát triển bền vững.", 
    authorName: "Phạm Quốc Bảo", 
    categoryName: "Khoa học", 
    image_url: "https://images.pexels.com/photos/373544/pexels-photo-373544.jpeg", 
    is_hot: true, 
    views: 150 
  },
  { 
    title: "Xu Hướng Tiền Kỹ Thuật Số", 
    content: "Thị trường tiền kỹ thuật số năm 2025 tiếp tục phát triển mạnh mẽ với sự xuất hiện của nhiều loại tiền số mới và công nghệ blockchain cải tiến. Bitcoin và Ethereum vẫn giữ vị trí dẫn đầu, nhưng các đồng tiền số của ngân hàng trung ương (CBDC) đang thu hút sự quan tâm lớn. Trung Quốc đã chính thức phát hành nhân dân tệ kỹ thuật số, trong khi Ngân hàng Trung ương Châu Âu đang thí nghiệm đồng euro số. Công nghệ blockchain 3.0 với tốc độ giao dịch nhanh hơn và phí thấp hơn được áp dụng rộng rãi. DeFi (Tài chính phi tập trung) tiếp tục phát triển, cung cấp các dịch vụ tài chính không cần trung gian như cho vay, tiết kiệm và bảo hiểm. NFT (Token không thể thay thế) mở rộng sang lĩnh vực bất động sản và tài sản số, cho phép sở hữu phân đoạn các tài sản giá trị cao. Ở Việt Nam, Ngân hàng Nhà nước đang nghiên cứu khung pháp lý cho tiền kỹ thuật số, trong khi cộng đồng crypto ngày càng mở rộng. Tuy nhiên, thách thức về bảo mật, biến động giá và rửa tiền vẫn tồn tại. Các chuyên gia dự báo, trong 5 năm tới, tiền kỹ thuật số sẽ trở thành một phần không thể thiếu của hệ thống tài chính toàn cầu, nhưng cần sự quản lý chặt chẽ để bảo vệ nhà đầu tư.", 
    authorName: "Vũ Ngọc Anh", 
    categoryName: "Kinh doanh", 
    image_url: "https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg", 
    is_hot: true, 
    views: 140 
  },
  { 
    title: "Đạo Đức Trong Trí Tuệ Nhân Tạo", 
    content: "Khi trí tuệ nhân tạo ngày càng thâm nhập sâu vào đời sống, vấn đề đạo đức AI trở thành chủ đề nóng toàn cầu. Năm 2025, Liên Hợp Quốc đã thông qua 'Tuyên bố về Đạo đức Trí tuệ Nhân tạo', thiết lập các nguyên tắc cơ bản cho phát triển AI có trách nhiệm. Một trong những thách thức lớn nhất là sự thiên vị trong thuật toán - khi AI đưa ra quyết định phân biệt đối xử dựa trên dữ liệu đào tạo không cân bằng. Các công ty công nghệ hàng đầu như Google, Microsoft và OpenAI đã thành lập ủy ban đạo đức AI độc lập để giám sát việc phát triển sản phẩm. Vấn đề quyền riêng tư cũng được quan tâm đặc biệt khi AI có khả năng phân tích lượng dữ liệu khổng lồ về cá nhân. Ở châu Âu, Quy định AI Act yêu cầu minh bạch hóa cách thức AI đưa ra quyết định, đặc biệt trong lĩnh vực y tế và tài chính. Tại Việt Nam, Bộ Khoa học và Công nghệ đang xây dựng khung đạo đức AI quốc gia, tập trung vào bảo vệ dữ liệu người dùng và ngăn chặn lạm dụng. Các trường đại học bắt đầu đưa môn 'Đạo đức AI' vào chương trình giảng dạy. Các chuyên gia nhấn mạnh: AI cần được phát triển với tư duy nhân văn, lấy con người làm trung tâm và tuân thủ các giá trị đạo đức cơ bản.", 
    authorName: "Nguyễn Lan Anh", 
    categoryName: "Công nghệ", 
    image_url: "https://images.pexels.com/photos/377109/pexels-photo-377109.jpeg", 
    is_hot: true, 
    views: 170 
  },
  { 
    title: "Ứng Dụng Thực Tế Ảo", 
    content: "Công nghệ thực tế ảo (VR) năm 2025 đã đạt đến độ chín muồi với nhiều ứng dụng thực tiễn trong các lĩnh vực khác nhau. Trong giáo dục, VR mang đến trải nghiệm học tập sống động khi học sinh có thể 'bước vào' không gian lịch sử, tham quan bảo tàng ảo hoặc thực hành thí nghiệm khoa học mà không cần phòng lab thực. Ngành y tế ứng dụng VR để đào tạo phẫu thuật viên, giúp họ thực hành các ca mổ phức tạp trong môi trường mô phỏng 3D chân thực. Các bệnh nhân được trị liệu tâm lý thông qua VR để vượt qua ám ảnh hoặc giảm đau mãn tính. Trong bất động sản, khách hàng có thể tham quan nhà mẫu ảo từ xa, tiết kiệm thời gian và chi phí di chuyển. Ngành du lịch phát triển các tour tham quan VR, cho phép du khách trải nghiệm điểm đến trước khi đặt vé. Công nghiệp giải trí đạt bước tiến lớn với các rạp chiếu phim VR và game nhập vai thực tế ảo. Ở Việt Nam, các doanh nghiệp bắt đầu áp dụng VR trong đào tạo nhân viên và giới thiệu sản phẩm. Tuy nhiên, thách thức về chi phí thiết bị và tác động sức khỏe khi sử dụng lâu dài vẫn cần được giải quyết. VR đang dần trở thành công cụ không thể thiếu trong kỷ nguyên số.", 
    authorName: "Nguyễn Lan Anh", 
    categoryName: "Công nghệ", 
    image_url: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg", 
    is_hot: true, 
    views: 140 
  },
  { 
    title: "Thách Thức An Ninh Mạng", 
    content: "Năm 2025, an ninh mạng trở thành vấn đề sống còn của mọi tổ chức và cá nhân trong thế giới số hóa. Các cuộc tấn công mạng ngày càng tinh vi với sự hỗ trợ của trí tuệ nhân tạo, khiến cho việc phòng thủ trở nên phức tạp hơn. Tội phạm mạng sử dụng AI để tạo ra mã độc thích ứng, có khả năng tự thay đổi để né tránh phần mềm diệt virus. Các vụ tấn công ransomware nhắm vào cơ sở hạ tầng quan trọng như bệnh viện, nhà máy điện và hệ thống giao thông gây thiệt hại hàng tỷ USD. Lừa đảo qua mạng xã hội và email trở nên tinh vi hơn với kỹ thuật giả mạo sâu (deepfake). Ở cấp độ quốc gia, chiến tranh mạng giữa các nước gia tăng với các cuộc tấn công vào hệ thống tài chính và năng lượng. Để đối phó, các doanh nghiệp đầu tư mạnh vào hệ thống bảo mật đa lớp, bao gồm xác thực đa yếu tố, mã hóa dữ liệu và AI phát hiện xâm nhập. Chính phủ các nước tăng cường hợp tác quốc tế trong đấu tranh chống tội phạm mạng. Tại Việt Nam, Luật An ninh mạng được triển khai mạnh mẽ, yêu cầu doanh nghiệp lưu trữ dữ liệu quan trọng trong nước. Người dùng cần nâng cao nhận thức về bảo mật, thường xuyên cập nhật phần mềm và sử dụng mật khẩu mạnh.", 
    authorName: "Nguyễn Lan Anh", 
    categoryName: "Công nghệ", 
    image_url: "https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg", 
    is_hot: true, 
    views: 130 
  },
  { 
    title: "Trí Tuệ Nhân Tạo Trong Nông Nghiệp", 
    content: "Nông nghiệp thông minh ứng dụng AI đang cách mạng hóa ngành nông nghiệp toàn cầu năm 2025. Các hệ thống AI phân tích dữ liệu từ vệ tinh, drone và cảm biến mặt đất để đưa ra quyết định chính xác về thời điểm gieo trồng, tưới tiêu và thu hoạch. Máy kết hợp AI có khả năng nhận diện cỏ dại và chỉ phun thuốc trừ cỏ ở những khu vực cần thiết, giảm 90% lượng thuốc sử dụng. Hệ thống tưới tiêu thông minh sử dụng AI để tính toán lượng nước chính xác cho từng loại cây trồng dựa trên điều kiện thời tiết và độ ẩm đất. Trong chăn nuôi, AI theo dõi sức khỏe vật nuôi qua hình ảnh và âm thanh, phát hiện sớm bệnh tật và cảnh báo cho nông dân. Các robot thu hoạch tự động sử dụng thị giác máy tính để xác định trái cây chín và thu hoạch nhẹ nhàng mà không làm hỏng sản phẩm. Ở Việt Nam, các tỉnh Đồng bằng sông Cửu Long áp dụng AI trong canh tác lúa, giúp tăng năng suất 30% và giảm chi phí sản xuất. Hệ thống AI dự báo sâu bệnh dựa trên dữ liệu thời tiết và lịch sử dịch hại, cho phép phòng ngừa chủ động. Nông nghiệp thông minh không chỉ tăng hiệu quả sản xuất mà còn góp phần bảo vệ môi trường và đảm bảo an ninh lương thực.", 
    authorName: "Phạm Quốc Bảo", 
    categoryName: "Khoa học", 
    image_url: "https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg", 
    is_hot: true, 
    views: 120 
  },
  { 
    title: "Giải Pháp Ứng Phó Biến Đổi Khí Hậu", 
    content: "Biến đổi khí hậu năm 2025 tiếp tục là thách thức lớn nhất của nhân loại, đòi hỏi các giải pháp toàn diện và khẩn cấp. Các quốc gia đẩy mạnh chuyển đổi sang năng lượng tái tạo với mục tiêu đạt 70% điện năng từ nguồn sạch vào năm 2030. Công nghệ thu giữ carbon (CCS) được triển khai rộng rãi tại các nhà máy nhiệt điện và khu công nghiệp, giúp giảm phát thải khí nhà kính. Trong nông nghiệp, các giống cây trồng chịu hạn và chịu mặn được phát triển để thích ứng với điều kiện khí hậu khắc nghiệt. Thành phố ven biển xây dựng đê biển thông minh tích hợp cảm biến và AI để dự báo và cảnh báo sớm triều cường. Các dự án trồng rừng ngập mặn và phục hồi hệ sinh thái được triển khai tại các khu vực bị ảnh hưởng nặng nề. Ở cấp độ cá nhân, xu hướng sống xanh lan tỏa mạnh mẽ với việc giảm sử dụng nhựa một lần, tái chế rác thải và lựa chọn phương tiện giao thông thân thiện môi trường. Các doanh nghiệp áp dụng mô hình kinh tế tuần hoàn, tối ưu hóa sử dụng tài nguyên và giảm thiểu chất thải. Tại Việt Nam, Chương trình quốc gia về biến đổi khí hậu được triển khai đồng bộ từ trung ương đến địa phương. Ứng phó với biến đổi khí hậu không chỉ là trách nhiệm của chính phủ mà cần sự chung tay của toàn xã hội.", 
    authorName: "Phạm Quốc Bảo", 
    categoryName: "Khoa học", 
    image_url: "https://images.pexels.com/photos/414984/pexels-photo-414984.jpeg", 
    is_hot: true, 
    views: 110 
  },
  { 
    title: "Mở Rộng Mạng 5G", 
    content: "Năm 2025 đánh dấu sự phổ cập rộng rãi của mạng 5G trên toàn cầu với tốc độ kết nối và độ trễ được cải thiện đáng kể. Các nhà mạng viễn thông đầu tư mạnh vào hạ tầng 5G, phủ sóng đến 95% khu vực đô thị và 70% khu vực nông thôn. Tốc độ tải xuống đạt trung bình 1-2 Gbps, cho phép tải phim 4K chỉ trong vài giây. Độ trễ giảm xuống dưới 5ms, tạo điều kiện cho các ứng dụng thời gian thực như phẫu thuật từ xa và xe tự lái. 5G trở thành nền tảng cho Internet vạn vật (IoT), kết nối hàng tỷ thiết bị thông minh từ nhà cửa, thành phố đến nhà máy. Trong y tế, 5G cho phép truyền tải dữ liệu y tế khổng lồ và thực hiện tư vấn khám chữa bệnh từ xa chất lượng cao. Ngành giáo dục hưởng lợi từ 5G với các lớp học ảo thực tế tăng cường và nội dung đa phương tiện phong phú. Ở Việt Nam, các nhà mạng Viettel, VNPT và MobiFone đã triển khai 5G tại 63 tỉnh thành, đưa Việt Nam vào nhóm các nước đi đầu về công nghệ di động tại Đông Nam Á. Tuy nhiên, thách thức về an ninh mạng và chi phí thiết bị đầu cuối vẫn cần được giải quyết. 5G không chỉ là công nghệ kết nối mà còn là động lực cho chuyển đổi số toàn diện.", 
    authorName: "Nguyễn Lan Anh", 
    categoryName: "Công nghệ", 
    image_url: "https://images.pexels.com/photos/386196/pexels-photo-386196.jpeg", 
    is_hot: true, 
    views: 100 
  },
  { 
    title: "Sự Phát Triển Của Xe Điện", 
    content: "Ngành công nghiệp xe điện năm 2025 chứng kiến sự bùng nổ mạnh mẽ với sự tham gia của cả các hãng xe truyền thống và startup công nghệ. Tesla tiếp tục dẫn đầu với Model Y và Cybertruck, trong khi các hãng xe Đức như Volkswagen, BMW và Mercedes-Benz cho ra mắt nhiều mẫu xe điện cạnh tranh. Pin xe điện đạt bước tiến vượt bậc với công nghệ pin thể rắn, cho phép quãng đường di chuyển lên đến 800km chỉ với một lần sạc. Thời gian sạc nhanh được rút ngắn xuống còn 15 phút cho 80% dung lượng pin. Hạ tầng trạm sạc phát triển mạnh với các trạm sạc siêu nhanh được lắp đặt rộng rãi tại các trung tâm thương mại, bãi đỗ xe và đường cao tốc. Ở Việt Nam, VinFast tiếp tục mở rộng thị trường quốc tế và cho ra mắt dòng xe điện thế hệ mới với công nghệ tự lái cấp độ 3. Chính phủ các nước đẩy mạnh ưu đãi cho xe điện như miễn thuế, hỗ trợ lắp đặt trạm sạc và cho phép di chuyển trong làn đường ưu tiên. Người tiêu dùng ngày càng ưa chuộng xe điện nhờ chi phí vận hành thấp, bảo dưỡng đơn giản và thân thiện môi trường. Xe điện không chỉ là phương tiện giao thông mà còn trở thành thiết bị di động thông minh, tích hợp nhiều tính năng công nghệ cao.", 
    authorName: "Nguyễn Lan Anh", 
    categoryName: "Công nghệ", 
    image_url: "https://images.pexels.com/photos/1108442/pexels-photo-1108442.jpeg", 
    is_hot: true, 
    views: 90 
  },
  { 
    title: "Công Nghệ Nhà Thông Minh", 
    content: "Năm 2025, công nghệ nhà thông minh đã phát triển vượt bậc và trở thành tiêu chuẩn trong các hộ gia đình hiện đại. Các thiết bị trong nhà không chỉ kết nối với nhau mà còn có khả năng học hỏi thói quen của người dùng để tự động hóa hoàn toàn. Hệ thống chiếu sáng thông minh điều chỉnh cường độ và màu sắc ánh sáng theo thời gian trong ngày, hỗ trợ nhịp sinh học tự nhiên. Điều hòa không khí tích hợp AI có thể dự đoán nhu cầu làm mát/heating dựa trên thời tiết và lịch trình của gia chủ. Tủ lạnh thông minh không chỉ quản lý thực phẩm mà còn đề xuất công thức nấu ăn và tự động đặt hàng khi hết nguyên liệu. Hệ thống an ninh sử dụng nhận diện khuôn mặt và giọng nói để phân biệt thành viên gia đình và người lạ, gửi cảnh báo tức thì khi phát hiện đột nhập. Trong nhà bếp, lò nướng và bếp từ có thể được điều khiển từ xa qua ứng dụng di động, trong khi robot hút bụi và lau nhà tự động dọn dẹp theo lịch trình định sẵn. Ở Việt Nam, các căn hộ cao cấp tại Hà Nội và TP.HCM đều được trang bị hệ thống nhà thông minh tiêu chuẩn. Tuy nhiên, vấn đề bảo mật dữ liệu và sự phụ thuộc vào kết nối internet vẫn là thách thức cần giải quyết. Nhà thông minh không chỉ mang lại tiện nghi mà còn giúp tiết kiệm năng lượng và nâng cao chất lượng sống.", 
    authorName: "Nguyễn Lan Anh", 
    categoryName: "Công nghệ", 
    image_url: "https://images.pexels.com/photos/373545/pexels-photo-373545.jpeg", 
    is_hot: true, 
    views: 70 
  },
  { 
    title: "Trí tuệ nhân tạo trong giao thông", 
    content: "Ứng dụng trí tuệ nhân tạo trong giao thông năm 2025 đã mang lại những thay đổi đáng kể cho hệ thống giao thông toàn cầu. Các thành phố thông minh sử dụng AI để tối ưu hóa đèn giao thông, giảm ùn tắc đến 35% và thời gian chờ đợi tại các nút giao thông. Hệ thống giao thông công cộng tích hợp AI để dự báo lưu lượng hành khách, điều chỉnh lịch trình và tăng tần suất chạy xe trong giờ cao điểm. Xe tự lái cấp độ 4 đã được thử nghiệm thành công tại nhiều thành phố, với khả năng xử lý các tình huống phức tạp mà không cần sự can thiệp của con người. Trong logistics, AI tối ưu hóa lộ trình vận chuyển, tính toán thời gian giao hàng chính xác và giảm chi phí nhiên liệu. Các ứng dụng định vị sử dụng AI để đề xuất lộ trình thay thế khi phát hiện ùn tắc hoặc sự cố trên đường. Ở Việt Nam, TP.HCM và Hà Nội đang triển khai hệ thống giao thông thông minh tích hợp AI để quản lý hơn 10,000 camera giao thông. Các bãi đỗ xe thông minh sử dụng AI để hướng dẫn tài xế đến chỗ trống và thanh toán tự động. Tuy nhiên, thách thức về hạ tầng kỹ thuật số và vấn đề đạo đức trong quyết định của xe tự lái vẫn cần được giải quyết. AI đang dần trở thành bộ não của hệ thống giao thông hiện đại.", 
    authorName: "Nguyễn Lan Anh", 
    categoryName: "Công nghệ", 
    image_url: "https://images.pexels.com/photos/373534/pexels-photo-373534.jpeg", 
    is_hot: true, 
    views: 60 
  },
  { 
    title: "Đột phá trong công nghệ chỉnh sửa gen", 
    content: "Năm 2025 chứng kiến những bước tiến đột phá trong công nghệ chỉnh sửa gen, đặc biệt là với kỹ thuật CRISPR-Cas9 thế hệ mới. Các nhà khoa học đã thành công trong việc sửa chữa các đột biến gen gây ra các bệnh di truyền như thiếu máu hồng cầu hình liềm, xơ nang và loạn dưỡng cơ. Trong lĩnh vực ung thư, liệu pháp gen CAR-T được cải tiến cho hiệu quả cao hơn và ít tác dụng phụ hơn, mang lại hy vọng cho bệnh nhân ung thư giai đoạn cuối. Công nghệ chỉnh sửa gen cũng được ứng dụng trong nông nghiệp để tạo ra các giống cây trồng kháng bệnh, chịu hạn và có giá trị dinh dưỡng cao. Các nhà nghiên cứu tại Việt Nam đã thành công trong việc chỉnh sửa gen cây lúa để tăng năng suất và kháng sâu bệnh. Trong y học tái tạo, công nghệ gen giúp tạo ra các tế bào gốc được chỉnh sửa để điều trị các bệnh thoái hóa thần kinh. Tuy nhiên, những tiến bộ này cũng đặt ra các vấn đề đạo đức phức tạp, đặc biệt là về chỉnh sửa gen phôi người. Các quốc gia đang xây dựng khung pháp lý chặt chẽ để đảm bảo công nghệ chỉnh sửa gen được sử dụng vì mục đích chữa bệnh chứ không phải để 'thiết kế' em bé. Công nghệ chỉnh sửa gen hứa hẹn cách mạng hóa y học và nông nghiệp, nhưng cần sự giám sát cẩn trọng.", 
    authorName: "Lê Thu Hằng", 
    categoryName: "Sức khỏe", 
    image_url: "https://images.pexels.com/photos/260754/pexels-photo-260754.jpeg", 
    is_hot: true, 
    views: 50 
  },
  { 
    title: "Những cột mốc trong hành trình khám phá vũ trụ", 
    content: "Năm 2025 đánh dấu nhiều cột mốc quan trọng trong hành trình khám phá vũ trụ của nhân loại. NASA và SpaceX đã hoàn thành sứ mệnh Artemis 3, đưa phi hành gia trở lại Mặt Trăng sau hơn 50 năm. Trạm vũ trụ Lunar Gateway bắt đầu được xây dựng, làm bàn đạp cho các sứ mệnh khám phá Sao Hỏa. Tàu thăm dò Perseverance 2 của NASA đã hạ cánh thành công trên Sao Hỏa và bắt đầu tìm kiếm dấu hiệu sự sống cổ đại. Kính viễn vọng không gian James Webb tiếp tục gửi về những hình ảnh đáng kinh ngạc về các thiên hà xa xôi, giúp các nhà khoa học hiểu rõ hơn về nguồn gốc vũ trụ. Các công ty tư nhân như Blue Origin và Virgin Galactic đã đưa du lịch vũ trụ trở thành hiện thực với các chuyến bay thương mại đầu tiên. Ở châu Á, Trung Quốc hoàn thành trạm vũ trụ Thiên Cung và bắt đầu các thí nghiệm khoa học dài hạn. Ấn Độ thành công trong sứ mệnh Mặt Trăng Chandrayaan-4, khám phá vùng cực nam chưa từng được nghiên cứu. Các nhà khoa học cũng phát hiện nhiều ngoại hành tinh có điều kiện phù hợp cho sự sống. Hành trình khám phá vũ trụ không chỉ mở rộng hiểu biết của nhân loại mà còn thúc đẩy phát triển công nghệ và hợp tác quốc tế.", 
    authorName: "Phạm Quốc Bảo", 
    categoryName: "Khoa học", 
    image_url: "https://images.pexels.com/photos/237297/pexels-photo-237297.jpeg", 
    is_hot: true, 
    views: 40 
  },
  { 
    title: "Trí tuệ nhân tạo trong tài chính", 
    content: "Ngành tài chính năm 2025 đã chuyển mình mạnh mẽ nhờ ứng dụng trí tuệ nhân tạo vào mọi khâu hoạt động. Các ngân hàng sử dụng AI để phát hiện gian lận trong thời gian thực, phân tích hàng triệu giao dịch mỗi giây để xác định các mẫu hành vi đáng ngờ. Hệ thống cho vay tự động sử dụng machine learning để đánh giá rủi ro tín dụng chính xác hơn, dựa trên hàng nghìn điểm dữ liệu từ lịch sử tài chính đến hoạt động trên mạng xã hội. Trong đầu tư, các quỹ hedge fund sử dụng AI để phân tích thị trường và đưa ra quyết định giao dịch trong mili giây. Robo-advisor cung cấp tư vấn đầu tư tự động với chi phí thấp, giúp người dùng phổ thông tiếp cận dịch vụ quản lý tài sản chuyên nghiệp. Các chatbot AI trở thành trợ lý tài chính cá nhân, hỗ trợ người dùng lập ngân sách, tiết kiệm và đầu tư. Ở Việt Nam, các ngân hàng như Vietcombank, BIDV và Techcombank đã triển khai AI trong chăm sóc khách hàng và quản lý rủi ro. Fintech sử dụng AI để cung cấp các dịch vụ tài chính sáng tạo như cho vay ngang hàng và bảo hiểm theo yêu cầu. Tuy nhiên, thách thức về bảo mật dữ liệu và sự minh bạch trong thuật toán vẫn cần được giải quyết. AI đang cách mạng hóa ngành tài chính, mang lại dịch vụ tốt hơn với chi phí thấp hơn.", 
    authorName: "Vũ Ngọc Anh", 
    categoryName: "Kinh doanh", 
    image_url: "https://images.pexels.com/photos/209224/pexels-photo-209224.jpeg", 
    is_hot: true, 
    views: 30 
  },
  { 
    title: "Thiết bị đeo thông minh – Xu hướng mới", 
    content: "Thiết bị đeo thông minh năm 2025 không chỉ là phụ kiện công nghệ mà đã trở thành trợ thủ sức khỏe không thể thiếu. Đồng hồ thông minh thế hệ mới tích hợp cảm biến y tế tiên tiến có thể theo dõi huyết áp, đường huyết và nồng độ oxy trong máu mà không cần xâm lấn. Vòng đeo tay thể thao sử dụng AI để phân tích chất lượng giấc ngủ, đề xuất thời gian ngủ tối ưu và đánh thức người dùng vào thời điểm phù hợp trong chu kỳ giấc ngủ. Các thiết bị đeo cho người cao tuổi được trang bị cảm biến phát hiện té ngã và tự động gọi cấp cứu khi cần thiết. Trong thể thao chuyên nghiệp, thiết bị đeo cung cấp dữ liệu chi tiết về hiệu suất vận động viên, giúp huấn luyện viên điều chỉnh chế độ tập luyện. Smart clothing - quần áo thông minh - tích hợp cảm biến theo dõi tư thế và cảnh báo khi người dùng ngồi sai tư thế trong thời gian dài. Ở Việt Nam, thị trường thiết bị đeo tăng trưởng ấn tượng với sự tham gia của cả thương hiệu quốc tế và local brand. Các thiết bị đeo cũng kết nối với hệ thống y tế, cho phép bác sĩ theo dõi sức khỏe bệnh nhân từ xa. Tuy nhiên, vấn đề bảo mật dữ liệu sức khỏe và độ chính xác của cảm biến vẫn cần được cải thiện. Thiết bị đeo đang dần trở thành bác sĩ cá nhân của mỗi người.", 
    authorName: "Lê Thu Hằng", 
    categoryName: "Sức khỏe", 
    image_url: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg", 
    is_hot: true, 
    views: 20 
  },
  { 
    title: "Trí tuệ nhân tạo trong sản xuất công nghiệp", 
    content: "Công nghiệp 4.0 năm 2025 đã đạt đến đỉnh cao với sự tích hợp sâu rộng của trí tuệ nhân tạo vào quy trình sản xuất. Các nhà máy thông minh sử dụng AI để tối ưu hóa toàn bộ chuỗi sản xuất, từ quản lý nguyên vật liệu đến kiểm soát chất lượng sản phẩm. Robot công nghiệp tích hợp thị giác máy tính và học sâu có thể thực hiện các thao tác phức tạp với độ chính xác micromet. Hệ thống bảo trì dự đoán sử dụng AI để phân tích dữ liệu từ cảm biến, dự báo thời điểm thiết bị cần bảo trì và lên kế hoạch sửa chữa trước khi xảy ra sự cố. Trong quản lý chất lượng, AI tự động phát hiện lỗi sản phẩm thông qua hình ảnh với độ chính xác 99.9%, vượt trội so với mắt thường của con người. Các nhà máy sử dụng digital twin - bản sao số - để mô phỏng và tối ưu hóa quy trình sản xuất trước khi triển khai thực tế. Ở Việt Nam, các khu công nghiệp tại Bắc Ninh, Đồng Nai và Bình Dương đã áp dụng AI trong sản xuất, nâng cao năng suất 25-30%. AI cũng giúp tối ưu hóa sử dụng năng lượng, giảm tiêu thụ điện và khí thải carbon. Tuy nhiên, thách thức về đầu tư công nghệ và đào tạo nhân lực vẫn tồn tại. AI đang cách mạng hóa ngành sản xuất, tạo ra các nhà máy thông minh, linh hoạt và hiệu quả.", 
    authorName: "Phạm Quốc Bảo", 
    categoryName: "Khoa học", 
    image_url: "https://images.pexels.com/photos/256297/pexels-photo-256297.jpeg", 
    is_hot: true, 
    views: 10 
  },
  { 
    title: "Công nghệ Blockchain và tương lai Internet", 
    content: "Công nghệ blockchain năm 2025 đã vượt xa khỏi phạm vi tiền điện tử để trở thành nền tảng cho thế hệ Internet mới - Web 3.0. Các ứng dụng phi tập trung (DApps) đang thay đổi cách chúng ta tương tác trực tuyến, từ mạng xã hội đến thương mại điện tử. Smart contract (hợp đồng thông minh) tự động hóa các giao dịch mà không cần trung gian, giảm chi phí và tăng tính minh bạch. Trong lĩnh vực bảo mật, blockchain cung cấp giải pháp xác thực danh tính số, bảo vệ người dùng khỏi hành vi đánh cắp thông tin. Các tập đoàn lớn như IBM, Microsoft và Amazon đang triển khai blockchain trong quản lý chuỗi cung ứng để theo dõi nguồn gốc sản phẩm từ nguyên liệu thô đến tay người tiêu dùng. Ở Việt Nam, Ngân hàng Nhà nước đang thí nghiệm blockchain trong hệ thống thanh toán liên ngân hàng, trong khi Bộ Tài chính nghiên cứu ứng dụng trong quản lý thuế. Công nghệ blockchain cũng được sử dụng trong bầu cử điện tử, đảm bảo tính minh bạch và không thể gian lận. Tuy nhiên, thách thức về khả năng mở rộng và tiêu thụ năng lượng vẫn cần được giải quyết. Blockchain hứa hẹn xây dựng một Internet phi tập trung, nơi người dùng kiểm soát dữ liệu của chính mình.", 
    authorName: "Nguyễn Lan Anh", 
    categoryName: "Công nghệ", 
    image_url: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg", 
    is_hot: true, 
    views: 95 
  },
  { 
    title: "Phong trào thể thao cộng đồng tại Việt Nam", 
    content: "Phong trào thể thao cộng đồng tại Việt Nam năm 2025 phát triển mạnh mẽ với sự tham gia của hàng triệu người dân ở mọi lứa tuổi. Các câu lạc bộ chạy bộ, đạp xe và yoga mọc lên khắp các tỉnh thành, tạo nên một cộng đồng thể thao sôi động. Ở Hà Nội, công viên Thống Nhất và công viên Yên Sở trở thành điểm hẹn lý tưởng cho những người yêu thể thao vào mỗi sáng sớm và chiều tối. Tại TP.HCM, các sự kiện chạy bộ cộng đồng như Color Me Run, Night Run thu hút hàng chục nghìn người tham gia. Chính phủ đã đầu tư xây dựng hơn 5,000 sân thể thao tại các khu dân cư, tạo điều kiện cho người dân rèn luyện sức khỏe. Các ứng dụng thể thao như WeFit, LEEP.app kết nối người chơi và tổ chức các giải đấu cộng đồng. Đặc biệt, phong trào thể thao cho người cao tuổi phát triển mạnh với các môn như dưỡng sinh, thái cực quyền và khiêu vũ. Ở nông thôn, các trò chơi dân gian như kéo co, đẩy gậy được khôi phục và tổ chức thường xuyên. Thể thao cộng đồng không chỉ nâng cao sức khỏe mà còn gắn kết cộng đồng và lan tỏa lối sống tích cực.", 
    authorName: "Trần Minh Tuấn", 
    categoryName: "Thể thao", 
    image_url: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg", 
    is_hot: false, 
    views: 65 
  },
  { 
    title: "Lễ hội âm nhạc quốc tế 2025", 
    content: "Năm 2025 chứng kiến sự trở lại hoành tráng của các lễ hội âm nhạc quốc tế sau thời gian gián đoạn do đại dịch. Lễ hội Tomorrowland tại Bỉ thu hút hơn 600,000 người tham dự với dàn nghệ sĩ đình đám từ khắp nơi trên thế giới. Coachella Valley Music and Arts Festival ở Mỹ giới thiệu công nghệ trình diễn mới với hologram 3D và thực tế ảo, mang đến trải nghiệm âm nhạc đa giác quan. Tại châu Á, Ultra Music Festival Singapore tổ chức thành công với sự góp mặt của các DJ hàng đầu và hệ thống âm thanh, ánh sáng tiên tiến. Ở Việt Nam, lễ hội âm nhạc quốc tế GMA (Global Music Festival) được tổ chức tại Đà Nẵng, quy tụ hơn 50,000 khán giả và các nghệ sĩ từ Hàn Quốc, Mỹ, châu Âu. Các lễ hội âm nhạc không chỉ là nơi giải trí mà còn trở thành sự kiện văn hóa, thúc đẩy du lịch và giao lưu quốc tế. Xu hướng 'lễ hội xanh' nổi lên với việc sử dụng năng lượng tái tạo, giảm rác thải nhựa và khuyến khích phương tiện di chuyển thân thiện môi trường. Công nghệ live streaming cho phép hàng triệu khán giả toàn cầu tham gia lễ hội từ xa. Âm nhạc tiếp tục chứng minh sức mạnh kết nối con người vượt qua biên giới địa lý.", 
    authorName: "Nguyễn Lan Anh", 
    categoryName: "Giải trí", 
    image_url: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg", 
    is_hot: true, 
    views: 110 
  },
  { 
    title: "Chính sách đối ngoại của các cường quốc", 
    content: "Năm 2025, các cường quốc trên thế giới đang điều chỉnh chiến lược đối ngoại trong bối cảnh địa chính trị biến động mạnh. Mỹ tiếp tục thực hiện chính sách 'Ấn Độ Dương - Thái Bình Dương Tự do và Rộng mở', tăng cường hợp tác với các đồng minh như Nhật Bản, Hàn Quốc và Australia để kiềm chế ảnh hưởng của Trung Quốc. Trung Quốc đẩy mạnh Sáng kiến Vành đai và Con đường, mở rộng đầu tư cơ sở hạ tầng tại châu Phi, châu Á và Mỹ Latin. Liên minh châu Âu tập trung vào an ninh năng lượng và giảm phụ thuộc vào nhiên liệu hóa thạch từ Nga sau khủng hoảng Ukraine. Nga tăng cường quan hệ với các nước Trung Đông và châu Á, tìm kiếm đối tác mới sau khi bị cô lập từ phương Tây. Ấn Độ nổi lên như cường quốc trung lập, cân bằng quan hệ với cả Mỹ và Nga, đồng thời thúc đẩy hợp tác trong khuôn khổ BRICS. Ở Đông Nam Á, ASEAN đóng vai trò trung tâm trong việc duy trì hòa bình và ổn định khu vực, thúc đẩy đối thoại giữa các nước lớn. Các vấn đề toàn cầu như biến đổi khí hậu, an ninh mạng và đại dịch tiếp tục thúc đẩy hợp tác đa phương bất chấp cạnh tranh chiến lược.", 
    authorName: "Ngô Văn Long", 
    categoryName: "Chính trị", 
    image_url: "https://images.pexels.com/photos/208494/pexels-photo-208494.jpeg", 
    is_hot: false, 
    views: 85 
  },
  { 
    title: "Phòng chống bệnh không lây nhiễm", 
    content: "Các bệnh không lây nhiễm như tim mạch, tiểu đường, ung thư và hô hấp mãn tính đang trở thành gánh nặng y tế toàn cầu, chiếm 74% tổng số ca tử vong. Năm 2025, Tổ chức Y tế Thế giới (WHO) phát động chiến dịch toàn cầu nhằm giảm 1/3 tỷ lệ tử vong sớm do bệnh không lây nhiễm. Các quốc gia tập trung vào phòng ngừa thông qua kiểm soát các yếu tố nguy cơ: thuốc lá, rượu bia, chế độ ăn không lành mạnh và thiếu vận động. Chương trình sàng lọc sớm được triển khai rộng rãi, giúp phát hiện bệnh ở giai đoạn đầu khi điều trị hiệu quả và chi phí thấp. Ở Việt Nam, Bộ Y tế triển khai 'Chương trình Sức khỏe Việt Nam' với mục tiêu giảm 30% tỷ lệ hút thuốc và 10% tỷ lệ tiêu thụ muối vào năm 2030. Các bệnh viện tuyến tỉnh được trang bị thiết bị chẩn đoán hiện đại để phát hiện sớm ung thư và bệnh tim mạch. Ứng dụng công nghệ số trong quản lý bệnh mãn tính, cho phép bệnh nhân theo dõi chỉ số sức khỏe tại nhà và nhận tư vấn từ xa. Giáo dục sức khỏe trong trường học và cộng đồng được tăng cường để nâng cao nhận thức về phòng chống bệnh không lây nhiễm. Phòng bệnh hơn chữa bệnh trở thành triết lý y tế chủ đạo trong thập kỷ mới.", 
    authorName: "Lê Thu Hằng", 
    categoryName: "Sức khỏe", 
    image_url: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg", 
    is_hot: true, 
    views: 120 
  },
  { 
    title: "Khám phá vũ trụ với kính thiên văn mới", 
    content: "Năm 2025 đánh dấu kỷ nguyên vàng của thiên văn học với sự ra mắt của thế hệ kính thiên văn mới có khả năng quan sát chưa từng có. Kính thiên văn Không gian James Webb tiếp tục gửi về những hình ảnh đáng kinh ngạc về các thiên hà đầu tiên của vũ trụ, giúp các nhà khoa học hiểu rõ hơn về sự hình thành của vũ trụ sau Vụ nổ Lớn. Trên mặt đất, Kính thiên văn Cực lớn (ELT) của Đài thiên văn Nam Âu bắt đầu hoạt động với đường kính gương 39 mét, cho phép quan sát trực tiếp các ngoại hành tinh và tìm kiếm dấu hiệu sự sống. Kính thiên văn Square Kilometre Array (SKA) - hệ thống kính thiên văn vô tuyến lớn nhất thế giới - bắt đầu thu thập dữ liệu, nghiên cứu sự tiến hóa của thiên hà và bản chất của vật chất tối. Ở Việt Nam, Đài thiên văn Nha Trang và Hòa Lạc tiếp tục đóng góp vào nghiên cứu thiên văn trong khu vực, đồng thời phổ biến kiến thức cho cộng đồng. Các kính thiên văn mới không chỉ mở rộng hiểu biết của chúng ta về vũ trụ mà còn thúc đẩy phát triển công nghệ như quang học thích ứng, xử lý dữ liệu lớn và trí tuệ nhân tạo. Khám phá vũ trụ tiếp tục là hành trình khám phá vĩ đại nhất của nhân loại.", 
    authorName: "Phạm Quốc Bảo", 
    categoryName: "Khoa học", 
    image_url: "https://images.pexels.com/photos/2166/flight-sky-earth-space.jpg", 
    is_hot: true, 
    views: 75 
  },
  { 
    title: "Chiến lược marketing trong kỷ nguyên số", 
    content: "Marketing trong kỷ nguyên số năm 2025 đã chuyển đổi hoàn toàn so với thập kỷ trước, với sự thống trị của dữ liệu lớn, trí tuệ nhân tạo và cá nhân hóa. Các doanh nghiệp sử dụng AI để phân tích hành vi người dùng và cung cấp trải nghiệm được cá nhân hóa ở mức độ sâu. Chatbot và trợ lý ảo trở thành kênh tương tác chính với khách hàng, cung cấp hỗ trợ 24/7 và đề xuất sản phẩm phù hợp. Video marketing tiếp tục phát triển với sự bùng nổ của short-form video trên nền tảng như TikTok, Instagram Reels và YouTube Shorts. Influencer marketing chuyển từ macro-influencer sang micro-influencer, tập trung vào các chuyên gia có ảnh hưởng trong niche cụ thể. Search Engine Optimization (SEO) chuyển sang tập trung vào ý định tìm kiếm và trải nghiệm người dùng thay vì từ khóa đơn thuần. Voice search optimization trở nên quan trọng khi ngày càng nhiều người dùng tìm kiếm bằng giọng nói thông qua trợ lý ảo. Ở Việt Nam, các doanh nghiệp SME áp dụng marketing đa kênh, kết hợp online và offline để tiếp cận khách hàng mọi lúc, mọi nơi. Công nghệ thực tế tăng cường (AR) được sử dụng để khách hàng 'dùng thử' sản phẩm trước khi mua. Marketing trong kỷ nguyên số không còn là quảng cáo đơn thuần mà là xây dựng mối quan hệ lâu dài với khách hàng.", 
    authorName: "Vũ Ngọc Anh", 
    categoryName: "Kinh doanh", 
    image_url: "https://images.pexels.com/photos/3184288/pexels-photo-3184288.jpeg", 
    is_hot: false, 
    views: 90 
  },
  { 
    title: "Những bãi biển hoang sơ tại Đông Nam Á", 
    content: "Đông Nam Á sở hữu những bãi biển hoang sơ với vẻ đẹp nguyên thủy ít nơi nào trên thế giới sánh bằng. Ở Philippines, bãi biển Nacpan Beach trên đảo El Nido được mệnh danh là thiên đường với cát trắng mịn và nước biển trong xanh như pha lê. Tại Indonesia, bãi biển Pink Beach trên đảo Komodo nổi tiếng với cát hồng độc đáo do san hô đỏ bị vỡ vụn. Ở Thái Lan, bãi biển Railay Beach tại Krabi chỉ có thể tiếp cận bằng thuyền, bao quanh bởi các vách đá vôi hùng vĩ. Việt Nam tự hào với bãi biển Cổ Thạch ở Bình Thuận, nơi có những viên đá cuội nhiều màu sắc và hệ thống đá tự nhiên độc đáo. Bãi biển Long Beach trên đảo Phú Quốc sở hữu bãi cát trắng trải dài 20km và hoàng hôn tuyệt đẹp. Ở Malaysia, bãi biển Datai Bay trên đảo Langkawi được bao quanh bởi rừng nhiệt đới nguyên sinh và hệ động thực vật phong phú. Các bãi biển hoang sơ không chỉ có cảnh quan đẹp mà còn là nơi lý tưởng cho các hoạt động như lặn biển ngắm san hô, chèo thuyền kayak và tắm nắng. Du lịch bền vững đang được khuyến khích để bảo vệ những bãi biển nguyên sơ này cho thế hệ tương lai.", 
    authorName: "Đỗ Hoàng Nam", 
    categoryName: "Du lịch", 
    image_url: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg", 
    is_hot: true, 
    views: 130 
  },
  { 
    title: "Đổi mới phương pháp giảng dạy đại học", 
    content: "Giáo dục đại học năm 2025 đang trải qua cuộc cách mạng về phương pháp giảng dạy để đáp ứng nhu cầu của thế hệ sinh viên số và thị trường lao động thay đổi. Mô hình 'lớp học đảo ngược' (flipped classroom) trở thành tiêu chuẩn, nơi sinh viên học lý thuyết trực tuyến và dành thời gian trên lớp cho thảo luận và thực hành. Project-based learning (học qua dự án) được áp dụng rộng rãi, cho phép sinh viên giải quyết các vấn đề thực tế từ doanh nghiệp. Công nghệ thực tế ảo và tăng cường được sử dụng để tạo ra các phòng thí nghiệm ảo và mô phỏng thực tế. Hệ thống học tập thích ứng (adaptive learning) sử dụng AI để điều chỉnh nội dung và tốc độ học tập phù hợp với từng sinh viên. Ở Việt Nam, các trường đại học hàng đầu như Đại học Quốc gia Hà Nội, Đại học Bách khoa Hà Nội đã chuyển đổi sang mô hình giáo dục 4.0 với các phòng học thông minh và nền tảng học tập số. Sự hợp tác giữa trường đại học và doanh nghiệp được tăng cường thông qua các chương trình thực tập, dự án nghiên cứu và giảng viên thỉnh giảng từ doanh nghiệp. Đánh giá năng lực chuyển từ thi cử truyền thống sang đánh giá liên tục qua portfolio và năng lực thực tế. Giáo dục đại học không còn là truyền thụ kiến thức mà là phát triển năng lực tự học và thích nghi suốt đời.", 
    authorName: "Phan Thùy Dung", 
    categoryName: "Giáo dục", 
    image_url: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg", 
    is_hot: false, 
    views: 70 
  },
  { 
    title: "Xu hướng làm việc từ xa sau đại dịch", 
    content: "Mô hình làm việc từ xa đã trở thành xu hướng chủ đạo trong thế giới hậu đại dịch, với hơn 40% lực lượng laoạo toàn cầu làm việc từ xa ít nhất một phần thời gian. Các công ty công nghệ hàng đầu như Google, Microsoft và Meta đã áp dụng chính sách làm việc linh hoạt, cho phép nhân viên làm việc hoàn toàn từ xa hoặc kết hợp. Coworking spaces phát triển mạnh tại các thành phố lớn, cung cấp không gian làm việc chuyên nghiệp cho freelancer và remote workers. Công nghệ hỗ trợ làm việc từ xa như Zoom, Slack, Microsoft Teams tiếp tục được cải tiến với tính năng AI như phiên dịch thời gian thực và ghi chú tự động. Ở Việt Nam, các startup công nghệ và công ty đa quốc gia dẫn đầu trong việc áp dụng mô hình làm việc từ xa, trong khi doanh nghiệp truyền thống bắt đầu thí điểm. Xu hướng 'digital nomad' (du mục số) phát triển, cho phép người lao động làm việc từ bất kỳ đâu trên thế giới. Tuy nhiên, thách thức về văn hóa doanh nghiệp, quản lý hiệu suất và wellbeing của nhân viên cần được giải quyết. Làm việc từ xa không chỉ thay đổi cách chúng ta làm việc mà còn tác động đến quy hoạch đô thị, bất động sản và giao thông.", 
    authorName: "Vũ Ngọc Anh", 
    categoryName: "Kinh doanh", 
    image_url: "https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg", 
    is_hot: true, 
    views: 105 
  }
];




// --- Hàm seed ---
async function seedDatabase() {
  try {
    console.log("🌱 Seeding database...");

    // USERS
    for (const user of SAMPLE_USERS) {
      await sql`
        INSERT INTO users (username, password, email, role, avatar_url)
        VALUES (${user.username}, ${user.password}, ${user.email}, ${user.role}, ${user.avatar_url})
        ON CONFLICT (email) DO NOTHING;
      `;
    }

    // CATEGORIES
    for (const category of SAMPLE_CATEGORIES) {
      await sql`
        INSERT INTO categories (name)
        VALUES (${category.name})
        ON CONFLICT (name) DO NOTHING;
      `;
    }

    // AUTHORS
    for (const author of SAMPLE_AUTHORS) {
      const user = await sql`SELECT id FROM users WHERE username = ${author.username}`;
      if (user.length > 0) {
        await sql`
          INSERT INTO authors (name, bio, user_id)
          VALUES (${author.name}, ${author.bio}, ${user[0].id})
          ON CONFLICT (name) DO NOTHING;
        `;
      }
    }

    // NEWS
    for (const news of SAMPLE_NEWS) {
      const author = await sql`SELECT id FROM authors WHERE name = ${news.authorName}`;
      const category = await sql`SELECT id FROM categories WHERE name = ${news.categoryName}`;
      if (author.length > 0 && category.length > 0) {
        await sql`
          INSERT INTO news (title, content, author_id, category_id, image_url, is_hot, views)
          VALUES (${news.title}, ${news.content}, ${author[0].id}, ${category[0].id}, ${news.image_url}, ${news.is_hot}, ${news.views})
          ON CONFLICT (title) DO NOTHING;
        `;
      }
    }

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
}

seedDatabase();
