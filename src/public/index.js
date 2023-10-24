const fs = require('fs');
const csv = require('csv-parser');

const calculateMatchesPerYear = require('../server/1-matches-per-year.js');
const calculateMatchesWonPerTeamPerYear = require('../server/2-matches-won-per-team-per-year.js');
const calculateExtraRunsConcededIn2016 = require('../server/3-extra-runs-conceded-per-team-2016.js');
const calculateTopEconomicalBowlersIn2015 = require('../server/4-top-10-economical-bowlers-2015.js');
const calculateNoOfTimesTeamsWonTossandMatch = require('../server/5-no-of-times-teams-won-toss-n-match.js');
const calculateHighestNoOfPOTMEachSsn = require('../server/6-highest-no-of-POTM-each-ssn.js');
const calculateStrikeRateForABatsman = require('../server/7-striike-rate-of-a-batsman-per-ssn.js');
const calculateMostDismissedPlayers = require('../server/8-highest-no-a-player-dismissed-by-another-player.js');
const calculateBestEconomyInSuperOvers = require('../server/9-bowler-best-economy-in-super-overs.js');

const matchFilePath = '../data/matches.csv';
const deliveriesFilePath = '../data/deliveries.csv';

const matches = [];
const deliveries = [];

fs.createReadStream(matchFilePath)
  .pipe(csv({}))
  .on('data', (data) => matches.push(data))
  .on('end', () => {
    // Problem 1: Find the number of matches per year.
    const matchesPerYear = calculateMatchesPerYear(matches);
    fs.writeFileSync(
      '../public/output/1-matchesPerYear.json',
      JSON.stringify(matchesPerYear, null, 2),
    );

    // Problem 2: Find the matches won per team per year.
    const matchesWonPerTeamPerYear = calculateMatchesWonPerTeamPerYear(matches);
    fs.writeFileSync(
      '../public/output/2-matchesWonPerTeamPerYear.json',
      JSON.stringify(matchesWonPerTeamPerYear, null, 2),
    );

    fs.createReadStream(deliveriesFilePath)
      .pipe(csv({}))
      .on('data', (data) => deliveries.push(data))
      .on('end', () => {
        // Problem 3: Find Extra runs conceded per team in the year 2016.
        const extraRunsPerTeam = calculateExtraRunsConcededIn2016(
          matches,
          deliveries,
        );
        fs.writeFileSync(
          '../public/output/3-extraRunsConcededPerTeam2016.json',
          JSON.stringify(extraRunsPerTeam, null, 2),
        );

        // Problem 4: Find the top ten economical bowlers in 2015.
        const top10EconomicalBowlers = calculateTopEconomicalBowlersIn2015(
          matches,
          deliveries,
        );
        fs.writeFileSync(
          '../public/output/4-top10EconomicalBowlers2015.json',
          JSON.stringify(top10EconomicalBowlers, null, 2),
        );

        // Problem 5: Find teams who won the toss and the match.
        const noOfTimesTeamsWonTossandMatch =
          calculateNoOfTimesTeamsWonTossandMatch(matches);
        fs.writeFileSync(
          '../public/output/5-noOfTimesTeamsWonToss&Match.json',
          JSON.stringify(noOfTimesTeamsWonTossandMatch, null, 2),
        );

        // Problem 6: Find the player with the most Player of the Match awards per season.
        const highestNoOfPOTMEachSsn = calculateHighestNoOfPOTMEachSsn(matches);
        fs.writeFileSync(
          '../public/output/6-highestNoOfPOTMEachSsn.json',
          JSON.stringify(highestNoOfPOTMEachSsn, null, 2),
        );

        // Problem 7: Find the strike rate of a specific batsman.
        const strikeRateForABatsman = calculateStrikeRateForABatsman(
          matches,
          deliveries,
          'MS Dhoni',
        );
        fs.writeFileSync(
          '../public/output/7-strikeRateOfABatsmanPerSsn.json',
          JSON.stringify(strikeRateForABatsman, null, 2),
        );

        // Problem 8: Find the highest number of times one player has been dismissed by another player.
        const mostDismissals = calculateMostDismissedPlayers(deliveries);
        fs.writeFileSync(
          '../public/output/8-highestNoOfTimesAPlayerDismissedByAnotherPlayer.json',
          JSON.stringify(mostDismissals, null, 2),
        );

        // Problem 9: Find the bowler with the best economy rate in Super Overs.
        const bowlerWithBestEconomySuperOver =
          calculateBestEconomyInSuperOvers(deliveries);
        fs.writeFileSync(
          '../public/output/9-bowlerBestEconomyInSuperOvers.json',
          JSON.stringify(bowlerWithBestEconomySuperOver, null, 2),
        );
      });
  });
