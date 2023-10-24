const { default: expect } = require('expect');
const calculateMatchesWonPerTeamPerYear = require('../src/server/2-matches-won-per-team-per-year.js');

const matchesTest = [
  {
    id: 2,
    season: 2017,
    venue: 'Maharashtra Cricket Association Stadium',
    winner: 'Rising Pune Supergiant',
  },
  {
    id: 3,
    season: 2017,
    venue: 'Saurashtra Cricket Association Stadium',
    winner: 'Kolkata Knight Riders',
  },
  {
    id: 14,
    season: 2017,
    venue: 'Eden Gardens',
    winner: 'Kolkata Knight Riders',
  },
  {
    id: 93,
    season: 2008,
    venue: 'Sawai Mansingh Stadium',
    winner: 'Kolkata Knight Riders',
  },
  {
    id: 96,
    season: 2008,
    venue: 'Eden Gardens',
    winner: 'Kolkata Knight Riders',
  },
  {
    id: 97,
    season: 2008,
    venue: 'Maharastra Cricket Association Stadium',
    winner: 'Mumbai Indians',
  },
  {
    id: 308,
    season: 2012,
    venue: 'MA Chidambaram Stadium, Chepauk',
    winner: 'Mumbai Indians',
  },
  {
    id: 314,
    season: 2012,
    venue: 'Sawai Mansingh Stadium',
    winner: 'Mumbai Indians',
  },
  {
    id: 561,
    season: 2015,
    venue: 'Shaheed Veer Narayan Singh International Stadium',
    winner: 'Chennai Super Kings',
  },
];

const expected = {
  2008: {
    'Kolkata Knight Riders': 2,
    'Mumbai Indians': 1,
  },
  2012: {
    'Mumbai Indians': 2,
  },
  2015: {
    'Chennai Super Kings': 1,
  },
  2017: {
    'Kolkata Knight Riders': 2,
    'Rising Pune Supergiant': 1,
  },
};

test('Returns the number of matches won per team per year', () => {
  expect(calculateMatchesWonPerTeamPerYear(matchesTest)).toEqual(expected);
});
