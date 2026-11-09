/**
 * Undangan Digital - Main Application Logic
 * Samsul Bahri & Hilya Melati
 */

// Toast notification helper
window.showToast = function(message) {
  let toast = document.getElementById('toastMsg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastMsg';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
  toast.classList.add('show');

  if (window.toastTimeout) clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
};

// Clipboard copy helper
window.copyToClipboard = function(text, successMessage) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      window.showToast(successMessage || 'Berhasil disalin ke clipboard!');
    }).catch(() => fallbackCopy(text, successMessage));
  } else {
    fallbackCopy(text, successMessage);
  }
};

function fallbackCopy(text, successMessage) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.top = '-9999px';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    window.showToast(successMessage || 'Berhasil disalin ke clipboard!');
  } catch (err) {
    window.showToast('Gagal menyalin text.');
  }
  document.body.removeChild(textArea);
}

// Calendar generator (.ics download)
window.downloadIcsCalendar = function(title, description, location, startDateIso, endDateIso) {
  const formatDate = (dateStr) => {
    return dateStr.replace(/[-:]/g, '').replace('.000', '');
  };

  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Bahri and Hilya Wedding//ID',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    `DTSTART:${formatDate(startDateIso)}`,
    `DTEND:${formatDate(endDateIso)}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${title.replace(/\s+/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.showToast('File kalender (.ics) berhasil diunduh!');
};

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const coverOverlay = document.getElementById('coverOverlay');
  const btnOpenInvitation = document.getElementById('btnOpenInvitation');
  const floatingMusicBtn = document.getElementById('btnMusicToggle');
  const bottomNavDock = document.getElementById('bottomNavDock');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  // Initialize locked scroll for cover
  document.body.classList.add('lock-scroll');

  // Handle "Buka Undangan" click
  if (btnOpenInvitation) {
    btnOpenInvitation.addEventListener('click', () => {
      // 1. Play music
      if (window.audioCtrl) {
        window.audioCtrl.play();
      } else {
        const audio = document.getElementById('bgAudio');
        if (audio) audio.play().catch(e => console.log('Autoplay audio play error:', e));
      }

      // 2. Animate cover out
      coverOverlay.classList.add('opened');
      document.body.classList.remove('lock-scroll');

      // 3. Show floating controls
      if (floatingMusicBtn) floatingMusicBtn.classList.add('visible');
      if (bottomNavDock) bottomNavDock.classList.add('visible');

      // 4. Smooth scroll to first section
      setTimeout(() => {
        const homeSection = document.getElementById('home');
        if (homeSection) {
          homeSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    });
  }

  // Scroll Spy for Bottom Navigation Dock
  const updateActiveNav = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 180;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navItems.forEach(item => {
        if (item.getAttribute('href') === `#${currentSectionId}`) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  };

  const revealObserver = new IntersectionObserver(observerCallback, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Copy buttons
  const btnCopyRekening = document.getElementById('btnCopyRekening');
  if (btnCopyRekening) {
    btnCopyRekening.addEventListener('click', () => {
      window.copyToClipboard('7191305242', 'Nomor rekening BSI (7191305242) berhasil disalin!');
      const origHtml = btnCopyRekening.innerHTML;
      btnCopyRekening.innerHTML = '<i class="fas fa-check"></i> <span>Tersalin ✓</span>';
      setTimeout(() => { btnCopyRekening.innerHTML = origHtml; }, 2000);
    });
  }

  // Toggle QRIS Button
  const btnToggleQris = document.getElementById('btnToggleQris');
  const qrisContainer = document.getElementById('qrisContainer');
  const qrisBtnText = document.getElementById('qrisBtnText');
  if (btnToggleQris && qrisContainer) {
    btnToggleQris.addEventListener('click', () => {
      const isHidden = qrisContainer.style.display === 'none' || qrisContainer.style.display === '';
      qrisContainer.style.display = isHidden ? 'block' : 'none';
      if (qrisBtnText) {
        qrisBtnText.textContent = isHidden ? 'Tutup QRIS' : 'Lihat QRIS';
      }
    });
  }

  const btnCopyAlamat = document.getElementById('btnCopyAlamat');
  if (btnCopyAlamat) {
    btnCopyAlamat.addEventListener('click', () => {
      const address = 'Desa Teubang Phui Mesjid, Kecamatan Montasik, Aceh Besar (Penerima: Hilya Melati / Samsul Bahri - 082277795054)';
      window.copyToClipboard(address, 'Alamat pengiriman fisik berhasil disalin!');
      const origHtml = btnCopyAlamat.innerHTML;
      btnCopyAlamat.innerHTML = '<i class="fas fa-check"></i> <span>Tersalin ✓</span>';
      setTimeout(() => { btnCopyAlamat.innerHTML = origHtml; }, 2000);
    });
  }

  // Calendar Event buttons (Google & Apple .ics)
  const btnCalAkad = document.getElementById('btnCalAkad');
  if (btnCalAkad) {
    btnCalAkad.addEventListener('click', (e) => {
      e.preventDefault();
      // Akad: Kamis, 26 Nov 2026, 10:00 - 13:00 WIB (UTC+7 -> UTC 03:00 - 06:00)
      const gcalUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+Bahri+%26+Hilya&dates=20261126T030000Z/20261126T060000Z&details=Akad+Nikah+Samsul+Bahri+%26+Hilya+Melati+bertempat+di+Mesjid+Al+Jihad+Montasik+(Mesjid+Blang+Weu)&location=Mesjid+Al+Jihad+Montasik+(Mesjid+Blang+Weu)';
      window.open(gcalUrl, '_blank');
    });
  }

  const btnCalAkadIcs = document.getElementById('btnCalAkadIcs');
  if (btnCalAkadIcs) {
    btnCalAkadIcs.addEventListener('click', (e) => {
      e.preventDefault();
      window.downloadIcsCalendar(
        'Akad Nikah Bahri & Hilya',
        'Akad Nikah Samsul Bahri & Hilya Melati',
        'Mesjid Al Jihad Montasik (Mesjid Blang Weu)',
        '20261126T030000Z',
        '20261126T060000Z'
      );
    });
  }

  const btnCalResepsi = document.getElementById('btnCalResepsi');
  if (btnCalResepsi) {
    btnCalResepsi.addEventListener('click', (e) => {
      e.preventDefault();
      // Resepsi: 28 Nov 2026, 11:00 - 17:00 WIB (UTC+7 -> UTC 04:00 - 10:00)
      const gcalUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi+Pernikahan+Bahri+%26+Hilya&dates=20261128T040000Z/20261128T100000Z&details=Resepsi+Pernikahan+Samsul+Bahri+%26+Hilya+Melati+bertempat+di+Desa+Teubang+Phui+Mesjid+kecamatan+montasik&location=Desa+Teubang+Phui+Mesjid+kecamatan+montasik';
      window.open(gcalUrl, '_blank');
    });
  }

  const btnCalResepsiIcs = document.getElementById('btnCalResepsiIcs');
  if (btnCalResepsiIcs) {
    btnCalResepsiIcs.addEventListener('click', (e) => {
      e.preventDefault();
      window.downloadIcsCalendar(
        'Resepsi Pernikahan Bahri & Hilya',
        'Resepsi Pernikahan Samsul Bahri & Hilya Melati',
        'Desa Teubang Phui Mesjid, Kecamatan Montasik, Aceh Besar',
        '20261128T040000Z',
        '20261128T100000Z'
      );
    });
  }

  // Share to WhatsApp Button
  const btnShareWa = document.getElementById('btnShareWa');
  if (btnShareWa) {
    btnShareWa.addEventListener('click', () => {
      const shareUrl = window.location.href;
      const shareText = encodeURIComponent(
        `Assalamu’alaikum Warahmatullahi Wabarakatuh.\n\nUndangan Pernikahan Samsul Bahri & Hilya Melati:\n${shareUrl}\n\nMerupakan suatu kehormatan apabila berkenan hadir & mendoakan kedua mempelai.`
      );
      window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
    });
  }

  // Guest Link Generator Modal Logic
  const btnOpenLinkGen = document.getElementById('btnOpenLinkGen');
  const toolModal = document.getElementById('toolModal');
  const toolModalClose = document.getElementById('toolModalClose');
  const inputGenName = document.getElementById('inputGenName');
  const btnGenerateLink = document.getElementById('btnGenerateLink');
  const genOutputBox = document.getElementById('genOutputBox');
  const genResultLink = document.getElementById('genResultLink');
  const btnCopyGenLink = document.getElementById('btnCopyGenLink');
  const btnCopyWaTemplate = document.getElementById('btnCopyWaTemplate');

  if (btnOpenLinkGen && toolModal) {
    btnOpenLinkGen.addEventListener('click', () => {
      toolModal.classList.add('active');
    });

    if (toolModalClose) {
      toolModalClose.addEventListener('click', () => {
        toolModal.classList.remove('active');
      });
    }

    toolModal.addEventListener('click', (e) => {
      if (e.target === toolModal) toolModal.classList.remove('active');
    });

    if (btnGenerateLink && inputGenName) {
      btnGenerateLink.addEventListener('click', () => {
        const guest = inputGenName.value.trim();
        if (!guest) {
          window.showToast('Silakan ketik nama tamu terlebih dahulu.');
          return;
        }

        const baseUrl = window.location.origin + window.location.pathname;
        const encoded = encodeURIComponent(guest);
        const fullLink = `${baseUrl}?to=${encoded}`;

        genResultLink.textContent = fullLink;
        genOutputBox.style.display = 'block';

        if (btnCopyGenLink) {
          btnCopyGenLink.onclick = () => {
            window.copyToClipboard(fullLink, 'Link undangan tamu berhasil disalin!');
          };
        }

        if (btnCopyWaTemplate) {
          btnCopyWaTemplate.onclick = () => {
            const waText = 
`Kepada Yth.
Bapak/Ibu/Saudara/i: ${guest}

Assalamu’alaikum Warahmatullahi Wabarakatuh

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

Samsul Bahri & Hilya Melati

Untuk informasi detail mengenai jadwal dan lokasi acara, silakan kunjungi tautan undangan digital kami di bawah ini:
${fullLink}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu.

Wassalamu’alaikum Warahmatullahi Wabarakatuh
Kami yang berbahagia,
Bahri & Hilya`;
            window.copyToClipboard(waText, 'Format undangan WhatsApp berhasil disalin!');
          };
        }
      });
    }
  }
});

