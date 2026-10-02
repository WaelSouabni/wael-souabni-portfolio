(() => {
  "use strict";

  const games = [
    { id: "tictactoe", icon: "❌", title: "Tic-Tac-Toe", desc: "Affronte une IA simple et essaie d'aligner trois symboles." },
    { id: "minesweeper", icon: "💣", title: "Minesweeper", desc: "Dévoile les cases sans toucher aux mines. Clic droit pour marquer." },
    { id: "flappy", icon: "🐤", title: "Flappy Bird", desc: "Passe entre les tuyaux et tiens le plus longtemps possible." },
    { id: "typing", icon: "⌨️", title: "Typing Game", desc: "Tape les mots affichés avec rapidité et précision." }
  ];

  const css = `
    .extra-games { margin-top: 18px; }
    .extra-game-board { min-height: 420px; }
    .extra-game-controls { display:flex; flex-wrap:wrap; gap:10px; margin-top:16px; }
    .extra-game-controls .btn { width:auto; }
    .arcade-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:14px; }
    .arcade-card { border:1px solid var(--border); background:var(--bg-soft); border-radius:18px; padding:20px; text-align:left; cursor:pointer; color:var(--text); transition:transform .2s,border-color .2s,background .2s; }
    .arcade-card:hover { transform:translateY(-3px); border-color:var(--accent); background:var(--surface); }
    .arcade-card .icon { font-size:2rem; display:block; margin-bottom:10px; }
    .arcade-card h3 { font-size:1rem; margin-bottom:6px; }
    .arcade-card p { color:var(--text-muted); font-size:.82rem; line-height:1.5; }
    .arcade-view { display:none; }
    .arcade-view.active { display:block; }
    .mini-title { font-size:1.15rem; margin-bottom:8px; }
    .mini-muted { color:var(--text-muted); font-size:.9rem; }
    .ttt-grid { display:grid; grid-template-columns:repeat(3,90px); gap:8px; justify-content:center; margin:25px auto; }
    .ttt-cell { width:90px; height:90px; border:1px solid var(--border); border-radius:14px; background:var(--bg-soft); color:var(--text); font-size:2rem; font-weight:700; cursor:pointer; }
    .ttt-cell:hover:not(:disabled) { border-color:var(--accent); }
    .ttt-cell:disabled { cursor:default; }
    .mine-grid { display:grid; grid-template-columns:repeat(8,42px); gap:4px; justify-content:center; margin:20px auto; }
    .mine-cell { width:42px; height:42px; border:1px solid var(--border); border-radius:7px; background:var(--bg-soft); color:var(--text); font-weight:700; cursor:pointer; }
    .mine-cell.open { background:var(--surface); cursor:default; }
    .mine-cell.flag { background:var(--accent-soft); }
    .mine-cell.mine { background:rgba(255,80,100,.18); }
    .canvas-game { display:block; width:100%; max-width:640px; height:auto; aspect-ratio:16/9; margin:auto; border:1px solid var(--border); border-radius:16px; background:var(--bg-soft); touch-action:none; }
    .aim-area { position:relative; height:360px; max-width:640px; margin:auto; border:1px solid var(--border); border-radius:16px; background:var(--bg-soft); overflow:hidden; }
    .aim-target { position:absolute; width:44px; height:44px; border-radius:50%; border:3px solid var(--text); background:var(--accent); cursor:pointer; transform:translate(-50%,-50%); }
    .typing-word { min-height:90px; display:flex; align-items:center; justify-content:center; font:700 2rem var(--mono); letter-spacing:.04em; margin:20px 0; padding:20px; border:1px solid var(--border); border-radius:16px; background:var(--bg-soft); }
    .typing-input { width:100%; padding:14px 16px; border-radius:12px; border:1px solid var(--border); background:var(--bg-soft); color:var(--text); font:inherit; outline:none; }
    .typing-input:focus { border-color:var(--accent); }
    .score-line { display:flex; flex-wrap:wrap; gap:10px; margin:14px 0; }
    .score-pill { border:1px solid var(--border); background:var(--bg-soft); border-radius:999px; padding:7px 11px; font:600 .82rem var(--mono); }
    .game-alert-backdrop { width:100%; max-width:100%; border:0; padding:20px; background:rgba(0,0,0,.58); backdrop-filter:blur(8px); opacity:0; visibility:hidden; pointer-events:none; transition:opacity .2s ease,visibility .2s ease; }
    .game-alert-backdrop.show { opacity:1; visibility:visible; pointer-events:auto; }
    .game-alert { width:min(430px,100%); border:1px solid var(--border); border-radius:24px; padding:28px; text-align:center; background:var(--surface); box-shadow:0 24px 80px rgba(0,0,0,.35); transform:translateY(10px) scale(.97); transition:transform .25s ease; }
    .game-alert-backdrop.show .game-alert { transform:translateY(0) scale(1); }
    .game-alert-emoji { width:72px; height:72px; margin:0 auto 16px; display:grid; place-items:center; border-radius:50%; background:var(--accent-soft); font-size:2.4rem; }
    .game-alert h3 { margin:0 0 8px; font-size:1.35rem; }
    .game-alert p { margin:0 0 20px; color:var(--text-muted); line-height:1.6; }
    .game-alert .btn { width:auto; min-width:130px; }
    @media (max-width:900px) { .arcade-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } }
    @media (max-width:620px) {
      .arcade-grid { grid-template-columns:1fr; }
      .ttt-grid { grid-template-columns:repeat(3,72px); }
      .ttt-cell { width:72px; height:72px; }
      .mine-grid { grid-template-columns:repeat(8,34px); gap:3px; }
      .mine-cell { width:34px; height:34px; font-size:.8rem; }
      .aim-area { height:300px; }
    }
  `;
  document.head.insertAdjacentHTML("beforeend", "<style id='extra-games-style'>" + css + "</style>");

  const section = document.querySelector("#playground");
  if (!section) return;
  const tabs = section.querySelector(".game-tabs");
  const memoryPanel = section.querySelector("#panel-memory");
  if (!tabs || !memoryPanel) return;

  const tabHtml = games.map((g, i) =>
    `<button class="game-tab extra-game-tab" role="tab" id="tab-${g.id}" aria-controls="panel-${g.id}" aria-selected="false">${g.icon} ${g.title}</button>`
  ).join("");
  tabs.insertAdjacentHTML("beforeend", tabHtml);

  const arcadePanel = document.createElement("div");
  arcadePanel.className = "game-panel extra-games";
  arcadePanel.id = "panel-arcade";
  arcadePanel.setAttribute("role","tabpanel");
  arcadePanel.setAttribute("aria-labelledby","tab-arcade");
  arcadePanel.innerHTML = `
    <div class="game-card extra-game-board">
      <div>
        <div class="arcade-grid" id="arcadeMenu">
          ${games.map(g => `<button class="arcade-card" data-game="${g.id}"><span class="icon">${g.icon}</span><h3>${g.title}</h3><p>${g.desc}</p></button>`).join("")}
        </div>
        ${games.map(g => `<div class="arcade-view" id="view-${g.id}"></div>`).join("")}
      </div>
      <aside class="game-side">
        <h3>Arcade</h3>
        <p>Six nouveaux mini-jeux en JavaScript vanilla, sans librairie externe.</p>
        <div class="game-stats">
          <div class="game-stat"><div class="v">6</div><div class="k">Jeux au total</div></div>
          <div class="game-stat"><div class="v">0</div><div class="k">Dépendances</div></div>
        </div>
        <button class="btn btn-ghost" id="arcadeHome">← Choisir un jeu</button>
      </aside>
    </div>`;
  memoryPanel.insertAdjacentElement("afterend", arcadePanel);

  const allTabs = () => [...section.querySelectorAll(".game-tab")];
  const allPanels = () => [...section.querySelectorAll(".game-panel")];
  let activeGameAlert = null;
  function showGameAlert({emoji="🎮", title="Bien joué !", message="", button="Continuer"}) {
    if (activeGameAlert) activeGameAlert.remove();
    const backdrop = document.createElement("dialog");
    backdrop.className = "game-alert-backdrop";
    backdrop.innerHTML = `<div class="game-alert" role="document"><div class="game-alert-emoji">${emoji}</div><h3>${title}</h3><p>${message}</p><button class="btn btn-primary" type="button">${button}</button></div>`;
    document.body.appendChild(backdrop);
    activeGameAlert = backdrop;
    const close = () => { backdrop.classList.remove("show"); setTimeout(() => { if (backdrop.open) backdrop.close(); backdrop.remove(); }, 220); activeGameAlert = null; };
    backdrop.querySelector("button").onclick = close;
    backdrop.addEventListener("click", e => { if (e.target === backdrop) close(); });
    backdrop.addEventListener("cancel", e => { e.preventDefault(); close(); });
    backdrop.showModal();
    requestAnimationFrame(() => { backdrop.classList.add("show"); backdrop.querySelector("button").focus(); });
  }

  function activateTab(tab) {
    const target = tab.getAttribute("aria-controls");
    allTabs().forEach(t => t.setAttribute("aria-selected", t === tab ? "true" : "false"));
    allPanels().forEach(p => p.classList.toggle("active", p.id === target));
  }
  tabs.addEventListener("click", e => {
    const tab = e.target.closest(".game-tab");
    if (tab) activateTab(tab);
  });

  function stats(items) {
    return `<div class="score-line">${items.map(x => `<span class="score-pill">${x}</span>`).join("")}</div>`;
  }

  function renderView(id, html) {
    document.querySelector("#arcadeMenu").style.display = "none";
    document.querySelectorAll(".arcade-view").forEach(v => v.classList.remove("active"));
    const v = document.querySelector("#view-" + id);
    v.innerHTML = html;
    v.classList.add("active");
    return v;
  }
  function home() {
    document.querySelectorAll(".arcade-view").forEach(v => v.classList.remove("active"));
    document.querySelector("#arcadeMenu").style.display = "grid";
  }
  document.querySelector("#arcadeHome").addEventListener("click", home);
  document.querySelector("#arcadeMenu").addEventListener("click", e => {
    const card = e.target.closest("[data-game]");
    if (!card) return;
    startGame(card.dataset.game);
  });

  function startGame(id) {
    const f = {tictactoe:initTicTacToe,minesweeper:initMinesweeper,flappy:initFlappy,pong:initPong,aim:initAim,typing:initTyping}[id];
    if (f) f();
  }

  function initTicTacToe() {
    const v=renderView("tictactoe",`<h3 class="mini-title">❌ Tic-Tac-Toe</h3><p class="mini-muted">Tu es X. L'ordinateur joue O.</p><div id="tttStats">${stats(["X : 0","O : 0"])}</div><div class="ttt-grid" id="tttGrid"></div><button class="btn btn-ghost" id="tttReset">Nouvelle manche</button><p class="mini-muted" id="tttMsg" style="margin-top:12px"></p>`);
    const grid=v.querySelector("#tttGrid"), msg=v.querySelector("#tttMsg"), reset=v.querySelector("#tttReset");
    let board=Array(9).fill(""), over=false, xWins=0, oWins=0, ties=0;
    const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    function winner(b){ for(const [a,c,d] of wins) if(b[a]&&b[a]===b[c]&&b[a]===b[d]) return b[a]; return b.every(Boolean)?"draw":null; }
    function draw(){ grid.innerHTML=board.map((x,i)=>`<button class="ttt-cell" data-i="${i}" ${x?"disabled":""}>${x}</button>`).join(""); grid.querySelectorAll(".ttt-cell").forEach(b=>b.onclick=()=>play(+b.dataset.i)); }
    function finish(w){ if(w==="X")xWins++; else if(w==="O")oWins++; else ties++; msg.textContent=w==="draw"?"Égalité 🤝":w==="X"?"Bravo, tu gagnes ! 🎉":"L'IA gagne cette fois."; document.querySelector("#tttStats").innerHTML=stats([`X : ${xWins}`,`O : ${oWins}`,`Nuls : ${ties}`]); over=true; draw(); showGameAlert(w==="X"?{emoji:"🎉",title:"Victoire !",message:"Tu as aligné trois symboles. Bien joué !",button:"Rejouer"}:w==="O"?{emoji:"🤖",title:"L'IA a gagné",message:"Pas mal ! Retente une manche et prends ta revanche.",button:"Nouvelle manche"}:{emoji:"🤝",title:"Égalité !",message:"Aucun gagnant cette fois. Une revanche ?",button:"Rejouer"}); }
    function play(i){ if(over||board[i])return; board[i]="X"; let w=winner(board); draw(); if(w)return finish(w); setTimeout(()=>{const free=board.map((x,j)=>x?null:j).filter(x=>x!==null); if(!free.length)return; board[free[Math.floor(Math.random()*free.length)]]="O"; w=winner(board); draw(); if(w)finish(w);},260); }
    function newRound(){board=Array(9).fill("");over=false;msg.textContent="À toi de jouer.";draw();}
    reset.onclick=newRound; newRound();
  }

  function initMinesweeper() {
    const v=renderView("minesweeper",`<h3 class="mini-title">💣 Minesweeper</h3><p class="mini-muted">Clic gauche pour ouvrir, clic droit pour poser un drapeau.</p><div id="mineStats">${stats(["8 mines","Drapeaux : 0","En cours"])}</div><div class="mine-grid" id="mineGrid"></div><button class="btn btn-ghost" id="mineReset">Nouvelle partie</button><p class="mini-muted" id="mineMsg" style="margin-top:12px"></p>`);
    const grid=v.querySelector("#mineGrid"), msg=v.querySelector("#mineMsg"), reset=v.querySelector("#mineReset"), N=8, M=8;
    let cells=[], mines=new Set(), open=new Set(), flags=new Set(), done=false;
    function setup(){cells=Array.from({length:N*N},(_,i)=>i);mines=new Set();while(mines.size<M)mines.add(Math.floor(Math.random()*64));open.clear();flags.clear();done=false;msg.textContent="";draw();}
    function neighbors(i){const r=Math.floor(i/N),c=i%N,a=[];for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){if(!dr&&!dc)continue;const rr=r+dr,cc=c+dc;if(rr>=0&&rr<N&&cc>=0&&cc<N)a.push(rr*N+cc);}return a;}
    function count(i){return neighbors(i).filter(n=>mines.has(n)).length;}
    function reveal(i){if(done||flags.has(i)||open.has(i))return;if(mines.has(i)){open.add(i);done=true;msg.textContent="💥 Mine !";mines.forEach(m=>open.add(m));showGameAlert({emoji:"💥",title:"Oups… une mine !",message:"La partie est terminée. Les mines sont révélées. Prêt pour une revanche ?",button:"Rejouer"});return;}open.add(i);if(count(i)===0)neighbors(i).forEach(reveal);if(open.size===N*N-M){done=true;msg.textContent="🎉 Gagné !";showGameAlert({emoji:"🏆",title:"Champ déminé !",message:"Toutes les cases sûres ont été révélées. Beau travail !",button:"Rejouer"});}}
    function draw(){grid.innerHTML=cells.map(i=>{const n=count(i), shown=open.has(i), mine=shown&&mines.has(i);return `<button class="mine-cell ${shown?"open ":""}${flags.has(i)&&!shown?"flag ":""}${mine?"mine":""}" data-i="${i}">${mine?"💣":shown?(n||""):flags.has(i)?"⚑":""}</button>`}).join("");grid.querySelectorAll(".mine-cell").forEach(b=>{const i=+b.dataset.i;b.onclick=()=>{reveal(i);draw();};b.oncontextmenu=e=>{e.preventDefault();if(!done&&!open.has(i)){flags.has(i)?flags.delete(i):flags.add(i);draw();}}});document.querySelector("#mineStats").innerHTML=stats([`8 mines`,`Drapeaux : ${flags.size}`,done?(msg.textContent.includes("Gagné")?"Gagné":"Terminé"):"En cours"]); }
    reset.onclick=setup;setup();
  }

  function initFlappy() {
    const v=renderView("flappy",`<h3 class="mini-title">🐤 Flappy Bird</h3><p class="mini-muted">Espace, clic ou touche le canvas pour battre des ailes.</p><div id="flappyStats">${stats(["Score : 0","Espace : flap"])}</div><canvas class="canvas-game" id="flappyCanvas" width="640" height="360"></canvas><div class="extra-game-controls"><button class="btn btn-ghost" id="flappyStart">Démarrer / Rejouer</button></div>`);
    const c=v.querySelector("#flappyCanvas"),ctx=c.getContext("2d"),btn=v.querySelector("#flappyStart"),scoreEl=v.querySelector("#flappyStats");
    let raf=0,running=false,score=0,bird,pipes,last=0;
    function reset(){cancelAnimationFrame(raf);score=0;bird={x:120,y:180,vy:0};pipes=[];running=true;last=performance.now();raf=requestAnimationFrame(loop);}
    function flap(){if(!running){reset();return}bird.vy=-390;}
    function addPipe(){const gap=125,top=50+Math.random()*150;pipes.push({x:c.width,y:top,gap,passed:false});}
    function loop(t){const dt=Math.min(.032,(t-last)/1000);last=t;bird.vy+=1100*dt;bird.y+=bird.vy*dt;if(!pipes.length||pipes[pipes.length-1].x<390)addPipe();pipes.forEach(p=>p.x-=190*dt);for(const p of pipes){if(!p.passed&&p.x+70<bird.x){p.passed=true;score++;}if(bird.x+16>p.x&&bird.x-16<p.x+70&&(bird.y-14<p.y||bird.y+14>p.y+p.gap)||bird.y<0||bird.y>c.height){if(running){running=false;showGameAlert({emoji:"🐤",title:"Vol un peu trop court !",message:`Ton score : ${score}. Essaie encore et passe encore plus de tuyaux !`,button:"Rejouer"});}}}pipes=pipes.filter(p=>p.x>-90);draw();scoreEl.innerHTML=stats([`Score : ${score}`,running?"En cours":"Game over"]);if(running)raf=requestAnimationFrame(loop);}
    function draw(){ctx.clearRect(0,0,c.width,c.height);ctx.fillStyle="rgba(127,127,127,.12)";ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle="currentColor";for(const p of pipes){ctx.fillRect(p.x,0,70,p.y);ctx.fillRect(p.x,p.y+p.gap,70,c.height-(p.y+p.gap));}ctx.fillStyle="var(--accent)";ctx.beginPath();ctx.arc(bird.x,bird.y,15,0,Math.PI*2);ctx.fill();ctx.fillStyle="rgba(255,255,255,.75)";ctx.font="bold 22px sans-serif";ctx.fillText(score,20,35);}
    btn.onclick=reset;c.onclick=flap;document.addEventListener("keydown",e=>{if(e.code==="Space"){e.preventDefault();if(document.querySelector("#view-flappy.active"))flap();}});reset();
  }

  function initPong() {
    const v=renderView("pong",`<h3 class="mini-title">🏓 Pong</h3><p class="mini-muted">Souris ou doigt pour déplacer ta raquette. Premier à 7.</p><div id="pongStats">${stats(["Toi : 0","IA : 0"])}</div><canvas class="canvas-game" id="pongCanvas" width="640" height="360"></canvas><div class="extra-game-controls"><button class="btn btn-ghost" id="pongReset">Rejouer</button></div>`);
    const c=v.querySelector("#pongCanvas"),ctx=c.getContext("2d"),st=v.querySelector("#pongStats");let raf=0,p={x:20,y:150,w:12,h:60},ai={x:608,y:150,w:12,h:60},ball={x:320,y:180,vx:250,vy:150},ps=0,as=0,last=0;
    function serve(dir){ball={x:320,y:180,vx:250*dir,vy:(Math.random()>.5?1:-1)*(90+Math.random()*120)};}
    function reset(){ps=0;as=0;serve(Math.random()>.5?1:-1);last=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);}
    function move(y){p.y=Math.max(0,Math.min(c.height-p.h,y-p.h/2));}
    c.onpointermove=e=>{const r=c.getBoundingClientRect();move((e.clientY-r.top)*c.height/r.height);};
    function loop(t){const dt=Math.min(.03,(t-last)/1000);last=t;ball.x+=ball.vx*dt;ball.y+=ball.vy*dt;if(ball.y<8||ball.y>c.height-8)ball.vy*=-1;ai.y+=(ball.y-(ai.y+ai.h/2))*.08;ai.y=Math.max(0,Math.min(c.height-ai.h,ai.y));const hit=(r)=>ball.x+8>r.x&&ball.x-8<r.x+r.w&&ball.y+8>r.y&&ball.y-8<r.y+r.h;if(hit(p)&&ball.vx<0){ball.x=p.x+p.w+9;ball.vx=Math.abs(ball.vx)*1.05;}if(hit(ai)&&ball.vx>0){ball.x=ai.x-9;ball.vx=-Math.abs(ball.vx)*1.05;}if(ball.x<0){as++;serve(1);}if(ball.x>c.width){ps++;serve(-1);}if(ps>=7||as>=7){draw();st.innerHTML=stats([`Toi : ${ps}`,`IA : ${as}`,ps>as?"Victoire !":as>ps?"Défaite":""]);showGameAlert(ps>as?{emoji:"🏓",title:"Victoire !",message:"Tu as remporté la partie. Bien joué !",button:"Rejouer"}:{emoji:"🤖",title:"L'IA gagne !",message:"La prochaine manche est pour toi ? 😎",button:"Rejouer"});return;}draw();raf=requestAnimationFrame(loop);}
    function draw(){ctx.clearRect(0,0,c.width,c.height);ctx.setLineDash([6,8]);ctx.beginPath();ctx.moveTo(c.width/2,0);ctx.lineTo(c.width/2,c.height);ctx.strokeStyle="rgba(255,255,255,.18)";ctx.stroke();ctx.setLineDash([]);ctx.fillStyle="var(--text)";ctx.fillRect(p.x,p.y,p.w,p.h);ctx.fillRect(ai.x,ai.y,ai.w,ai.h);ctx.fillStyle="var(--accent)";ctx.beginPath();ctx.arc(ball.x,ball.y,8,0,Math.PI*2);ctx.fill();st.innerHTML=stats([`Toi : ${ps}`,`IA : ${as}`]);}
    v.querySelector("#pongReset").onclick=reset;reset();
  }

  function initAim() {
    const v=renderView("aim",`<h3 class="mini-title">🎯 Aim Trainer</h3><p class="mini-muted">30 secondes. Clique les cibles et améliore ton temps de réaction.</p><div id="aimStats">${stats(["Temps : 30s","Touches : 0","Précision : 100%"])}</div><div class="aim-area" id="aimArea"></div><div class="extra-game-controls"><button class="btn btn-ghost" id="aimStart">Démarrer</button></div>`);
    const area=v.querySelector("#aimArea"),st=v.querySelector("#aimStats"),start=v.querySelector("#aimStart");let hits=0,shots=0,time=30,timer=null,active=false;
    function place(){const t=document.createElement("button");t.className="aim-target";t.setAttribute("aria-label","Cible");t.style.left=(10+Math.random()*80)+"%";t.style.top=(12+Math.random()*76)+"%";t.onclick=e=>{e.stopPropagation();hits++;shots++;place();};area.innerHTML="";area.appendChild(t);}
    area.onclick=()=>{if(active)shots++;};
    function draw(){st.innerHTML=stats([`Temps : ${time}s`,`Touches : ${hits}`,`Précision : ${shots?Math.round(hits/shots*100):100}%`]);}
    function begin(){clearInterval(timer);hits=0;shots=0;time=30;active=true;place();draw();timer=setInterval(()=>{time--;draw();if(time<=0){clearInterval(timer);active=false;area.innerHTML="";start.textContent="Rejouer";}},1000);}
    start.onclick=begin;draw();
  }

  function initTyping() {
    const words=["typescript","javascript","react","nextjs","nestjs","strapi","docker","keycloak","playwright","github","frontend","backend","clean-code","redis","kafka"];
    const v=renderView("typing",`<h3 class="mini-title">⌨️ Typing Game</h3><p class="mini-muted">Tape le mot affiché. Une partie dure 30 secondes.</p><div id="typingStats">${stats(["Temps : 30s","Mots : 0","Précision : 100%"])}</div><div class="typing-word" id="typingWord">Prêt ?</div><input class="typing-input" id="typingInput" autocomplete="off" spellcheck="false" placeholder="Clique sur Démarrer puis tape ici..." disabled><div class="extra-game-controls"><button class="btn btn-ghost" id="typingStart">Démarrer</button></div>`);
    const word=v.querySelector("#typingWord"),input=v.querySelector("#typingInput"),st=v.querySelector("#typingStats"),start=v.querySelector("#typingStart");let time=30,correct=0,total=0,timer=null,current="";
    function next(){current=words[Math.floor(Math.random()*words.length)];word.textContent=current;input.value="";input.focus();}
    function draw(){st.innerHTML=stats([`Temps : ${time}s`,`Mots : ${correct}`,`Précision : ${total?Math.round(correct/total*100):100}%`]);}
    function begin(){clearInterval(timer);time=30;correct=0;total=0;input.disabled=false;start.textContent="Recommencer";next();draw();timer=setInterval(()=>{time--;draw();if(time<=0){clearInterval(timer);input.disabled=true;word.textContent="⏱️ Terminé !";showGameAlert({emoji:"⌨️",title:"Temps écoulé !",message:`Tu as tapé ${correct} mot${correct>1?"s":""}. Recommence pour battre ton score.`,button:"Rejouer"});}},1000);}
    input.oninput=()=>{if(!time)return;if(input.value.trim()===current){correct++;total++;next();draw();}else if(input.value.length>=current.length){total++;input.value="";draw();}};
    start.onclick=begin;draw();
  }

  // Each new game uses the shared Arcade panel.
  // The tab itself points to a virtual game id, so redirect it to panel-arcade.
  games.forEach(g => {
    const t = document.querySelector("#tab-" + g.id);
    if (!t) return;
    t.addEventListener("click", e => {
      e.stopPropagation();
      allTabs().forEach(x => x.setAttribute("aria-selected", x === t ? "true" : "false"));
      allPanels().forEach(p => p.classList.toggle("active", p === arcadePanel));
      startGame(g.id);
    });
  });

  // Selecting a card inside Arcade starts that game without changing panels.
  arcadePanel.addEventListener("click", e => {
    const card = e.target.closest("[data-game]");
    if (card) startGame(card.dataset.game);
  });
})();