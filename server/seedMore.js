const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const { applyProductImage } = require('./src/utils/productImageHelper');

dotenv.config();

const buildProduct = ({
  name,
  category,
  brand,
  price,
  description,
  image,
  stock,
  featured = false,
  shoes = [],
  clothes = [],
}) => ({
  name,
  category,
  brand,
  price,
  description,
  image,
  stock,
  featured,
  sizes: {
    shoes,
    clothes,
  },
});

const shoeProducts = [
  buildProduct({
    name: 'Giày Chạy RoadPulse Nitro',
    category: 'Giày',
    brand: 'RunTech',
    price: 2090000,
    description: 'Giày chạy bộ đệm êm, phản hồi lực tốt, phù hợp chạy dài và tập cardio hằng ngày.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    stock: 18,
    featured: true,
    shoes: ['38', '39', '40', '41', '42', '43', '44'],
  }),
  buildProduct({
    name: 'Giày Tập Gym ForceLift Neo',
    category: 'Giày',
    brand: 'FlexCore',
    price: 1490000,
    description: 'Đế chắc, thân giày ôm vừa chân, hỗ trợ squat, deadlift và các bài tập sức mạnh.',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80',
    stock: 14,
    shoes: ['39', '40', '41', '42', '43', '44'],
  }),
  buildProduct({
    name: 'Giày Bóng Đá TurboStrike TF',
    category: 'Giày',
    brand: 'KickPro',
    price: 1390000,
    description: 'Thiết kế cho sân cỏ nhân tạo, tăng độ bám và hỗ trợ tăng tốc trong các pha bứt tốc ngắn.',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80',
    stock: 13,
    shoes: ['39', '40', '41', '42', '43', '44'],
  }),
  buildProduct({
    name: 'Giày Tennis Baseline Drive',
    category: 'Giày',
    brand: 'RacketOne',
    price: 1590000,
    description: 'Giày tennis ổn định, bền mặt đế, hỗ trợ di chuyển ngang và đổi hướng liên tục.',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=900&q=80',
    stock: 11,
    shoes: ['39', '40', '41', '42', '43'],
  }),
  buildProduct({
    name: 'Giày Bóng Rổ SkyRise Elite',
    category: 'Giày',
    brand: 'CourtMax',
    price: 1990000,
    description: 'Cổ giày cao vừa, đệm êm và độ bám ổn định cho những buổi tập bóng rổ cường độ cao.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    stock: 9,
    featured: true,
    shoes: ['40', '41', '42', '43', '44'],
  }),
  buildProduct({
    name: 'Giày Cầu Lông SwiftCourt 5',
    category: 'Giày',
    brand: 'ShuttlePro',
    price: 1290000,
    description: 'Giày nhẹ, bám sàn tốt, hỗ trợ bật nhảy và di chuyển linh hoạt trên sân trong nhà.',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80',
    stock: 16,
    shoes: ['38', '39', '40', '41', '42', '43'],
  }),
  buildProduct({
    name: 'Giày Pickleball RallyMotion',
    category: 'Giày',
    brand: 'CourtMax',
    price: 1350000,
    description: 'Tối ưu cho bước di chuyển ngắn, ổn định cổ chân và giữ độ bám tốt trên mặt sân cứng.',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80',
    stock: 10,
    shoes: ['39', '40', '41', '42', '43', '44'],
  }),
  buildProduct({
    name: 'Giày Đi Bộ UrbanStride Max',
    category: 'Giày',
    brand: 'Velocity',
    price: 1190000,
    description: 'Thiết kế êm chân, thoáng khí và phù hợp đi bộ, đi làm hoặc sử dụng hằng ngày.',
    image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=900&q=80',
    stock: 22,
    shoes: ['38', '39', '40', '41', '42', '43'],
  }),
  buildProduct({
    name: 'Giày Trail Running PeakFlow',
    category: 'Giày',
    brand: 'TrailMax',
    price: 1890000,
    description: 'Đế gai bám địa hình tốt, thân giày chắc chắn, phù hợp chạy trail nhẹ và leo dốc ngắn.',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=900&q=80',
    stock: 12,
    shoes: ['39', '40', '41', '42', '43', '44'],
  }),
  buildProduct({
    name: 'Giày Futsal ControlTouch IC',
    category: 'Giày',
    brand: 'KickPower',
    price: 1250000,
    description: 'Giày futsal cho cảm giác chạm bóng ổn, hỗ trợ rê dắt và xoay người trong sân nhỏ.',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80',
    stock: 15,
    shoes: ['39', '40', '41', '42', '43', '44'],
  }),
];

