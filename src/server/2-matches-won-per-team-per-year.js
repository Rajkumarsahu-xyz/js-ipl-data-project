function calculateMatchesWonPerTeamPerYear(matches) {
  const matchesWonPerTeamPerYear = {};
  matches.forEach((match) => {
    const year = match.season;
    const winner = match.winner;

    if (matchesWonPerTeamPerYear[year]) {
      if (matchesWonPerTeamPerYear[year][winner]) {
        matchesWonPerTeamPerYear[year][winner] += 1;
      } else {
        matchesWonPerTeamPerYear[year][winner] = 1;
      }
    } else {
      matchesWonPerTeamPerYear[year] = {
        [winner]: 1,
      };
    }
  });

  return matchesWonPerTeamPerYear;
}

module.exports = calculateMatchesWonPerTeamPerYear;
