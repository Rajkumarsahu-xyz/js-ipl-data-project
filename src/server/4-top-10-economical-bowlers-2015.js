// const fs = require('fs');
// const csv = require('csv-parser');

// function calculateExtraRunsConcededIn2016(matchesFilePath, deliveriesFilePath) {
//     let extraRunsConceded = {};

//     // Read matches CSV file to filter matches in the year 2016
//     let matchesIn2016 = {};
//     fs.createReadStream(matchesFilePath)
//         .pipe(csv())
//         .on('data', (row) => {
//             if (row.season === '2015') {
//                 matchesIn2016[row.id] = row.team1;
//             }
//         })
//         .on('end', () => {
//             // Read deliveries CSV file and calculate extra runs conceded in 2016
//             fs.createReadStream(deliveriesFilePath)
//                 .pipe(csv())
//                 .on('data', (row) => {
//                     const matchId = row.match_id;
//                     const bowlingTeam = matchesIn2016[matchId];
//                     const extras = parseInt(row.extra_runs, 10);

//                     if (bowlingTeam && extras !== undefined) {
//                         extraRunsConceded[bowlingTeam] = (extraRunsConceded[bowlingTeam] || 0) + extras;
//                     }
//                 })
//                 .on('end', () => {
//                     // Write the result to extraRunsConcededIn2016.json
//                     fs.writeFileSync('../public/output/3-extraRunsConcededPerTeam2016.json', JSON.stringify(extraRunsConceded, null, 2));
//                     console.log('Extra runs conceded per team in 2016 calculated and saved to extraRunsConcededIn2016.json.');
//                 });
//         });
//     }

// module.exports = calculateExtraRunsConcededIn2016;


const fs = require('fs');
const csv = require('csv-parser');

function calculateTopEconomicalBowlersIn2015(matchesFilePath, deliveriesFilePath) {
    let totalRunsPerBowler = {};
    let totalBallsPerBowler = {};

    // Read matches CSV file to filter matches in the year 2015
    let matchesIn2015 = {};
    fs.createReadStream(matchesFilePath)
        .pipe(csv())
        .on('data', (row) => {
            if (row.season === '2015') {
                matchesIn2015[row.id] = true;
            }
        })
        .on('end', () => {
            // Read deliveries CSV file and calculate total runs and balls bowled by each bowler in 2015
            fs.createReadStream(deliveriesFilePath)
                .pipe(csv())
                .on('data', (row) => {
                    const matchId = row.match_id;
                    if (matchesIn2015[matchId]) {
                        const bowler = row.bowler;
                        const extras = parseInt(row.extra_runs, 10);
                        const totalRuns = parseInt(row.total_runs, 10) - extras;
                        const isWide = row.wide_runs !== '0';
                        const isNoBall = row.noball_runs !== '0';
                        
                        // Consider only valid deliveries (excluding wides and no-balls) for economy calculation
                        if (!isWide && !isNoBall) {
                            totalRunsPerBowler[bowler] = (totalRunsPerBowler[bowler] || 0) + totalRuns;
                            totalBallsPerBowler[bowler] = (totalBallsPerBowler[bowler] || 0) + 1;
                        }
                    }
                })
                .on('end', () => {
                    // Calculate economy rate for each bowler
                    let economyRates = {};
                    Object.keys(totalRunsPerBowler).forEach((bowler) => {
                        const runs = totalRunsPerBowler[bowler];
                        const balls = totalBallsPerBowler[bowler];
                        const economy = (runs / balls) * 6; // Economy rate formula
                        economyRates[bowler] = economy;
                    });

                    // Sort bowlers by economy rate and get the top 10
                    const top10Bowlers = Object.entries(economyRates)
                        .sort((a, b) => a[1] - b[1]) // Sort by economy rate
                        .slice(0, 10); // Get top 10 bowlers

                    // Write the result to topEconomicalBowlersIn2015.json
                    fs.writeFileSync('../public/output/4-top10EconomicalBowlers2015.json', JSON.stringify(top10Bowlers, null, 2));
                    console.log('Top 10 economical bowlers in 2015 calculated and saved to topEconomicalBowlersIn2015.json.');
                });
        });
}

module.exports = calculateTopEconomicalBowlersIn2015;
