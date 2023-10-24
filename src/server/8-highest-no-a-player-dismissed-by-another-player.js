function calculateMostDismissedPlayers(deliveries) {
  const dismissalsCount = {};

  deliveries.forEach((delivery) => {
    const bowler = delivery.bowler;
    const dismissedBatsman = delivery.player_dismissed;

    if (dismissedBatsman && bowler) {
      const key = `${bowler}_${dismissedBatsman}`;
      dismissalsCount[key] = (dismissalsCount[key] || 0) + 1;
    }
  });
  let maxDismissals = 0;
  let maxDismissalsPair = null;

  Object.keys(dismissalsCount).forEach((pair) => {
    if (dismissalsCount[pair] > maxDismissals) {
      maxDismissals = dismissalsCount[pair];
      maxDismissalsPair = pair;
    }
  });

  const chars = maxDismissalsPair.split('_');
  let dismissedPlayer = chars[1];
  let wicketTaker = chars[0];

  const outputData = {
    dismissedPlayer: dismissedPlayer,
    wicketTaker: wicketTaker,
    dismissals: maxDismissals,
  };

  return outputData;
}

module.exports = calculateMostDismissedPlayers;
