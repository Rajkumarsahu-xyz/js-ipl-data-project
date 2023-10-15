const fs = require('fs');
const csv = require('csv-parser');

function calculateNoOfTimesTeamsWonTossandMatch(matchesFilePath) {
    let noOfTimesTeamsWonTossandMatch = {};

    fs.createReadStream(matchesFilePath)
        .pipe(csv())
        .on('data', (row) => {
            const toss = row.toss_winner;
            const win = row.winner;

            if(toss === win) {
                if (noOfTimesTeamsWonTossandMatch[win]) {
                    noOfTimesTeamsWonTossandMatch[win] += 1;
                } else {
                    noOfTimesTeamsWonTossandMatch[win] = 1;
                }
            }

        })
        .on('end', () => {
            fs.writeFileSync('../public/output/5-noOfTimesTeamsWonToss&Match.json', JSON.stringify(noOfTimesTeamsWonTossandMatch, null, 2));
            console.log('No of times teams won toss as well as match data calculated and saved to matchesPerYear.json.');
        });
}

module.exports = calculateNoOfTimesTeamsWonTossandMatch;