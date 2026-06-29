// Centralized assets and copy database for Khoa's IT & Web Design Portfolio — V5.0

export const personalInfo = {
  name: "Khoa",
  title: "Khoa -- IT & Web Designer",
  greeting: "hi, i'm khoa",
  bioShort: "sinh viên công nghệ thông tin & nhà thiết kế web đam mê kiến tạo các trang web tối ưu, tương tác và hiện đại",
  bioLong: "Tôi là sinh viên chuyên ngành Công nghệ thông tin, tập trung phát triển lập trình Web (Frontend Development), thiết kế UI/UX và xây dựng các giao diện tương tác mượt mà. Tôi thực sự yêu thích việc đồng hành cùng các dự án, doanh nghiệp muốn tối ưu hiệu năng trang web và tạo dựng hình ảnh chuyên nghiệp nhất trên không gian mạng. Hãy cùng nhau tạo nên những điều phi thường!",
  email: "khoa.itdeveloper@gmail.com",
  // Dán link Web App Google Apps Script của bạn vào đây
  googleSheetUrl: "https://script.google.com/macros/s/AKfycby0pooV1gtYcCavHqp2KDLMDGHkuQ1ZSm5ajtEqzsxXZ_t3s9NN0vIfRaxpp7n74aFY/exec",
};

export const navLinks = [
  { label: "Giới thiệu", href: "#about" },
  { label: "Dịch vụ", href: "#services" },
  { label: "Dự án", href: "#projects" },
  { label: "Liên hệ", href: "#contact" }
];

