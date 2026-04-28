/* ═══════════════════════════════
   HERO VIDEO GYROSCOPE / CURSOR PARALLAX
═══════════════════════════════ */
(function(){
  const wrap = document.querySelector('.hero-video-wrap');
  if (!wrap) return;

  const MAX = 18;

  window.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    wrap.style.transform = `translate(${dx * MAX}px, ${dy * MAX}px) scale(1.06)`;
  });

  let baseGamma = null, baseBeta = null;
  window.addEventListener('deviceorientation', e => {
    if (baseGamma === null) { baseGamma = e.gamma; baseBeta = e.beta; }
    const dx = Math.max(-1, Math.min(1, (e.gamma - baseGamma) / 25));
    const dy = Math.max(-1, Math.min(1, (e.beta  - baseBeta)  / 25));
    wrap.style.transform = `translate(${dx * MAX}px, ${dy * MAX}px) scale(1.06)`;
  });

  document.querySelector('.hero').addEventListener('mouseleave', () => {
    wrap.style.transform = 'translate(0,0) scale(1.06)';
  });
})();

/* ═══════════════════════════════
   NAV SCROLL BEHAVIOUR
═══════════════════════════════ */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
  document.getElementById('navBar').style.width =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
}, {passive: true});

/* ═══════════════════════════════
   CHART FUNCTIONS
═══════════════════════════════ */
function makeTren(){
  const yrs=[2021,2022,2023,2024,2025];
  new Chart(document.getElementById('cTren'),{
    type:'line',
    data:{labels:yrs,datasets:[{
      data:yrs.map(y=>annual[y]),
      borderColor:'#0d9e8f',borderWidth:3,tension:.4,
      pointBackgroundColor:'#0d9e8f',pointRadius:7,pointHoverRadius:9,
      fill:{target:'origin',above:'rgba(13,158,143,.07)'}
    }]},
    options:{
      responsive:true,
      animation:{duration:1200,easing:'easeOutCubic'},
      plugins:{
        legend:{display:false},
        tooltip:{...lTooltip,callbacks:{title:c=>c[0].label,label:c=>' '+fmt(c.raw)+' kunjungan'}}
      },
      scales:{
        x:{ticks:{color:'#9a9890',font:{family:'Oswald',size:11}},grid:{color:'rgba(0,0,0,.04)'}},
        y:{
          suggestedMax:16000000,
          ticks:{color:'#9a9890',font:{family:'Oswald',size:10},callback:v=>(v/1e6).toFixed(0)+'M'},
          grid:{color:'rgba(0,0,0,.05)'}
        }
      }
    }
  });
}

function makePandemi(){
  const yrs=[2019,2020,2021,2022];
  new Chart(document.getElementById('cPandemi'),{
    type:'bar',
    data:{labels:yrs,datasets:[{
      data:yrs.map(y=>annual[y]),
      backgroundColor:'#00B894',
      borderRadius:5,borderWidth:0
    }]},
    options:{
      responsive:true,
      animation:{duration:1300,easing:'easeOutCubic'},
      plugins:{
        legend:{display:false},
        tooltip:{...dTooltip,callbacks:{title:c=>c[0].label,label:c=>' '+fmt(c.raw)+' kunjungan'}}
      },
      scales:{
        x:{ticks:{color:'rgba(255,255,255,.35)',font:{family:'Oswald',size:11}},grid:{color:'rgba(255,255,255,.05)'}},
        y:{
          suggestedMax:20000000,
          ticks:{color:'rgba(255,255,255,.35)',font:{family:'Oswald',size:10},callback:v=>(v/1e6).toFixed(0)+'M'},
          grid:{color:'rgba(255,255,255,.05)'}
        }
      }
    }
  });
}

