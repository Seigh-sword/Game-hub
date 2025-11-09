const gameCardsContainer = document.getElementById('gameCards');
const gameFrame = document.getElementById('gameFrame');
const iframeContainer = document.getElementById('iframeContainer');
const backBtn = document.getElementById('backBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// Button click sound
const clickSound = new Audio('assets/click-sfx.mp3');

// Store folder names to avoid duplicates
const loadedGames = new Set();

// Load games from JSON
fetch('gamesList.json')
  .then(res => res.json())
  .then(games => {
    games.forEach(game => {
      if (loadedGames.has(game.folder)) return; // skip duplicate
      loadedGames.add(game.folder);

      const card = document.createElement('div');
      card.className = 'card';

      // Check for thumbnail
      const thumbnailPath = `games/${game.folder}/tumbnail.png`;
      card.innerHTML = `
        <img src="${thumbnailPath}" alt="Thumbnail" class="thumbnail">
        <h3>${game.name}</h3>
        <p>By: ${game.author}</p>
        <button>Play</button>
        <div class="favorite-container">
          <img src="assets/star-no.png" alt="Favorite" class="favoriteBtn">
        </div>
      `;

      // Play button
      card.querySelector('button').onclick = () => {
        clickSound.play();
        gameFrame.src = `games/${game.folder}/index.html`;
        iframeContainer.style.display = "block";
        gameCardsContainer.style.display = "none";
      };

      // Favorite star toggle
      const favoriteBtn = card.querySelector('.favoriteBtn');
      let isFavorite = false;
      favoriteBtn.addEventListener('click', () => {
        clickSound.play();
        isFavorite = !isFavorite;
        favoriteBtn.src = isFavorite ? "assets/star-yes.png" : "assets/star-no.png";
      });

      gameCardsContainer.appendChild(card);
    });
  })
  .catch(err => console.error('Error loading games:', err));

// Back button
backBtn.addEventListener('click', () => {
  clickSound.play();
  iframeContainer.style.display = "none";
  gameCardsContainer.style.display = "flex";
  gameFrame.src = "";
});

// Fullscreen button
fullscreenBtn.addEventListener('click', () => {
  clickSound.play();
  if (gameFrame.requestFullscreen) {
    gameFrame.requestFullscreen();
  }
});
