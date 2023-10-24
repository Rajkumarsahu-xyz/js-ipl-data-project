function calculateNoOfTimesTeamsWonTossandMatch(matches) {
  let noOfTimesTeamsWonTossandMatch = {};
  matches.forEach((match) => {
    const tossWinner = match.toss_winner;
    const matchWinner = match.winner;

    if (tossWinner === matchWinner) {
      if (noOfTimesTeamsWonTossandMatch[matchWinner]) {
        noOfTimesTeamsWonTossandMatch[matchWinner] += 1;
      } else {
        noOfTimesTeamsWonTossandMatch[matchWinner] = 1;
      }
    }
  });

  return noOfTimesTeamsWonTossandMatch;
}

module.exports = calculateNoOfTimesTeamsWonTossandMatch;
