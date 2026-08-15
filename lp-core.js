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
document.addEventListener('DOMContentLoaded', function() {
  const track   = document.getElementById('sliderTrack');
  const dots    = document.querySelectorAll('.patrick-dot');
  const btnPrev = document.getElementById('seta-prev');
  const btnNext = document.getElementById('seta-next');

  if (!track) return;

  let atual = 0, autoplay;
  const total = 3;

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

  if (btnPrev) {
    btnPrev.addEventListener('click', function(e) {
      e.stopPropagation();
      ir(atual - 1);
      iniciarAuto();
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', function(e) {
      e.stopPropagation();
      ir(atual + 1);
      iniciarAuto();
    });
  }

  dots.forEach(function(d) {
    d.addEventListener('click', function() { 
      ir(+d.dataset.slide); 
      iniciarAuto(); 
    });
  });

  var touchX = 0;
  track.addEventListener('touchstart', function(e) { 
    touchX = e.touches[0].clientX; 
  }, {passive: true});

  track.addEventListener('touchend', function(e) {
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) { 
      ir(dx < 0 ? atual + 1 : atual - 1); 
      iniciarAuto(); 
    }
  }, {passive: true});

  track.addEventListener('mouseenter', function() { clearInterval(autoplay); });
  track.addEventListener('mouseleave', iniciarAuto);

  iniciarAuto();
});
</script>
