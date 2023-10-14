const fs = require('fs');
const csv = require('csv-parser');

function calculateBatsmanStrikeRatePerSeason(deliveriesFilePath) {
    let batsmanStrikeRatePerSeason = {};

    // Read deliveries CSV file and calculate batsman strike rate per season
    fs.createReadStream(deliveriesFilePath)
        .pipe(csv())
        .on('data', (row) => {
            const season = row.season;
            const batsman = row.batsman;
            const runs = parseInt(row.batsman_runs, 10);
            const balls = parseInt(row.ball, 10); // Each row represents a ball

            if (balls > 0) {
                if (!batsmanStrikeRatePerSeason[season]) {
                    batsmanStrikeRatePerSeason[season] = {};
                }

                if (batsmanStrikeRatePerSeason[season][batsman]) {
                    batsmanStrikeRatePerSeason[season][batsman].runs += runs;
                    batsmanStrikeRatePerSeason[season][batsman].balls += 1;
                } else {
                    batsmanStrikeRatePerSeason[season][batsman] = {
                        runs: runs,
                        balls: 1
                    };
                }
            }
        })
        .on('end', () => {
            // Calculate and store the strike rate for each batsman in each season
            let result = {};
            Object.keys(batsmanStrikeRatePerSeason).forEach((season) => {
                result[season] = {};
                const batsmen = batsmanStrikeRatePerSeason[season];
                Object.keys(batsmen).forEach((batsman) => {
                    const runs = batsmen[batsman].runs;
                    const balls = batsmen[batsman].balls;
                    const strikeRate = (runs / balls) * 100;
                    result[season][batsman] = strikeRate.toFixed(2);
                });
            });

            // Write the result to batsmanStrikeRatePerSeason.json
            fs.writeFileSync('../public/output/7-strikeRateOfABatsmanPerSsn.json', JSON.stringify(result, null, 4));
            console.log('Batsman strike rate per season calculated and saved to batsmanStrikeRatePerSeason.json.');
        });
}

module.exports = calculateBatsmanStrikeRatePerSeason;
