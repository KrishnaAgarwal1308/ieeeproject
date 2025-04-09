// app/page.jsx - Main page
"use client";

import { useState, useEffect } from 'react';
import CompetitionSelector from '@/components/CompetitionSelector';
import StandingsTable from '@/components/StandingsTable';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function Home() {
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch available competitions on initial load
  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/competitions');
        
        if (!response.ok) {
          throw new Error('Failed to fetch competitions');
        }
        
        const data = await response.json();
        setCompetitions(data.competitions);
        setLoading(false);
      } catch (error) {
        setError('Error loading competitions. Please try again later.');
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  // Fetch standings when a competition is selected
  useEffect(() => {
    if (!selectedCompetition) return;

    const fetchStandings = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/standings?competitionId=${selectedCompetition.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch standings');
        }
        
        const data = await response.json();
        setStandings(data.standings);
        setLoading(false);
      } catch (error) {
        setError('Error loading standings. Please try again later.');
        setLoading(false);
      }
    };

    fetchStandings();
  }, [selectedCompetition]);

  const handleCompetitionChange = (competition) => {
    setSelectedCompetition(competition);
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">
          Football Standings Viewer
        </h1>

        {error && <ErrorMessage message={error} />}

        <CompetitionSelector 
          competitions={competitions}
          selectedCompetition={selectedCompetition}
          onSelectCompetition={handleCompetitionChange}
          loading={loading && competitions.length === 0}
        />

        {loading && selectedCompetition ? (
          <div className="mt-8 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : selectedCompetition ? (
          <div className="mt-8 text-black">
            <h2 className="text-xl font-semibold mb-4">
              {selectedCompetition.name} Standings
            </h2>
            <StandingsTable standings={standings} />
          </div>
        ) : (
          <div className="mt-16 text-center text-black">
            <p>Please select a competition to view standings</p>
          </div>
        )}
      </div>
    </main>
  );
}