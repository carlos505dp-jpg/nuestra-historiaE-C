const music = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');
const enterButton = document.getElementById('enterButton');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

function updateMusicUI(isPlaying) {
  musicToggle.classList.toggle('playing', isPlaying);
  musicLabel.textContent = isPlaying ? 'Música reproduciéndose' : 'Reproducir música';
  musicToggle.setAttribute('aria-label', isPlaying ? 'Pausar música' : 'Reproducir música');
}

async function startMusic() {
  try {
    await music.play();
    updateMusicUI(true);
  } catch (error) {
    updateMusicUI(false);
    musicLabel.textContent = 'Toca para escuchar';
  }
}

enterButton.addEventListener('click', () => {
  startMusic();
  document.getElementById('historia').scrollIntoView({behavior: 'smooth'});
});

musicToggle.addEventListener('click', async () => {
  if (music.paused) await startMusic();
  else {
    music.pause();
    updateMusicUI(false);
  }
});

music.addEventListener('play', () => updateMusicUI(true));
music.addEventListener('pause', () => updateMusicUI(false));

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
function showPhoto(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt || 'Fotografía ampliada';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closePhoto() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  document.body.style.overflow = '';
}
document.querySelectorAll('.open-photo').forEach(img => img.addEventListener('click', () => showPhoto(img.src, img.alt)));
document.querySelectorAll('.gallery-photo').forEach(button => button.addEventListener('click', () => {
  const img = button.querySelector('img');
  showPhoto(button.dataset.photo, img.alt);
}));
document.getElementById('lightboxClose').addEventListener('click', closePhoto);
lightbox.addEventListener('click', event => { if (event.target === lightbox) closePhoto(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closePhoto(); });


// Contador en vivo desde el comienzo de nuestra historia
function updateLoveCounter() {
  const start = new Date(2026, 7, 23, 0, 0, 0);
  let diff = Math.max(0, Date.now() - start.getTime());
  const day = 86400000, hour = 3600000, minute = 60000;
  const days = Math.floor(diff / day); diff %= day;
  const hours = Math.floor(diff / hour); diff %= hour;
  const minutes = Math.floor(diff / minute);
  const seconds = Math.floor((diff % minute) / 1000);
  const put = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = String(value).padStart(2, '0'); };
  put('countDays', days); put('countHours', hours); put('countMinutes', minutes); put('countSeconds', seconds);
}
updateLoveCounter(); setInterval(updateLoveCounter, 1000);
