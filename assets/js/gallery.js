/**
 * Gallery Lightbox & Modal
 */
class GalleryLightbox {
  constructor() {
    this.modal = document.getElementById('lightboxModal');
    this.imgEl = document.getElementById('lightboxImg');
    this.btnClose = document.getElementById('lightboxClose');
    this.btnPrev = document.getElementById('lightboxPrev');
    this.btnNext = document.getElementById('lightboxNext');
    this.items = document.querySelectorAll('.gallery-item');
    this.currentIndex = 0;
    this.images = [];

    if (!this.modal || !this.imgEl) return;

    this.init();
  }

  init() {
    this.items.forEach((item, idx) => {
      const img = item.querySelector('img');
      if (img) {
        this.images.push(img.src);
        item.addEventListener('click', () => this.open(idx));
      }
    });

    if (this.btnClose) {
      this.btnClose.addEventListener('click', () => this.close());
    }

    if (this.btnPrev) {
      this.btnPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prev();
      });
    }

    if (this.btnNext) {
      this.btnNext.addEventListener('click', (e) => {
        e.stopPropagation();
        this.next();
      });
    }

    // Close on background click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (!this.modal.classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    this.modal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.modal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) {
        this.next(); // swipe left -> next
      }
      if (touchEndX > touchStartX + 50) {
        this.prev(); // swipe right -> prev
      }
    }, { passive: true });
  }

  open(index) {
    this.currentIndex = index;
    this.updateImage();
    this.modal.classList.add('active');
    document.body.classList.add('lock-scroll');
  }

  close() {
    this.modal.classList.remove('active');
    // Only unlock scroll if cover is not open
    const cover = document.getElementById('coverOverlay');
    if (cover && cover.classList.contains('opened')) {
      document.body.classList.remove('lock-scroll');
    }
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateImage();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateImage();
  }

  updateImage() {
    if (this.images[this.currentIndex]) {
      this.imgEl.src = this.images[this.currentIndex];
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new GalleryLightbox();
});

