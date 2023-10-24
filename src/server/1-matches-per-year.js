function calculateMatchesPerYear(matches) {
  const matchesPerYear = {};
  matches.forEach((match) => {
    const year = match.season;

    if (matchesPerYear[year]) {
      matchesPerYear[year] += 1;
    } else {
      matchesPerYear[year] = 1;
    }
  });

  // console.log("Running problem 1");
  return matchesPerYear;
}

module.exports = calculateMatchesPerYear;
