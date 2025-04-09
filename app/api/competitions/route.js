// app/api/competitions/route.js
export async function GET() {
    try {
      // You'll need to sign up for an API key at football-data.org
      const response = await fetch('https://api.football-data.org/v4/competitions', {
        headers: {
          'X-Auth-Token': process.env.FOOTBALL_API_KEY,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data from football API');
      }
  
      const data = await response.json();
      
      // Filter to include only competitions with available standings
      const filteredCompetitions = data.competitions.filter(comp => 
        comp.type === 'LEAGUE' && !comp.name.includes('Cup')
      );
  
      return Response.json({ competitions: filteredCompetitions });
    } catch (error) {
      console.error('API error:', error.message);
      return Response.json({ error: 'Failed to fetch competitions' }, { status: 500 });
    }
  }
  
  // app/api/standings/route.js
 