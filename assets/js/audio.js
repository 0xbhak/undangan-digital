/**
 * Audio Controller for Background Music
 * Piano Instrumental
 */
class AudioController {
  constructor() {
    this.audio = document.getElementById('bgAudio');
    this.btn = document.getElementById('btnMusicToggle');
    this.icon = this.btn ? this.btn.querySelector('i') : null;
    this.isPlaying = false;

    if (!this.audio || !this.btn) return;

    this.init();
  }

  init() {
    this.btn.addEventListener('click', () => this.toggle());

    // Update state when audio ends or pauses externally
    this.audio.addEventListener('play', () => this.onPlay());
    this.audio.addEventListener('pause', () => this.onPause());
  }

  play() {
    if (!this.audio) return;
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.onPlay();
    }).catch(err => {
      console.log('Autoplay prevented or audio blocked:', err);
      this.isPlaying = false;
      this.onPause();
    });
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.onPause();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  onPlay() {
    this.isPlaying = true;
    if (this.btn) {
      this.btn.classList.add('disc-spinning');
      this.btn.setAttribute('title', 'Jeda Musik');
    }
    if (this.icon) {
      this.icon.className = 'fas fa-compact-disc';
    }
  }

  onPause() {
    this.isPlaying = false;
    if (this.btn) {
      this.btn.classList.remove('disc-spinning');
      this.btn.setAttribute('title', 'Putar Musik');
    }
    if (this.icon) {
      this.icon.className = 'fas fa-volume-mute';
    }
  }
}

let audioCtrl = null;
document.addEventListener('DOMContentLoaded', () => {
  audioCtrl = new AudioController();
});

