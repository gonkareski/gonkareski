const app = document.getElementById("app");
const toastEl = document.getElementById("toast");
const backBtn = document.getElementById("backBtn");
let route = location.hash.replace("#/","") || "home";
let historyStack = [];

const news = [
  {tag:"АНОНС", title:"Анонс нового сезона Gonkareski Sim Racing 2024", date:"2 часа назад"},
  {tag:"РЕЗУЛЬТАТЫ", title:"Итоги этапа GT3 Challenge на Нюрбургринге", date:"1 день назад"},
  {tag:"НОВОСТИ", title:"Новый дизайн болида на сезон 2024", date:"2 дня назад"},
  {tag:"КОМАНДА", title:"Интервью с пилотом главной команды", date:"3 дня назад"}
];

const products = [
  {name:"Футболка Gonkareski 2024", price:"1 490 ₽", type:"shirt"},
  {name:"Худи Team Gonkareski", price:"2 990 ₽", type:"shirt"},
  {name:"Кепка Gonkareski", price:"990 ₽", type:"cap"},
  {name:"Стикерпак Gonkareski", price:"490 ₽", type:"sticker"}
];

function imgPlaceholder(i=0){
  const gradients = [
    "linear-gradient(135deg,#071d38,#1268d7 55%,#ef2748)",
    "linear-gradient(135deg,#172b46,#334d6e)",
    "linear-gradient(135deg,#0c5fc5,#ef2748)",
    "linear-gradient(135deg,#101c2c,#68778c)"
  ];
  return gradients[i%gradients.length];
}

function newsList(limit=4){
  return `<div class="card">${news.slice(0,limit).map((n,i)=>`
    <article class="news-item" data-action="news-detail" data-index="${i}">
      <div class="news-img" style="background:${imgPlaceholder(i)}"></div>
      <div><span class="tag ${i===1?'red':''}">${n.tag}</span><strong>${n.title}</strong><small>${n.date}</small></div>
      <span class="arrow">›</span>
    </article>`).join("")}</div>`;
}

function renderHome(){
 return `
  <section class="hero">
    <img class="hero-logo" src="./icon.svg" alt="">
    <h1>Официальное приложение<br>гоночной команды</h1>
    <p>Новости, команда, фан-шоп и поддержка любимой команды — в одном приложении.</p>
  </section>
  <div class="quick-grid">
    ${quick("▤","Новости","Последние новости команды","news")}
    ${quick("♟","О команде","История, состав и достижения","team")}
    ${quick("▣","Фан шоп","Одежда и аксессуары команды","shop")}
    ${quick("♥","Поддержать команду","Донат и поддержка проекта","support")}
  </div>
  <div class="section-title"><h2>Последние новости</h2><button data-route="news">Все новости</button></div>
  ${newsList(3)}
  <div class="section-title"><h2>Как установить приложение</h2></div>
  <div class="install">
    <div class="install-step"><div class="install-icon">↓</div><div><strong>На Android</strong><small>Открой приложение в Chrome и выбери «Установить приложение» или «Добавить на главный экран».</small></div></div>
    <div class="install-step"><div class="install-icon">↗</div><div><strong>На iPhone</strong><small>Нажми «Поделиться» в Safari и выбери «На экран Домой».</small></div></div>
  </div>`;
}
function quick(icon,title,sub,target){return `<button class="quick" data-route="${target}"><span class="qicon">${icon}</span><span><strong>${title}</strong><small>${sub}</small></span><span class="arrow">›</span></button>`}

function renderNews(){
 return `<h1 class="page-title">Новости</h1>
  <div class="tabs"><button class="active">Все</button><button>Команда</button><button>Соревнования</button><button>Обновления</button></div>
  ${newsList(4)}`;
}
function renderTeam(){
 return `<h1 class="page-title">О команде</h1>
  <div class="card about">
    <div class="cover"></div>
    <div style="padding:15px">
      <h2 style="margin:0 0 8px">Гонкарески</h2>
      <p>Гонкарески — российская команда по симрейсингу, основанная в 2022 году. Мы выступаем в различных чемпионатах и стремимся быть лучшими как на трассе, так и в комьюнити.</p>
      <div class="stats"><div class="stat"><small>Основана</small><strong>2022</strong></div><div class="stat"><small>Пилотов</small><strong>8</strong></div><div class="stat"><small>Побед</small><strong>23</strong></div><div class="stat"><small>Чемпионаты</small><strong>12</strong></div></div>
      <div class="people"><h3>Наш состав</h3>
        ${person("М","Максим «MAX» Петров","Капитан команды")}
        ${person("И","Илья «JUST» Сидоров","Пилот")}
        ${person("А","Алексей «ACE» Волков","Пилот")}
      </div>
    </div>
  </div>`;
}
function person(a,n,r){return `<div class="person"><div class="avatar">${a}</div><div><strong>${n}</strong><small>${r}</small></div><span class="arrow">›</span></div>`}

