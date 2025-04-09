export default function StandingsTable({ standings }) {
    if (!standings || standings.length === 0) {
      return <p className="text-gray-500">No standings data available.</p>;
    }
  
    return (
      <div className="overflow-x-auto text-black">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Position</th>
              <th className="py-3 px-4 text-left">Team</th>
              <th className="py-3 px-4 text-center">Played</th>
              <th className="py-3 px-4 text-center">Won</th>
              <th className="py-3 px-4 text-center">Draw</th>
              <th className="py-3 px-4 text-center">Lost</th>
              <th className="py-3 px-4 text-center">GF</th>
              <th className="py-3 px-4 text-center">GA</th>
              <th className="py-3 px-4 text-center">GD</th>
              <th className="py-3 px-4 text-center font-bold">Points</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team) => (
              <tr key={team.team.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{team.position}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    {team.team.crestUrl && (
                      <img 
                        src={team.team.crestUrl} 
                        alt={team.team.name} 
                        className="w-6 h-6 mr-2 object-contain"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                    )}
                    {team.team.name}
                  </div>
                </td>
                <td className="py-3 px-4 text-center">{team.playedGames}</td>
                <td className="py-3 px-4 text-center">{team.won}</td>
                <td className="py-3 px-4 text-center">{team.draw}</td>
                <td className="py-3 px-4 text-center">{team.lost}</td>
                <td className="py-3 px-4 text-center">{team.goalsFor}</td>
                <td className="py-3 px-4 text-center">{team.goalsAgainst}</td>
                <td className="py-3 px-4 text-center">{team.goalDifference}</td>
                <td className="py-3 px-4 text-center font-bold">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }