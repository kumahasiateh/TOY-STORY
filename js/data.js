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

/* ── HUNIAN HOTEL PER PROVINSI 2024 ── */
const hunianHotel2024 = [
  {id:"ID-AC", name:"Aceh", val:21550},
  {id:"ID-SU", name:"Sumatera Utara", val:171023},
  {id:"ID-SB", name:"Sumatera Barat", val:50021},
  {id:"ID-RI", name:"Riau", val:30246},
  {id:"ID-JA", name:"Jambi", val:6280},
  {id:"ID-SS", name:"Sumatera Selatan", val:6676},
  {id:"ID-BE", name:"Bengkulu", val:950},
  {id:"ID-LA", name:"Lampung", val:7513},
  {id:"ID-BB", name:"Kep. Bangka Belitung", val:6961},
  {id:"ID-KR", name:"Kep. Riau", val:824962},
  {id:"ID-JK", name:"DKI Jakarta", val:1287284},
  {id:"ID-JB", name:"Jawa Barat", val:342442},
  {id:"ID-JT", name:"Jawa Tengah", val:111054},
  {id:"ID-YO", name:"DI Yogyakarta", val:238643},
  {id:"ID-JI", name:"Jawa Timur", val:482687},
  {id:"ID-BT", name:"Banten", val:291429},
  {id:"ID-BA", name:"Bali", val:8976149},
  {id:"ID-NB", name:"Nusa Tenggara Barat", val:722906},
  {id:"ID-NT", name:"Nusa Tenggara Timur", val:291105},
  {id:"ID-KB", name:"Kalimantan Barat", val:37856},
  {id:"ID-KT", name:"Kalimantan Tengah", val:7622},
  {id:"ID-KS", name:"Kalimantan Selatan", val:11183},
  {id:"ID-KI", name:"Kalimantan Timur", val:21529},
  {id:"ID-KU", name:"Kalimantan Utara", val:2327},
  {id:"ID-SA", name:"Sulawesi Utara", val:58615},
  {id:"ID-ST", name:"Sulawesi Tengah", val:6839},
  {id:"ID-SN", name:"Sulawesi Selatan", val:41360},
  {id:"ID-SG", name:"Sulawesi Tenggara", val:3499},
  {id:"ID-GO", name:"Gorontalo", val:2678},
  {id:"ID-SR", name:"Sulawesi Barat", val:243},
  {id:"ID-MA", name:"Maluku", val:11167},
  {id:"ID-MU", name:"Maluku Utara", val:2568},
  {id:"ID-PB", name:"Papua Barat", val:808},
  {id:"ID-PD", name:"Papua Barat Daya", val:25023},
  {id:"ID-PA", name:"Papua", val:2214},
  {id:"ID-PS", name:"Papua Selatan", val:716},
  {id:"ID-PT", name:"Papua Tengah", val:8180},
  {id:"ID-PE", name:"Papua Pegunungan", val:1265},
];

/* Chart shared configs */
const fmt=v=>new Intl.NumberFormat('id-ID').format(Math.floor(v));
const lTooltip={backgroundColor:'rgba(18,22,20,.93)',titleColor:'#f0ede6',bodyColor:'#5bbfb0',borderColor:'rgba(0,0,0,.12)',borderWidth:1,padding:10};
const dTooltip={backgroundColor:'rgba(5,12,10,.96)',titleColor:'#f0ede6',bodyColor:'#e8c96a',borderColor:'rgba(255,255,255,.08)',borderWidth:1,padding:12};
const lScales={x:{ticks:{color:'#9a9890',font:{family:'Oswald',size:11}},grid:{color:'rgba(0,0,0,.04)'}},y:{ticks:{color:'#9a9890',font:{family:'Oswald',size:10},callback:v=>(v/1e6).toFixed(1)+'M'},grid:{color:'rgba(0,0,0,.05)'}}};
const dScales={x:{ticks:{color:'rgba(255,255,255,.35)',font:{family:'Oswald',size:11}},grid:{color:'rgba(255,255,255,.05)'}},y:{ticks:{color:'rgba(255,255,255,.35)',font:{family:'Oswald',size:10},callback:v=>(v/1e6).toFixed(1)+'M'},grid:{color:'rgba(255,255,255,.05)'}}};

