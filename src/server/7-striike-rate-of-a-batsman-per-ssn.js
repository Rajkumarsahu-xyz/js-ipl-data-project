function calculateStrikeRateForABatsman(matches, deliveries, batsmanName) {
  let batsmanData = {};
  let batsmanDeliveries = deliveries.filter(
    (delivery) => delivery.batsman == batsmanName,
  );

  batsmanDeliveries.forEach((delivery) => {
    const match = matches.find((match) => match.id == delivery.match_id);

    if (match) {
      const season = match.season;
      const runs = parseInt(delivery.batsman_runs);
      const isWideOrNoBall = delivery.wide_runs > 0 || delivery.noball_runs > 0;

      if (!batsmanData[season]) {
        batsmanData[season] = { runs: 0, balls: 0 };
      }

      batsmanData[season].runs += runs;
      if (!isWideOrNoBall) {
        batsmanData[season].balls++;
      }
    }
  });

  const strikeRateData = {};

  for (const season in batsmanData) {
    const runsMade = batsmanData[season].runs;
    const noOfBalls = batsmanData[season].balls;

    if (noOfBalls > 0) {
      const strikeRate = ((runsMade / noOfBalls) * 100).toFixed(2);
      strikeRateData[season] = strikeRate;
    } else {
      strikeRateData[season] = 'N/A';
    }
  }

  return strikeRateData;
}

module.exports = calculateStrikeRateForABatsman;
