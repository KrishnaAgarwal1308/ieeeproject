export async function GET(request) {
    try {
      const { searchParams } = new URL(request.url);
      const competitionId = searchParams.get('competitionId');
  
      if (!competitionId) {
        return Response.json({ error: 'Competition ID is required' }, { status: 400 });
      }
  
      const response = await fetch(`https://api.football-data.org/v4/competitions/${competitionId}/standings`, {
        headers: {
          'X-Auth-Token': process.env.FOOTBALL_API_KEY,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch standings for competition ${competitionId}`);
      }
  
      const data = await response.json();
      
      // Usually standings are in a "standings" array and we want the "TOTAL" type
      const totalStandings = data.standings.find(standing => standing.type === 'TOTAL');
      
      return Response.json({ 
        standings: totalStandings ? totalStandings.table : [],
        competition: data.competition
      });
    } catch (error) {
      console.error('API error:', error.message);
      return Response.json({ error: 'Failed to fetch standings' }, { status: 500 });
    }
  }