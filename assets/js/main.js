/* assets/js/main.js - lems.ad interactions: ambient bolts, scroll reveals, nav, counters, video. */
(function(){
  var root=document.documentElement;root.classList.add('js');
  var ASSETS=(document.body&&document.body.getAttribute('data-assets'))||'assets/';
  var RAYO=ASSETS+'images/icons/icon-rayo-lems-lems.ad.webp';
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ambient rayos: scattered, always moving (not scroll-based)
  var amb=document.getElementById('ambient');
  if(amb&&!reduce){
    function placeBolt(el){
      el.style.left=(Math.random()*95)+'vw';
      el.style.top=(Math.random()*93)+'vh';
      el.style.width=(12+Math.random()*30)+'px';
      el.style.setProperty('--r',(Math.random()*64-32)+'deg');
      el.style.setProperty('--o',(0.045+Math.random()*0.11).toFixed(3));
    }
    var N=window.innerWidth<640?12:22;
    for(var i=0;i<N;i++){
      var img=document.createElement('img');img.src=RAYO;img.className='abolt';img.alt='';
      placeBolt(img);
      var dur=(5+Math.random()*5);
      img.style.animation='aboltFloat '+dur.toFixed(2)+'s ease-in-out '+(-Math.random()*dur).toFixed(2)+'s infinite';
      img.addEventListener('animationiteration',function(e){placeBolt(e.target);});
      amb.appendChild(img);
    }
  }

  var revealEls=[].slice.call(document.querySelectorAll('.reveal'));
  function showAll(){revealEls.forEach(function(el){el.classList.add('in');});}
  if(reduce||!('IntersectionObserver'in window)){showAll();}
  else{
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          var el=e.target;
          var sibs=el.parentNode?[].slice.call(el.parentNode.children).filter(function(c){return c.classList.contains('reveal');}):[];
          var idx=sibs.indexOf(el);
          el.style.transitionDelay=(idx>0?Math.min(idx,6)*0.07:0)+'s';
          el.classList.add('in');io.unobserve(el);
        }
      });
    },{threshold:0.14,rootMargin:'0px 0px -8% 0px'});
    revealEls.forEach(function(el){io.observe(el);});
    setTimeout(showAll,3000);
  }

  var nav=document.getElementById('nav'),progress=document.getElementById('progress');
  function onScroll(){
    var y=window.pageYOffset||document.documentElement.scrollTop;
    if(y>12)nav.classList.add('scrolled');else nav.classList.remove('scrolled');
    var h=document.documentElement.scrollHeight-window.innerHeight;
    progress.style.width=(h>0?(y/h*100):0)+'%';
  }
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});

  // mini rayos (truenitos) al hacer scroll
  var sparksEl=document.getElementById('sparks');
  if(sparksEl&&!reduce){
    var sLastY=window.pageYOffset||0,sAcc=0,sLast=0;
    var REJECT='h1,h2,h3,h4,h5,p,a,button,img,video,svg,.nav,.marquee,.state,.srow,.member,.member__body,.clip,.genframe,.stat,.tl,.card,.sec__title,.hist__copy,.hero__done,.hero__tag,.hero__cta,.foot__slogan,.foot__addr,.foot__social,.foot__nav,.video__frame';
    function emptyAt(x,y){
      var el=document.elementFromPoint(x,y);
      if(!el) return false;
      if(el.closest(REJECT)) return false;
      return true;
    }
    function placeSpark(x,y){
      var img=document.createElement('img');
      img.src=RAYO;img.className='spark';img.alt='';
      var s=15+Math.random()*28;
      img.style.setProperty('--s',s+'px');
      img.style.setProperty('--r',(Math.random()*54-27)+'deg');
      img.style.left=(x-s/2)+'px';
      img.style.top=(y-s/2)+'px';
      sparksEl.appendChild(img);
      setTimeout(function(){img.remove();},900);
    }
    function spawnSpark(){
      var W=window.innerWidth,H=window.innerHeight;
      for(var i=0;i<16;i++){
        var x=W*(0.03+Math.random()*0.94),y=H*(0.12+Math.random()*0.80);
        if(emptyAt(x,y)){placeSpark(x,y);return;}
      }
    }
    window.addEventListener('scroll',function(){
      var y=window.pageYOffset||0;sAcc+=Math.abs(y-sLastY);sLastY=y;
      var now=Date.now();
      if(sAcc>240&&now-sLast>150){sAcc=0;sLast=now;spawnSpark();if(Math.random()<0.35)setTimeout(spawnSpark,80);}
    },{passive:true});
  }

  var burger=document.getElementById('burger'),panel=document.getElementById('panel');
  if(burger){
    burger.addEventListener('click',function(){var open=panel.classList.toggle('open');burger.setAttribute('aria-expanded',open?'true':'false');});
    [].slice.call(panel.querySelectorAll('a')).forEach(function(a){a.addEventListener('click',function(){panel.classList.remove('open');burger.setAttribute('aria-expanded','false');});});
  }

  function countUp(el){
    var target=parseInt(el.getAttribute('data-count'),10);
    if(reduce){el.textContent=target;return;}
    var dur=1200,start=null;
    function step(ts){if(!start)start=ts;var p=Math.min((ts-start)/dur,1);var e=1-Math.pow(1-p,3);el.textContent=Math.round(target*e);if(p<1)requestAnimationFrame(step);else el.textContent=target;}
    requestAnimationFrame(step);
  }
  var counters=[].slice.call(document.querySelectorAll('[data-count]'));
  if('IntersectionObserver'in window){
    var co=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){countUp(e.target);co.unobserve(e.target);}});},{threshold:0.6});
    counters.forEach(function(el){co.observe(el);});
    setTimeout(function(){counters.forEach(function(el){if(el.textContent==='0'){el.textContent=el.getAttribute('data-count');}});},3500);
  }else{counters.forEach(function(el){el.textContent=el.getAttribute('data-count');});}

  // Video autoplay on scroll into view
  var vid=document.getElementById('lemsvideo');
  if(vid){
    // once the user interacts anywhere, allow sound
    window.addEventListener('pointerdown',function(){try{vid.muted=false;}catch(e){}},{once:true});
    // clicking the video toggles sound
    vid.addEventListener('click',function(){vid.muted=!vid.muted;if(vid.paused){var q=vid.play();if(q&&q.catch)q.catch(function(){});}});
    if('IntersectionObserver'in window){
      var vo=new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){var p=vid.play();if(p&&p.catch)p.catch(function(){});}
          else{vid.pause();}
        });
      },{threshold:0.45});
      vo.observe(vid);
    }
  }
  // Client videos: big green play button; click anywhere on the clip to play
  [].slice.call(document.querySelectorAll('.clip')).forEach(function(c){
    var v=c.querySelector('video'),b=c.querySelector('.clip__play');
    if(!v||!b)return;
    v.removeAttribute('controls');
    b.addEventListener('click',function(){v.setAttribute('controls','');var q=v.play();if(q&&q.catch)q.catch(function(){});});
    v.addEventListener('play',function(){
      c.classList.add('is-playing');
      [].slice.call(document.querySelectorAll('video')).forEach(function(o){if(o!==v&&!o.paused)o.pause();});
    });
    v.addEventListener('pause',function(){c.classList.remove('is-playing');});
    v.addEventListener('ended',function(){c.classList.remove('is-playing');});
  });
})();
