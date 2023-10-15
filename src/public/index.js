
// Number of matches played per year for all the years in IPL.
const calculateMatchesPerYear = require('../server/1-matches-per-year');
calculateMatchesPerYear('../data/matches.csv');


// Number of matches won per team per year in IPL.
const calculateMatchesWonPerTeamPerYear = require('../server/2-matches-won-per-team-per-year');
calculateMatchesWonPerTeamPerYear('../data/matches.csv');


// Extra runs conceded per team in the year 2016
const calculateExtraRunsPerTeam2016 = require('../server/3-extra-runs-conceded-per-team-2016');
calculateExtraRunsPerTeam2016('../data/matches.csv', '../data/deliveries.csv');


// Top 10 economical bowlers in the year 2015
const calculateTopEconomicalBowlersIn2015 = require('../server/4-top-10-economical-bowlers-2015');
calculateTopEconomicalBowlersIn2015('../data/matches.csv', '../data/deliveries.csv');


// Find the number of times each team won the toss and also won the match
const calculateNoOfTimesTeamsWonTossandMatch = require('../server/5-no-of-times-teams-won-toss-n-match');
calculateNoOfTimesTeamsWonTossandMatch('../data/matches.csv');


// Find a player who has won the highest number of Player of the Match awards for each season
const calculateHighestNoOfPOTMEachSsn = require('../server/6-highest-no-of-POTM-each-ssn');
calculateHighestNoOfPOTMEachSsn('../data/matches.csv');


// Find the strike rate of a batsman for each season
// const getStrikeRateBatsman = require('../server/7-striike-rate-of-a-batsman-per-ssn');
// // Call the function with the path to matches.csv
// getStrikeRateBatsman('../data/deliveries.csv');


// Find the highest number of times one player has been dismissed by another player
const findMostDismissedPlayers = require('../server/8-highest-no-a-player-dismissed-by-another-player');
findMostDismissedPlayers('../data/deliveries.csv');


// Find the bowler with the best economy in super overs
const findBestEconomyInSuperOvers = require('../server/9-bowler-best-economy-in-super-overs');
findBestEconomyInSuperOvers('../data/deliveries.csv');
