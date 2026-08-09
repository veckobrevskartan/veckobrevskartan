(() => {
  const panel=document.getElementById('results');
  const oldButton=document.getElementById('closeResults');
  const catbox=document.getElementById('catbox');
  const legend=document.getElementById('legend');
  if(!panel || !oldButton) return;

  /* Klona knappen för att ta bort den gamla lyssnaren som gömde panelen helt. */
  const button=oldButton.cloneNode(true);
  oldButton.replaceWith(button);
  button.className='panel-toggle';

  function setResultsCollapsed(collapsed){
    panel.classList.toggle('collapsed',collapsed);
    document.body.classList.toggle('results-panel-collapsed',collapsed);
    button.textContent=collapsed?'＋':'−';
    button.setAttribute('aria-expanded',String(!collapsed));
    button.setAttribute('aria-label',collapsed?'Öppna resultatpanelen':'Minimera resultatpanelen');
    button.title=collapsed?'Öppna resultatpanelen':'Minimera resultatpanelen';
    setTimeout(()=>{ try{ map.invalidateSize(); }catch{} },120);
  }

  button.addEventListener('click',()=>setResultsCollapsed(!panel.classList.contains('collapsed')));

  if(catbox){
    const summary=catbox.querySelector('summary');
    if(summary) summary.title='Öppna eller minimera kategorier';
    catbox.addEventListener('toggle',()=>setTimeout(()=>{ try{ map.invalidateSize(); }catch{} },80));
  }

  const mobile=matchMedia('(max-width:600px)');
  if(mobile.matches){
    setResultsCollapsed(true);
    if(catbox) catbox.open=false;
    if(legend) legend.open=false;
  }else{
    setResultsCollapsed(false);
  }

  let resizeTimer;
  window.addEventListener('resize',()=>{
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(()=>{ try{ map.invalidateSize(); }catch{} },120);
  });

  setTimeout(()=>{ try{ map.invalidateSize(); }catch{} },180);
})();
