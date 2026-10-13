/**
 * SCRIPT.JS - Platform Surat & Portal Lamaran Kerja
 * Fitur Lengkap: Live Generator A4, Portal Lowongan Kerja, Application Tracker, Template Email, Export PDF & DOCX.
 */

// ==========================================
// 1. DATA MASTER & DEFAULT STATE
// ==========================================

const DEFAULT_SAMPLE_DATA = {
  nama: "Muhammad Rizky Pratama",
  gelar: "S.Kom.",
  ttl: "Jakarta, 14 Mei 2000",
  jenisKelamin: "Laki-laki",
  alamat: "Jl. Margonda Raya No. 45, Beji, Depok, Jawa Barat 16424",
  hp: "0812-3456-7890",
  email: "rizky.pratama.dev@gmail.com",
  linkedin: "linkedin.com/in/rizkypratama",
  portofolio: "rizkypratama.tech",
  pendidikan: "S1 Sistem Informasi",
  universitas: "Universitas Indonesia",
  jurusan: "Sistem Informasi",
  ipk: "3.82",

  tanggal: new Date().toISOString().split('T')[0],
  tempatSurat: "Jakarta",
  hrd: "Ibu Siti Rahmawati, S.Psi. (Talent Acquisition Lead)",
  perusahaan: "PT Telkom Digital Solusindo",
  alamatpt: "Telkom Landmark Tower Lt. 28, Jl. Gatot Subroto Kav. 52, Jakarta Selatan",
  posisi: "Frontend Web Developer",
  sumberInfo: "Portal Karir Resmi Perusahaan & LinkedIn",

  ringkasanKeahlian: "Memiliki pengalaman 3+ tahun dalam pengembangan aplikasi web modern menggunakan JavaScript (ES6+), React.js, Tailwind CSS, serta integrasi RESTful API. Terbiasa bekerja dengan metodologi Agile/Scrum dan mengutamakan performa aplikasi yang responsif serta ramah pengguna.",

  lampiran: [
    "Curriculum Vitae (CV) ATS-Friendly Terbaru",
    "Fotokopi Ijazah & Transkrip Nilai Legalisir",
    "Portofolio Proyek Web Terkini",
    "Fotokopi Kartu Tanda Penduduk (KTP)",
    "Sertifikat Kompetensi Frontend Web Development",
    "Pas Foto Berwarna Terbaru (4x6)"
  ]
};

// Daftar Database Lowongan Kerja
const SAMPLE_JOBS = [
  {
    id: "job-1",
    title: "Frontend Web Developer",
    company: "PT Telkom Digital Solusindo",
    category: "tech",
    type: "Full-Time (Hybrid)",
    location: "Jakarta Selatan",
    salary: "Rp 9.000.000 - Rp 14.000.000",
    experience: "1 - 3 Tahun",
    deadline: "25 Oktober 2026",
    badge: "BUMN & Tech",
    hrd: "Ibu Siti Rahmawati, S.Psi.",
    address: "Telkom Landmark Tower Lt. 28, Jl. Gatot Subroto Kav. 52, Jakarta Selatan",
    tags: ["React.js", "Tailwind CSS", "JavaScript", "REST API"],
    description: "Kami mencari Frontend Web Developer yang kreatif dan berorientasi pada performa untuk mengembangkan produk digital skala nasional.",
    requirements: [
      "Pendidikan min. D3/S1 Teknik Informatika/Sistem Informasi atau bidang terkait.",
      "Mahir HTML5, CSS3, JavaScript (ES6+), dan React.js / Vue.js.",
      "Familiar dengan utility-first CSS framework seperti Tailwind CSS.",
      "Memahami version control Git dan responsive web design.",
      "Kemampuan komunikasi dan kerja tim yang baik."
    ],
    benefits: ["BPJS Kesehatan & Ketenagakerjaan", "Tunjangan Kinerja & Bonus Tahunan", "Laptop Kerja & WFH Subsidy", "Pelatihan Sertifikasi Internasional"]
  },
  {
    id: "job-2",
    title: "UI/UX & Product Designer",
    company: "Bukalapak Solusi Digital",
    category: "design",
    type: "Remote",
    location: "Seluruh Indonesia (WFR)",
    salary: "Rp 8.500.000 - Rp 13.000.000",
    experience: "Fresh Graduate / 1-2 Thn",
    deadline: "30 Oktober 2026",
    badge: "Startup Unicorn",
    hrd: "Bapak Dimas Anggara, M.Ds.",
    address: "Metropolitan Tower Lt. 19, Jl. R.A. Kartini Kav. 14, Cilandak, Jakarta",
    tags: ["Figma", "Design System", "User Research", "Wireframing"],
    description: "Merancang antarmuka pengguna yang intuitif, estetis, dan berbasis riset kebutuhan pengguna pada platform e-commerce dan fintech.",
    requirements: [
      "Menguasai software desain modern (Figma, FigJam, Adobe XD).",
      "Memiliki portofolio desain UI/UX yang menunjukkan proses berpikir (Design Thinking).",
      "Memahami prinsip Typography, Color Theory, dan Design System.",
      "Mampu melakukan usability testing sederhana."
    ],
    benefits: ["100% Kerja dari Rumah (Remote)", "Asuransi Rawat Inap Swasta", "Tunjangan Internet & Peralatan Kerja"]
  },
  {
    id: "job-3",
    title: "Management Trainee (Officer Development Program)",
    company: "Bank Central Asia (BCA)",
    category: "finance",
    type: "Full-Time",
    location: "Jakarta Pusat",
    salary: "Rp 8.000.000 - Rp 11.500.000",
    experience: "Fresh Graduate",
    deadline: "15 November 2026",
    badge: "Top Perbankan",
    hrd: "Tim Rekrutmen Human Capital BCA",
    address: "Menara BCA, Grand Indonesia, Jl. M.H. Thamrin No. 1, Jakarta Pusat",
    tags: ["Leadership", "Banking", "Analytical Thinking", "Finance"],
    description: "Program percepatan karir bagi talenta muda terbaik bangsa untuk dipersiapkan menjadi pemimpin masa depan di industri perbankan nasional.",
    requirements: [
      "Lulusan S1/S2 semua jurusan dengan IPK minimal 3.25.",
      "Usia maksimal 24 tahun (S1) atau 26 tahun (S2).",
      "Memiliki jiwa kepemimpinan, integritas tinggi, dan daya analisis yang kuat.",
      "Bersedia menjalani ikatan dinas dan penempatan di kantor cabang utama."
    ],
    benefits: ["Jenjang Karir Cepat dan Terstruktur", "Fasilitas Kesehatan Kelas 1", "Bonus Kinerja Semesteran", "Program Mentorship Eksekutif"]
  },
  {
    id: "job-4",
    title: "Digital Marketing & Social Media Specialist",
    company: "PT Paragon Technology and Innovation",
    category: "marketing",
    type: "Full-Time",
    location: "Tangerang / Jakarta",
    salary: "Rp 7.000.000 - Rp 10.000.000",
    experience: "1 - 2 Tahun",
    deadline: "20 Oktober 2026",
    badge: "FMCG Terkemuka",
    hrd: "Ibu Karina Anindya (HR Talent)",
    address: "Kawasan Industri Jatake, Jl. Industri Raya IV Blok AG No. 4, Tangerang",
    tags: ["Meta Ads", "TikTok Organic", "Copywriting", "SEO/SEM"],
    description: "Mengelola strategi campaign digital, pembuatan konten kreatif multi-platform, dan optimasi iklan digital untuk brand kecantikan nomor 1 di Indonesia.",
    requirements: [
      "Min. S1 Ilmu Komunikasi, Manajemen Pemasaran, atau bidang relevan.",
      "Pengalaman mengelola TikTok, Instagram, dan Meta Ads.",
      "Mampu menganalisis metrik analytics (Engagement Rate, ROAS, CTR).",
      "Kreatif, tanggap tren terkini, dan pandai copywriting."
    ],
    benefits: ["Produk Gratis Setiap Bulan", "Makan Siang Disediakan", "BPJS Lengkap & Asuransi Swasta"]
  },
  {
    id: "job-5",
    title: "Staff Administrasi & Operasional Kantor",
    company: "PT Astra International Tbk",
    category: "admin",
    type: "Full-Time",
    location: "Jakarta Utara",
    salary: "Rp 5.500.000 - Rp 7.500.000",
    experience: "Fresh Graduate / 1 Thn",
    deadline: "5 November 2026",
    badge: "Konglomerasi Astra",
    hrd: "Bapak Hendra Gunawan, S.E.",
    address: "Menara Astra, Jl. Jend. Sudirman Kav. 5-6, Karet Tengsin, Jakarta Pusat",
    tags: ["MS Excel", "Data Entry", "Filling", "Korespondensi"],
    description: "Bertanggung jawab atas kelancaran administrasi divisi, pengelolaan arsip dokumen, penyusunan laporan operasional harian, dan korespondensi resmi.",
    requirements: [
      "Pendidikan min. D3 / S1 semua jurusan (Administrasi Perkantoran / Akuntansi diutamakan).",
      "Mahir mengoperasikan Microsoft Office (terutama Excel: VLOOKUP, HLOOKUP, Pivot Table).",
      "Teliti, rapi, jujur, dan memiliki etos kerja disiplin.",
      "Mampu menyusun korespondensi surat menyurat resmi secara profesional."
    ],
    benefits: ["Gaji Pokok di atas UMR", "Uang Makan & Transport", "Tunjangan Hari Raya (THR) & Insentif Astra"]
  },
  {
    id: "job-6",
    title: "Junior Data Analyst & BI Specialist",
    company: "Shopee Indonesia (Sea Group)",
    category: "tech",
    type: "Hybrid",
    location: "Jakarta Selatan",
    salary: "Rp 8.000.000 - Rp 12.000.000",
    experience: "Fresh Graduate / 1-2 Thn",
    deadline: "12 November 2026",
    badge: "E-Commerce Regional",
    hrd: "HR Business Partner Shopee",
    address: "Pacific Century Place Lt. 25, SCBD, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan",
    tags: ["SQL", "Python", "Tableau", "Power BI"],
    description: "Mengolah big data transaksi, merumuskan dashboard Business Intelligence, dan memberikan insight prediktif kepada tim manajemen.",
    requirements: [
      "Lulusan S1 Statistika, Matematika, Teknik Industri, atau Ilmu Komputer.",
      "Kemahiran tinggi dalam SQL query dan data visualization (Tableau / Power BI / Looker).",
      "Memahami dasar-dasar Python/R untuk data cleaning dan analisis prediktif.",
      "Kemampuan memecahkan masalah kuantitatif dan presentasi data."
    ],
    benefits: ["Asuransi Premium Kelas Satu", "Subsidi Gym & Wellness", "Snack & Minuman Gratis di Kantor"]
  }
];