const shirtProducts = [
  buildProduct({
    name: 'Áo Thun Running AeroDry 2.0',
    category: 'Áo',
    brand: 'RunElite',
    price: 420000,
    description: 'Áo chạy bộ siêu nhẹ, khô nhanh, hạn chế bám mồ hôi trong các buổi tập ngoài trời.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    stock: 28,
    clothes: ['S', 'M', 'L', 'XL', 'XXL'],
  }),
  buildProduct({
    name: 'Áo Tập Gym CoreFit Seamless',
    category: 'Áo',
    brand: 'FlexCore',
    price: 480000,
    description: 'Áo tập ôm vừa người, co giãn tốt, hỗ trợ vận động mạnh và giữ form khi tập.',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80',
    stock: 24,
    clothes: ['S', 'M', 'L', 'XL'],
  }),
  buildProduct({
    name: 'Áo Polo Training ActiveLine',
    category: 'Áo',
    brand: 'ActivePro',
    price: 530000,
    description: 'Áo polo thể thao lịch sự, thoáng mát, phù hợp chơi golf, tennis hoặc mặc hằng ngày.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',
    stock: 19,
    clothes: ['S', 'M', 'L', 'XL'],
  }),
  buildProduct({
    name: 'Áo Khoác Track Jacket Motion',
    category: 'Áo',
    brand: 'LayerPro',
    price: 890000,
    description: 'Áo khoác thể thao nhẹ, giữ nhiệt vừa phải và dễ phối với outfit tập luyện hằng ngày.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
    stock: 16,
    featured: true,
    clothes: ['M', 'L', 'XL', 'XXL'],
  }),
  buildProduct({
    name: 'Áo Bóng Đá Club Performance',
    category: 'Áo',
    brand: 'KickPro',
    price: 390000,
    description: 'Vải thoáng khí, mềm nhẹ, phù hợp đá bóng phong trào và mặc đi chơi cuối tuần.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=80',
    stock: 30,
    clothes: ['S', 'M', 'L', 'XL', 'XXL'],
  }),
  buildProduct({
    name: 'Áo Tank Top Gym Pump',
    category: 'Áo',
    brand: 'PowerWear',
    price: 340000,
    description: 'Áo ba lỗ tập gym thoáng khí, tạo cảm giác thoải mái khi tập thân trên và cardio.',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
    stock: 27,
    clothes: ['S', 'M', 'L', 'XL'],
  }),
  buildProduct({
    name: 'Áo Dài Tay Compression Flow',
    category: 'Áo',
    brand: 'FitTech',
    price: 520000,
    description: 'Áo compression dài tay hỗ trợ giữ ấm, thoát hơi tốt và ôm gọn cơ thể khi vận động.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    stock: 18,
    clothes: ['S', 'M', 'L', 'XL'],
  }),
  buildProduct({
    name: 'Áo Tennis Mesh Pro',
    category: 'Áo',
    brand: 'RacketOne',
    price: 450000,
    description: 'Áo thể thao có lưới thoát khí, hỗ trợ chuyển động vai tay thoải mái khi chơi vợt.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    stock: 22,
    clothes: ['S', 'M', 'L', 'XL'],
  }),
  buildProduct({
    name: 'Áo Hoodie Sport Casual 365',
    category: 'Áo',
    brand: 'UrbanSport',
    price: 760000,
    description: 'Áo hoodie thể thao phong cách trẻ trung, mặc ấm nhẹ và phù hợp sử dụng hằng ngày.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
    stock: 14,
    clothes: ['M', 'L', 'XL', 'XXL'],
  }),
  buildProduct({
    name: 'Áo Bơi Rashguard OceanFit',
    category: 'Áo',
    brand: 'SwimPro',
    price: 560000,
    description: 'Áo bơi chống nắng, co giãn tốt, phù hợp bơi lội và các hoạt động thể thao dưới nước.',
    image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80',
    stock: 12,
    clothes: ['S', 'M', 'L', 'XL'],
  }),
];

