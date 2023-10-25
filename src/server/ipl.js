document.addEventListener('DOMContentLoaded', () => {
  fetch('../public/output/1-matchesPerYear.json')
    .then((response) => response.json())
    .then((data) => {
      Highcharts.chart('problem1_chart', {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Number of Matches Played per Year',
        },
        xAxis: {
          categories: Object.keys(data),
          title: {
            text: 'Year',
          },
        },
        yAxis: {
          title: {
            text: 'Number of Matches',
          },
        },
        series: [
          {
            name: 'Matches',
            data: Object.values(data),
          },
        ],
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('../public/output/2-matchesWonPerTeamPerYear.json')
    .then((response) => response.json())
    .then((data) => {
      const years = Object.keys(data);
      const teams = Array.from(
        new Set(Object.keys(data).flatMap((year) => Object.keys(data[year]))),
      );

      const seriesData = teams.map((team) => ({
        name: team,
        data: years.map((year) => data[year][team] || 0),
      }));

      Highcharts.chart('problem2_chart', {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Number of Matches Won Team Per Year',
        },
        xAxis: {
          categories: years,
          title: {
            text: 'Year',
          },
        },
        yAxis: {
          title: {
            text: 'Number of Matches Won',
          },
        },
        series: seriesData,
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('../public/output/3-extraRunsConcededPerTeam2016.json')
    .then((response) => response.json())
    .then((data) => {
      Highcharts.chart('problem3_chart', {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Extra Runs Conceded per Team in the year 2016',
        },
        xAxis: {
          categories: Object.keys(data),
          title: {
            text: 'Teams',
          },
        },
        yAxis: {
          title: {
            text: 'Extra Runs',
          },
        },
        series: [
          {
            name: 'Extras',
            data: Object.values(data),
          },
        ],
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('../public/output/4-top10EconomicalBowlers2015.json')
    .then((response) => response.json())
    .then((data) => {
      const bowlerNames = data.map((entry) => entry[0]);
      const economyRates = data.map((entry) => parseFloat(entry[1]));
      Highcharts.chart('problem4_chart', {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Top 10 economical bowlers in the year 2015',
        },
        xAxis: {
          categories: bowlerNames,
          title: {
            text: 'Bowlers',
          },
        },
        yAxis: {
          title: {
            text: 'Economy',
          },
        },
        series: [
          {
            name: 'Economy',
            data: economyRates,
          },
        ],
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('../public/output/5-noOfTimesTeamsWonToss&Match.json')
    .then((response) => response.json())
    .then((data) => {
      Highcharts.chart('problem5_chart', {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Number of times each team won the toss and also won the match',
        },
        xAxis: {
          categories: Object.keys(data),
          title: {
            text: 'Teams',
          },
        },
        yAxis: {
          title: {
            text: 'Toss & Match won',
          },
        },
        series: [
          {
            name: 'Toss & Match won',
            data: Object.values(data),
          },
        ],
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('../public/output/6-highestNoOfPOTMEachSsn.json')
    .then((response) => response.json())
    .then((data) => {
      const years = Object.keys(data);
      const playerNames = years.map((year) => data[year][0][0]);
      const potms = years.map((year) => data[year][0][1]);
      const year_Player = years.map(
        (year, index) => `${year} - ${playerNames[index]}`,
      );

      Highcharts.chart('problem6_chart', {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Highest number of Player of the Match awards for each season',
        },
        xAxis: {
          categories: year_Player,
          title: {
            text: 'Years',
          },
        },
        yAxis: {
          title: {
            text: 'Player of the Match Awards',
          },
        },
        tooltip: {
          formatter: function () {
            return `<strong>${playerNames[this.point.index]}</strong>: ${
              this.y
            }`;
          },
        },
        series: [
          {
            name: 'Player of the Match Awards',
            data: potms,
          },
        ],
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('../public/output/7-strikeRateOfABatsmanPerSsn.json')
    .then((response) => response.json())
    .then((data) => {
      const years = Object.keys(data);
      const strikeRates = years.map((year) => parseFloat(data[year]));
      Highcharts.chart('problem7_chart', {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Strike Rate of a Batsman for each season',
        },
        xAxis: {
          categories: Object.keys(data),
          title: {
            text: 'Year',
          },
        },
        yAxis: {
          title: {
            text: 'Strike Rate',
          },
        },
        series: [
          {
            name: 'Strike Rate',
            data: strikeRates,
          },
        ],
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  fetch(
    '../public/output/8-highestNoOfTimesAPlayerDismissedByAnotherPlayer.json',
  )
    .then((response) => response.json())
    .then((data) => {
      Highcharts.chart('problem8_chart', {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Highest number of times one player has been dismissed by another player',
        },
        xAxis: {
          categories: [
            `${data.dismissedPlayer}(Dismissed) -- ${data.wicketTaker} (Wicket Taker)`,
          ],
          title: {
            text: 'Dismissed Player & Wicket Taker',
          },
        },
        yAxis: {
          title: {
            text: 'Number of Dismissals',
          },
        },
        series: [
          {
            name: 'Dismissals',
            data: [data.dismissals],
          },
        ],
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('../public/output/9-bowlerBestEconomyInSuperOvers.json')
    .then((response) => response.json())
    .then((data) => {
      Highcharts.chart('problem9_chart', {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Bowler with the best economy in Super overs',
        },
        xAxis: {
          categories: [data.bowler],
          title: {
            text: 'Bowler Name',
          },
        },
        yAxis: {
          title: {
            text: 'Economy in Super Overs',
          },
        },
        series: [
          {
            name: 'Economy',
            data: [parseFloat(data.economy)],
          },
        ],
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
});