// Default Template Teks
const TEMPLATES_CONFIG = {
  formal: {
    nama: "Standar Resmi / BUMN / Korporat",
    pembuka: "Berdasarkan informasi lowongan pekerjaan yang saya peroleh melalui {sumberInfo}, saya bermaksud untuk mengajukan permohonan lamaran pekerjaan agar dapat bergabung sebagai {posisi} di perusahaan yang Bapak/Ibu pimpin.",
    penutup: "Demikian surat lamaran pekerjaan ini saya sampaikan dengan sebenar-benarnya. Besar harapan saya agar Bapak/Ibu berkenan memberikan kesempatan wawancara, sehingga saya dapat menjelaskan kualifikasi, dedikasi, serta kontribusi yang dapat saya berikan kepada {perusahaan} secara lebih mendalam.\n\nAtas perhatian, waktu, dan pertimbangan yang Bapak/Ibu berikan, saya mengucapkan terima kasih."
  },
  startup: {
    nama: "Modern & Startup Tech",
    pembuka: "Mengetahui komitmen dan inovasi luar biasa yang terus dikembangkan oleh {perusahaan}, saya sangat antusias untuk mengajukan diri sebagai {posisi}. Melalui informasi yang saya dapatkan dari {sumberInfo}, saya meyakini bahwa latar belakang dan keterampilan saya selaras dengan visi pertumbuhan tim Bapak/Ibu.",
    penutup: "Saya sangat bersemangat menyambut peluang untuk mendiskusikan bagaimana kapabilitas saya dapat membantu mengakselerasi target tim {perusahaan}. Portofolio karya dan proyek saya dapat diakses melalui tautan terlampir.\n\nTerima kasih atas waktu dan kesempatan yang diberikan."
  },
  freshgrad: {
    nama: "Fresh Graduate (Lulusan Baru)",
    pembuka: "Sehubungan dengan informasi kesempatan berkarir yang saya peroleh dari {sumberInfo}, dengan rasa hormat saya mengajukan diri untuk mengisi posisi {posisi} di {perusahaan}. Sebagai lulusan baru dari {pendidikan} {jurusan} {universitas}, saya memiliki antusiasme dan komitmen tinggi untuk mendedikasikan ilmu serta energi saya dalam lingkungan kerja profesional.",
    penutup: "Meskipun merupakan lulusan baru, saya adalah pribadi yang cepat beradaptasi, berorientasi pada pemecahan masalah, dan siap menjalani proses pelatihan dengan penuh tanggung jawab. Besar harapan saya untuk diundang ke tahap seleksi berikutnya.\n\nAtas perhatian dan kesempatan yang Bapak/Ibu berikan, saya sampaikan terima kasih."
  },
  professional: {
    nama: "Profesional Berpengalaman",
    pembuka: "Dengan hormat, melalui surat ini saya mengajukan permohonan kerja untuk posisi {posisi} di {perusahaan}, menindaklanjuti publikasi lowongan pekerjaan yang saya pantau melalui {sumberInfo}. Dengan rekam jejak pengalaman kerja dan kompetensi spesifik yang saya miliki, saya siap memberikan nilai tambah strategis bagi perusahaan.",
    penutup: "Saya siap menyumbangkan keahlian kepemimpinan teknis serta eksekusi proyek demi mendukung efisiensi dan pertumbuhan {perusahaan}. Saya menantikan kesempatan untuk berdiskusi langsung mengenai kontribusi konkrit yang dapat saya hadirkan.\n\nTerima kasih atas perhatian Bapak/Ibu."
  },
  english: {
    nama: "Professional English Cover Letter",
    pembuka: "I am writing to express my strong interest in the {posisi} position at {perusahaan}, as advertised on {sumberInfo}. With my relevant educational background and hands-on technical skills, I am confident in my ability to make an immediate, valuable contribution to your esteemed organization.",
    penutup: "I welcome the opportunity to discuss how my skill set and enthusiasm align with your current objectives. Thank you very much for your time, consideration, and review of my application.\n\nSincerely,"
  }
};

// ==========================================
// 2. STATE APLIKASI
// ==========================================