function makeRecovery(){
  new Chart(document.getElementById('cRecovery'),{
    type:'line',
    data:{labels:months,datasets:[
      {label:'2022',data:monthly[2022],borderColor:'rgba(210,140,40,.75)',borderWidth:2,tension:.4,fill:false,pointRadius:3},
      {label:'2023',data:monthly[2023],borderColor:'rgba(100,100,210,.85)',borderWidth:2.5,tension:.4,fill:false,pointRadius:3},
      {label:'2024',data:monthly[2024],borderColor:'rgba(13,158,143,.9)',borderWidth:3,tension:.4,fill:false,pointRadius:3},
      {label:'2025',data:monthly[2025],borderColor:'rgba(210,70,120,1)',borderWidth:3,tension:.4,fill:false,pointRadius:3},
    ]},
    options:{
      responsive:true,
      animation:{duration:1300,easing:'easeOutCubic'},
      plugins:{
        legend:{display:true,labels:{color:'#50514c',font:{family:'Oswald',size:11},boxWidth:14,padding:14}},
        tooltip:{...lTooltip,callbacks:{label:c=>c.dataset.label+': '+fmt(c.raw)}}
      },
      scales:{
        x:{ticks:{color:'#9a9890',font:{family:'Oswald',size:11}},grid:{color:'rgba(0,0,0,.04)'}},
        y:{
          suggestedMax:1700000,
          ticks:{color:'#9a9890',font:{family:'Oswald',size:10},callback:v=>(v/1e6).toFixed(1)+'M'},
          grid:{color:'rgba(0,0,0,.05)'}
        }
      }
    }
  });
}

function makeNasional(){
  new Chart(document.getElementById('cNasional'),{
    type:'bar',
    data:{labels:nat2025.map(d=>d.name),datasets:[{
      data:nat2025.map(d=>d.val),
      backgroundColor:'#00B894',
      borderRadius:5,borderWidth:0
    }]},
    options:{
      indexAxis:'y',
      responsive:true,
      animation:{duration:1300,easing:'easeOutCubic'},
      plugins:{
        legend:{display:false},
        tooltip:{...lTooltip,callbacks:{label:c=>' '+fmt(c.raw)+' kunjungan'}}
      },
      scales:{
        x:{
          suggestedMax:3000000,
          ticks:{color:'#9a9890',font:{family:'Oswald',size:10},callback:v=>(v/1e6).toFixed(1)+'M'},
          grid:{color:'rgba(0,0,0,.04)'}
        },
        y:{ticks:{color:'#1c1f1e',font:{family:'Oswald',size:11}},grid:{display:false}}
      }
    }
  });
}

function makeMega(){
  const yrs=Object.keys(annual).map(Number);
  new Chart(document.getElementById('cMega'),{
    type:'bar',
    data:{labels:yrs,datasets:[{
      data:yrs.map(y=>annual[y]),
      backgroundColor:'#00B894',
      borderRadius:6,borderWidth:0,
      hoverBackgroundColor:'#00D4A8'
    }]},
    options:{
      responsive:true,
      animation:{duration:1600,easing:'easeOutQuart'},
      plugins:{
        legend:{display:false},
        tooltip:{...dTooltip,callbacks:{
          title:c=>{const y=parseInt(c[0].label);return y+' · '+(annual[y]/annual[2019]*100).toFixed(1)+'% dari rekor 2019';},
          label:c=>' '+fmt(c.raw)+' kunjungan'
        }}
      },
      scales:{
        x:{ticks:{color:'rgba(255,255,255,.35)',font:{family:'Oswald',size:11}},grid:{color:'rgba(255,255,255,.05)'}},
        y:{
          suggestedMax:20000000,
          ticks:{color:'rgba(255,255,255,.35)',font:{family:'Oswald',size:10},callback:v=>(v/1e6).toFixed(0)+'M'},
          grid:{color:'rgba(255,255,255,.05)'}
        }
      }
    }
  });
}

let cMonth=null;
const peakInfo={
  2023:{m:'Desember 2023',v:'1,14 Juta',ins:'Desember 2023 (1,14 juta) tertinggi, dipicu libur akhir tahun. Juli–Agustus juga kuat merespons musim panas Eropa.'},
  2024:{m:'Agustus 2024',v:'1,34 Juta',ins:'2024 pertama kali semua bulan menembus 900 ribu+. Agustus (1,34 juta) dan Juli (1,31 juta) menjadi puncak musim panas.'},
  2025:{m:'Agustus 2025',v:'1,51 Juta',ins:'Juli–Agustus 2025 konsisten di atas 1,48 juta. Desember 2025 (1,41 juta) kuat berkat libur Natal & Tahun Baru global.'}
};
const tColors={
  2023:{b:'rgba(100,100,210,1)',bg:'rgba(100,100,210,.1)',h:'rgba(100,100,210,.72)'},
  2024:{b:'rgba(13,158,143,1)',bg:'rgba(13,158,143,.1)',h:'rgba(13,158,143,.72)'},
  2025:{b:'rgba(210,70,120,1)',bg:'rgba(210,70,120,.1)',h:'rgba(210,70,120,.72)'}
};

