const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');
function closeMenu(){navigation?.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');if(toggle)toggle.textContent='Menu';document.body.classList.remove('menu-open');}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Close':'Menu';navigation.classList.toggle('is-open',open);document.body.classList.toggle('menu-open',open);});
navigation?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
window.matchMedia('(min-width: 651px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const filterButtons=[...document.querySelectorAll('.filter-button')];
filterButtons.forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;filterButtons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));let visible=0;document.querySelectorAll('.project-card').forEach(card=>{card.hidden=filter!=='all'&&card.dataset.category!==filter;if(!card.hidden)visible++;});const status=document.getElementById('filter-status');if(status)status.textContent=`Showing ${visible} ${visible===1?'project':'projects'}.`;}));
document.querySelectorAll('.copy-email').forEach(button=>button.addEventListener('click',async()=>{const status=document.getElementById('contact-status');try{await navigator.clipboard.writeText('lnourae1@binghamton.edu');button.textContent='Email copied';if(status)status.textContent='Email address copied to clipboard.';setTimeout(()=>{button.textContent='Copy email';},2500);}catch{if(status)status.textContent='Email: lnourae1@binghamton.edu. Select the address to copy it.';button.textContent='Select email to copy';}}));

// Animate journal icons briefly on first view; hover and keyboard focus replay a short greeting.
const journalPublications=document.querySelectorAll('.publication-with-journal');
if('IntersectionObserver' in window){
 const journalObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('is-in-view');journalObserver.unobserve(entry.target);}
  });
 },{threshold:0.25});
 journalPublications.forEach(publication=>journalObserver.observe(publication));
}
