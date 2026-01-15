import { useState } from 'react';
import { Intro } from './scenes/Intro';
import { Map } from './scenes/Map';
import { Station } from './scenes/Station';


type SceneType = 'intro' | 'map' | 'station';

function App() {
  const [scene, setScene] = useState<SceneType>('intro');
  const [currentStation, setCurrentStation] = useState<string | null>(null);

  const handleIntroComplete = () => {
    setScene('map');
  };

  const handleStationSelect = (station: string) => {
    setCurrentStation(station);
    setScene('station');
    // In the full version, here we might trigger the NPC dialogue before entering content
  };

  const handleBackToMap = () => {
    setCurrentStation(null);
    setScene('map');
  };

  return (
    <div className="app-container">


      <main>
        {scene === 'intro' && (
          <Intro onComplete={handleIntroComplete} />
        )}

        {scene === 'map' && (
          <div className="map-container fade-in-up">

            <Map onSelectStation={handleStationSelect} />
          </div>
        )}

        {scene === 'station' && currentStation && (
          <Station
            name={currentStation}
            onBack={handleBackToMap}
            onNavigate={handleStationSelect}
          />
        )}
      </main>

      {/* Helper / Overlay layer could go here (e.g., global Rope rendering) */}
    </div>
  );
}

export default App;
