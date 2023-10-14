const fs = require('fs');
const csv = require('csv-parser');

function calculateMatchesWonPerTeamPerYear(matchesFilePath) {
    let matchesWonPerTeamPerYear = {};

    // Read matches CSV file and calculate matches won per team per year
    fs.createReadStream(matchesFilePath)
        .pipe(csv())
        .on('data', (row) => {
            const year = row.season;
            const winner = row.winner;

            if (matchesWonPerTeamPerYear[year]) {
                if (matchesWonPerTeamPerYear[year][winner]) {
                    matchesWonPerTeamPerYear[year][winner] += 1;
                } else {
                    matchesWonPerTeamPerYear[year][winner] = 1;
                }
            } else {
                matchesWonPerTeamPerYear[year] = {
                    [winner]: 1
                };
                // matchesWonPerTeamPerYear[year][winner] = 1;
            }
        })
        .on('end', () => {
            fs.writeFileSync('../public/output/2-matchesWonPerTeamPerYear.json', JSON.stringify(matchesWonPerTeamPerYear, null, 2));
            console.log('Matches won per team per year data calculated and saved to matchesWonPerTeamPerYear.json.');
        });
}

module.exports = calculateMatchesWonPerTeamPerYear;
