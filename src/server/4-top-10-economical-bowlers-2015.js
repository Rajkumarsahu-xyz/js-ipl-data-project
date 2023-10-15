const fs = require('fs');
const csv = require('csv-parser');

function calculateTopEconomicalBowlersIn2015(matchesFilePath, deliveriesFilePath) {
    let totalRunsPerBowler = {};
    let totalBallsPerBowler = {};

    let matchesIn2015 = {};
    fs.createReadStream(matchesFilePath)
        .pipe(csv())
        .on('data', (row) => {
            if (row.season === '2015') {
                matchesIn2015[row.id] = true;
            }
        })
        .on('end', () => {
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
                        
                        if (!isWide && !isNoBall) {
                            totalRunsPerBowler[bowler] = (totalRunsPerBowler[bowler] || 0) + totalRuns;
                            totalBallsPerBowler[bowler] = (totalBallsPerBowler[bowler] || 0) + 1;
                        }
                    }
                })
                .on('end', () => {
                    let economyRates = {};
                    Object.keys(totalRunsPerBowler).forEach((bowler) => {
                        const runs = totalRunsPerBowler[bowler];
                        const balls = totalBallsPerBowler[bowler];
                        const economy = (runs / balls) * 6; 
                        economyRates[bowler] = economy;
                    });

                    const top10Bowlers = Object.entries(economyRates)
                        .sort((a, b) => a[1] - b[1])
                        .slice(0, 10);
                    fs.writeFileSync('../public/output/4-top10EconomicalBowlers2015.json', JSON.stringify(top10Bowlers, null, 2));
                    console.log('Top 10 economical bowlers in 2015 calculated and saved to topEconomicalBowlersIn2015.json.');
                });
        });
}

module.exports = calculateTopEconomicalBowlersIn2015;
