
const menu=document.querySelector('.menu'), nav=document.querySelector('.nav');
if(menu) menu.addEventListener('click',()=>nav.classList.toggle('open'));

const form=document.getElementById('reserveForm');
if(form){
 const item=document.getElementById('item'), est=document.getElementById('estimate');
 const params=new URLSearchParams(location.search); if(params.get('item')) item.value=params.get('item');
 const prices={vozik:790,jbl1:700,jbl2:1400,projektor:2000,zakladni:2990,party:1790,filmovy:4290};
 const labels={vozik:'Přívěsný vozík',jbl1:'1× JBL PartyBox 320',jbl2:'2× JBL PartyBox 320',projektor:'Optoma GT2100HDR',zakladni:'Základní komplet',party:'Párty komplet (bez vozíku)',filmovy:'Filmový komplet',kombinace:'Kombinace vybavení'};
 function calc(){
   const f=form.elements.from.value,t=form.elements.to.value,k=item.value;
   if(f&&t&&prices[k]){
     const a=new Date(f+'T12:00:00'),b=new Date(t+'T12:00:00');
     const days=Math.max(1,Math.round((b-a)/86400000)+1);
     const extras=[...form.querySelectorAll('input[name=extra]:checked')];
     const extraPerDay=extras.reduce((sum,x)=>sum+Number(x.value.split('|')[1]||0),0);
     const daily=prices[k]+extraPerDay;
     est.textContent=`Orientačně: ${days} ${days===1?'den':'dny'} × ${daily.toLocaleString('cs-CZ')} Kč = ${(days*daily).toLocaleString('cs-CZ')} Kč${extraPerDay?' (včetně příslušenství)':''}`;
   } else est.textContent='Orientační cena se zobrazí po výběru termínu a vybavení.';
 }
 form.addEventListener('change',calc); calc();
 form.addEventListener('submit',e=>{
   e.preventDefault();
   const d=new FormData(form);
   const extras=[...form.querySelectorAll('input[name=extra]:checked')].map(x=>x.value.split('|')[0]).join(', ')||'bez příslušenství';
   const msg=`Dobrý den, mám zájem o rezervaci.%0A%0AJméno: ${encodeURIComponent(d.get('name'))}%0ATelefon: ${encodeURIComponent(d.get('phone'))}%0ATermín: ${d.get('from')} až ${d.get('to')}%0AVybavení: ${encodeURIComponent(labels[d.get('item')]||d.get('item'))}%0APříslušenství: ${encodeURIComponent(extras)}%0APoznámka: ${encodeURIComponent(d.get('note')||'-')}`;
   location.href=`sms:+420776166198?body=${msg}`;
 });
}
