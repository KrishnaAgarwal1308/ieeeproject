// components/CompetitionSelector.jsx
export default function CompetitionSelector({ 
    competitions, 
    selectedCompetition, 
    onSelectCompetition, 
    loading 
  }) {
    if (loading) {
      return (
        <div className="mb-6">
          <p className="text-black">Loading competitions...</p>
        </div>
      );
    }
  
    return (
      <div className="mb-6 text-black">
        <label htmlFor="competition" className="block mb-2 font-medium">
          Select Competition:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {competitions.map((competition) => (
            <button
              key={competition.id}
              onClick={() => onSelectCompetition(competition)}
              className={`p-3 text-left rounded-lg border transition hover:bg-blue-50 
                ${selectedCompetition?.id === competition.id 
                  ? 'border-blue-500 bg-blue-100' 
                  : 'border-gray-200'}`}
            >
              <div className="flex items-center">
                {competition.emblemUrl && (
                  <img 
                    src={competition.emblemUrl} 
                    alt={competition.name} 
                    className="w-8 h-8 mr-2 object-contain"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                )}
                <span>{competition.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }
  
