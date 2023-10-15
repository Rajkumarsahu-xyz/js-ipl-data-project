const fs = require('fs');
const csv = require('csv-parser');

function calculateHighestNoOfPOTMEachSsn(matchesFilePath) {
    let highestNoOfPOTMEachSsn = {};
    let potm = {};
    
    fs.createReadStream(matchesFilePath)
        .pipe(csv())
        .on('data', (row) => {
            const year = row.season;
            const player = row.player_of_match;

            if (potm[year]) {
                if (potm[year][player]) {
                    potm[year][player] += 1;
                } else {
                    potm[year][player] = 1;
                }
            } else {
                potm[year] = {
                    [player]: 1
                };
                // matchesWonPerTeamPerYear[year][winner] = 1;
            }
            // console.log(potm);

            Object.keys(potm).forEach((year) => {
                const players = potm[year];
                const topPlayer = Object.keys(players).reduce((a, b) => players[a] > players[b] ? a : b);
                highestNoOfPOTMEachSsn[year] = {
                    player: topPlayer,
                    awards: players[topPlayer]
                };
            });
            // console.log(highestNoOfPOTMEachSsn);

        }

        )
        .on('end', () => {
            fs.writeFileSync('../public/output/6-highestNoOfPOTMEachSsn.json', JSON.stringify(highestNoOfPOTMEachSsn, null, 2));
            console.log('Matches won per team per year data calculated and saved to matchesWonPerTeamPerYear.json.');
        });
}

module.exports = calculateHighestNoOfPOTMEachSsn;