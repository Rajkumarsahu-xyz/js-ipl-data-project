function calculateBestEconomyInSuperOvers(deliveries) {
  const superOverBowlerEconomy = {};

  deliveries.forEach((delivery) => {
    const isSuperOver = delivery.is_super_over === '1';
    if (isSuperOver) {
      const bowler = delivery.bowler;
      const totalRuns = parseInt(delivery.total_runs, 10);
      const extras = parseInt(delivery.extra_runs, 10);
      const wide = parseInt(delivery.wide_runs, 10);
      const noball = parseInt(delivery.noball_runs, 10);
      const runsGiven = totalRuns - extras + wide + noball;
      let ballsBowled = 0;
      if (!wide && !noball) {
        ballsBowled = 1;
      }

      if (superOverBowlerEconomy[bowler]) {
        superOverBowlerEconomy[bowler].runs += runsGiven;
        superOverBowlerEconomy[bowler].balls += ballsBowled;
      } else {
        superOverBowlerEconomy[bowler] = {
          runs: runsGiven,
          balls: ballsBowled,
        };
      }
    }
  });
  let bestEconomy = Number.MAX_SAFE_INTEGER;
  let bestEconomyBowler = null;

  Object.keys(superOverBowlerEconomy).forEach((bowler) => {
    const { runs, balls } = superOverBowlerEconomy[bowler];
    const economy = runs / (balls / 6);
    if (economy < bestEconomy) {
      bestEconomy = economy;
      bestEconomyBowler = bowler;
    }
  });

  const outputData = {
    bowler: bestEconomyBowler,
    economy: bestEconomy.toFixed(2),
  };

  return outputData;
}

module.exports = calculateBestEconomyInSuperOvers;
