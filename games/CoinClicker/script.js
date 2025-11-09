// coinClicker script (matching your HTML ids)

// state
let score = 0;
let coins = 0;
let clickPower = 1;

let clickUpgradeCost = 10;
let autoClickCost = 50;
let autoClickPower = 0;

// DOM
const scoreEl = document.getElementById('score');
const coinsEl = document.getElementById('coins');

const coinBtn = document.getElementById('coinBtn');
const clickUpgradeBtn = document.getElementById('clickUpgrade');
const autoClickBtn = document.getElementById('autoClick');

const clickSound = document.getElementById('clickSound');
const coinSound = document.getElementById('coinSound');

// small helper to safely play sounds
function playSound(audioEl){
  if (!audioEl) return;
  try{
    audioEl.currentTime = 0;
    audioEl.play();
  }catch(e){
    // ignore autoplay or play errors
  }
}

// update UI texts and button disabled states
function updateDisplay(){
  scoreEl.textContent = score;
  coinsEl.textContent = coins;

  clickUpgradeBtn.textContent = `Click Upgrade (+1) — Cost: ${clickUpgradeCost}`;
  autoClickBtn.textContent = `Auto Click (+1/sec) — Cost: ${autoClickCost}`;

  clickUpgradeBtn.disabled = coins < clickUpgradeCost;
  autoClickBtn.disabled = coins < autoClickCost;
}

// main click
coinBtn.addEventListener('click', () => {
  score += clickPower;
  coins += clickPower;
  updateDisplay();
  playSound(clickSound);
});

// click upgrade logic
clickUpgradeBtn.addEventListener('click', () => {
  if (coins < clickUpgradeCost) return;
  coins -= clickUpgradeCost;
  clickPower += 1;
  clickUpgradeCost = Math.max(1, Math.floor(clickUpgradeCost * 1.5));
  updateDisplay();
  playSound(coinSound);
});

// auto click purchase
autoClickBtn.addEventListener('click', () => {
  if (coins < autoClickCost) return;
  coins -= autoClickCost;
  autoClickPower += 1;
  autoClickCost = Math.max(1, Math.floor(autoClickCost * 1.8));
  updateDisplay();
  playSound(coinSound);
});

// apply auto click every second
setInterval(() => {
  if (autoClickPower > 0){
    score += autoClickPower;
    coins += autoClickPower;
    updateDisplay();
  }
}, 1000);

// initial render
updateDisplay();
