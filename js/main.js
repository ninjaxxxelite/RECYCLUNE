/* Recyclune — scripts du site */
let seed = 7;
const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
const pick = a => a[Math.floor(rnd() * a.length)];

/* Bords déchirés : polygone irrégulier */
function torn(j = 4, n = 7){
  const pts = [];
  const jit = () => (rnd() * j).toFixed(1);
  for(let i=0;i<=n;i++) pts.push(`${(i/n*100).toFixed(1)}% ${jit()}%`);
  for(let i=1;i<=n;i++) pts.push(`${100-jit()}% ${(i/n*100).toFixed(1)}%`);
  for(let i=n-1;i>=0;i--) pts.push(`${(i/n*100).toFixed(1)}% ${100-jit()}%`);
  for(let i=n-1;i>=1;i--) pts.push(`${jit()}% ${(i/n*100).toFixed(1)}%`);
  return `polygon(${pts.join(',')})`;
}


/* Lettres découpées : alphabet de la charte */
document.querySelectorAll('[data-cut]').forEach(el => {
  const txt = el.dataset.cut, dark = !!el.closest('footer');
  const sr = document.createElement('span'); sr.className = 'sr'; sr.textContent = txt; el.appendChild(sr);
  let last = null;
  txt.split(' ').forEach((w, wi) => {
    if(wi){ const sp = document.createElement('span'); sp.className = 'sp'; sp.setAttribute('aria-hidden','true'); el.appendChild(sp); }
    const g = document.createElement('span'); g.className = 'w'; g.setAttribute('aria-hidden','true');
    [...w].forEach(c => {
      let opts = ALPHA[c.toUpperCase()];
      if(!opts){ const p = document.createElement('span'); p.className = 'punct'; p.textContent = c; g.appendChild(p); return; }
      if(dark){ const clair = opts.filter(o => !o[2]); if(clair.length) opts = clair; }
      let cand = opts.filter(o => o[0] !== last); if(!cand.length) cand = opts;
      const o = pick(cand); last = o[0];
      const img = new Image(); img.src = ALPHA_BASE + o[0]; img.alt = ''; img.decoding = 'async';
      img.style.setProperty('--h', o[1]);
      img.style.transform = `rotate(${(rnd()*4-2).toFixed(1)}deg) translateY(${(rnd()*6-3).toFixed(0)}%)`;
      g.appendChild(img);
    });
    el.appendChild(g);
  });
});

/* Formes aléatoires : titres de partie, pastilles, tuiles */
document.querySelectorAll('.t').forEach(t => {
  const a = () => (rnd()*7).toFixed(0);
  t.style.clipPath = `polygon(0 ${a()}%, ${93 + +a()}% 0, 100% ${72 + +a()*2}%, ${90 + +a()}% 100%, ${a()}% ${93 + +a()}%)`;
});
document.querySelectorAll('[data-torn]').forEach(b => { b.style.clipPath = torn(9, 6); b.style.transform = `rotate(${(rnd()*14-7).toFixed(0)}deg)`; });
document.querySelectorAll('.tile, .missions li, .ph').forEach(b => {
  const a = () => (rnd()*1.6).toFixed(1);
  b.style.clipPath = `polygon(${a()}% ${a()}%, ${100-a()}% ${a()}%, ${100-a()}% ${100-a()}%, ${a()}% ${100-a()}%)`;
});

/* Rayons */
const ic = {
  'Meubles':'<path d="M10 28h28v12H10zM6 24h6v18H6zm30 0h6v18h-6zM14 16h20v10H14z"/>',
  'Linge de maison':'<path d="M8 30h32v6H8zm2 8h28v4H10zM12 22l12-12 12 12z"/>',
  'Livres':'<path d="M6 10c7 0 13 2 18 6v24c-5-4-11-6-18-6zm36 0c-7 0-13 2-18 6v24c5-4 11-6 18-6z"/>',
  'Bijoux':'<circle cx="24" cy="30" r="12" fill="none" stroke="#fff2dd" stroke-width="4"/><path d="M18 8h12l4 6-10 6-10-6z"/>',
  'Vaisselle':'<circle cx="20" cy="26" r="14"/><circle cx="20" cy="26" r="7" fill="#6d311d"/><path d="M36 14h6v24h-6z"/>',
  'Jouets':'<path d="M6 22h16v16H6zm12-14h16v16H18zm8 14h16v16H26z"/>',
  'Vélos':'<circle cx="12" cy="32" r="8" fill="none" stroke="#fff2dd" stroke-width="3.5"/><circle cx="36" cy="32" r="8" fill="none" stroke="#fff2dd" stroke-width="3.5"/><path d="M12 32l8-14h12l4 14M18 14h6" fill="none" stroke="#fff2dd" stroke-width="3.5"/>',
  'Musique':'<path d="M34 6l4 4-8 8a8 8 0 0 1-2 14 9 9 0 1 1-12-12 8 8 0 0 1 14-2z"/>',
  'Sport':'<ellipse cx="30" cy="16" rx="10" ry="12" fill="none" stroke="#fff2dd" stroke-width="3.5"/><path d="M23 25L8 42l-3-3 15-15z"/>',
  'Luminaires':'<path d="M23 4h2v18h-2zM10 34c0-8 6-12 14-12s14 4 14 12z"/><circle cx="24" cy="38" r="3"/>',
  'Faïence':'<path d="M16 6h16v6c6 4 8 10 6 18-2 8-6 12-14 12S12 38 10 30c-2-8 0-14 6-18z"/>',
  'Bricolage':'<path d="M36 6l6 6-4 4-4-4-20 20 4 4-4 4-6-6zM10 8l8 8-4 4-8-8z"/>',
  'Arts créatifs':'<path d="M24 6C12 6 4 14 4 24s8 18 18 18c4 0 4-4 2-6s0-6 4-6h6c6 0 10-4 10-10C44 12 34 6 24 6zm-10 18a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm8-8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm10 2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>',
  'Puériculture':'<path d="M20 4h8v6h4v6l-2 2v24H18V18l-2-2v-6h4z"/>',
  'Décoration':'<path d="M8 12h32v28H8zm4 4v20h24V16z"/><circle cx="24" cy="26" r="5"/>',
  'Accessoires animaux':'<circle cx="14" cy="18" r="4"/><circle cx="24" cy="12" r="4"/><circle cx="34" cy="18" r="4"/><path d="M24 22c-6 0-12 8-12 13 0 5 6 5 12 3 6 2 12 2 12-3 0-5-6-13-12-13z"/>'
};
const R = document.getElementById('rayons');
if(R) R.innerHTML = Object.entries(ic).map(([n,p]) => `<div class="rayon"><svg viewBox="0 0 48 48" aria-hidden="true">${p}</svg>${n}</div>`).join('');

/* Filtres de l'agenda */
document.querySelectorAll('.filters button').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.filters button').forEach(x => x.setAttribute('aria-pressed', x === b));
  document.querySelectorAll('.events .event').forEach(e => e.hidden = !(b.dataset.f === 'tout' || e.dataset.k === b.dataset.f));
}));

/* Formulaire bénévolat (démonstration) */
document.querySelectorAll('form.form').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault(); f.querySelector('.sent').style.display = 'block'; f.reset();
}));

/* Menu mobile */
const burger = document.querySelector('.burger'), nav = document.getElementById('nav');
burger.addEventListener('click', () => { nav.classList.toggle('open'); burger.setAttribute('aria-expanded', nav.classList.contains('open')); });
