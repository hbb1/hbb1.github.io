// Small interactions: mobile nav toggle + publication hover overlays
document.addEventListener('DOMContentLoaded', function(){
  // mobile nav toggle (if present)
  const btn = document.getElementById('nav-toggle');
  const list = document.getElementById('nav-list');
  if(btn && list){
    btn.addEventListener('click', function(){
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      list.classList.toggle('show');
    });
    // Close menu on link click (mobile)
    list.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
      list.classList.remove('show');
      btn.setAttribute('aria-expanded','false');
    }));
  }

  // initialize overlays hidden
  document.querySelectorAll('.two').forEach(el=>el.style.opacity='0');
});

// Publication hover controls: show/hide a video overlay by element id
function pub_start(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.style.opacity = '1';
  const v = el.querySelector('video');
  if(v){
    // only play if currently paused — prevents restarting when repeatedly
    // entering the same element. ignore promise rejection if any.
    try{
      if(v.paused){
        const p = v.play();
        if(p && p.catch) p.catch(()=>{});
      }
    }catch(e){/* ignore */}
  }
}

function pub_stop(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.style.opacity = '0';
  const v = el.querySelector('video');
  if(v){
    // pause the video but do NOT reset currentTime; this avoids the video
    // jumping back to start on quick mouse movements. If you prefer to
    // restart on every hover, we can reset currentTime conditionally.
    try{ v.pause(); }catch(e){}
  }
}
