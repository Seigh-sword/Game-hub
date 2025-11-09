
// Fetch the list of approved games
fetch('gamesList.json')
  .then(response => response.json())
  .then(games => {
    const container = document.getElementById('gameCards');

    games.forEach(game => {
      // Create card element
      const card = document.createElement('div');
      card.className = 'card';

      // Add game info inside card
      card.innerHTML = `
        <h3>${game.name}</h3>
        <p>By: ${game.author}</p>
        <button>Play</button>
      `;

      // Button click loads game in iframe
      card.querySelector('button').onclick = () => {
        document.getElementById('gameFrame').src = `games/${game.folder}/index.html`;
      };

      // Add card to container
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error loading games:', error);
  });
