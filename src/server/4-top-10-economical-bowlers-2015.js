function calculateTopEconomicalBowlersIn2015(matches, deliveries) {
  let totalRunsPerBowler = {};
  let totalBallsPerBowler = {};

  let matchesIn2015 = {};

  matches.forEach((match) => {
    if (match.season === '2015') {
      matchesIn2015[match.id] = true;
    }
  });

  deliveries.forEach((delivery) => {
    const matchId = delivery.match_id;
    if (matchesIn2015[matchId]) {
      const bowler = delivery.bowler;
      const extras = parseInt(delivery.extra_runs, 10);
      const wide = parseInt(delivery.wide_runs, 10);
      const noball = parseInt(delivery.noball_runs, 10);
      const totalRuns = parseInt(delivery.total_runs, 10) - extras + wide + noball;
      const isWide = delivery.wide_runs !== '0';
      const isNoBall = delivery.noball_runs !== '0';

      if (!isWide && !isNoBall) {
        totalBallsPerBowler[bowler] = (totalBallsPerBowler[bowler] || 0) + 1;
      }

      totalRunsPerBowler[bowler] =
        (totalRunsPerBowler[bowler] || 0) + totalRuns;
    }
  });

  let economyRates = {};
  Object.keys(totalRunsPerBowler).forEach((bowler) => {
    const runs = totalRunsPerBowler[bowler];
    const balls = totalBallsPerBowler[bowler];
    const economy = (runs / balls) * 6;
    economyRates[bowler] = economy.toFixed(2);
  });

  const top10Bowlers = Object.entries(economyRates)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 10);

  return top10Bowlers;
}

module.exports = calculateTopEconomicalBowlersIn2015;