function renderShop(){
 return `<h1 class="page-title">Фан шоп</h1><div class="tabs"><button class="active">Все</button><button>Одежда</button><button>Аксессуары</button><button>Стикеры</button></div>
  <div class="shop-grid">${products.map((p,i)=>`
    <article class="product" data-action="product" data-index="${i}">
      <div class="product-img">${productVisual(p.type)}</div>
      <strong>${p.name}</strong><p class="price">${p.price}</p>
    </article>`).join("")}</div>`;
}
function productVisual(type){
 if(type==="shirt") return `<div class="shirt"></div>`;
 if(type==="cap") return `<div class="cap"></div>`;
 return `<div class="sticker">ГК</div>`;
}

function renderSupport(){
 return `<h1 class="page-title">Поддержать команду</h1>
 <div class="card support-card">
  <h2>Ваша поддержка помогает нам побеждать!</h2>
  <p>Спасибо каждому, кто поддерживает нашу команду. Ваши средства идут на развитие проекта, участие в чемпионатах и улучшение контента.</p>
  <h4 style="text-align:left">Выберите сумму</h4>
  <div class="amounts">${["100 ₽","300 ₽","500 ₽","1 000 ₽","2 000 ₽","Другая"].map((x,i)=>`<button class="amount ${i===2?'active':''}" data-amount="${x}">${x}</button>`).join("")}</div>
  <button class="btn red" data-action="donate">Поддержать команду</button>
  <p style="font-size:10px;margin-bottom:0">Оплата будет подключена отдельной ссылкой, когда выберем платёжный сервис.</p>
 </div>`;
}
function renderProfile(){
 return `<h1 class="page-title">Профиль</h1>
 <div class="card profile-card">
  <div class="profile-head"><div class="avatar">№52</div><div><strong>Гонщик #52</strong><small style="display:block;color:var(--muted)">gonkareski.fan@gmail.com</small></div></div>
  ${["Мои заказы","История донатов","Избранное","Уведомления","О приложении","Связаться с нами"].map((x,i)=>`<div class="profile-row" data-action="profile-row"><span>${["▣","◉","♥","♟","ⓘ","✉"][i]}&nbsp; ${x}</span><span>${x==="Уведомления"?"●":"›"}</span></div>`).join("")}
 </div>
 <div class="section-title"><h2>Приложение</h2></div>
 <div class="card" style="padding:15px"><strong>Гонкарески v1.0</strong><p style="color:var(--muted);font-size:12px;line-height:1.4">Первая PWA-версия. Новости, команда, фан-шоп и поддержка.</p></div>`;
}

function render(routeName){
 route = routeName;
 const pages={home:renderHome,news:renderNews,team:renderTeam,shop:renderShop,support:renderSupport,profile:renderProfile};
 app.innerHTML=(pages[routeName]||renderHome)();
 document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.route===routeName));
 backBtn.classList.toggle("hidden",routeName==="home");
 window.scrollTo({top:0,behavior:"smooth"});
}
function go(to){
 if(to===route)return;
 historyStack.push(route);
 location.hash="/"+to;
 render(to);
}
function showToast(text){
 toastEl.textContent=text; toastEl.classList.add("show");
 clearTimeout(showToast.t); showToast.t=setTimeout(()=>toastEl.classList.remove("show"),2600);
}
document.addEventListener("click",e=>{
 const routeBtn=e.target.closest("[data-route]");
 if(routeBtn){go(routeBtn.dataset.route);return}
 const action=e.target.closest("[data-action]");
 if(action){
   if(action.dataset.action==="news-detail"){
     const n=news[+action.dataset.index];
     app.innerHTML=`<div class="detail"><button class="btn" data-route="news" style="width:auto;padding:8px 12px;margin-bottom:15px">‹ Новости</button><span class="tag">${n.tag}</span><h2>${n.title}</h2><p>Это демонстрационная карточка новости первой версии приложения «Гонкарески». Здесь позже появится полный текст публикации, фотографии, видео и ссылки на оригинальный источник.</p><p><b>${n.date}</b></p></div>`;
     document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.remove("active"));
     return;
   }
   if(action.dataset.action==="product"){showToast(`${products[+action.dataset.index].name}: карточка товара готова к подключению заказа`);return}
   if(action.dataset.action==="donate"){showToast("Донаты подключим после выбора платёжной ссылки");return}
   if(action.dataset.action==="profile-row"){showToast("Раздел будет подключён в следующей версии");return}
 }
 const amount=e.target.closest("[data-amount]");
 if(amount){document.querySelectorAll(".amount").forEach(x=>x.classList.remove("active"));amount.classList.add("active");}
});
document.querySelectorAll(".bottom-nav button").forEach(b=>b.addEventListener("click",()=>go(b.dataset.route)));
document.getElementById("brandHome").addEventListener("click",()=>go("home"));
document.getElementById("bellBtn").addEventListener("click",()=>showToast("Новых уведомлений пока нет"));
backBtn.addEventListener("click",()=>go(historyStack.pop()||"home"));
window.addEventListener("hashchange",()=>render(location.hash.replace("#/","")||"home"));
render(route);

if("serviceWorker" in navigator){navigator.serviceWorker.register("./sw.js").catch(()=>{});}
