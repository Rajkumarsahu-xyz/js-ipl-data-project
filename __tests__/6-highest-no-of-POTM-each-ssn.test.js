const { default: expect } = require('expect');
const calculateHighestNoOfPOTMEachSsn = require('../src/server/6-highest-no-of-POTM-each-ssn.js');

const matchesTest = [
  {
    id: 2,
    season: 2017,
    venue: 'Maharashtra Cricket Association Stadium',
    winner: 'Rising Pune Supergiant',
    player_of_match: 'SPD Smith',
  },
  {
    id: 3,
    season: 2017,
    venue: 'Saurashtra Cricket Association Stadium',
    winner: 'Kolkata Knight Riders',
    player_of_match: 'CA Lynn',
  },
  {
    id: 14,
    season: 2017,
    venue: 'Eden Gardens',
    winner: 'Kolkata Knight Riders',
    player_of_match: 'CA Lynn',
  },
  {
    id: 93,
    season: 2008,
    venue: 'Sawai Mansingh Stadium',
    winner: 'Rajasthan Royals',
    player_of_match: 'SE Marsh',
  },
  {
    id: 96,
    season: 2008,
    venue: 'Eden Gardens',
    winner: 'Rising Pune Supergiant',
    player_of_match: 'Ben Stokes',
  },
  {
    id: 97,
    season: 2008,
    venue: 'Maharastra Cricket Association Stadium',
    winner: 'Mumbai Indians',
    player_of_match: 'SE Marsh',
  },
  {
    id: 308,
    season: 2012,
    venue: 'MA Chidambaram Stadium, Chepauk',
    winner: 'Mumbai Indians',
    player_of_match: 'CH Gayle',
  },
  {
    id: 314,
    season: 2012,
    venue: 'Sawai Mansingh Stadium',
    winner: 'Rajasthan Royals',
    player_of_match: 'MS Dhoni',
  },
];

const expected = {
  2008: [['SE Marsh', 2]],
  2012: [['CH Gayle', 1]],
  2017: [['CA Lynn', 2]],
};

test('Returns the highest number of player of the matches won per season', () => {
  expect(calculateHighestNoOfPOTMEachSsn(matchesTest)).toEqual(expected);
});
