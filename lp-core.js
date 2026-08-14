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
