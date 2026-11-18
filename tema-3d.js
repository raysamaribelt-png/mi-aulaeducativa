/* Tema 3D - inclinacion suave de tarjetas segun el puntero */
(function(){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var sel = 'main article, main .rounded-xl.shadow-sm, main .rounded-xl.shadow-md, [data-tilt]';
  function attach(el){
    if (el.__t3d) return;
    var hero = el.getAttribute('data-tilt') === 'hero';
    var big = el.offsetHeight > 480 || el.offsetWidth > 900;
    if (big && !el.hasAttribute('data-tilt')) return;
    el.__t3d = true; el.setAttribute('data-t3d','');
    var max = hero ? 12 : 6;
    var persp = 'perspective(900px) ';
    el.addEventListener('pointermove', function(e){
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left)/r.width - .5, y = (e.clientY - r.top)/r.height - .5;
      el.style.transform = persp + 'rotateX(' + (-y*max) + 'deg) rotateY(' + (x*max) + 'deg) translateZ(0)';
    });
    el.addEventListener('pointerleave', function(){ el.style.transform = ''; });
  }
  function run(){ document.querySelectorAll(sel).forEach(attach); }
  if (document.readyState !== 'loading') run(); else document.addEventListener('DOMContentLoaded', run);
  // contenido que se pinta despues desde IndexedDB
  new MutationObserver(function(){ clearTimeout(run.t); run.t = setTimeout(run, 150); })
    .observe(document.body, {childList:true, subtree:true});
})();