let appState = {
  activeTab: "generator",
  selectedTemplate: "formal",
  fontFamily: "font-times",
  lineSpacing: "spacing-normal",
  fontSize: "size-base",
  signatureImage: null,
  activeJobModal: null,
  trackerFilter: "Semua",
  jobs: [...SAMPLE_JOBS],
  trackerList: [],
  bookmarks: []
};

// ==========================================
// 3. INISIALISASI SAAT DOM SIAP
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  initStorage();
  bindNavigation();
  initFormListeners();
  renderJobBoard();
  renderTracker();
  renderEmailTemplatePreview();

  // Load awal: Isi contoh data agar pengguna langsung melihat surat yang rapi dan elegan
  muatContohData(false);
});

// Membaca data tersimpan di LocalStorage
function initStorage() {
  try {
    const savedTracker = localStorage.getItem("karir_tracker_items");
    if (savedTracker) {
      appState.trackerList = JSON.parse(savedTracker);
    } else {
      // Default demo tracker item
      appState.trackerList = [
        {
          id: "track-1",
          company: "PT Telkom Digital Solusindo",
          posisi: "Frontend Web Developer",
          tanggal: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: "Interview",
          catatan: "Jadwal interview teknis via Google Meet hari Kamis pkl 14:00 WIB."
        },
        {
          id: "track-2",
          company: "Bank Central Asia (BCA)",
          posisi: "Management Trainee (ODP)",
          tanggal: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: "Seleksi Berkas",
          catatan: "Menunggu pengumuman lolos administrasi via email."
        }
      ];
      saveTrackerToStorage();
    }

    const savedBookmarks = localStorage.getItem("karir_bookmarks");
    if (savedBookmarks) {
      appState.bookmarks = JSON.parse(savedBookmarks);
    }
  } catch (e) {
    console.warn("Storage access issue:", e);
  }
}

function saveTrackerToStorage() {
  try {
    localStorage.setItem("karir_tracker_items", JSON.stringify(appState.trackerList));
  } catch (e) {
    console.error("Gagal menyimpan ke LocalStorage:", e);
  }
}

function saveBookmarksToStorage() {
  try {
    localStorage.setItem("karir_bookmarks", JSON.stringify(appState.bookmarks));
  } catch (e) {
    console.error("Gagal menyimpan bookmarks:", e);
  }
}

// ==========================================
// 4. NAVIGASI TAB UTAMA
// ==========================================

function bindNavigation() {
  const tabButtons = document.querySelectorAll("[data-tab-target]");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab-target");
      switchTab(target);
    });
  });
}