const pantsProducts = [
  buildProduct({
    name: 'Quần Short RunFlex Split',
    category: 'Quần',
    brand: 'RunElite',
    price: 360000,
    description: 'Quần short chạy bộ nhẹ, thoáng và hỗ trợ sải chân thoải mái trong mọi cự ly.',
    image: 'https://images.unsplash.com/photo-1506629905607-d9b1a0c7c40d?auto=format&fit=crop&w=900&q=80',
    stock: 26,
    clothes: ['S', 'M', 'L', 'XL'],
  }),
  buildProduct({
    name: 'Quần Jogger Training Taper',
    category: 'Quần',
    brand: 'ActivePro',
    price: 520000,
    description: 'Quần jogger thể thao gọn form, dễ tập luyện và dễ phối cho sinh hoạt hằng ngày.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    stock: 20,
    clothes: ['S', 'M', 'L', 'XL', 'XXL'],
  }),
  buildProduct({
    name: 'Quần Legging Motion Sculpt',
    category: 'Quần',
    brand: 'YogaFit',
    price: 470000,
    description: 'Quần legging co giãn tốt, ôm chân gọn và phù hợp yoga, pilates hoặc chạy bộ nhẹ.',
    image: 'https://images.unsplash.com/photo-1506629905607-d9b1a0c7c40d?auto=format&fit=crop&w=900&q=80',
    stock: 24,
    clothes: ['S', 'M', 'L', 'XL'],
  }),
  buildProduct({
    name: 'Quần Dài Gym TechWeave',
    category: 'Quần',
    brand: 'FlexCore',
    price: 610000,
    description: 'Chất vải bền, co giãn và thoáng khí, phù hợp cho các buổi tập sức mạnh trong phòng gym.',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
    stock: 15,
    clothes: ['M', 'L', 'XL', 'XXL'],
  }),
  buildProduct({
    name: 'Quần Bóng Đá MatchFit',
    category: 'Quần',
    brand: 'KickPro',
    price: 290000,
    description: 'Quần thể thao dành cho đá bóng phong trào, thoáng mát và nhanh khô khi vận động mạnh.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    stock: 31,
    clothes: ['S', 'M', 'L', 'XL'],
  }),
  buildProduct({
    name: 'Quần Tennis CourtMove',
    category: 'Quần',
    brand: 'RacketOne',
    price: 430000,
    description: 'Quần short tennis có độ co giãn tốt, thuận tiện cho các động tác đổi hướng nhanh.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    stock: 17,
    clothes: ['S', 'M', 'L', 'XL'],
  }),
  buildProduct({
    name: 'Quần Nỉ WarmUp Comfort',
    category: 'Quần',
    brand: 'LayerPro',
    price: 580000,
    description: 'Quần nỉ thể thao giữ ấm nhẹ, phù hợp mặc trước buổi tập hoặc di chuyển ngoài trời.',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=900&q=80',
    stock: 13,
    featured: true,
    clothes: ['M', 'L', 'XL', 'XXL'],
  }),
  buildProduct({
    name: 'Quần Bơi Jammer AquaSpeed',
    category: 'Quần',
    brand: 'SwimPro',
    price: 390000,
    description: 'Quần bơi jammer ôm gọn, hạn chế cản nước và tạo cảm giác thoải mái khi bơi dài.',
    image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80',
    stock: 12,
    clothes: ['S', 'M', 'L', 'XL'],
  }),
  buildProduct({
    name: 'Quần Track Pants AeroMove',
    category: 'Quần',
    brand: 'UrbanSport',
    price: 640000,
    description: 'Track pants dáng thể thao hiện đại, êm nhẹ và phù hợp cho cả tập luyện lẫn đi chơi.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    stock: 18,
    clothes: ['S', 'M', 'L', 'XL'],
  }),
  buildProduct({
    name: 'Quần Golf Stretch Motion',
    category: 'Quần',
    brand: 'GolfFlex',
    price: 720000,
    description: 'Quần golf co giãn bốn chiều, giữ phom đẹp và thoải mái khi di chuyển nhiều trên sân.',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
    stock: 14,
    clothes: ['S', 'M', 'L', 'XL'],
  }),
];

