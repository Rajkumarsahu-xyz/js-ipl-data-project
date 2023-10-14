const fs = require('fs');
const csv = require('csv-parser');

function findMostDismissedPlayers(deliveriesFilePath) {
    let dismissedPlayers = {};

    // Read deliveries CSV file and find most dismissed players
    fs.createReadStream(deliveriesFilePath)
        .pipe(csv())
        .on('data', (row) => {
            const batsman = row.batsman;
            const dismissedPlayer = row.player_dismissed;

            if (dismissedPlayer && batsman !== dismissedPlayer) {
                const key = `${batsman}-${dismissedPlayer}`;
                dismissedPlayers[key] = (dismissedPlayers[key] || 0) + 1;
            }
        })
        .on('end', () => {
            // Find the pair of players with the most dismissals
            const mostDismissedPair = Object.keys(dismissedPlayers).reduce((a, b) => {
                return dismissedPlayers[a] > dismissedPlayers[b] ? a : b;
            });

            const [batsman, dismissedPlayer] = mostDismissedPair.split('-');
            const dismissalCount = dismissedPlayers[mostDismissedPair];

            // Write the result to mostDismissedPlayers.json
            fs.writeFileSync('../public/output/8-highestNoOfTimesAPlayerDismissedByAnotherPlayer.json', JSON.stringify({ batsman, dismissedPlayer, dismissalCount }, null, 2));
            console.log('Most dismissed players calculated and saved to mostDismissedPlayers.json.');
        });
}

module.exports = findMostDismissedPlayers;
