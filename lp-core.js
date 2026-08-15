document.addEventListener('DOMContentLoaded',()=>{
  const obs=new IntersectionObserver((e)=>{
    e.forEach(en=>{if(en.isIntersecting){en.target.classList.add('visivel');obs.unobserve(en.target)}})
  },{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
  document.querySelectorAll('a[href^="#"]').forEach(l=>{
    l.addEventListener('click',e=>{
      const t=document.querySelector(l.getAttribute('href'));
      if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}
    });
  });
  document.querySelectorAll('[data-ano]').forEach(el=>{el.textContent=new Date().getFullYear()});
  const heroBg=document.querySelector('.hero__bg img');
  if(heroBg&&window.matchMedia('(prefers-reduced-motion:no-preference)').matches){
    window.addEventListener('scroll',()=>{
      if(window.scrollY<window.innerHeight)heroBg.style.transform=`translateY(${window.scrollY*.2}px)`;
    },{passive:true});
  }
});

<script id="patrick-slider-js">
(function() {
  function initSlider() {
    const sliderContainer = document.getElementById('patrickSlider');
    const track = document.getElementById('sliderTrack');
    const dots = document.querySelectorAll('.patrick-dot');
    
    if (!track || !sliderContainer) return;

    let atual = 0;
    let autoplay;
    const total = track.children.length || 3;

    function ir(n) {
      atual = (n + total) % total;
      track.style.transform = 'translateX(-' + (atual * 100) + '%)';
      dots.forEach(function(d, i) {
        d.classList.toggle('ativo', i === atual);
      });
    }

    function iniciarAuto() {
      clearInterval(autoplay);
      autoplay = setInterval(function() { ir(atual + 1); }, 4500);
    }

    
