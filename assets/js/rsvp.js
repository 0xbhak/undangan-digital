/**
 * RSVP & Wishes / Buku Tamu Management
 */

// Initial warm sample wishes to give an active, lovely community feel
const INITIAL_WISHES = [
  {
    id: 1,
    name: 'Teuku Iskandar & Keluarga',
    attendance: 'hadir',
    pax: 2,
    message: 'Barakallahu laka wa baraka alaika wa jama’a bainakuma fii khair. Selamat untuk Bahri & Hilya! Semoga Allah SWT senantiasa melimpahkan berkah dan kebahagiaan dalam rumah tangga.',
    time: '2 jam yang lalu'
  },
  {
    id: 2,
    name: 'Cut Nurul Safitri',
    attendance: 'hadir',
    pax: 1,
    message: 'MasyaAllah Tabarakallah, selamat Hilya sahabatku! Semoga lancar sampai hari H nanti di Montasik, bahagia selamanya bersama Bahri.',
    time: '5 jam yang lalu'
  },
  {
    id: 3,
    name: 'Muhammad Razi, S.T.',
    attendance: 'hadir',
    pax: 2,
    message: 'Selamat menempuh hidup baru Bahri & Hilya. Semoga menjadi keluarga sakinah, mawaddah, warahmah. InsyaAllah kami hadir!',
    time: '1 hari yang lalu'
  },
  {
    id: 4,
    name: 'Zulkifli & Istri',
    attendance: 'tidak-hadir',
    pax: 0,
    message: 'Selamat berbahagia Bahri dan Hilya. Mohon maaf belum bisa berhadir karena ada tugas dinas di luar kota. Doa terbaik kami panjatkan untuk kedua mempelai.',
    time: '1 hari yang lalu'
  },
  {
    id: 5,
    name: 'Fauzan Azima',
    attendance: 'hadir',
    pax: 1,
    message: 'Selamat Bahri saudaraku! Semoga dimudahkan segala urusan dan menjadi imam yang bijaksana untuk Hilya tercinta. Aamiin.',
    time: '2 hari yang lalu'
  }
];

class RsvpManager {
  constructor() {
    this.storageKey = 'undangan_bahri_hilya_wishes_v1';
    this.wishes = this.loadWishes();

    this.form = document.getElementById('rsvpForm');
    this.wishesList = document.getElementById('wishesList');
    this.wishesCount = document.getElementById('wishesCount');
    this.radioHadir = document.getElementById('radioHadir');
    this.radioTidakHadir = document.getElementById('radioTidakHadir');
    this.paxGroup = document.getElementById('paxGroup');
    this.coverGuestName = document.getElementById('coverGuestName');
    this.formNama = document.getElementById('formNama');

    this.init();
  }

  init() {
    this.parseGuestNameFromUrl();
    this.setupFormListeners();
    this.renderWishes();
  }

  parseGuestNameFromUrl() {
    const params = new URLSearchParams(window.location.search);
    let guest = params.get('to') || params.get('u') || params.get('nama') || params.get('guest');

    if (!guest) {
      // Check path (e.g. /black-diamond/nama-tamu/)
      const pathParts = window.location.pathname.split('/').filter(Boolean);
      const lastPart = pathParts[pathParts.length - 1];
      if (lastPart && lastPart !== 'index.html' && lastPart !== 'undangan-digital' && lastPart.length > 2) {
        guest = decodeURIComponent(lastPart).replace(/-/g, ' ');
      }
    }

    if (guest) {
      // Title Case the guest name
      guest = guest.trim();
      if (this.coverGuestName) {
        this.coverGuestName.textContent = guest;
      }
      if (this.formNama) {
        this.formNama.value = guest;
      }
    } else {
      if (this.coverGuestName) {
        this.coverGuestName.textContent = 'Tamu Undangan';
      }
    }
  }

  setupFormListeners() {
    if (!this.form) return;

    // Toggle Pax (Jumlah Tamu) field visibility
    const handleRadioChange = () => {
      if (this.radioHadir && this.radioHadir.checked) {
        if (this.paxGroup) this.paxGroup.style.display = 'block';
      } else {
        if (this.paxGroup) this.paxGroup.style.display = 'none';
      }
    };

    if (this.radioHadir) this.radioHadir.addEventListener('change', handleRadioChange);
    if (this.radioTidakHadir) this.radioTidakHadir.addEventListener('change', handleRadioChange);

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();

    const nama = this.formNama ? this.formNama.value.trim() : '';
    const kehadiran = document.querySelector('input[name="kehadiran"]:checked')?.value || 'hadir';
    const paxInput = document.getElementById('formPax');
    const pax = kehadiran === 'hadir' ? (parseInt(paxInput?.value, 10) || 1) : 0;
    const pesanInput = document.getElementById('formPesan');
    const pesan = pesanInput ? pesanInput.value.trim() : '';

    if (!nama) {
      window.showToast('Silakan masukkan nama Anda.');
      return;
    }

    if (!pesan) {
      window.showToast('Silakan tuliskan ucapan atau doa Anda.');
      return;
    }

    const newWish = {
      id: Date.now(),
      name: nama,
      attendance: kehadiran,
      pax: pax,
      message: pesan,
      time: 'Baru saja'
    };

    this.wishes.unshift(newWish);
    this.saveWishes();
    this.renderWishes();

    // Reset form fields
    if (pesanInput) pesanInput.value = '';
    window.showToast('Terima kasih! Konfirmasi & ucapan Anda telah tersimpan.');

    // Scroll slightly to wishes list so they can see their post
    if (this.wishesList) {
      this.wishesList.scrollTop = 0;
    }
  }

  loadWishes() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return [...INITIAL_WISHES];
  }

  saveWishes() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.wishes));
    } catch (e) {
      console.warn('LocalStorage write error:', e);
    }
  }

  renderWishes() {
    if (!this.wishesList) return;

    if (this.wishesCount) {
      this.wishesCount.textContent = this.wishes.length;
    }

    // Update Attendance Statistics
    const hadirCount = this.wishes.filter(w => w.attendance === 'hadir').length;
    const tidakHadirCount = this.wishes.filter(w => w.attendance === 'tidak-hadir').length;

    const statHadirEl = document.getElementById('statHadir');
    const statTidakHadirEl = document.getElementById('statTidakHadir');

    if (statHadirEl) {
      statHadirEl.innerHTML = `<i class="fas fa-check-circle"></i> ${hadirCount} Hadir`;
    }
    if (statTidakHadirEl) {
      statTidakHadirEl.innerHTML = `<i class="fas fa-times-circle"></i> ${tidakHadirCount} Maaf`;
    }

    this.wishesList.innerHTML = this.wishes.map(wish => {
      const badgeClass = wish.attendance === 'hadir' ? 'hadir' : 'tidak-hadir';
      const badgeText = wish.attendance === 'hadir' 
        ? `<i class="fas fa-check-circle"></i> Hadir ${wish.pax > 1 ? '(' + wish.pax + ' orang)' : ''}`
        : '<i class="fas fa-times-circle"></i> Tidak Hadir';

      return `
        <div class="wish-item">
          <div class="wish-top">
            <span class="wish-author">${this.escapeHtml(wish.name)}</span>
            <span class="wish-badge ${badgeClass}">${badgeText}</span>
          </div>
          <div class="wish-text">${this.escapeHtml(wish.message)}</div>
          <div class="wish-time"><i class="far fa-clock"></i> ${this.escapeHtml(wish.time)}</div>
        </div>
      `;
    }).join('');
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new RsvpManager();
});

