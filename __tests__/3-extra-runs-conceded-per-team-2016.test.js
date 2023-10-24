const { default: expect } = require('expect');
const calculateExtraRunsConcededIn2016 = require('../src/server/3-extra-runs-conceded-per-team-2016.js');

const matchesTest = [
  {
    id: 2,
    season: '2017',
    venue: 'Maharashtra Cricket Association Stadium',
    team1: 'Sunrisers Hyderabad',
    team2: 'Royal Challengers Bangalore',
  },
  {
    id: 588,
    season: '2016',
    venue: 'Eden Gardens',
    team1: 'Royal Challengers Bangalore',
    team2: 'Delhi Daredevils',
  },
  {
    id: 589,
    season: '2016',
    venue: 'Sawai Mansingh Stadium',
    team1: 'Mumbai Indians',
    team2: 'Sunrisers Hyderabad',
  },
  {
    id: 96,
    season: '2016',
    venue: 'Eden Gardens',
    team1: 'Chennai Super Kings',
    team2: 'Mumbai Indians',
  },
  {
    id: 97,
    season: '2016',
    venue: 'Maharastra Cricket Association Stadium',
    team1: 'Rajasthan Royals',
    team2: 'Kings XI Punjab',
  },
];

const deliveriesTest = [
  {
    match_id: 588,
    extra_runs: '1',
    bowling_team: 'Royal Challengers Bangalore',
  },
  {
    match_id: 588,
    extra_runs: '4',
    bowling_team: 'Royal Challengers Bangalore',
  },
  { match_id: 588, extra_runs: '2', bowling_team: 'Delhi Daredevils' },
  { match_id: 589, extra_runs: '1', bowling_team: 'Mumbai Indians' },
  { match_id: 96, extra_runs: '2', bowling_team: 'Mumbai Indians' },
  { match_id: 96, extra_runs: '3', bowling_team: 'Chennai Super Kings' },
  { match_id: 97, extra_runs: '0', bowling_team: 'Rajasthan Royals' },
  { match_id: 97, extra_runs: '1', bowling_team: 'Kings XI Punjab' },
];

const expected = {
  'Chennai Super Kings': 3,
  'Mumbai Indians': 3,
  'Delhi Daredevils': 2,
  'Rajasthan Royals': 0,
  'Kings XI Punjab': 1,
  'Royal Challengers Bangalore': 5,
};

test('Returns the extra runs per team in 2016', () => {
  expect(calculateExtraRunsConcededIn2016(matchesTest, deliveriesTest)).toEqual(
    expected,
  );
});
