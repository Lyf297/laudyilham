const projects = [
  {
    id: 'p-01',
    category: 'website',
    title: 'Website Pengelola Keuangan',
    short: 'Responsive website finance project menggunakan HTML/CSS/JS.',
    desc: 'Website membantu kamu mengelola keuangan sehari-hari secara efisien. Dengan fitur tabungan fleksibel, pencatatan pengeluaran yang mudah, dan dashboard interaktif, kamu bisa memantau arus kas, menetapkan tujuan tabungan, dan membuat keputusan finansial yang lebih cerdas. Desain yang responsif memastikan pengalaman yang nyaman di semua perangkat, baik laptop maupun ponsel. Cocok untuk pelajar, profesional muda, atau siapa saja yang ingin lebih sadar dalam mengelola uangnya.',
    tools: 'HTML, CSS, JavaScript',
    image: 'img/project/pengelola-keuangan.png',
    link: 'https://lyf297.github.io/pengelola-keuangan/'
  },
  {
    id: 'p-02',
    category: 'website',
    title: 'Brief Design Generator – Buat Brief Desain Otomatis dalam Sekejap',
    short: 'Buat brief desain profesional hanya dengan mengisi form sederhana. Preview otomatis dan ekspor ke PDF/PNG siap digunakan.',
    desc: 'Brief Design Generator adalah alat praktis untuk membuat brief desain secara otomatis. Cukup isi form dengan informasi yang diperlukan, dan alat ini akan menghasilkan preview brief desain yang rapi dan siap digunakan. Kamu juga bisa mengekspor brief tersebut ke format PDF atau PNG untuk dibagikan atau dicetak. Cocok untuk desainer, freelancer, atau siapa saja yang membutuhkan brief desain dengan cepat dan efisien.',
    tools: 'HTML, CSS, JavaScript',
    image: 'img/project/brief.jpg',
    link: 'https://lyf297.github.io/brief-design-generator/'
  },
  {
    id: 'p-03',
    category: 'website',
    title: 'MindFlow Generator',
    short: 'Aplikasi web interaktif untuk membuat Mindmap & Flowchart profesional.',
    desc: 'MindFlow Ultimate adalah aplikasi Mindmap dan Flowchart interaktif berbasis web menggunakan JointJS.Fitur lengkap, profesional, dan responsif:Bebas watermark, clean, dan siap digunakan di desktop maupun mobile.',
    tools: 'HTML, CSS, JavaScript',
    image: 'img/project/mindflow.jpg',
    link: 'https://lyf297.github.io/mindflow-generator/'
  }, 
  {
    id: 'p-04',
    category: 'design',
    title: 'Poster Bullying',
    short: 'Poster Bullying yang dibuat dengan software Coreldraw .',
    desc: 'Poster dengan visual didominasi warna gelap (merah-hitam) untuk suasana mencekam. Seorang korban berwarna putih meringkuk ketakutan di tengah, dikelilingi oleh bayangan hitam bermata merah yang mewakili para perundung. Kata-kata hinaan kasar tertulis di bayangan tersebut, secara visual menekan korban. Pesan utamanya, "DONT BULLYING," menyuarakan pentingnya menghentikan perundungan verbal.',
    tools: 'Coreldraw',
    image: 'img/project/bullyingposter.jpg',
    link: '#'
  }, 
];

const projectCategories = document.getElementById('project-categories');
const projectGrids = {
  design: document.getElementById('design-projects-grid'),
  website: document.getElementById('website-projects-grid')
};
const yearEl = document.getElementById('year');
const projectCountEl = document.getElementById('project-count');
yearEl.textContent = new Date().getFullYear();
projectCountEl.textContent = String(projects.length).padStart(2, '0');

function createCard(p, index, category) {
  const el = document.createElement('article');
  el.className = 'card';
  if (category === 'design') {
    el.classList.add('design-card');
    el.innerHTML = `
      <div class="thumb"><img src="${p.image}" alt="Karya ${p.title}" loading="lazy"/></div>
      <div class="card-content">
        <div class="card-heading">
          <span class="project-number">${String(index).padStart(2, '0')}</span>
          <h3>${p.title}</h3>
        </div>
        <div class="meta">
          <small>${p.tools}</small>
          <button class="btn" type="button" data-id="${p.id}" aria-label="Lihat detail ${p.title}">Detail <span aria-hidden="true">↗</span></button>
        </div>
      </div>`;
    return el;
  }

  el.innerHTML = `
    <div class="thumb"><img src="${p.image}" alt="Pratinjau ${p.title}" loading="lazy"/></div>
    <div class="card-content">
      <div class="card-heading">
        <span class="project-number">${String(index).padStart(2, '0')}</span>
        <h3>${p.title}</h3>
      </div>
      <p>${p.short}</p>
      <div class="meta">
        <small>${p.tools}</small>
        <button class="btn" type="button" data-id="${p.id}">Lihat detail <span aria-hidden="true">↗</span></button>
      </div>
    </div>`;
  return el;
}

['design', 'website'].forEach((category) => {
  const categoryProjects = projects.filter((project) => project.category === category);
  const countEl = document.getElementById(`${category}-project-count`);
  countEl.textContent = `${String(categoryProjects.length).padStart(2, '0')} proyek`;
  categoryProjects.forEach((project, index) => {
    projectGrids[category].appendChild(createCard(project, index + 1, category));
  });
});

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalTools = document.getElementById('modal-tools');
const modalImage = document.getElementById('modal-image');
const modalLink = document.getElementById('modal-link');
const closeBtn = document.querySelector('.modal-close');

projectCategories.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-id]');
  if (!btn) return;
  const id = btn.getAttribute('data-id');
  const data = projects.find(x => x.id === id);
  if (!data) return;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.desc;
  modalTools.textContent = data.tools;
  modalImage.src = data.image;
  modalLink.href = data.link;
  modal.setAttribute('aria-hidden', 'false');
});

closeBtn.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.setAttribute('aria-hidden', 'true');
});