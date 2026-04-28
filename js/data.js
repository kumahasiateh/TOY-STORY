/* ═══════════════════════════════
   DATA
═══════════════════════════════ */
const annual={2017:14039799,2018:15810305,2019:16106954,2020:4052923,2021:1557530,2022:5889031,2023:11677825,2024:13886678,2025:15386646};
const monthly={
  2022:[136298,117509,158629,230076,354920,483883,645121,670509,700606,734228,704783,952469],
  2023:[798469,749436,869244,865811,953714,1062791,1121189,1132638,1070245,978519,931227,1144542],
  2024:[927746,1062149,1041861,1066958,1145499,1197941,1310756,1339946,1279258,1193867,1092067,1228630],
  2025:[1156012,1022894,984769,1164539,1306000,1417096,1481346,1505220,1394910,1348993,1199007,1405860]
};
const months=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'];
const nat2025=[
  {name:'Malaysia',val:2639749},
  {name:'Australia',val:1754791},
  {name:'Singapura',val:1526438},
  {name:'Tiongkok',val:1344074},
  {name:'Timor Leste',val:1009181},
  {name:'India',val:734490},
  {name:'Korea Selatan',val:496862},
  {name:'Inggris',val:412902},
  {name:'USA',val:412115},
  {name:'Jepang',val:380079},
];
const tpk2024=[
  {p:'Kalimantan Timur',v:65.11},{p:'Bali',v:62.36},{p:'Kalimantan Selatan',v:56.40},
  {p:'Kep. Riau',v:55.82},{p:'DI Yogyakarta',v:55.75},{p:'Sulawesi Tengah',v:55.03},
  {p:'Jawa Timur',v:53.60},{p:'Banten',v:52.99},{p:'DKI Jakarta',v:53.28},{p:'Indonesia',v:52.56}
];

/* Chart shared configs */
const fmt=v=>new Intl.NumberFormat('id-ID').format(Math.floor(v));
const lTooltip={backgroundColor:'rgba(18,22,20,.93)',titleColor:'#f0ede6',bodyColor:'#5bbfb0',borderColor:'rgba(0,0,0,.12)',borderWidth:1,padding:10};
const dTooltip={backgroundColor:'rgba(5,12,10,.96)',titleColor:'#f0ede6',bodyColor:'#e8c96a',borderColor:'rgba(255,255,255,.08)',borderWidth:1,padding:12};
const lScales={x:{ticks:{color:'#9a9890',font:{family:'Oswald',size:11}},grid:{color:'rgba(0,0,0,.04)'}},y:{ticks:{color:'#9a9890',font:{family:'Oswald',size:10},callback:v=>(v/1e6).toFixed(1)+'M'},grid:{color:'rgba(0,0,0,.05)'}}};
const dScales={x:{ticks:{color:'rgba(255,255,255,.35)',font:{family:'Oswald',size:11}},grid:{color:'rgba(255,255,255,.05)'}},y:{ticks:{color:'rgba(255,255,255,.35)',font:{family:'Oswald',size:10},callback:v=>(v/1e6).toFixed(1)+'M'},grid:{color:'rgba(255,255,255,.05)'}}};

