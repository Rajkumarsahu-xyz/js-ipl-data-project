// // console.log("yes");
// const fs = require("fs");
// const { parse } = require("csv-parse");

// const matches = [];
// const deliveries = [];

// // const path = "/home/raj/js-ipl-data-project/src/server/1-matches-per-year.js";

// function main() {

//   fs.createReadStream("../data/matches.csv")
//     .pipe(parse({delimiter: ",", from_line: 2}))
//     .on("data", (row) => {
//       matches.push(row);
//       // console.log(row);
//     })
//     .on("end", () => {
//       // fs.createReadStream("../data/deliveries.csv")
//       //   .pipe(parse({delimiter: ",", from_line: 2}))
//       //   .on("data", (data) => deliveries.push(data))
//       //   .on("end", () => {
//       //     console.log("finished")
//       //     // fs.writmatcheseFile(
//       //     //   `../public/output/${path}.json`,
//       //     //   JSON.stringify(matchesPerYear(matches)),
//       //     //   (err) => {
//       //     //     if (err) throw err;
//       //     //     console.log("The file has been saved!");
//       //     //   }
//       //     // );
//       //   });
//     });
//     console.log(matches);
// }
// main();
// // console.log(matches);

// module.exports = { matches, deliveries };



const csv = require('csv-parser');
const calculateMatchesPerYear = require('../server/1-matches-per-year');

// Call the function with the path to matches.csv
calculateMatchesPerYear('../data/matches.csv');


const calculateMatchesWonPerTeamPerYear = require('../server/2-matches-won-per-team-per-year');

// Call the function with the path to matches.csv
calculateMatchesWonPerTeamPerYear('../data/matches.csv');

const calculateExtraRunsPerTeam2016 = require('../server/3-extra-runs-conceded-per-team-2016');

// Call the function with the path to matches.csv
calculateExtraRunsPerTeam2016('../data/matches.csv', '../data/deliveries.csv');

const calculateTopEconomicalBowlersIn2015 = require('../server/4-top-10-economical-bowlers-2015');

// Call the function with the path to matches.csv
calculateTopEconomicalBowlersIn2015('../data/matches.csv', '../data/deliveries.csv');

const calculateNoOfTimesTeamsWonTossandMatch = require('../server/5-no-of-times-teams-won-toss-n-match');

// Call the function with the path to matches.csv
calculateNoOfTimesTeamsWonTossandMatch('../data/matches.csv');


const calculateHighestNoOfPOTMEachSsn = require('../server/6-highest-no-of-POTM-each-ssn');

// Call the function with the path to matches.csv
calculateHighestNoOfPOTMEachSsn('../data/matches.csv');

const calculateBatsmanStrikeRatePerSeason = require('../server/7-striike-rate-of-a-batsman-per-ssn');

// Call the function with the path to matches.csv
calculateBatsmanStrikeRatePerSeason('../data/deliveries.csv');

const findMostDismissedPlayers = require('../server/8-highest-no-a-player-dismissed-by-another-player');

// Call the function with the path to matches.csv
findMostDismissedPlayers('../data/deliveries.csv');


const findBestEconomyInSuperOvers = require('../server/9-bowler-best-economy-in-super-overs');

findBestEconomyInSuperOvers('../data/matches.csv', '../data/deliveries.csv');
