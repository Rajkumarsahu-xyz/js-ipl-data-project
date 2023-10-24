function calculateExtraRunsConcededIn2016(matches, deliveries) {
  let extraRunsConceded = {};
  let matchesIn2016 = {};

  matches.forEach((match) => {
    if (match.season === '2016') {
      matchesIn2016[match.id] = { team1: match.team1, team2: match.team2 };
    }
  });

  deliveries.forEach((delivery) => {
    const matchId = delivery.match_id;
    const teams = matchesIn2016[matchId];
    const extras = parseInt(delivery.extra_runs, 10);

    if (teams && extras !== undefined) {
      if (extraRunsConceded[delivery.bowling_team]) {
        extraRunsConceded[delivery.bowling_team] += extras;
      } else {
        extraRunsConceded[delivery.bowling_team] = extras;
      }
    }
  });

  return extraRunsConceded;
}

module.exports = calculateExtraRunsConcededIn2016;
