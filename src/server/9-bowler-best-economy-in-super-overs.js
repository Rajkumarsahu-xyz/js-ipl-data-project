const fs = require('fs');
const csv = require('csv-parser');

function findBestEconomyInSuperOvers(deliveriesFilePath, matchesFilePath) {
    let superOverBowlers = {};

    // Read matches CSV file to identify Super Overs
    let superOvers = {};
    fs.createReadStream(matchesFilePath)
        .pipe(csv())
        .on('data', (row) => {
            const matchId = row.id;
            const isSuperOver = row.is_super_over === '1';
            if (isSuperOver) {
                superOvers[matchId] = true;
            }
        })
        .on('end', () => {
            // Read deliveries CSV file and calculate economy rate for bowlers in Super Overs
            fs.createReadStream(deliveriesFilePath)
                .pipe(csv())
                .on('data', (row) => {
                    const matchId = row.match_id;
                    const isSuperOver = superOvers[matchId];
                    const bowler = row.bowler;
                    const extras = parseInt(row.extra_runs, 10);
                    const totalRuns = parseInt(row.total_runs, 10) - extras;
                    const isWide = row.wide_runs !== '0';
                    const isNoBall = row.noball_runs !== '0';

                    // Consider only valid deliveries (excluding wides and no-balls) for economy calculation in Super Overs
                    if (isSuperOver && !isWide && !isNoBall) {
                        if (!superOverBowlers[bowler]) {
                            superOverBowlers[bowler] = { runs: 0, balls: 0 };
                        }

                        superOverBowlers[bowler].runs += totalRuns;
                        superOverBowlers[bowler].balls += 1;
                    }
                })
                .on('end', () => {
                    // Calculate and find the bowler with the best economy in Super Overs
                    let bestEconomyBowler;
                    let bestEconomy = Infinity;

                    Object.keys(superOverBowlers).forEach((bowler) => {
                        const runs = superOverBowlers[bowler].runs;
                        const balls = superOverBowlers[bowler].balls;
                        const economy = (runs / balls) * 6; // Economy rate formula

                        if (economy < bestEconomy) {
                            bestEconomy = economy;
                            bestEconomyBowler = bowler;
                        }
                    });

                    // Write the result to bestEconomyBowlerInSuperOver.json
                    fs.writeFileSync('../public/output/9-bowlerBestEconomyInSuperOvers.json', JSON.stringify({ bowler: bestEconomyBowler, economy: bestEconomy.toFixed(2) }, null, 2));
                    console.log('Bowler with the best economy in Super Overs calculated and saved to bestEconomyBowlerInSuperOver.json.');
                });
        });
}

module.exports = findBestEconomyInSuperOvers;