function switchTab(tabId) {
  appState.activeTab = tabId;

  // Update visual tombol tab
  document.querySelectorAll("[data-tab-target]").forEach(btn => {
    const target = btn.getAttribute("data-tab-target");
    if (target === tabId) {
      btn.classList.add("text-blue-600", "border-blue-600", "font-semibold");
      btn.classList.remove("text-slate-600", "border-transparent");
    } else {
      btn.classList.remove("text-blue-600", "border-blue-600", "font-semibold");
      btn.classList.add("text-slate-600", "border-transparent");
    }
  });

  // Tampilkan container tab
  document.querySelectorAll(".tab-content-section").forEach(sec => {
    sec.classList.add("hidden");
  });

  const activeSection = document.getElementById(`tab-section-${tabId}`);
  if (activeSection) {
    activeSection.classList.remove("hidden");
    activeSection.classList.add("animate-fade-in");
  }

  // Khusus bila pindah ke tab email, perbarui preview email
  if (tabId === "email-tips") {
    renderEmailTemplatePreview();
  } else if (tabId === "tracker") {
    renderTracker();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// 5. EVENT LISTENERS FORM GENERATOR SURAT
// ==========================================

function initFormListeners() {
  // Input fields sync ke live preview
  const formInputs = document.querySelectorAll("#form-surat input, #form-surat textarea, #form-surat select");
  formInputs.forEach(input => {
    input.addEventListener("input", updateLetterPreview);
    input.addEventListener("change", updateLetterPreview);
  });

  // Pilihan Template Surat
  const templateSelect = document.getElementById("pilihan-template");
  if (templateSelect) {
    templateSelect.addEventListener("change", (e) => {
      appState.selectedTemplate = e.target.value;
      updateTemplateTexts();
      updateLetterPreview();
      showToast(`Template diubah: ${TEMPLATES_CONFIG[e.target.value].nama}`, "info");
    });
  }

  // Pilihan Font Surat
  const fontSelect = document.getElementById("font-select");
  if (fontSelect) {
    fontSelect.addEventListener("change", (e) => {
      appState.fontFamily = e.target.value;
      updateLetterPreview();
    });
  }

  // Pilihan Spasi
  const spacingSelect = document.getElementById("spacing-select");
  if (spacingSelect) {
    spacingSelect.addEventListener("change", (e) => {
      appState.lineSpacing = e.target.value;
      updateLetterPreview();
    });
  }

  // Pilihan Ukuran Font
  const sizeSelect = document.getElementById("size-select");
  if (sizeSelect) {
    sizeSelect.addEventListener("change", (e) => {
      appState.fontSize = e.target.value;
      updateLetterPreview();
    });
  }

  // Upload Tanda Tangan
  const ttdInput = document.getElementById("input-ttd-file");
  if (ttdInput) {
    ttdInput.addEventListener("change", handleSignatureUpload);
  }
}

// Menangani upload tanda tangan gambar
function handleSignatureUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    showToast("Harap pilih berkas gambar (PNG/JPG).", "warning");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(evt) {
    appState.signatureImage = evt.target.result;
    document.getElementById("preview-ttd-img").src = evt.target.result;
    document.getElementById("preview-ttd-img").classList.remove("hidden");
    document.getElementById("btn-hapus-ttd").classList.remove("hidden");
    updateLetterPreview();
    showToast("Tanda tangan digital berhasil dimuat!", "success");
  };
  reader.readAsDataURL(file);
}

function hapusSignature() {
  appState.signatureImage = null;
  const fileInput = document.getElementById("input-ttd-file");
  if (fileInput) fileInput.value = "";
  document.getElementById("preview-ttd-img").classList.add("hidden");
  document.getElementById("btn-hapus-ttd").classList.add("hidden");
  updateLetterPreview();
  showToast("Tanda tangan digital dihapus.", "info");
}

// Perbarui teks paragraf default berdasarkan template aktif
function updateTemplateTexts() {
  const cfg = TEMPLATES_CONFIG[appState.selectedTemplate] || TEMPLATES_CONFIG.formal;
  const posisi = document.getElementById("input-posisi")?.value || "[Posisi Pekerjaan]";
  const perusahaan = document.getElementById("input-perusahaan")?.value || "[Nama Perusahaan]";
  const sumberInfo = document.getElementById("input-sumber-info")?.value || "informasi lowongan pekerjaan";
  const pendidikan = document.getElementById("input-pendidikan")?.value || "S1";
  const jurusan = document.getElementById("input-jurusan")?.value || "bidang terkait";
  const universitas = document.getElementById("input-universitas")?.value || "";

  const replaceVars = (str) => {
    return str
      .replace(/{posisi}/g, posisi)
      .replace(/{perusahaan}/g, perusahaan)
      .replace(/{sumberInfo}/g, sumberInfo)
      .replace(/{pendidikan}/g, pendidikan)
      .replace(/{jurusan}/g, jurusan)
      .replace(/{universitas}/g, universitas ? `di ${universitas}` : "");
  };

  const elPembuka = document.getElementById("input-pembuka");
  const elPenutup = document.getElementById("input-penutup");

  if (elPembuka) elPembuka.value = replaceVars(cfg.pembuka);
  if (elPenutup) elPenutup.value = replaceVars(cfg.penutup);
}

// Reset teks paragraf ke standar template
function resetKeTeksTemplateDefault() {
  updateTemplateTexts();
  updateLetterPreview();
  showToast("Paragraf berhasil disetel ulang ke pola template default.", "info");
}

// ==========================================
// 6. GENERATE & UPDATE LIVE PREVIEW SURAT (A4)
// ==========================================

function getFormData() {
  // Ambil semua nilai dari form
  const getVal = (id) => (document.getElementById(id)?.value || "").trim();

  // Lampiran checklist
  const lampiranChecked = [];
  document.querySelectorAll(".lampiran-checkbox:checked").forEach(cb => {
    lampiranChecked.push(cb.value);
  });

  const customLampiran = getVal("input-lampiran-tambahan");
  if (customLampiran) {
    customLampiran.split(",").forEach(item => {
      if (item.trim()) lampiranChecked.push(item.trim());
    });
  }

  return {
    nama: getVal("input-nama") || "Nama Lengkap Anda",
    gelar: getVal("input-gelar"),
    ttl: getVal("input-ttl") || "Jakarta, 01 Januari 2000",
    jenisKelamin: getVal("input-jk") || "Laki-laki",
    alamat: getVal("input-alamat") || "Alamat Tempat Tinggal Lengkap",
    hp: getVal("input-hp") || "0812-xxxx-xxxx",
    email: getVal("input-email") || "email.anda@gmail.com",
    linkedin: getVal("input-linkedin"),
    portofolio: getVal("input-portofolio"),
    pendidikan: getVal("input-pendidikan") || "S1",
    universitas: getVal("input-universitas"),
    jurusan: getVal("input-jurusan") || "Jurusan",
    ipk: getVal("input-ipk"),

    tanggal: getVal("input-tanggal") || new Date().toISOString().split('T')[0],
    tempatSurat: getVal("input-tempat-surat") || "Jakarta",
    hrd: getVal("input-hrd") || "Bapak/Ibu Pimpinan / HRD",
    perusahaan: getVal("input-perusahaan") || "Nama Perusahaan Tujuan",
    alamatpt: getVal("input-alamatpt") || "Alamat Lengkap Perusahaan",
    posisi: getVal("input-posisi") || "Posisi yang Dilamar",
    sumberInfo: getVal("input-sumber-info") || "informasi lowongan pekerjaan yang dipublikasikan",

    pembuka: getVal("input-pembuka"),
    keahlian: getVal("input-keahlian"),
    penutup: getVal("input-penutup"),
    lampiran: lampiranChecked
  };
}

// Format tanggal ke Bahasa Indonesia (Contoh: 14 Mei 2026)
function formatTanggalIndo(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;

  const bulanIndo = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const tgl = parseInt(parts[2], 10);
  const bln = bulanIndo[parseInt(parts[1], 10) - 1] || "";
  const thn = parts[0];

  return `${tgl} ${bln} ${thn}`;
}

function updateLetterPreview() {
  const data = getFormData();
  const paper = document.getElementById("printable-paper");
  if (!paper) return;

  // Update styling classes pada kertas surat
  paper.className = `a4-paper ${appState.fontFamily} ${appState.lineSpacing} ${appState.fontSize}`;

  const isEnglish = appState.selectedTemplate === "english";
  const tanggalFormat = formatTanggalIndo(data.tanggal);
  const namaLengkap = data.gelar ? `${data.nama}, ${data.gelar}` : data.nama;

  // Bangun HTML Surat
  let html = "";

  if (isEnglish) {
    // FORMAT SURAT BAHASA INGGRIS
    html = `
      <div class="mb-5 text-right text-slate-800">
        <p>${data.tempatSurat}, ${tanggalFormat}</p>
      </div>

      <div class="mb-5 text-slate-900">
        <p>To:</p>
        <p class="font-semibold">${escapeHTML(data.hrd)}</p>
        <p class="font-semibold text-blue-900">${escapeHTML(data.perusahaan)}</p>
        <p class="whitespace-pre-line text-slate-700">${escapeHTML(data.alamatpt)}</p>
      </div>

      <div class="mb-4">
        <p class="font-semibold text-slate-900">Dear Hiring Team,</p>
      </div>

      <div class="mb-4 text-justify space-y-3">
        <p>${escapeHTML(data.pembuka || `I am writing to submit my application for the ${data.posisi} role at ${data.perusahaan}.`)}</p>
        ${data.keahlian ? `<p>${escapeHTML(data.keahlian)}</p>` : ""}
      </div>

      <div class="mb-4">
        <p class="font-semibold text-slate-800 mb-1">Applicant Summary:</p>
        <table class="w-full text-slate-800">
          <tr><td class="w-40 py-0.5 text-slate-600">Full Name</td><td>: <strong>${escapeHTML(namaLengkap)}</strong></td></tr>
          <tr><td class="py-0.5 text-slate-600">Education</td><td>: ${escapeHTML(data.pendidikan)} - ${escapeHTML(data.jurusan)} ${data.universitas ? `(${escapeHTML(data.universitas)})` : ""} ${data.ipk ? `(GPA: ${escapeHTML(data.ipk)})` : ""}</td></tr>
          <tr><td class="py-0.5 text-slate-600">Phone / WhatsApp</td><td>: ${escapeHTML(data.hp)}</td></tr>
          <tr><td class="py-0.5 text-slate-600">Email</td><td>: ${escapeHTML(data.email)}</td></tr>
          ${data.linkedin ? `<tr><td class="py-0.5 text-slate-600">LinkedIn</td><td>: ${escapeHTML(data.linkedin)}</td></tr>` : ""}
          ${data.portofolio ? `<tr><td class="py-0.5 text-slate-600">Portfolio</td><td>: ${escapeHTML(data.portofolio)}</td></tr>` : ""}
        </table>
      </div>

      ${data.lampiran.length > 0 ? `
        <div class="mb-4">
          <p class="text-slate-800 mb-1">As supporting materials, I have enclosed:</p>
          <ol class="list-decimal list-inside pl-2 space-y-0.5 text-slate-700">
            ${data.lampiran.map(item => `<li>${escapeHTML(item)}</li>`).join("")}
          </ol>
        </div>
      ` : ""}

      <div class="mb-6 text-justify">
        <p class="whitespace-pre-line">${escapeHTML(data.penutup || "Thank you for your time and consideration.")}</p>
      </div>

      <div class="mt-8 flex justify-end">
        <div class="text-center w-64">
          <p>Sincerely,</p>
          <div class="signature-space my-2">
            ${appState.signatureImage ? `<img src="${appState.signatureImage}" class="signature-img mx-auto" alt="Signature">` : `<div class="h-14"></div>`}
          </div>
          <p class="font-bold underline text-slate-900">${escapeHTML(namaLengkap)}</p>
        </div>
      </div>
    `;
  } else {
    // FORMAT SURAT RESMI BAHASA INDONESIA (STANDAR BUMN & KORPORAT)
    html = `
      <div class="flex justify-between items-start mb-6 pb-2 border-b border-slate-200">
        <div>
          <p class="text-xs uppercase tracking-widest text-slate-500 font-semibold">Surat Lamaran Pekerjaan</p>
          <p class="text-sm font-medium text-slate-700">Hal: Permohonan Lamaran Kerja - <strong class="text-blue-900">${escapeHTML(data.posisi)}</strong></p>
        </div>
        <div class="text-right text-slate-700 text-sm">
          <p>${escapeHTML(data.tempatSurat)}, ${tanggalFormat}</p>
        </div>
      </div>

      <div class="mb-5 text-slate-800">
        <p>Kepada Yth.</p>
        <p class="font-bold text-slate-900">${escapeHTML(data.hrd)}</p>
        <p class="font-semibold text-blue-900">${escapeHTML(data.perusahaan)}</p>
        <p class="whitespace-pre-line text-slate-600">${escapeHTML(data.alamatpt)}</p>
      </div>

      <div class="mb-3">
        <p class="text-slate-900 font-medium">Dengan hormat,</p>
      </div>

      <div class="mb-4 text-justify">
        <p class="leading-relaxed">
          ${escapeHTML(data.pembuka || `Berdasarkan informasi lowongan pekerjaan yang saya peroleh, saya bermaksud untuk mengajukan permohonan lamaran pekerjaan sebagai ${data.posisi} di ${data.perusahaan}.`)}
        </p>
      </div>

      <div class="mb-4">
        <p class="text-slate-800 mb-1 font-medium">Berikut adalah data diri singkat saya:</p>
        <table class="w-full text-slate-800">
          <tbody>
            <tr>
              <td class="w-44 py-0.5 text-slate-600">Nama Lengkap</td>
              <td class="py-0.5">: <strong>${escapeHTML(namaLengkap)}</strong></td>
            </tr>
            <tr>
              <td class="py-0.5 text-slate-600">Tempat, Tanggal Lahir</td>
              <td class="py-0.5">: ${escapeHTML(data.ttl)}</td>
            </tr>
            <tr>
              <td class="py-0.5 text-slate-600">Pendidikan Terakhir</td>
              <td class="py-0.5">: ${escapeHTML(data.pendidikan)} ${data.jurusan ? ` - ${escapeHTML(data.jurusan)}` : ""} ${data.universitas ? `(${escapeHTML(data.universitas)})` : ""} ${data.ipk ? `[IPK: ${escapeHTML(data.ipk)}]` : ""}</td>
            </tr>
            <tr>
              <td class="py-0.5 text-slate-600">Alamat Domisili</td>
              <td class="py-0.5">: ${escapeHTML(data.alamat)}</td>
            </tr>
            <tr>
              <td class="py-0.5 text-slate-600">Nomor Telepon / WA</td>
              <td class="py-0.5">: ${escapeHTML(data.hp)}</td>
            </tr>
            <tr>
              <td class="py-0.5 text-slate-600">Alamat Email</td>
              <td class="py-0.5">: <span class="text-blue-700">${escapeHTML(data.email)}</span></td>
            </tr>
            ${data.linkedin || data.portofolio ? `
              <tr>
                <td class="py-0.5 text-slate-600">Portofolio / LinkedIn</td>
                <td class="py-0.5">: ${escapeHTML([data.linkedin, data.portofolio].filter(Boolean).join(" | "))}</td>
              </tr>
            ` : ""}
          </tbody>
        </table>
      </div>

      ${data.keahlian ? `
        <div class="mb-4 text-justify">
          <p class="leading-relaxed">${escapeHTML(data.keahlian)}</p>
        </div>
      ` : ""}

      ${data.lampiran.length > 0 ? `
        <div class="mb-4">
          <p class="text-slate-800 mb-1 font-medium">Sebagai bahan pertimbangan dan kelengkapan administrasi, saya melampirkan berkas:</p>
          <ol class="list-decimal list-inside pl-2 space-y-0.5 text-slate-700">
            ${data.lampiran.map(item => `<li>${escapeHTML(item)}</li>`).join("")}
          </ol>
        </div>
      ` : ""}

      <div class="mb-6 text-justify">
        <p class="leading-relaxed whitespace-pre-line">${escapeHTML(data.penutup || "Demikian surat lamaran kerja ini saya sampaikan. Atas perhatian dan kesempatan yang Bapak/Ibu berikan, saya ucapkan terima kasih.")}</p>
      </div>

      <div class="mt-8 flex justify-end">
        <div class="text-center w-64">
          <p class="text-slate-800">Hormat saya,</p>
          <div class="signature-space my-2">
            ${appState.signatureImage ? `<img src="${appState.signatureImage}" class="signature-img mx-auto" alt="Tanda Tangan">` : `<div class="h-16"></div>`}
          </div>
          <p class="font-bold underline text-slate-900">${escapeHTML(namaLengkap)}</p>
        </div>
      </div>
    `;
  }

  paper.innerHTML = html;
}

// Helper untuk escape HTML agar aman
function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================
// 7. AKSI EXPORT, CETAK & SIMPAN
// ==========================================

// Cetak ke PDF via dialog print browser
function cetakSuratPDF() {
  window.print();
}

// Salin teks surat ke clipboard
function salinTeksSurat() {
  const paper = document.getElementById("printable-paper");
  if (!paper) return;

  // Buat teks terstruktur dari konten kertas
  const textContent = paper.innerText;

  navigator.clipboard.writeText(textContent).then(() => {
    showToast("Teks surat berhasil disalin ke clipboard!", "success");
  }).catch(() => {
    // Fallback lama jika navigator clipboard ditolak
    const textArea = document.createElement("textarea");
    textArea.value = textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    showToast("Teks surat berhasil disalin!", "success");
  });
}

// Download file dokumen format .doc (Microsoft Word Compatible)
function downloadDokumenWord() {
  const data = getFormData();
  const paperContent = document.getElementById("printable-paper").innerHTML;

  const header = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>Surat Lamaran - ${escapeHTML(data.nama)}</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.5; color: #000; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 4px 0; vertical-align: top; }
        .text-right { text-align: right; }
        .text-justify { text-align: justify; }
        .font-bold { font-weight: bold; }
        .underline { text-decoration: underline; }
      </style>
    </head>
    <body>
  `;
  const footer = `</body></html>`;
  const fullHtml = header + paperContent + footer;

  const blob = new Blob(['\ufeff' + fullHtml], {
    type: 'application/msword'
  });

  const fileName = `Surat_Lamaran_${(data.nama || "Pelamar").replace(/[^a-zA-Z0-9]/g, "_")}_${(data.posisi || "Posisi").replace(/[^a-zA-Z0-9]/g, "_")}.doc`;

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(`Dokumen berhasil diunduh (${fileName})!`, "success");
}

// Simpan langsung lamaran ini ke Tracker Aplikasi
function simpanKeTrackerOtomatis() {
  const data = getFormData();
  if (!data.perusahaan || !data.posisi) {
    showToast("Mohon lengkapi nama Perusahaan dan Posisi terlebih dahulu.", "warning");
    return;
  }

  const newItem = {
    id: "track-" + Date.now(),
    company: data.perusahaan,
    posisi: data.posisi,
    tanggal: data.tanggal,
    status: "Terkirim",
    catatan: `Surat lamaran dibuat otomatis untuk ${data.hrd}. Menunggu feedback.`
  };

  appState.trackerList.unshift(newItem);
  saveTrackerToStorage();
  renderTracker();

  showToast(`Lamaran ke "${data.perusahaan}" berhasil ditambahkan ke Pelacak Lamaran!`, "success");
}

// Isi formulir dengan data contoh (Dummy Data) lengkap
function muatContohData(withToast = true) {
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  };

  setVal("input-nama", DEFAULT_SAMPLE_DATA.nama);
  setVal("input-gelar", DEFAULT_SAMPLE_DATA.gelar);
  setVal("input-ttl", DEFAULT_SAMPLE_DATA.ttl);
  setVal("input-jk", DEFAULT_SAMPLE_DATA.jenisKelamin);
  setVal("input-alamat", DEFAULT_SAMPLE_DATA.alamat);
  setVal("input-hp", DEFAULT_SAMPLE_DATA.hp);
  setVal("input-email", DEFAULT_SAMPLE_DATA.email);
  setVal("input-linkedin", DEFAULT_SAMPLE_DATA.linkedin);
  setVal("input-portofolio", DEFAULT_SAMPLE_DATA.portofolio);
  setVal("input-pendidikan", DEFAULT_SAMPLE_DATA.pendidikan);
  setVal("input-universitas", DEFAULT_SAMPLE_DATA.universitas);
  setVal("input-jurusan", DEFAULT_SAMPLE_DATA.jurusan);
  setVal("input-ipk", DEFAULT_SAMPLE_DATA.ipk);

  setVal("input-tanggal", DEFAULT_SAMPLE_DATA.tanggal);
  setVal("input-tempat-surat", DEFAULT_SAMPLE_DATA.tempatSurat);
  setVal("input-hrd", DEFAULT_SAMPLE_DATA.hrd);
  setVal("input-perusahaan", DEFAULT_SAMPLE_DATA.perusahaan);
  setVal("input-alamatpt", DEFAULT_SAMPLE_DATA.alamatpt);
  setVal("input-posisi", DEFAULT_SAMPLE_DATA.posisi);
  setVal("input-sumber-info", DEFAULT_SAMPLE_DATA.sumberInfo);
  setVal("input-keahlian", DEFAULT_SAMPLE_DATA.ringkasanKeahlian);

  // Set default checkboxes
  document.querySelectorAll(".lampiran-checkbox").forEach(cb => {
    cb.checked = true;
  });

  updateTemplateTexts();
  updateLetterPreview();

  if (withToast) {
    showToast("Contoh data pelamar profesional berhasil dimuat!", "success");
  }
}

// Reset form ke kosong
function resetFormulir() {
  if (!confirm("Apakah Anda yakin ingin mengosongkan seluruh formulir surat?")) return;

  const form = document.getElementById("form-surat");
  if (form) form.reset();

  hapusSignature();
  updateLetterPreview();
  showToast("Formulir berhasil direset.", "info");
}

// ==========================================
// 8. FITUR PORTAL LOWONGAN KERJA (JOB BOARD)
// ==========================================

function renderJobBoard() {
  const container = document.getElementById("job-list-container");
  if (!container) return;

  const searchKeyword = (document.getElementById("job-search-input")?.value || "").toLowerCase().trim();
  const selectedCat = document.getElementById("job-category-filter")?.value || "all";
  const selectedType = document.getElementById("job-type-filter")?.value || "all";

  // Filter lowongan
  const filteredJobs = appState.jobs.filter(job => {
    const matchSearch =
      job.title.toLowerCase().includes(searchKeyword) ||
      job.company.toLowerCase().includes(searchKeyword) ||
      job.location.toLowerCase().includes(searchKeyword) ||
      job.tags.some(t => t.toLowerCase().includes(searchKeyword));

    const matchCat = selectedCat === "all" || job.category === selectedCat;
    const matchType = selectedType === "all" || job.type.toLowerCase().includes(selectedType.toLowerCase());

    return matchSearch && matchCat && matchType;
  });

  const countBadge = document.getElementById("job-count-badge");
  if (countBadge) {
    countBadge.textContent = `${filteredJobs.length} Lowongan Tersedia`;
  }

  if (filteredJobs.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
        <div class="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
          <i class="fa-solid fa-briefcase text-2xl"></i>
        </div>
        <h4 class="text-lg font-bold text-slate-800">Tidak ada lowongan yang cocok</h4>
        <p class="text-sm text-slate-500 mt-1">Coba gunakan kata kunci pencarian yang berbeda atau reset filter.</p>
        <button onclick="resetJobFilter()" class="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition">
          Reset Filter Pencarian
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredJobs.map(job => {
    const isBookmarked = appState.bookmarks.includes(job.id);
    return `
      <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition group flex flex-col justify-between">
        <div>
          <!-- Header Card -->
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                ${job.company.charAt(0)}
              </div>
              <div>
                <h3 class="font-bold text-slate-900 group-hover:text-blue-600 transition text-base leading-snug">${escapeHTML(job.title)}</h3>
                <p class="text-xs text-slate-500 font-medium">${escapeHTML(job.company)}</p>
              </div>
            </div>
            <button onclick="toggleBookmark('${job.id}')" title="Simpan Lowongan" class="text-slate-400 hover:text-amber-500 transition p-1">
              <i class="${isBookmarked ? 'fa-solid fa-bookmark text-amber-500' : 'fa-regular fa-bookmark'} text-lg"></i>
            </button>
          </div>

          <!-- Tags Info -->
          <div class="flex flex-wrap items-center gap-2 mb-3 text-xs">
            <span class="inline-flex items-center gap-1 bg-blue-50 text-blue-700 font-medium px-2.5 py-1 rounded-md">
              <i class="fa-solid fa-location-dot"></i> ${escapeHTML(job.location)}
            </span>
            <span class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-medium px-2.5 py-1 rounded-md">
              <i class="fa-solid fa-clock"></i> ${escapeHTML(job.type)}
            </span>
            <span class="inline-flex items-center gap-1 bg-amber-50 text-amber-800 font-medium px-2.5 py-1 rounded-md">
              <i class="fa-solid fa-money-bill-wave"></i> ${escapeHTML(job.salary)}
            </span>
          </div>

          <!-- Deskripsi Ringkas -->
          <p class="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            ${escapeHTML(job.description)}
          </p>

          <!-- Skills tags -->
          <div class="flex flex-wrap gap-1.5 mb-5">
            ${job.tags.map(t => `<span class="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">#${escapeHTML(t)}</span>`).join("")}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="pt-3 border-t border-slate-100 flex items-center gap-2">
          <button onclick="bukaModalJob('${job.id}')" class="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition text-center">
            Detail Lowongan
          </button>
          <button onclick="lamarPekerjaanDenganGenerator('${job.id}')" class="flex-1 py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm text-center flex items-center justify-center gap-1.5">
            <i class="fa-solid fa-file-signature"></i> Lamar & Buat Surat
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function resetJobFilter() {
  const s = document.getElementById("job-search-input");
  const c = document.getElementById("job-category-filter");
  const t = document.getElementById("job-type-filter");
  if (s) s.value = "";
  if (c) c.value = "all";
  if (t) t.value = "all";
  renderJobBoard();
}

function toggleBookmark(jobId) {
  const idx = appState.bookmarks.indexOf(jobId);
  if (idx > -1) {
    appState.bookmarks.splice(idx, 1);
    showToast("Lowongan dihapus dari daftar simpanan.", "info");
  } else {
    appState.bookmarks.push(jobId);
    showToast("Lowongan berhasil disimpan ke bookmark!", "success");
  }
  saveBookmarksToStorage();
  renderJobBoard();
}

// Modal Detail Lowongan
function bukaModalJob(jobId) {
  const job = appState.jobs.find(j => j.id === jobId);
  if (!job) return;

  const modal = document.getElementById("job-detail-modal");
  const content = document.getElementById("job-modal-body");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="space-y-5">
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-3">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white font-bold flex items-center justify-center text-2xl shadow-md">
            ${job.company.charAt(0)}
          </div>
          <div>
            <h3 class="text-xl font-bold text-slate-900">${escapeHTML(job.title)}</h3>
            <p class="text-sm font-semibold text-blue-600">${escapeHTML(job.company)}</p>
            <p class="text-xs text-slate-500">${escapeHTML(job.address)}</p>
          </div>
        </div>
        <span class="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full border border-blue-200">
          ${escapeHTML(job.badge)}
        </span>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
        <div>
          <span class="text-[11px] text-slate-500 font-medium block">Gaji Ditawarkan</span>
          <span class="text-xs font-bold text-emerald-700">${escapeHTML(job.salary)}</span>
        </div>
        <div>
          <span class="text-[11px] text-slate-500 font-medium block">Tipe Kontrak</span>
          <span class="text-xs font-bold text-slate-800">${escapeHTML(job.type)}</span>
        </div>
        <div>
          <span class="text-[11px] text-slate-500 font-medium block">Pengalaman</span>
          <span class="text-xs font-bold text-slate-800">${escapeHTML(job.experience)}</span>
        </div>
        <div>
          <span class="text-[11px] text-slate-500 font-medium block">Batas Lamaran</span>
          <span class="text-xs font-bold text-red-600">${escapeHTML(job.deadline)}</span>
        </div>
      </div>

      <div>
        <h4 class="text-sm font-bold text-slate-900 mb-2">Deskripsi Pekerjaan:</h4>
        <p class="text-xs text-slate-700 leading-relaxed">${escapeHTML(job.description)}</p>
      </div>

      <div>
        <h4 class="text-sm font-bold text-slate-900 mb-2">Kualifikasi Pelamar:</h4>
        <ul class="list-disc list-inside text-xs text-slate-700 space-y-1">
          ${job.requirements.map(r => `<li>${escapeHTML(r)}</li>`).join("")}
        </ul>
      </div>

      <div>
        <h4 class="text-sm font-bold text-slate-900 mb-2">Benefit & Fasilitas:</h4>
        <div class="flex flex-wrap gap-2">
          ${job.benefits.map(b => `<span class="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg font-medium"><i class="fa-solid fa-check text-emerald-600 mr-1"></i>${escapeHTML(b)}</span>`).join("")}
        </div>
      </div>

      <div class="p-3 bg-blue-50/60 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
        <div>
          <p class="font-bold">Kontak Rekruter / HRD:</p>
          <p>${escapeHTML(job.hrd)}</p>
        </div>
        <button onclick="lamarPekerjaanDenganGenerator('${job.id}'); tutupModalJob();" class="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow">
          Lamar Sekarang
        </button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
}

function tutupModalJob() {
  const modal = document.getElementById("job-detail-modal");
  if (modal) modal.classList.add("hidden");
}

// Hubungkan lowongan kerja langsung ke Generator Surat Lamaran
function lamarPekerjaanDenganGenerator(jobId) {
  const job = appState.jobs.find(j => j.id === jobId);
  if (!job) return;

  // Isi data perusahaan di form
  document.getElementById("input-perusahaan").value = job.company;
  document.getElementById("input-posisi").value = job.title;
  document.getElementById("input-hrd").value = job.hrd;
  document.getElementById("input-alamatpt").value = job.address;
  document.getElementById("input-sumber-info").value = `Portal Karir Resmi ${job.company}`;

  updateTemplateTexts();
  updateLetterPreview();

  // Alihkan tab langsung ke Generator
  switchTab("generator");

  showToast(`Data "${job.title}" di ${job.company} telah disinkronkan ke Formulir Surat!`, "success");
}

// ==========================================
// 9. FITUR PELACAK LAMARAN KERJA (TRACKER)
// ==========================================

function renderTracker() {
  const listContainer = document.getElementById("tracker-list-container");
  if (!listContainer) return;

  const currentFilter = appState.trackerFilter;
  const items = appState.trackerList.filter(item => {
    if (currentFilter === "Semua") return true;
    return item.status === currentFilter;
  });

  // Perbarui Statistik Ringkas
  const totalCount = appState.trackerList.length;
  const reviewCount = appState.trackerList.filter(i => i.status === "Seleksi Berkas" || i.status === "Terkirim").length;
  const interviewCount = appState.trackerList.filter(i => i.status === "Interview").length;
  const offerCount = appState.trackerList.filter(i => i.status === "Offering" || i.status === "Diterima").length;

  document.getElementById("stat-total-lamaran") && (document.getElementById("stat-total-lamaran").textContent = totalCount);
  document.getElementById("stat-proses-lamaran") && (document.getElementById("stat-proses-lamaran").textContent = reviewCount);
  document.getElementById("stat-interview-lamaran") && (document.getElementById("stat-interview-lamaran").textContent = interviewCount);
  document.getElementById("stat-diterima-lamaran") && (document.getElementById("stat-diterima-lamaran").textContent = offerCount);

  if (items.length === 0) {
    listContainer.innerHTML = `
      <div class="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
        <div class="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
          <i class="fa-solid fa-list-check text-2xl"></i>
        </div>
        <h4 class="text-base font-bold text-slate-800">Belum ada riwayat lamaran</h4>
        <p class="text-xs text-slate-500 mt-1">Gunakan Generator Surat atau klik "Tambah Lamaran Manual" untuk mencatat progres karir Anda.</p>
      </div>
    `;
    return;
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Terkirim":
        return `<span class="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2.5 py-1 rounded-full font-semibold"><i class="fa-solid fa-paper-plane mr-1"></i> Terkirim</span>`;
      case "Seleksi Berkas":
        return `<span class="bg-purple-50 text-purple-700 border border-purple-200 text-xs px-2.5 py-1 rounded-full font-semibold"><i class="fa-solid fa-file-magnifying-glass mr-1"></i> Seleksi Berkas</span>`;
      case "Interview":
        return `<span class="bg-amber-50 text-amber-800 border border-amber-200 text-xs px-2.5 py-1 rounded-full font-semibold"><i class="fa-solid fa-comments mr-1"></i> Interview</span>`;
      case "Offering":
      case "Diterima":
        return `<span class="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1 rounded-full font-semibold"><i class="fa-solid fa-circle-check mr-1"></i> Diterima / Offering</span>`;
      case "Ditolak":
        return `<span class="bg-rose-50 text-rose-700 border border-rose-200 text-xs px-2.5 py-1 rounded-full font-semibold"><i class="fa-solid fa-circle-xmark mr-1"></i> Ditolak</span>`;
      default:
        return `<span class="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full font-semibold">${status}</span>`;
    }
  };

  listContainer.innerHTML = items.map(item => `
    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="flex items-center gap-2 flex-wrap">
          <h4 class="font-bold text-slate-900 text-base">${escapeHTML(item.posisi)}</h4>
          <span class="text-xs text-slate-400">•</span>
          <span class="font-semibold text-blue-700 text-sm">${escapeHTML(item.company)}</span>
          ${getStatusBadge(item.status)}
        </div>
        <p class="text-xs text-slate-500">
          <i class="fa-regular fa-calendar mr-1"></i> Dikirim: ${escapeHTML(formatTanggalIndo(item.tanggal))}
        </p>
        ${item.catatan ? `<p class="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 mt-2">${escapeHTML(item.catatan)}</p>` : ""}
      </div>

      <div class="flex items-center gap-2 flex-shrink-0">
        <!-- Dropdown ganti status langsung -->
        <select onchange="updateTrackerStatus('${item.id}', this.value)" class="text-xs bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option value="Terkirim" ${item.status === 'Terkirim' ? 'selected' : ''}>Terkirim</option>
          <option value="Seleksi Berkas" ${item.status === 'Seleksi Berkas' ? 'selected' : ''}>Seleksi Berkas</option>
          <option value="Interview" ${item.status === 'Interview' ? 'selected' : ''}>Interview</option>
          <option value="Offering" ${item.status === 'Offering' ? 'selected' : ''}>Offering / Diterima</option>
          <option value="Ditolak" ${item.status === 'Ditolak' ? 'selected' : ''}>Ditolak</option>
        </select>

        <button onclick="hapusTrackerItem('${item.id}')" title="Hapus Catatan" class="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition">
          <i class="fa-regular fa-trash-can text-sm"></i>
        </button>
      </div>
    </div>
  `).join("");
}

function updateTrackerStatus(id, newStatus) {
  const item = appState.trackerList.find(i => i.id === id);
  if (item) {
    item.status = newStatus;
    saveTrackerToStorage();
    renderTracker();
    showToast(`Status lamaran "${item.company}" diperbarui: ${newStatus}`, "info");
  }
}

function hapusTrackerItem(id) {
  if (!confirm("Hapus catatan lamaran ini dari pelacak?")) return;
  appState.trackerList = appState.trackerList.filter(i => i.id !== id);
  saveTrackerToStorage();
  renderTracker();
  showToast("Catatan lamaran telah dihapus.", "info");
}

function filterTrackerStatus(status) {
  appState.trackerFilter = status;
  document.querySelectorAll("[data-tracker-filter]").forEach(btn => {
    if (btn.getAttribute("data-tracker-filter") === status) {
      btn.classList.add("bg-blue-600", "text-white");
      btn.classList.remove("bg-slate-100", "text-slate-600");
    } else {
      btn.classList.remove("bg-blue-600", "text-white");
      btn.classList.add("bg-slate-100", "text-slate-600");
    }
  });
  renderTracker();
}

// Modal Tambah Manual Tracker
function bukaModalTambahTracker() {
  const modal = document.getElementById("tracker-add-modal");
  if (modal) modal.classList.remove("hidden");
}

function tutupModalTambahTracker() {
  const modal = document.getElementById("tracker-add-modal");
  if (modal) modal.classList.add("hidden");
}

function simpanTrackerManualBaru(e) {
  e.preventDefault();
  const comp = document.getElementById("manual-track-comp").value.trim();
  const pos = document.getElementById("manual-track-pos").value.trim();
  const date = document.getElementById("manual-track-date").value || new Date().toISOString().split('T')[0];
  const stat = document.getElementById("manual-track-status").value;
  const note = document.getElementById("manual-track-note").value.trim();

  if (!comp || !pos) {
    showToast("Perusahaan dan Posisi wajib diisi.", "warning");
    return;
  }

  const newItem = {
    id: "track-" + Date.now(),
    company: comp,
    posisi: pos,
    tanggal: date,
    status: stat,
    catatan: note
  };

  appState.trackerList.unshift(newItem);
  saveTrackerToStorage();
  renderTracker();
  tutupModalTambahTracker();

  // Reset form modal
  document.getElementById("form-manual-tracker").reset();
  showToast("Catatan lamaran baru berhasil ditambahkan!", "success");
}

// ==========================================
// 10. GENERATOR TEMPLATE EMAIL & PANDUAN HRD
// ==========================================

function renderEmailTemplatePreview() {
  const data = getFormData();
  const nama = data.nama || "[Nama Anda]";
  const posisi = data.posisi || "[Posisi Pekerjaan]";
  const perusahaan = data.perusahaan || "[Nama Perusahaan]";
  const hrd = data.hrd || "Bapak/Ibu HRD";

  // Template Subject Standar HRD
  const subject1 = `Lamaran Pekerjaan - ${posisi} - ${nama}`;
  const subject2 = `[Application] ${posisi} - ${nama}`;

  // Body Email Resmi Indonesia
  const bodyIndo = `Yth. ${hrd}
${perusahaan}

Dengan hormat,

Sehubungan dengan informasi lowongan pekerjaan yang saya peroleh mengenai posisi ${posisi} di ${perusahaan}, melalui email ini saya bermaksud untuk mengajukan diri guna bergabung dengan tim Bapak/Ibu.

Saya memiliki latar belakang di bidang ${data.jurusan || "terkait"} dengan komitmen tinggi, kemampuan komunikasi yang baik, serta kesiapan untuk berkontribusi maksimal. Sebagai kelengkapan informasi diri dan kualifikasi profesional, saya melampirkan berkas berikut:

1. Curriculum Vitae (CV) ATS-Friendly
2. Portofolio & Sertifikat Kompetensi
3. Ijazah & Transkrip Nilai

Besar harapan saya untuk mendapatkan kesempatan wawancara agar dapat menjelaskan kualifikasi dan potensi diri saya secara lebih rinci. 

Atas perhatian dan kesempatan yang Bapak/Ibu berikan, saya sampaikan terima kasih banyak.

Hormat saya,

${nama}
Telepon/WA: ${data.hp}
Email: ${data.email}
${data.linkedin ? `LinkedIn: ${data.linkedin}` : ""}`;

  // Body Email Bahasa Inggris
  const bodyEng = `Dear ${hrd},
Hiring Team at ${perusahaan},

I am writing to express my earnest enthusiasm for the ${posisi} position currently open at ${perusahaan}.

With my background in ${data.jurusan || "relevant discipline"} and hands-on professional experiences, I am confident in my capacity to add immediate value to your team. Attached to this email are my:

- Comprehensive ATS-compliant Resume / CV
- Work Portfolio & Certifications
- Academic Transcript

I would welcome the opportunity to discuss my qualification further in an interview. Thank you very much for your time and kind consideration.

Sincerely,

${nama}
Mobile: ${data.hp}
Email: ${data.email}`;

  const elSub1 = document.getElementById("email-subject-1");
  const elSub2 = document.getElementById("email-subject-2");
  const elBodyIndo = document.getElementById("email-body-indo");
  const elBodyEng = document.getElementById("email-body-eng");

  if (elSub1) elSub1.textContent = subject1;
  if (elSub2) elSub2.textContent = subject2;
  if (elBodyIndo) elBodyIndo.textContent = bodyIndo;
  if (elBodyEng) elBodyEng.textContent = bodyEng;
}

function salinTeks(elementId, label = "Teks") {
  const el = document.getElementById(elementId);
  if (!el) return;
  const val = el.innerText || el.textContent;

  navigator.clipboard.writeText(val).then(() => {
    showToast(`${label} berhasil disalin ke clipboard!`, "success");
  });
}

// ==========================================
// 11. TOAST NOTIFICATION SYSTEM
// ==========================================

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");

  let bgClass = "bg-slate-900 text-white border-slate-700";
  let icon = '<i class="fa-solid fa-circle-info text-blue-400"></i>';

  if (type === "success") {
    bgClass = "bg-emerald-950 text-emerald-100 border-emerald-700";
    icon = '<i class="fa-solid fa-circle-check text-emerald-400"></i>';
  } else if (type === "warning") {
    bgClass = "bg-amber-950 text-amber-100 border-amber-700";
    icon = '<i class="fa-solid fa-triangle-exclamation text-amber-400"></i>';
  } else if (type === "error") {
    bgClass = "bg-rose-950 text-rose-100 border-rose-700";
    icon = '<i class="fa-solid fa-circle-xmark text-rose-400"></i>';
  }

  toast.className = `toast animate-slide-up flex items-center gap-3 px-4 py-3 rounded-xl border text-xs font-medium shadow-xl max-w-sm ${bgClass}`;
  toast.innerHTML = `
    <span class="text-base">${icon}</span>
    <span class="flex-1">${escapeHTML(message)}</span>
    <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white transition">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  container.appendChild(toast);

  // Otomatis hapus setelah 4 detik
  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }
  }, 4000);
}