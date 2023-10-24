const { default: expect } = require('expect');
const calculateMostDismissedPlayer = require('../src/server/8-highest-no-a-player-dismissed-by-another-player.js');

const deliveriesTest = [
  {
    player_dismissed: 'MS Dhoni',
    bowler: 'Z Khan',
  },
  {
    player_dismissed: 'S Raina',
    bowler: 'R Khan',
  },
  {
    player_dismissed: 'V Kohli',
    bowler: 'A Zampa',
  },
  {
    player_dismissed: 'K Williamson',
    bowler: 'Y Chahal',
  },
  {
    player_dismissed: 'K Williamson',
    bowler: 'Y Chahal',
  },
  {
    player_dismissed: 'V Kohli',
    bowler: 'A Zampa',
  },
  {
    player_dismissed: 'S Watson',
    bowler: 'B Kumar',
  },
  {
    player_dismissed: 'V Kohli',
    bowler: 'A Zampa',
  },
  {
    player_dismissed: 'MS Dhoni',
    bowler: 'Z Khan',
  },
];

const expected = {
  dismissedPlayer: 'V Kohli',
  wicketTaker: 'A Zampa',
  dismissals: 3,
};

test('Return the most dismissed player and the wicket taker', () => {
  expect(calculateMostDismissedPlayer(deliveriesTest)).toEqual(expected);
});
