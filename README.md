# JS-IPL-DATA-PROJECT
This project is a JavaScript project that analyzes IPL (Indian Premier League) data from csv files to calculate various statistics. It performs various tasks :  
1. Number of matches played per year for all the years in IPL.
2. Number of matches won per team per year in IPL.
3. Extra runs conceded per team in the year 2016
4. Top 10 economical bowlers in the year 2015
5. Find the number of times each team won the toss and also won the match
6. Find a player who has won the highest number of *Player of the Match* awards for each season
7. Find the strike rate of a batsman for each season
8. Find the highest number of times one player has been dismissed by another player
9. Find the bowler with the best economy in super overs

## Directory Structure
```
__test__ /
    1-matches-per-year.test.js
    ...
src/
    server/
        1-matches-per-year.js
        2-matches-won-per-team-per-year.js
        ...
    public/
        output/
            matchesPerYear.json
            ...
        index.js
    data/
        matches.csv
        deliveries.csv
package.json
package-lock.json
.gitignore
```

## Getting Started  

**Clone the repo from GitHub**  
```bash
https://github.com/Rajkumarsahu-xyz/js-ipl-data-project.git
```

**cd to the js-ipl-data-project directory**
```bash
cd js-ipl-data-project
```

**Install npm packages and modules**
```bash
npm install
```
To install and configure ESLint, Husky and Prettier, follow this [link](https://dev.to/ruppysuppy/automatically-format-your-code-on-git-commit-using-husky-eslint-prettier-in-9-minutes-45eg).

**Usage**
```bash
cd src/public
node index.js
```
This will run all the 9 files at **server** directory and store the results in the ```.json``` files at the **public/output** directory.

**Testing**  
Run ```npm test``` to check if all the test cases are passed. You can also give your test cases at ```.test.js``` files in **__test__** directory. This is implemented using ```jest```.
