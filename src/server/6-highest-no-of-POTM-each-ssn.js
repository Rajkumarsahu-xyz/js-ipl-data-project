function calculateHighestNoOfPOTMEachSsn(matches) {
  let highestNoOfPOTMEachSsn = {};
  let potm = {};

  matches.forEach((match) => {
    const year = match.season;
    const player = match.player_of_match;

    if (potm[year]) {
      if (potm[year][player]) {
        potm[year][player] += 1;
      } else {
        potm[year][player] = 1;
      }
    } else {
      potm[year] = {
        [player]: 1,
      };
    }
  });

  Object.keys(potm).forEach((year) => {
    const players = potm[year];
    const topPlayer = Object.entries(players)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 1);
    highestNoOfPOTMEachSsn[year] = topPlayer;
  });

  return highestNoOfPOTMEachSsn;
}

module.exports = calculateHighestNoOfPOTMEachSsn;
