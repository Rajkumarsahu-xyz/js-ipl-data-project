
const fs = require('fs');
const csvParser = require('csv-parser');

function findBestEconomyInSuperOvers(deliveriesFilePath) {
const superOverBowlerEconomy = {};

fs.createReadStream(deliveriesFilePath)
    .pipe(csvParser())
    .on('data', row => {
        const isSuperOver = row.is_super_over === '1';
        if (isSuperOver) {
            const bowler = row.bowler;
            const totalRuns = parseInt(row.total_runs);
            const extras = parseInt(row.extra_runs);
            const wide = parseInt(row.wide_runs);
            const noball = parseInt(row.noball_runs);
            const runsGiven = totalRuns - extras + wide + noball;
            let ballsBowled = 0;
            if(wide==0 && noball == 0) {
                ballsBowled = 1;
            }

            if (superOverBowlerEconomy[bowler]) {
                superOverBowlerEconomy[bowler].runs += runsGiven;
                superOverBowlerEconomy[bowler].balls += ballsBowled;
            } else {
                superOverBowlerEconomy[bowler] = {
                    runs: runsGiven,
                    balls: ballsBowled,
                };
            }
        }
    })
    .on('end', () => {
        let bestEconomy = Number.MAX_SAFE_INTEGER;
        let bestEconomyBowler = null;

        Object.keys(superOverBowlerEconomy).forEach(bowler => {
            const { runs, balls } = superOverBowlerEconomy[bowler];
            const economy = runs / (balls / 6);
            if (economy < bestEconomy) {
                bestEconomy = economy;
                bestEconomyBowler = bowler;
            }
        });

        const outputData = {
            bowler: bestEconomyBowler,
            economy: bestEconomy.toFixed(2),
        };

        fs.writeFileSync('../public/output/9-bowlerBestEconomyInSuperOvers.json', JSON.stringify(outputData, null, 2));
    });
}

// findBestEconomyInSuperOvers("/home/raj/js-ipl-data-project/src/data/deliveries.csv");

module.exports = findBestEconomyInSuperOvers;