const accessoryProducts = [
  buildProduct({
    name: 'Balo Thể Thao TransitPack 30L',
    category: 'Phụ kiện',
    brand: 'TrailMax',
    price: 690000,
    description: 'Balo đa năng có ngăn giày riêng, ngăn laptop và quai đeo êm cho nhu cầu di chuyển hằng ngày.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
    stock: 11,
    featured: true,
  }),
  buildProduct({
    name: 'Mũ Chạy Bộ SunGuard Lite',
    category: 'Phụ kiện',
    brand: 'RunGear',
    price: 210000,
    description: 'Mũ lưỡi trai nhẹ, thoáng khí và hỗ trợ chống nắng trong các buổi chạy sáng.',
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80',
    stock: 38,
  }),
  buildProduct({
    name: 'Găng Tay Gym GripMax 2.0',
    category: 'Phụ kiện',
    brand: 'GymGear',
    price: 310000,
    description: 'Găng tay tập gym tăng độ bám, giảm đau rát lòng bàn tay khi tập tạ và xà đơn.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
    stock: 25,
  }),
  buildProduct({
    name: 'Bình Nước Inox HydraSteel 750ml',
    category: 'Phụ kiện',
    brand: 'HydraGo',
    price: 260000,
    description: 'Bình nước giữ nhiệt tốt, nắp bật tiện lợi và phù hợp mang theo khi đi tập hoặc đi làm.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',
    stock: 34,
  }),
  buildProduct({
    name: 'Tất Thể Thao AirCushion Pack 3',
    category: 'Phụ kiện',
    brand: 'ComfortSocks',
    price: 180000,
    description: 'Combo tất thể thao cổ ngắn, thấm hút tốt và hạn chế ma sát khi vận động lâu.',
    image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=900&q=80',
    stock: 48,
  }),
  buildProduct({
    name: 'Đai Lưng Tập Tạ SupportFlex',
    category: 'Phụ kiện',
    brand: 'StrengthSupport',
    price: 420000,
    description: 'Đai hỗ trợ vùng lưng dưới, phù hợp cho các bài squat, deadlift và tập core nặng.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    stock: 13,
  }),
  buildProduct({
    name: 'Túi Đeo Hông Marathon Belt',
    category: 'Phụ kiện',
    brand: 'RunGear',
    price: 240000,
    description: 'Túi đeo hông gọn nhẹ để điện thoại, chìa khóa và gel năng lượng khi chạy bộ.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    stock: 29,
  }),
  buildProduct({
    name: 'Khăn Thể Thao Cooling Towel Pro',
    category: 'Phụ kiện',
    brand: 'FitTech',
    price: 150000,
    description: 'Khăn làm mát nhanh, mềm nhẹ và dễ mang theo cho các buổi tập trong thời tiết nóng.',
    image: 'https://images.unsplash.com/photo-1526401485004-2fda9f82f8f0?auto=format&fit=crop&w=900&q=80',
    stock: 41,
  }),
  buildProduct({
    name: 'Băng Cổ Tay Tennis DualGrip',
    category: 'Phụ kiện',
    brand: 'RacketOne',
    price: 120000,
    description: 'Băng cổ tay thấm mồ hôi tốt, hỗ trợ chơi tennis, cầu lông và các môn dùng nhiều cổ tay.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    stock: 44,
  }),
  buildProduct({
    name: 'Kính Bơi AntiFog Wave',
    category: 'Phụ kiện',
    brand: 'SwimPro',
    price: 280000,
    description: 'Kính bơi chống mờ, ôm mắt tốt và phù hợp cho cả bơi giải trí lẫn tập luyện thường xuyên.',
    image: 'https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?auto=format&fit=crop&w=900&q=80',
    stock: 18,
  }),
];