export const socialLinks = [
  { name: "GitHub", url: "https://github.com", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  { name: "Facebook", url: "https://facebook.com", icon: "facebook" },
  { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
];

export const decorative3D = {
  // We keep the premium decorative 3D assets and portrait as they add dynamic depth to the web portfolio
  portrait: "https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png",
  topLeftMoon: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
  bottomLeftObject: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
  topRightLego: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
  bottomRightGroup: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
};

export const marqueeImages = {
  // GIF assets from motionsites.ai representing premium UI/UX design mockups
  row1: [
    { url: "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif", tag: "Space Voyager Landing" },
    { url: "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif", tag: "Code Nest Editor" },
    { url: "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif", tag: "Venture Capital Portal" },
    { url: "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif", tag: "Stellar AI Platform v2" },
    { url: "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif", tag: "ASME Tech Agency" },
    { url: "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif", tag: "Data Analysis Dashboard" },
    { url: "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif", tag: "Vitara SaaS UI" },
    { url: "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif", tag: "Terra Ecology Web" },
    { url: "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif", tag: "SkyElite Agency Portfolio" },
    { url: "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif", tag: "Aethera Web3 Portal" },
    { url: "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif", tag: "DesignPro Marketplace" },
  ],
  row2: [
    { url: "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif", tag: "Stellar AI Web App" },
    { url: "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif", tag: "Creative 3D Portfolio" },
    { url: "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif", tag: "Orbit Web3 Interface" },
    { url: "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif", tag: "Nexora Tech Hub" },
    { url: "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif", tag: "EVR Ventures Site" },
    { url: "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif", tag: "Planet Orbit Web Design" },
    { url: "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif", tag: "New Era Design Studio" },
    { url: "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif", tag: "Wealth Fintech Platform" },
    { url: "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif", tag: "Luminex SaaS Landing" },
    { url: "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif", tag: "Celestia Crypto Dashboard" },
  ]
};

export const services = [
  {
    num: "01",
    name: "Thiết kế UI/UX",
    subtitle: "UI/UX Design",
    desc: "Nghiên cứu hành vi người dùng, thiết kế wireframe và tạo ra các giao diện trực quan, tối giản, tối ưu hóa tối đa trải nghiệm của khách hàng.",
    icon: "palette",
    tags: ["Figma", "Wireframe", "Prototype", "User Research"],
  },
  {
    num: "02",
    name: "Lập trình Frontend",
    subtitle: "Frontend Development",
    desc: "Chuyển đổi giao diện thiết kế thành mã nguồn sạch bằng React, TypeScript và Tailwind CSS, tối ưu tốc độ tải trang và độ tương thích di động.",
    icon: "code",
    tags: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  {
    num: "03",
    name: "Thiết kế Tương tác",
    subtitle: "Interactive Design",
    desc: "Tích hợp các hiệu ứng chuyển động mượt mà (Framer Motion, CSS 3D) giúp trang web trở nên sống động, thu hút người dùng ở lại lâu hơn.",
    icon: "sparkles",
    tags: ["Framer Motion", "CSS 3D", "GSAP", "Lottie"],
  },
  {
    num: "04",
    name: "Lập trình Backend",
    subtitle: "Backend & API",
    desc: "Xây dựng máy chủ dữ liệu vững chắc, tích hợp cổng thanh toán, hệ quản trị nội dung hoặc kết xuất tự động về Google Sheets.",
    icon: "server",
    tags: ["Node.js", "REST API", "Database", "Cloud"],
  },
  {
    num: "05",
    name: "Phát triển Fullstack",
    subtitle: "Fullstack Web Apps",
    desc: "Xây dựng các ứng dụng web phức tạp từ khâu lên ý tưởng thiết kế giao diện cho đến lập trình cơ sở dữ liệu hoàn chỉnh, vận hành tối ưu.",
    icon: "layers",
    tags: ["Full Stack", "DevOps", "CI/CD", "Agile"],
  }
];

export const projects = [
  {
    num: "01",
    category: "Lập trình Web",
    name: "Nextlevel Studio",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    tags: ["React", "TypeScript", "Node.js", "MongoDB"],
    featured: true,
    longDesc: "Nextlevel Studio là một nền tảng web giới thiệu và quản lý dự án dành cho các agency sáng tạo. Dự án tích hợp các hiệu ứng chuyển động phức tạp mang lại trải nghiệm mượt mà, tối ưu hóa tốc độ phản hồi và chuyển hướng trang nhanh chóng.",
    challenge: "Tải các tài nguyên hình ảnh chất lượng cao và chạy mượt các thư viện chuyển động trên các thiết bị cấu hình thấp mà không làm tụt FPS.",
    solution: "Sử dụng kỹ thuật Lazy Loading hình ảnh chuyên sâu kết hợp tối ưu render của React (useMemo, useCallback, React.memo) và nén định dạng ảnh sang WebP/AVIF.",
    images: {
      col1_1: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&q=85&fit=crop",
      col1_2: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=85&fit=crop",
      col2: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1280&q=85&fit=crop"
    }
  },
  {
    num: "02",
    category: "Thiết kế UI/UX",
    name: "Aura Design System",
    liveUrl: "https://www.figma.com",
    githubUrl: "",
    tags: ["Figma", "Design System", "UI Kit"],
    featured: false,
    longDesc: "Aura Design System là hệ thống thư viện thiết kế UI Kit đồng bộ, chuẩn chỉnh trên Figma giúp các designer và developer làm việc thống nhất, đẩy nhanh tốc độ thiết kế sản phẩm và phát triển giao diện phần mềm Frontend.",
    challenge: "Thiết lập cấu trúc Variable và Token màu sắc phong phú, hỗ trợ chuyển đổi giữa Light/Dark mode tự động một cách logic và trực quan.",
    solution: "Tận dụng tính năng Figma Variables mới nhất để tạo hệ thống màu sắc đa lớp (Primitive, Semantic, Component) kết hợp auto-layout linh hoạt.",
    images: {
      col1_1: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=85&fit=crop",
      col1_2: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=85&fit=crop",
      col2: "https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?w=1280&q=85&fit=crop"
    }
  },
  {
    num: "03",
    category: "Phát triển Fullstack",
    name: "Solaris Digital Portal",
    liveUrl: "https://www.netlify.com",
    githubUrl: "https://github.com",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Vercel"],
    featured: false,
    longDesc: "Solaris Digital Portal là cổng thông tin số hóa dịch vụ dành cho doanh nghiệp vừa và nhỏ, cung cấp khả năng thanh toán, quản lý hợp đồng, trao đổi thông tin khách hàng thời gian thực qua hệ thống WebSocket.",
    challenge: "Đồng bộ hóa trạng thái thanh toán thời gian thực bảo mật và tối ưu truy vấn cơ sở dữ liệu khi lượng người truy cập tăng đột biến.",
    solution: "Sử dụng Prisma ORM kết hợp PostgreSQL Connection Pooling, thiết lập cơ chế Webhook nhận phản hồi từ bên trung gian thanh toán và xử lý bất đồng bộ thông qua hàng đợi Redis.",
    images: {
      col1_1: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=85&fit=crop",
      col1_2: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=85&fit=crop",
      col2: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1280&q=85&fit=crop"
    }
  }
];

export const stats = [
  { value: 20, suffix: "+", label: "Dự án hoàn thành", icon: "briefcase" },
  { value: 15, suffix: "+", label: "Khách hàng hài lòng", icon: "users" },
  { value: 3, suffix: "+", label: "Năm kinh nghiệm", icon: "clock" },
  { value: 99, suffix: "%", label: "Tỷ lệ hoàn thành", icon: "target" },
];

export const skillsCategories = [
  {
    id: "frontend",
    title: "Frontend",
    list: [
      { name: "React / Next.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS / CSS3", level: 95 },
      { name: "Framer Motion", level: 85 }
    ]
  },
  {
    id: "backend",
    title: "Backend",
    list: [
      { name: "Node.js / Express", level: 75 },
      { name: "REST API / GraphQL", level: 80 },
      { name: "SQL & NoSQL DBs", level: 78 }
    ]
  },
  {
    id: "design",
    title: "UI/UX Design",
    list: [
      { name: "Figma (UI/UX)", level: 90 },
      { name: "Wireframe / Prototype", level: 85 },
      { name: "User Research", level: 82 }
    ]
  },
  {
    id: "tools",
    title: "Tools & Others",
    list: [
      { name: "Git / GitHub", level: 90 },
      { name: "Netlify / Vercel", level: 88 },
      { name: "Docker / CI-CD", level: 65 }
    ]
  }
];


export const timeline = [
  {
    year: "2024 — Nay",
    title: "Freelance Developer & Designer",
    desc: "Nhận dự án thiết kế web và ứng dụng cho doanh nghiệp vừa và nhỏ.",
  },
  {
    year: "2023",
    title: "Frontend Developer Intern",
    desc: "Thực tập và phát triển kỹ năng React, TypeScript tại công ty công nghệ.",
  },
  {
    year: "2022",
    title: "Bắt đầu hành trình IT",
    desc: "Nhập học ngành Công nghệ Thông tin, bắt đầu tự học lập trình web.",
  },
];
