const { default: expect } = require('expect');
const calculateMatchesPerYear = require('../src/server/1-matches-per-year.js');

const matchesTest = [
  { id: 2, season: 2017, venue: 'Maharashtra Cricket Association Stadium' },
  { id: 3, season: 2017, venue: 'Saurashtra Cricket Association Stadium' },
  { id: 93, season: 2008, venue: 'Sawai Mansingh Stadium' },
  { id: 96, season: 2008, venue: 'Eden Gardens' },
  { id: 97, season: 2008, venue: 'Maharastra Cricket Association Stadium' },
  { id: 308, season: 2012, venue: 'MA Chidambaram Stadium, Chepauk' },
  { id: 314, season: 2012, venue: 'Sawai Mansingh Stadium' },
  {
    id: 561,
    season: 2015,
    venue: 'Shaheed Veer Narayan Singh International Stadium',
  },
];

const expected = { 2008: 3, 2012: 2, 2015: 1, 2017: 2 };

test('Returns the number of matches per year', () => {
  expect(calculateMatchesPerYear(matchesTest)).toEqual(expected);
});