function makeMonthly(yr){
  if(cMonth) cMonth.destroy();
  const c=tColors[yr];
  cMonth=new Chart(document.getElementById('cMonthly'),{
    type:'bar',
    data:{labels:months,datasets:[{
      data:monthly[yr],
      backgroundColor:c.bg,borderColor:c.b,borderWidth:2,
      borderRadius:5,hoverBackgroundColor:c.h
    }]},
    options:{
      responsive:true,
      animation:{duration:600,easing:'easeOutCubic'},
      plugins:{
        legend:{display:false},
        tooltip:{
          backgroundColor:'rgba(18,22,20,.93)',titleColor:'#f0ede6',bodyColor:c.b,
          borderColor:'rgba(0,0,0,.1)',borderWidth:1,padding:10,
          callbacks:{label:x=>' '+fmt(x.raw)+' kunjungan'}
        }
      },
      scales:{
        x:{ticks:{color:'#9a9890',font:{family:'Oswald',size:11}},grid:{color:'rgba(0,0,0,.04)'}},
        y:{
          suggestedMax:1700000,
          ticks:{color:'#9a9890',font:{family:'Oswald',size:10},callback:v=>(v/1e6).toFixed(1)+'M'},
          grid:{color:'rgba(0,0,0,.05)'}
        }
      }
    }
  });
  const pk=peakInfo[yr];
  document.getElementById('peakM').textContent=pk.m;
  document.getElementById('peakV').textContent=pk.v+' kunjungan';
  document.getElementById('monthInsight').textContent=pk.ins;
}

