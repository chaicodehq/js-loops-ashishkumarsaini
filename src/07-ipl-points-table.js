/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  if (!Array.isArray(matches) || matches.length <= 0) {
    return []
  }

  const teamsData = matches.reduce((acc, { team1, team2, result, winner }) => {
    const isMatchTie = result === 'tie';
    const isNoResult = result === 'no_result';
    const isTeam1Won = winner === team1;
    const isTeam2Won = winner === team2;

    const team1CurrentData = acc[team1];
    const currentMatchTeam1Values = {
      team: team1,
      played: 1,
      won: isTeam1Won ? 1 : 0,
      lost: isTeam2Won ? 1 : 0,
      tied: isMatchTie ? 1 : 0,
      noResult: isNoResult ? 1 : 0,
      points: isTeam1Won ? 2 : isMatchTie || isNoResult ? 1 : 0
    }

    if (team1CurrentData) {
      acc[team1] = {
        ...team1CurrentData,
        played: team1CurrentData.played + currentMatchTeam1Values.played,
        won: team1CurrentData.won + currentMatchTeam1Values.won,
        lost: team1CurrentData.lost + currentMatchTeam1Values.lost,
        tied: team1CurrentData.tied + currentMatchTeam1Values.tied,
        noResult: team1CurrentData.noResult + currentMatchTeam1Values.noResult,
        points: team1CurrentData.points + currentMatchTeam1Values.points,
      }

    } else {
      acc[team1] = currentMatchTeam1Values
    }

    const team2CurrentData = acc[team2];
    const currentMatchTeam2Values = {
      team: team2,
      played: 1,
      won: isTeam2Won ? 1 : 0,
      lost: isTeam1Won ? 1 : 0,
      tied: isMatchTie ? 1 : 0,
      noResult: isNoResult ? 1 : 0,
      points: isTeam2Won ? 2 : isMatchTie || isNoResult ? 1 : 0
    }

    if (team2CurrentData) {
      acc[team2] = {
        ...team2CurrentData,
        played: team2CurrentData.played + currentMatchTeam2Values.played,
        won: team2CurrentData.won + currentMatchTeam2Values.won,
        lost: team2CurrentData.lost + currentMatchTeam2Values.lost,
        tied: team2CurrentData.tied + currentMatchTeam2Values.tied,
        noResult: team2CurrentData.noResult + currentMatchTeam2Values.noResult,
        points: team2CurrentData.points + currentMatchTeam2Values.points,
      }
    } else {
      acc[team2] = currentMatchTeam2Values
    }

    return acc;
  }, {})

  const teamsDataArr = Object.values(teamsData);


  return teamsDataArr.sort((team1, team2) => {
    if (team1.points === team2.points) {
      return team1.team.localeCompare(team2.team);
    }

    return team2.points - team1.points;
  });
}
