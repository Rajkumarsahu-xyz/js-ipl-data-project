const fs = require('fs');
const csv = require('csv-parser');

function calculateExtraRunsConcededIn2016(matchesFilePath, deliveriesFilePath) {
    let extraRunsConceded = {};
    let matchesIn2016 = {};
    fs.createReadStream(matchesFilePath)
        .pipe(csv())
        .on('data', (row) => {
            if (row.season === '2016') {
                matchesIn2016[row.id] = row.team1;
            }
        })
        .on('end', () => {
            fs.createReadStream(deliveriesFilePath)
                .pipe(csv())
                .on('data', (row) => {
                    const matchId = row.match_id;
                    const bowlingTeam = matchesIn2016[matchId];
                    const extras = parseInt(row.extra_runs, 10);

                    if (bowlingTeam && extras !== undefined) {
                        extraRunsConceded[bowlingTeam] = (extraRunsConceded[bowlingTeam] || 0) + extras;
                    }
                })
                .on('end', () => {
                    fs.writeFileSync('../public/output/3-extraRunsConcededPerTeam2016.json', JSON.stringify(extraRunsConceded, null, 2));
                    console.log('Extra runs conceded per team in 2016 calculated and saved to extraRunsConcededIn2016.json.');
                });
        });
}

module.exports = calculateExtraRunsConcededIn2016;
