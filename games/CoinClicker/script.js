let score = 0;
let coins = 0;
let clickPower = 1;
let clickUpgradeCost = 10;
let autoClickPower = 0;
let autoClickCost = 50;

const scoreEl = document.getElementById('score');
const coinsEl = document.getElementById('coins');
const coinBtn = document.getElementById('coinBtn');
const clickUpgradeBtn = document.getElementById('clickUpgrade');
const autoClickBtn = document.getElementById('autoClick');

const clickSound = document.getElementById('clickSound');
const coinSound = document.getElementById('coinSound');

// Coin click handler
coinBtn.addEventListener('click', () => {
  score += clickPower;
  coins += clickPower;
  updateDisplay();
  playSound(clickSound);
});

// Click Upgrade
clickUpgradeBtn.addEventListener('click', () => {
  if (coins >= clickUpgradeCost) {
    coins -= clickUpgradeCost;
    clickPower++;
    clickUpgradeCost = Math.floor(clickUpgradeCost * 1.5);
    updateDisplay();
    playSound(coinSound);
    clickUpgradeBtn.textContent = `Click Upgrade (+1) — Cost: ${clickUpgradeCost}`;
  }
});

// Auto Click Upgrade
autoClickBtn.addEventListener('click', () => {
  if (coins >= autoClickCost) {
    coins -= autoClickCost;
    autoClickPower++;
    autoClickCost = Math.floor(autoClickCost * 1.8);
    updateDisplay();
    playSound(coinSound);
    autoClickBtn.textContent = `Auto Click (+1/sec) — Cost: ${autoClickCost}`;
  }
});

// Auto click loop
setInterval(() => {
  if (autoClickPower > 0) {
    score += autoClickPower;
    coins += autoClickPower;
    updateDisplay();
  }
}, 1000);

// Helpers
function updateDisplay() {
  scoreEl.textContent = score;
  coinsEl.textContent = coins;
}

function playSound(audio) {
  audio.currentTime = 0;
  audio.play();
}
