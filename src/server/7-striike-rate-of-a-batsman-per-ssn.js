function getStrikeRateBatsman(deliveriesFilePath) {
let batsmanStrikeRates = {};

fs.createReadStream(deliveriesFilePath)
    .pipe(csvParser())
    .on('data', row => {
        const batsman = row.batsman;
        const season = row.season;
        const runs = parseInt(row.batsman_runs);
        const balls = parseInt(row.batsman_runs) + parseInt(row.extras);

        if (batsman && season && balls > 0) {
            if (!batsmanStrikeRates[season]) {
                batsmanStrikeRates[season] = {};
            }

            if (!batsmanStrikeRates[season][batsman]) {
                batsmanStrikeRates[season][batsman] = { runs: 0, balls: 0 };
            }

            batsmanStrikeRates[season][batsman].runs += runs;
            batsmanStrikeRates[season][batsman].balls += balls;
        }
    })
    .on('end', () => {
        const highestStrikeRates = {};

        Object.keys(batsmanStrikeRates).forEach(season => {
            highestStrikeRates[season] = { batsman: '', strikeRate: 0 };

            Object.keys(batsmanStrikeRates[season]).forEach(batsman => {
                const { runs, balls } = batsmanStrikeRates[season][batsman];
                const strikeRate = (runs / balls) * 100;

                if (strikeRate > highestStrikeRates[season].strikeRate) {
                    highestStrikeRates[season] = { batsman, strikeRate };
                }
            });
        });

        fs.writeFileSync(outputFilePath, JSON.stringify(highestStrikeRates, null, 2));

        console.log('Highest strike rates by batsman for each season:');
        console.log(highestStrikeRates);
    });

}

module.exports = { getStrikeRateBatsman };