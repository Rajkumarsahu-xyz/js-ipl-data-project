const { default: expect } = require('expect');
const calculateBestEconomyInSuperOvers = require('../src/server/9-bowler-best-economy-in-super-overs.js');

const deliveriesTest = [
  {
    is_super_over: '1',
    bowler: 'L Malinga',
    extra_runs: '0',
    noball_runs: '0',
    wide_runs: '0',
    total_runs: '2',
  },
  {
    is_super_over: '1',
    bowler: 'J Bumrah',
    extra_runs: '0',
    noball_runs: '0',
    wide_runs: '0',
    total_runs: '6',
  },
  {
    is_super_over: '1',
    bowler: 'L Malinga',
    extra_runs: '0',
    noball_runs: '0',
    wide_runs: '0',
    total_runs: '0',
  },
  {
    is_super_over: '1',
    bowler: 'J Bumrah',
    extra_runs: '0',
    noball_runs: '0',
    wide_runs: '0',
    total_runs: '1',
  },
  {
    is_super_over: '1',
    bowler: 'L Malinga',
    extra_runs: '0',
    noball_runs: '0',
    wide_runs: '0',
    total_runs: '4',
  },
];

const expected = {
  bowler: 'L Malinga',
  economy: '12.00',
};

test('Returns the bowler with the best economy in super over', () => {
  expect(calculateBestEconomyInSuperOvers(deliveriesTest)).toEqual(expected);
});