const equipmentProducts = [
  buildProduct({
    name: 'Bóng Đá Academy Control 5',
    category: 'Dụng cụ',
    brand: 'KickOne',
    price: 490000,
    description: 'Bóng đá may máy chuẩn size 5, độ nảy đều và phù hợp đá sân cỏ nhân tạo.',
    image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=900&q=80',
    stock: 20,
    featured: true,
  }),
  buildProduct({
    name: 'Dây Kháng Lực PowerBand Set',
    category: 'Dụng cụ',
    brand: 'ResistanceBand',
    price: 320000,
    description: 'Bộ dây kháng lực nhiều mức nặng, hỗ trợ tập thân trên, thân dưới và khởi động toàn thân.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    stock: 27,
  }),
  buildProduct({
    name: 'Thảm Yoga Balance Mat 6mm',
    category: 'Dụng cụ',
    brand: 'YogaEssence',
    price: 390000,
    description: 'Thảm tập êm, bám sàn tốt và phù hợp cho yoga, stretching hoặc bodyweight cơ bản.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
    stock: 19,
  }),
  buildProduct({
    name: 'Con Lăn Foam Roller Recovery',
    category: 'Dụng cụ',
    brand: 'RecoveryLab',
    price: 270000,
    description: 'Foam roller hỗ trợ giãn cơ, giảm căng cứng sau tập và cải thiện khả năng phục hồi.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
    stock: 21,
  }),
  buildProduct({
    name: 'Tạ Tay Hex Dumbbell 12kg',
    category: 'Dụng cụ',
    brand: 'StrengthMax',
    price: 890000,
    description: 'Tạ tay bọc cao su chống lăn, cầm chắc tay và phù hợp tập sức mạnh tại nhà.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
    stock: 10,
  }),
  buildProduct({
    name: 'Dây Nhảy SpeedWire Pro',
    category: 'Dụng cụ',
    brand: 'JumpKing',
    price: 190000,
    description: 'Dây nhảy tốc độ cao với vòng bi mượt, thích hợp cardio, HIIT và luyện phản xạ chân.',
    image: 'https://images.unsplash.com/photo-1518611507436-d376d7f1f0e6?auto=format&fit=crop&w=900&q=80',
    stock: 30,
  }),
  buildProduct({
    name: 'Vợt Cầu Lông Starter Speed',
    category: 'Dụng cụ',
    brand: 'ShuttlePro',
    price: 650000,
    description: 'Vợt nhẹ đầu, dễ làm quen và phù hợp cho người mới bắt đầu chơi cầu lông.',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=900&q=80',
    stock: 14,
  }),
  buildProduct({
    name: 'Ghế Tập Bụng HomeCore Bench',
    category: 'Dụng cụ',
    brand: 'HomeGym',
    price: 1490000,
    description: 'Ghế tập đa năng gấp gọn, hỗ trợ bài tập bụng, tay và lưng tại nhà.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80',
    stock: 7,
  }),
  buildProduct({
    name: 'Bóng Tập Gym Stability Ball 65',
    category: 'Dụng cụ',
    brand: 'FitTech',
    price: 280000,
    description: 'Bóng tập hỗ trợ core, stretching và phục hồi vận động với chất liệu đàn hồi tốt.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    stock: 16,
  }),
  buildProduct({
    name: 'Lưới Mini Goal Training Set',
    category: 'Dụng cụ',
    brand: 'KickOne',
    price: 790000,
    description: 'Bộ khung thành mini dễ lắp đặt, phù hợp tập sút bóng và vui chơi ngoài trời.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80',
    stock: 9,
  }),
];

const moreProducts = [
  ...shoeProducts,
  ...shirtProducts,
  ...pantsProducts,
  ...accessoryProducts,
  ...equipmentProducts,
].map(applyProductImage);

const expectedCategoryCounts = ['Giày', 'Áo', 'Quần', 'Phụ kiện', 'Dụng cụ'].reduce(
  (accumulator, category) => {
    accumulator[category] = 10;
    return accumulator;
  },
  {}
);

const actualCategoryCounts = moreProducts.reduce((accumulator, product) => {
  accumulator[product.category] = (accumulator[product.category] || 0) + 1;
  return accumulator;
}, {});

Object.entries(expectedCategoryCounts).forEach(([category, count]) => {
  if (actualCategoryCounts[category] !== count) {
    throw new Error(`Danh mục ${category} đang có ${actualCategoryCounts[category] || 0} sản phẩm mới, cần đúng ${count}`);
  }
});

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const existingProducts = await Product.find({}, { name: 1 }).lean();
    const existingNames = new Set(existingProducts.map((product) => product.name));
    const productsToInsert = moreProducts.filter((product) => !existingNames.has(product.name));

    console.log(`Sản phẩm hiện có: ${existingProducts.length}`);
    console.log(`Sản phẩm mới trong file seed: ${moreProducts.length}`);
    console.log(`Sản phẩm mới sẽ thêm: ${productsToInsert.length}`);

    if (productsToInsert.length > 0) {
      await Product.insertMany(productsToInsert);
      console.log('Đã thêm sản phẩm mới vào database');
    } else {
      console.log('Không có sản phẩm mới để thêm');
    }

    await mongoose.connection.close();
    console.log('Seed hoàn tất!');
  } catch (error) {
    console.error('Lỗi seed database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
