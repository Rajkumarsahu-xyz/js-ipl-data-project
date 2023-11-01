function calculateMatchesWonPerTeamPerYear(matches) {
    const matchesWonPerTeamPerYear = matches.reduce((result, match) => {
      const year = match.season;
      const winner = match.winner;
  
      result[year] = result[year] || {};
      result[year][winner] = (result[year][winner] || 0) + 1;
  
      return result;
    }, {});

  return matchesWonPerTeamPerYear;
}

module.exports = calculateMatchesWonPerTeamPerYear;
