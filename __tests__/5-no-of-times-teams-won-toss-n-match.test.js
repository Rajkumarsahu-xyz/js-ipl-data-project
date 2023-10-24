const { default: expect } = require('expect');
const calculateNoOfTimesTeamsWonTossandMatch = require('../src/server/5-no-of-times-teams-won-toss-n-match.js');

const matchesTest = [
  {
    id: 2,
    season: 2017,
    venue: 'Maharashtra Cricket Association Stadium',
    winner: 'Rising Pune Supergiant',
    toss_winner: 'Rising Pune Supergiant',
  },
  {
    id: 3,
    season: 2017,
    venue: 'Saurashtra Cricket Association Stadium',
    winner: 'Kolkata Knight Riders',
    toss_winner: 'Gujrat Titans',
  },
  {
    id: 14,
    season: 2017,
    venue: 'Eden Gardens',
    winner: 'Kolkata Knight Riders',
    toss_winner: 'Kolkata Knight Riders',
  },
  {
    id: 93,
    season: 2008,
    venue: 'Sawai Mansingh Stadium',
    winner: 'Kolkata Knight Riders',
    toss_winner: 'Rajasthan Royals',
  },
  {
    id: 96,
    season: 2008,
    venue: 'Eden Gardens',
    winner: 'Rising Pune Supergiant',
    toss_winner: 'Rising Pune Supergiant',
  },
  {
    id: 97,
    season: 2008,
    venue: 'Maharastra Cricket Association Stadium',
    winner: 'Mumbai Indians',
    toss_winner: 'Rising Pune Supergiant',
  },
  {
    id: 308,
    season: 2012,
    venue: 'MA Chidambaram Stadium, Chepauk',
    winner: 'Mumbai Indians',
    toss_winner: 'Mumbai Indians',
  },
  {
    id: 314,
    season: 2012,
    venue: 'Sawai Mansingh Stadium',
    winner: 'Rajasthan Royals',
    toss_winner: 'Rajasthan Royals',
  },
  {
    id: 561,
    season: 2015,
    venue: 'Shaheed Veer Narayan Singh International Stadium',
    winner: 'Chennai Super Kings',
    toss_winner: 'Chennai Super Kings',
  },
];

const expected = {
  'Rising Pune Supergiant': 2,
  'Kolkata Knight Riders': 1,
  'Mumbai Indians': 1,
  'Chennai Super Kings': 1,
  'Rajasthan Royals': 1,
};

test('Returns the number of times teams won toss as well as match', () => {
  expect(calculateNoOfTimesTeamsWonTossandMatch(matchesTest)).toEqual(expected);
});