function makeTPK(){
  const s=[...tpk2024].sort((a,b)=>b.v-a.v);
  new Chart(document.getElementById('cTPK'),{
    type:'bar',
    data:{labels:s.map(d=>d.p),datasets:[{
      data:s.map(d=>d.v),
      backgroundColor:'#00B894',
      borderRadius:5,borderWidth:0
    }]},
    options:{
      indexAxis:'y',
      responsive:true,
      animation:{duration:1300,easing:'easeOutCubic'},
      plugins:{
        legend:{display:false},
        tooltip:{...lTooltip,callbacks:{label:c=>' '+c.raw.toFixed(2)+'%'}}
      },
      scales:{
        x:{
          min:40,max:70,
          ticks:{color:'#9a9890',font:{family:'Oswald',size:10},callback:v=>v+'%'},
          grid:{color:'rgba(0,0,0,.04)'}
        },
        y:{ticks:{color:'#1c1f1e',font:{family:'Oswald',size:11}},grid:{display:false}}
      }
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   GSAP — hanya untuk hero entrance + reveal animasi scroll
   Chart & counter pakai IntersectionObserver (lebih reliable)
═══════════════════════════════════════════════════════════ */
gsap.registerPlugin(ScrollTrigger);

// Hero entrance
gsap.timeline({delay:.3})
  .to('.hero-eyebrow',{opacity:1,y:0,duration:.7,ease:'power3.out'})
  .to('.hero-title',   {opacity:1,y:0,duration:.8,ease:'power3.out'},'-=.4')
  .to('.hero-sub',     {opacity:1,y:0,duration:.7,ease:'power3.out'},'-=.4')
  .to('.hero-cta',     {opacity:1,y:0,duration:.6,ease:'power3.out'},'-=.35')
  .to('.hero-kpis',    {opacity:1,y:0,duration:.7,ease:'power3.out'},'-=.35');

// Scroll reveals — GSAP sebagai animasi utama
['rv','rv-r','rv-l'].forEach(cls=>{
  const xm={'rv-r':50,'rv-l':-50,'rv':0}, ym={'rv':40,'rv-r':0,'rv-l':0};
  gsap.utils.toArray('.'+cls).forEach(el=>{
    gsap.fromTo(el,
      {opacity:0,x:xm[cls],y:ym[cls]},
      {opacity:1,x:0,y:0,duration:.85,ease:'power3.out',
       scrollTrigger:{trigger:el,start:'top 88%',once:true}}
    );
  });
});

/* ═══════════════════════════════════════════════════════════
   INTERSECTION OBSERVER — Semua trigger chart, counter,
   crash bars, abox bars. Jauh lebih reliable dari ScrollTrigger
   untuk kasus scroll cepat.
═══════════════════════════════════════════════════════════ */
function makeIO(selector, callback, threshold=0.15){
  const el = typeof selector==='string' ? document.querySelector(selector) : selector;
  if(!el) return;
  let fired=false;
  const io=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting && !fired){
      fired=true;
      callback();
      io.disconnect();
    }
  },{threshold, rootMargin:'0px 0px -5% 0px'});
  io.observe(el);
}

// Charts
makeIO('#tren',         makeTren);
makeIO('#pandemi',      makePandemi);
makeIO('#kebangsaan',   makeNasional);
makeIO('#timeline',     makeMega);
makeIO('#hotel',        makeTPK);
makeIO('#pola',         ()=>makeMonthly(2023));

// Crash bars (Section 02)
makeIO('.crash', ()=>{
  document.querySelectorAll('.cr-fill').forEach(el=>{ el.style.width=el.dataset.w+'%'; });
});

// // Abox bars (Section 06 — Pintu Masuk)
// makeIO('.abox', ()=>{
//   document.querySelectorAll('.ab-fill').forEach(el=>{ el.style.width=el.dataset.pct+'%'; });
// }, 0.1);

// // Counter animasi angka (Section 06 — gw-cards)
// function animC(el,target,dur=1800){
//   if(el.dataset.animated) return;
//   el.dataset.animated='1';
//   const start=performance.now();
//   (function tick(now){
//     const p=Math.min((now-start)/dur,1);
//     const ease=1-Math.pow(1-p,3);
//     el.textContent=fmt(target*ease);
//     if(p<1) requestAnimationFrame(tick);
//     else el.textContent=fmt(target);
//   })(start);
// }
// makeIO('.gw-cards', ()=>{
//   document.querySelectorAll('.gwc-val[data-target]').forEach(el=>animC(el,+el.dataset.target));
// }, 0.1);

/* ═══════════════════════════════════════════════════════════
   FALLBACK — Elemen .rv yang ter-miss GSAP saat scroll cepat
   IntersectionObserver check setiap elemen masuk viewport,
   kalau masih opacity<0.1 → force visible via class rv-done
═══════════════════════════════════════════════════════════ */
(function(){
  const rvIO=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el=e.target;
      // Delay 200ms — beri kesempatan GSAP jalan duluan
      setTimeout(()=>{
        if(parseFloat(window.getComputedStyle(el).opacity)<0.1)
          el.classList.add('rv-done');
      },200);
      rvIO.unobserve(el);
    });
  },{threshold:0.05, rootMargin:'0px 0px -3% 0px'});

  document.querySelectorAll('.rv,.rv-r,.rv-l').forEach(el=>rvIO.observe(el));

  // Nuclear fallback: tiap kali scroll berhenti, scan viewport
  let st;
  window.addEventListener('scroll',()=>{
    clearTimeout(st);
    st=setTimeout(()=>{
      document.querySelectorAll('.rv,.rv-r,.rv-l').forEach(el=>{
        const r=el.getBoundingClientRect();
        const inView=r.top < window.innerHeight*1.1 && r.bottom > -50;
        if(inView && parseFloat(window.getComputedStyle(el).opacity)<0.1)
          el.classList.add('rv-done');
      });
    },250);
  },{passive:true});

})();

/* ═══════════════════════════════
   TAB POLA BULANAN
═══════════════════════════════ */
document.getElementById('ytabs').addEventListener('click',e=>{
  if(!e.target.dataset.y) return;
  document.querySelectorAll('.ytab').forEach(b=>b.classList.remove('on'));
  e.target.classList.add('on');
  makeMonthly(parseInt(e.target.dataset.y));
});

