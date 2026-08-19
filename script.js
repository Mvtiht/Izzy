const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const iconPlay = document.getElementById('iconPlay');
const iconPause = document.getElementById('iconPause');
const musicPlayer = document.getElementById('musicPlayer');

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch(() => {
      alert('Agrega la cancion en el src.');
    });
  } else {
    audio.pause();
  }
});

audio.addEventListener('play', () => {
  iconPlay.style.display = 'none';
  iconPause.style.display = 'block';
  musicPlayer.classList.add('playing');
  playBtn.setAttribute('aria-label', 'Pausar');
});

audio.addEventListener('pause', () => {
  iconPlay.style.display = 'block';
  iconPause.style.display = 'none';
  musicPlayer.classList.remove('playing');
  playBtn.setAttribute('aria-label', 'Reproducir');
});

function iniciarMusicaAuto(){
  if (audio.paused) {
    audio.play().catch(() => {});
  }
  document.removeEventListener('click', iniciarMusicaAuto);
  document.removeEventListener('touchstart', iniciarMusicaAuto);
}
document.addEventListener('click', iniciarMusicaAuto);
document.addEventListener('touchstart', iniciarMusicaAuto);

const FECHA_INICIO = '2026-06-19';

function actualizarContador(){
  const inicio = new Date(FECHA_INICIO + 'T00:00:00');
  const hoy = new Date();
  const msPorDia = 1000 * 60 * 60 * 24;
  const dias = Math.floor((hoy - inicio) / msPorDia);
  const counterEl = document.getElementById('counterDays');
  if (counterEl) counterEl.textContent = dias >= 0 ? dias : 0;
}
actualizarContador();

const mensajes = [
  {
    titulo: "Mi niña:",
    parrafos: [
      "Hoy cumplimos 2 meses juntos y quisiera decirte cuánto te amo y lo feliz que me siento de tenerte. Eres una gran persona que se ha vuelto muy importante para mí.",
      "Gracias por soportarme cuando te 'saco pica', porque como sabes yo siempre gano jsjsjsjsj. También por soportar mi humor o lo intenso que puedo ser pidiendo un beso tuyo.",
      "Quiero que sepas que tienes todo mi apoyo en lo que quieras hacer. Tal vez este año aún no estudiarás, pero cuando lo hagas estaré para ti, para darte mi apoyo y mi amor, y hacerte saber lo grandiosa que eres y que tú puedes con todo lo que venga en tu camino.",
      "También quería decirte que te admiro como persona. Ya te lo he dicho antes, pero eres muy amable con todos, no solo conmigo. Eres alguien muy empática y comprensiva con los demás, y también eres muy guapa jsjsjs. Te amu."
    ],
    firma: "Te amo linda. ♡"
  },
  {
    titulo: "Te amo:",
    parrafos: [
      "Te amo mucho, linda. Espero que esto, que es algo pequeño, te haga sentir lo mucho que te amo y lo feliz que me haces.",
      "Perdón si te parece algo cursi, o tal vez te parece muy simple, pero realmente lo hice con mucho amor para ti y con lo poco que sé de hacer páginas sjsjsjsjsj"
    ],
    firma: "Con amor, tu novio. ♡",
    qr: {
      src: "assets/qr-code.png",
      caption: "Escanea el QR, linda. Si no funciona, dime, porque me tomó harto rato que sirviera JJSDAJFJSDFJ ♡"
    }
  }
];

const card = document.getElementById('card');
const dots = document.querySelectorAll('.dot');

function construirCardHTML(m){
  const qrHtml = m.qr ? `
    <div class="qr-wrap">
      <img src="${m.qr.src}" alt="Código QR">
      <p class="qr-caption">${m.qr.caption}</p>
    </div>
  ` : '';

  return `
    <div class="quote-mark">&ldquo;</div>
    <h2>${m.titulo}</h2>
    ${m.parrafos.map(p => `<p>${p}</p>`).join('')}
    ${qrHtml}
    <p class="firma">${m.firma}</p>
    <svg class="flower" viewBox="0 0 170 260" xmlns="http://www.w3.org/2000/svg">
      <line x1="150" y1="20" x2="60" y2="250" stroke="#c9917d" stroke-width="2"/>
      <line x1="150" y1="20" x2="90" y2="70" stroke="#c9917d" stroke-width="1.5"/>
      <line x1="150" y1="20" x2="120" y2="60" stroke="#c9917d" stroke-width="1.5"/>
      <g fill="#f4b8c6">
        <circle cx="90" cy="65" r="5"/><circle cx="98" cy="58" r="5"/><circle cx="82" cy="58" r="5"/><circle cx="90" cy="52" r="5"/>
      </g>
      <g fill="#f7cfd9">
        <circle cx="120" cy="55" r="5"/><circle cx="128" cy="48" r="5"/><circle cx="112" cy="48" r="5"/><circle cx="120" cy="42" r="5"/>
      </g>
      <g fill="#f4b8c6">
        <circle cx="145" cy="15" r="6"/><circle cx="155" cy="8" r="6"/><circle cx="136" cy="8" r="6"/><circle cx="145" cy="0" r="6"/>
      </g>
      <rect x="35" y="185" width="65" height="30" rx="3" fill="#f9dbe4" opacity="0.85" transform="rotate(-18 67 200)"/>
    </svg>
  `;
}

let cambiando = false;

function renderCard(i){
  if (cambiando) return;
  cambiando = true;

  const m = mensajes[i];

  card.classList.add('card-out');

  setTimeout(() => {

    card.innerHTML = construirCardHTML(m);

    card.classList.remove('card-out');
    card.classList.add('card-in');

    void card.offsetWidth;

    card.classList.remove('card-in');

    setTimeout(() => { cambiando = false; }, 280);
  }, 280);
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    if (dot.classList.contains('active')) return;
    dots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
    renderCard(parseInt(dot.dataset.i));
  });
});

function crearPetalos(){
  const contenedor = document.getElementById('petals');
  if (!contenedor) return;
  const cantidad = 16;

  for (let i = 0; i < cantidad; i++){
    const petal = document.createElement('div');
    petal.className = 'petal';

    const tam = 8 + Math.random() * 10;
    const izquierda = Math.random() * 100;
    const duracionCaida = 10 + Math.random() * 10;
    const duracionBalanceo = 3 + Math.random() * 3;
    const retraso = Math.random() * 12;

    petal.style.width = tam + 'px';
    petal.style.height = tam + 'px';
    petal.style.left = izquierda + 'vw';
    petal.style.animationDuration = `${duracionCaida}s, ${duracionBalanceo}s`;
    petal.style.animationDelay = `${retraso}s, ${retraso}s`;

    contenedor.appendChild(petal);
  }
}
crearPetalos();