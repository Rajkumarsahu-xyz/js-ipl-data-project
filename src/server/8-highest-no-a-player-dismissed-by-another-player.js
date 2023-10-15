const fs = require('fs');
const csvParser = require('csv-parser');

function findMostDismissedPlayers(deliveriesFilePath) {
const dismissalsCount = {};

fs.createReadStream(deliveriesFilePath)
    .pipe(csvParser())
    .on('data', row => {
        const bowler = row.bowler;
        const dismissedBatsman = row.player_dismissed;

        if (dismissedBatsman && bowler) {
            const key = `${bowler}_${dismissedBatsman}`;
            dismissalsCount[key] = (dismissalsCount[key] || 0) + 1;
        }
    })
    .on('end', () => {
        let maxDismissals = 0;
        let maxDismissalsPair = null;

        Object.keys(dismissalsCount).forEach(pair => {
            const dismissals = dismissalsCount[pair];
            if (dismissals > maxDismissals) {
                maxDismissals = dismissals;
                maxDismissalsPair = pair;
            }
        });

        const outputData = {
            playerPair: maxDismissalsPair,
            dismissals: maxDismissals,
        };

        fs.writeFileSync("../public/output/8-highestNoOfTimesAPlayerDismissedByAnotherPlayer.json", JSON.stringify(outputData, null, 2));
    });
}


module.exports = findMostDismissedPlayers;