/* ═══════════════════════════════════════════════════════════
   PINTU MASUK — Tab-based, normal flow, no sticky pin
═══════════════════════════════════════════════════════════ */
function initDynamicPintu() {
  const pintuSection = document.getElementById('pintu');
  const chartLabel   = document.getElementById('pintu-chart-label');
  const chartStream  = document.getElementById('pintu-chart-stream');
  const chartNote    = document.getElementById('pintu-chart-note');

  if (!pintuSection || !chartStream || pintuSection.dataset.rendered) return;
  pintuSection.dataset.rendered = '1';

  // Counter animasi untuk 3 kartu atas
  function animCardNumbers() {
    document.querySelectorAll('#pintu .gwc-val').forEach(el => {
      if (el.dataset.animated) return;
      el.dataset.animated = '1';
      const target = parseInt(el.dataset.target);
      const start  = performance.now();
      (function tick(now) {
        const p = Math.min((now - start) / 2000, 1);
        el.textContent = fmt(Math.floor(target * (1 - Math.pow(1 - p, 5))));
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = fmt(target);
      })(start);
    });
  }

  // Satu warna kontras untuk semua bar — tidak ada gradasi
  const BAR_COLOR = '#00B894';

  const pintuData = {
    air: {
      label: '✈️ RANKING PINTU UDARA — 2025',
      tabId: 'ptab-air', tabClass: 'active-air',
      icon: '✈️', max: 6907585,
      list: [
        { name: 'Ngurah Rai (Bali)',        val: 6907585 },
        { name: 'Soekarno-Hatta (Jakarta)', val: 2760838 },
        { name: 'Juanda (Surabaya)',         val: 329945  },
        { name: 'Kualanamu (Medan)',         val: 289656  },
        { name: 'Minangkabau (Padang)',      val: 90021   },
        { name: 'Adi Sucipto (Yogyakarta)', val: 102817  },
        { name: 'Bandara Int. Lombok',       val: 94675   },
        { name: 'Sultan Iskandar Muda',      val: 44826   },
        { name: 'Sam Ratulangi (Manado)',    val: 61495   }
      ]
    },
    sea: {
      label: '🚢 RANKING PINTU LAUT — 2025',
      tabId: 'ptab-sea', tabClass: 'active-sea',
      icon: '🚢', max: 1593757,
      list: [
        { name: 'Batam (Kepri)',             val: 1593757 },
        { name: 'Tanjung Uban (Kepri)',      val: 253366  },
        { name: 'Tanjung Balai Karimun',     val: 96963   },
        { name: 'Tanjung Pinang (Kepri)',    val: 63306   },
        { name: 'Tanjung Benoa (Bali)',      val: 27978   }
      ]
    },
    land: {
      label: '🛣️ RANKING PINTU DARAT — 2025',
      tabId: 'ptab-land', tabClass: 'active-land',
      icon: '🛣️', max: 479218,
      list: [
        { name: 'Atambua (NTT)',             val: 479218  },
        { name: 'Jayapura (Papua)',           val: 132847  },
        { name: 'Entikong (Kalbar)',          val: 46376   },
        { name: 'Aruk (Kalbar)',              val: 40989   },
        { name: 'Nanga Badau (Kalbar)',       val: 13495   }
      ]
    }
  };

  // Inject warna solid ke tiap item
  Object.values(pintuData).forEach(mode => {
    mode.list.forEach((item, i) => { item.color = BAR_COLOR; });
  });

  let currentKey = null;
  let isAnimating = false;

  function updateTabs(key) {
    ['air','sea','land'].forEach(k => {
      const tab = document.getElementById(pintuData[k].tabId);
      if (!tab) return;
      tab.className = 'pintu-tab' + (k === key ? ' ' + pintuData[key].tabClass : '');
    });
  }

  function renderChart(key, initial = false) {
    if (currentKey === key || isAnimating) return;
    isAnimating = true;
    currentKey = key;
    const data = pintuData[key];

    updateTabs(key);

    // Hapus note "Lainnya" — tidak dipakai lagi
    if (chartNote) chartNote.innerHTML = '';

    function buildAndAnimate() {
      chartLabel.textContent = data.label;
      chartStream.innerHTML = data.list.map((d, i) => `
        <div class="ab">
          <div class="ab-name">${data.icon} ${d.name}</div>
          <div class="ab-track"><div class="ab-fill" style="background:${d.color};width:0%;" data-pct="${(d.val / data.max * 100).toFixed(1)}"></div></div>
          <div class="ab-num">${d.val >= 1e6 ? (d.val/1e6).toFixed(2)+' Juta' : (d.val/1000).toFixed(0)+' Ribu'}</div>
        </div>
      `).join('');

      const rows = chartStream.querySelectorAll('.ab');

      // Label entrance
      gsap.fromTo(chartLabel,
        { opacity: 0, y: -14 },
        { opacity: 1, y: 0, duration: .5, ease: 'power3.out' }
      );

      // Rows stagger entrance — identik dengan .rv di panel lain
      gsap.fromTo(rows,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0,
          duration: .55, ease: 'power3.out',
          stagger: .06,
          onComplete: () => {
            rows.forEach(row => {
              const fill = row.querySelector('.ab-fill');
              if (fill) gsap.to(fill, { width: fill.dataset.pct + '%', duration: .9, ease: 'power3.out' });
            });
            setTimeout(() => { isAnimating = false; }, 200);
          }
        }
      );
    }

    if (initial || !chartStream.querySelector('.ab')) {
      buildAndAnimate();
    } else {
      // Exit animation, lalu build baru
      const existingRows = chartStream.querySelectorAll('.ab');
      gsap.timeline({
        onComplete: buildAndAnimate
      })
      .to(existingRows, { opacity: 0, y: -18, duration: .28, ease: 'power2.in', stagger: .03 })
      .to(chartLabel,   { opacity: 0, y: -10, duration: .2,  ease: 'power2.in' }, '<.05');
    }
  }

  // Klik tab
  const tabsEl = document.getElementById('pintu-tabs');
  if (tabsEl) {
    tabsEl.querySelectorAll('.pintu-tab').forEach(tab => {
      tab.style.cursor = 'pointer';
      tab.addEventListener('click', () => {
        const key = tab.id === 'ptab-air' ? 'air' : tab.id === 'ptab-sea' ? 'sea' : 'land';
        renderChart(key);
      });
    });
  }

  // ── SCROLL-JACKING: panel diam, chart berganti step-by-step ──
  // Pendekatan: target idx dihitung dari scroll position,
  // tapi eksekusi SELALU step-by-step (tidak boleh skip).
  // Kalau scroll cepat loncat dari idx 0 ke 2, queue akan
  // render idx 1 dulu (dengan delay singkat) sebelum idx 2.
  const wrapper = document.getElementById('pintu');

  // Buat progress dots
  const dotsEl = document.createElement('div');
  dotsEl.className = 'pintu-progress';
  dotsEl.innerHTML = [
    '<div class="pintu-dot active" data-key="air"  title="Udara"></div>',
    '<div class="pintu-dot"       data-key="sea"   title="Laut"></div>',
    '<div class="pintu-dot"       data-key="land"  title="Darat"></div>'
  ].join('');
  const stickyEl = document.getElementById('pintu-sticky');
  if (stickyEl) stickyEl.appendChild(dotsEl);

  // Klik dot
  dotsEl.querySelectorAll('.pintu-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const k = dot.dataset.key;
      const newIdx = PANEL_KEYS.indexOf(k);
      if (newIdx >= 0) stepTo(newIdx);
    });
  });

  function updateDots(key) {
    dotsEl.querySelectorAll('.pintu-dot').forEach(d => {
      d.classList.toggle('active', d.dataset.key === key);
    });
  }

  function renderChartWithDots(key, initial) {
    renderChart(key, initial);
    updateDots(key);
  }

  // Pertama kali masuk
  renderChartWithDots('air', true);
  animCardNumbers();

  const PANEL_KEYS = ['air', 'sea', 'land'];
  let displayedIdx = 0;   // idx yang sedang tampil
  let targetIdx    = 0;   // idx yang dituju scroll
  let stepping     = false;

  // Step satu-per-satu dari displayedIdx menuju targetIdx
  function stepToNext() {
    if (displayedIdx === targetIdx) { stepping = false; return; }
    stepping = true;
    const direction = targetIdx > displayedIdx ? 1 : -1;
    displayedIdx += direction;
    renderChartWithDots(PANEL_KEYS[displayedIdx]);
    // Tunggu animasi selesai (~700ms) baru cek lagi
    setTimeout(stepToNext, 720);
  }

  function stepTo(newIdx) {
    targetIdx = newIdx;
    if (!stepping) stepToNext();
  }

  function onPintuScroll() {
    if (!wrapper) return;
    const rect  = wrapper.getBoundingClientRect();
    const wrapH = wrapper.offsetHeight;
    const scrolled = -rect.top;
    if (scrolled < 0 || scrolled > wrapH - window.innerHeight) return;

    const progress = scrolled / (wrapH - window.innerHeight);
    const idx = Math.min(Math.floor(progress * 3), 2);
    if (idx !== targetIdx) stepTo(idx);
  }

  window.addEventListener('scroll', onPintuScroll, { passive: true });
  onPintuScroll();
}

makeIO('#pintu', initDynamicPintu, 0.1);