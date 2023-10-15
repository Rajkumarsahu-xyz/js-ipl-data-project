const fs = require('fs');
const csv = require('csv-parser');

function calculateMatchesPerYear(matchesFilePath) {
    let matchesPerYear = {};
    fs.createReadStream(matchesFilePath)
        .pipe(csv())
        .on('data', (row) => {
            const year = row.season;
            if (matchesPerYear[year]) {
                matchesPerYear[year] += 1;
            } else {
                matchesPerYear[year] = 1;
            }
        })
        .on('end', () => {
            fs.writeFileSync('../public/output/1-matchesPerYear.json', JSON.stringify(matchesPerYear, null, 2));
            console.log('Matches per year data calculated and saved to matchesPerYear.json.');
        });
}

module.exports = calculateMatchesPerYear;
