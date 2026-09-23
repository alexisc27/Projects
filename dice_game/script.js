let mode = null;
let players = [];
let activeIdx = 0;
let roundOver = false;
let matchOver = false;
const TARGET_WINS = 3;

function startGame(m){
  mode = m;
  roundOver = false;
  matchOver = false;
  activeIdx = 0;
  document.getElementById('history').innerHTML = '';
  document.getElementById('againBtn').style.display = 'none';
  document.getElementById('rollBtn').disabled = false;

  if(m === 'solo'){
    players = [{name:'You', wins: 0, best: Number(localStorage.getItem('diceDuelBest')||0)}];
  } else if(m === 'cpu'){
    players = [{name:'You', wins:0}, {name:'Computer', wins:0}];
  } else {
    players = [{name:'Player 1', wins:0}, {name:'Player 2', wins:0}];
  }

  document.getElementById('menu').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  renderScoreboard();
  document.getElementById('diceRow').innerHTML = '';
  document.getElementById('status').textContent = mode === 'solo'
    ? 'Roll two dice — beat your best!'
    : players[0].name + "'s turn — press roll";
}

function backToMenu(){
  document.getElementById('menu').style.display = 'block';
  document.getElementById('game').style.display = 'none';
}

function renderScoreboard(){
  const sb = document.getElementById('scoreboard');
  sb.innerHTML = '';
  players.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'player' + (i === activeIdx && !matchOver ? ' active' : '');
    if(mode === 'solo'){
      div.innerHTML = `<div class="name">${p.name}</div><div class="wins">Best: ${p.best}</div>`;
    } else {
      div.innerHTML = `<div class="name">${p.name}</div><div class="wins">${p.wins}</div>`;
    }
    sb.appendChild(div);
  });
}

function rollTwo(){
  return [1 + Math.floor(Math.random()*6), 1 + Math.floor(Math.random()*6)];
}

function showDice(vals){
  const row = document.getElementById('diceRow');
  row.innerHTML = '';
  vals.forEach(v => {
    const d = document.createElement('div');
    d.className = 'die';
    d.textContent = v;
    row.appendChild(d);
  });
}

function logHistory(text){
  const h = document.getElementById('history');
  const line = document.createElement('div');
  line.textContent = text;
  h.prepend(line);
}

function doRoll(){
  if(matchOver) return;

  if(mode === 'solo'){
    const vals = rollTwo();
    const total = vals[0] + vals[1];
    showDice(vals);
    let msg = `You rolled ${total}.`;
    if(total > players[0].best){
      players[0].best = total;
      localStorage.setItem('diceDuelBest', String(total));
      msg += ' New best!';
    }
    document.getElementById('status').textContent = msg;
    logHistory(`Rolled ${vals[0]} + ${vals[1]} = ${total}`);
    renderScoreboard();
    return;
  }

  if(mode === 'cpu'){
    const you = rollTwo();
    const yourTotal = you[0] + you[1];
    showDice(you);
    document.getElementById('status').textContent = `You rolled ${yourTotal}. Computer thinking...`;
    document.getElementById('rollBtn').disabled = true;
    setTimeout(() => {
      const cpu = rollTwo();
      const cpuTotal = cpu[0] + cpu[1];
      showDice(cpu);
      let result;
      if(yourTotal > cpuTotal){ players[0].wins++; result = `You win the round! (${yourTotal} vs ${cpuTotal})`; }
      else if(cpuTotal > yourTotal){ players[1].wins++; result = `Computer wins the round. (${cpuTotal} vs ${yourTotal})`; }
      else { result = `Tie! Both rolled ${yourTotal}.`; }
      logHistory(`You: ${yourTotal} — Computer: ${cpuTotal}`);
      checkMatch(result);
      document.getElementById('rollBtn').disabled = false;
    }, 700);
    return;
  }

  if(mode === 'multi'){
    const vals = rollTwo();
    const total = vals[0] + vals[1];
    showDice(vals);
    const currentPlayer = players[activeIdx];
    currentPlayer.lastRoll = total;
    logHistory(`${currentPlayer.name} rolled ${total}`);

    if(activeIdx === 0){
      activeIdx = 1;
      document.getElementById('status').textContent = `${currentPlayer.name} rolled ${total}. ${players[1].name}'s turn.`;
      renderScoreboard();
    } else {
      const p1 = players[0], p2 = players[1];
      let result;
      if(p1.lastRoll > p2.lastRoll){ p1.wins++; result = `${p1.name} wins the round! (${p1.lastRoll} vs ${p2.lastRoll})`; }
      else if(p2.lastRoll > p1.lastRoll){ p2.wins++; result = `${p2.name} wins the round! (${p2.lastRoll} vs ${p1.lastRoll})`; }
      else { result = `Tie round! Both rolled ${p1.lastRoll}.`; }
      activeIdx = 0;
      checkMatch(result);
    }
  }
}

function checkMatch(result){
  const winner = players.find(p => p.wins >= TARGET_WINS);
  if(winner){
    matchOver = true;
    document.getElementById('status').textContent = `${result} 🏆 ${winner.name} wins the match!`;
    document.getElementById('rollBtn').style.display = 'none';
    document.getElementById('againBtn').style.display = 'block';
  } else {
    document.getElementById('status').textContent = result + ' — first to ' + TARGET_WINS + ' round wins.';
    document.getElementById('rollBtn').style.display = 'block';
  }
  renderScoreboard();
}
