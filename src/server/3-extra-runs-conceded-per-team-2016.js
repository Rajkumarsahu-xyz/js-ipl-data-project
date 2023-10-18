const fs = require('fs');
const csv = require('csv-parser');

function calculateExtraRunsConcededIn2016(matchesFilePath, deliveriesFilePath) {
    let extraRunsConceded = {};
    let matchesIn2016 = {};
    fs.createReadStream(matchesFilePath)
        .pipe(csv())
        .on('data', (row) => {
            if (row.season === '2016') {
                matchesIn2016[row.id] = {"team1":row.team1, "team2":row.team2};
                // console.log(matchesIn2016);
            }
        })
        .on('end', () => {
            fs.createReadStream(deliveriesFilePath)
                .pipe(csv())
                .on('data', (row) => {
                    const matchId = row.match_id;
                    // console.log(matchId);
                    const bowlingTeam = matchesIn2016[matchId];
                    const extras = parseInt(row.extra_runs, 10);

                    if (bowlingTeam && extras !== undefined) {
                        if(extraRunsConceded[bowlingTeam["team1"]]) {
                            extraRunsConceded[bowlingTeam["team1"]] += extras;
                        }
                        else {
                            extraRunsConceded[bowlingTeam["team1"]] = extras;
                        }
                        if(extraRunsConceded[bowlingTeam["team2"]]) {
                            extraRunsConceded[bowlingTeam["team2"]] += extras;
                        }
                        else {
                            extraRunsConceded[bowlingTeam["team2"]] = extras;
                        }
                        // console.log(bowlingTeam, extras);
                    }
                })
                .on('end', () => {
                    console.log(extraRunsConceded);
                    fs.writeFileSync('../public/output/3-extraRunsConcededPerTeam2016.json', JSON.stringify(extraRunsConceded, null, 2));
                    console.log('Extra runs conceded per team in 2016 calculated and saved to extraRunsConcededIn2016.json.');
                });
        });
}

calculateExtraRunsConcededIn2016("/home/raj/js-ipl-data-project/src/data/matches.csv", "/home/raj/js-ipl-data-project/src/data/deliveries.csv");

module.exports = calculateExtraRunsConcededIn2016;
