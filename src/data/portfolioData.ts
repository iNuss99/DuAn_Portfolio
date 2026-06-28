// Centralized assets and copy database for Khoa's IT & Web Design Portfolio

export const personalInfo = {
  name: "Khoa",
  title: "Jack -- IT & Web Designer",
  greeting: "hi, i'm khoa",
  bioShort: "sinh viên công nghệ thông tin & nhà thiết kế web đam mê kiến tạo các trang web tối ưu, tương tác và hiện đại",
  bioLong: "Tôi là sinh viên chuyên ngành Công nghệ thông tin, tập trung phát triển lập trình Web (Frontend Development), thiết kế UI/UX và xây dựng các giao diện tương tác mượt mà. Tôi thực sự yêu thích việc đồng hành cùng các dự án, doanh nghiệp muốn tối ưu hiệu năng trang web và tạo dựng hình ảnh chuyên nghiệp nhất trên không gian mạng. Hãy cùng nhau tạo nên những điều phi thường!",
  email: "khoa.itdeveloper@gmail.com",
};

export const navLinks = [
  { label: "Giới thiệu", href: "#about" },
  { label: "Dịch vụ", href: "#services" },
  { label: "Dự án", href: "#projects" },
  { label: "Liên hệ", href: "#contact" }
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
  // GIF assets from motionsites.ai represent web-design & UI/UX template previews, which fit web design perfectly
  row1: [
    "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
    "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
    "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
    "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
    "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
    "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
    "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
    "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
    "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
    "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  ],
  row2: [
    "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
    "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
    "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
    "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
    "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
    "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
    "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
    "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
    "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
    "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
  ]
};

export const services = [
  {
    num: "01",
    name: "Thiết kế UI/UX (UI/UX Design)",
    desc: "Nghiên cứu hành vi người dùng, thiết kế wireframe và tạo ra các giao diện trực quan, tối giản, tối ưu hóa tối đa trải nghiệm của khách hàng."
  },
  {
    num: "02",
    name: "Lập trình Frontend (Frontend Dev)",
    desc: "Chuyển đổi giao diện thiết kế thành mã nguồn sạch bằng React, TypeScript và Tailwind CSS, tối ưu tốc độ tải trang và độ tương thích di động."
  },
  {
    num: "03",
    name: "Thiết kế Tương tác (Interactive Design)",
    desc: "Tích hợp các hiệu ứng chuyển động mượt mà (Framer Motion, CSS 3D) giúp trang web trở nên sống động, thu hút người dùng ở lại lâu hơn."
  },
  {
    num: "04",
    name: "Lập trình Backend & API",
    desc: "Xây dựng máy chủ dữ liệu vững chắc, tích hợp cổng thanh toán, hệ quản trị nội dung hoặc kết xuất tự động về Google Sheets."
  },
  {
    num: "05",
    name: "Phát triển Fullstack Web Apps",
    desc: "Xây dựng các ứng dụng web phức tạp từ khâu lên ý tưởng thiết kế giao diện cho đến lập trình cơ sở dữ liệu hoàn chỉnh, vận hành tối ưu."
  }
];

export const projects = [
  {
    num: "01",
    category: "Lập trình Web",
    name: "Nextlevel Studio (Web App)",
    liveUrl: "#",
    // Images: Web app dashboard, dark UI, code editor theme
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
    liveUrl: "#",
    // Images: UI mockup on device, Figma-style design, component library
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
    liveUrl: "#",
    // Images: Server/backend, API terminal, full-stack architecture
    images: {
      col1_1: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=85&fit=crop",
      col1_2: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=85&fit=crop",
      col2: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1280&q=85&fit=crop"
    }
  }
];
