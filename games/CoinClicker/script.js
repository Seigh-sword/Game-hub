let coinCount = 0;

const coin = document.getElementById('coin');
const coinDisplay = document.getElementById('coinCount');
const clickSfx = document.getElementById('clickSfx');
const coinSfx = document.getElementById('coinSfx');
const upgradeContainer = document.getElementById('upgradeButtons');

// Example upgrades
const upgrades = [
  { name: "Double Click", cost: 10, multiplier: 2 },
  { name: "Super Click", cost: 50, multiplier: 5 }
];

// Click coin function
coin.addEventListener('click', () => {
  coinCount++;
  coinDisplay.textContent = coinCount;
  clickSfx.play();
  coinSfx.play();
});

// Create upgrade buttons
upgrades.forEach((upgrade, index) => {
  const btn = document.createElement('button');
  btn.textContent = `${upgrade.name} (Cost: ${upgrade.cost})`;
  
  btn.addEventListener('click', () => {
    if (coinCount >= upgrade.cost) {
      coinCount -= upgrade.cost;
      coinCount += upgrade.multiplier;
      coinDisplay.textContent = coinCount;
      clickSfx.play();
    }
  });

  upgradeContainer.appendChild(btn);
});
