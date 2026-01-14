import React from 'react';

const STATIONS = [
    'SUMMARY',
    'SKILLS',
    'PROJECTS',
    'JOURNEY',
    'RESUME',
    'CONTACT'
];

interface MapProps {
    onSelectStation: (station: string) => void;
}

export const Map: React.FC<MapProps> = ({ onSelectStation }) => {
    return (
        <div className="scene map" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            marginTop: '2rem',
            border: '1px dashed #444',
            padding: '2rem'
        }}>
            {STATIONS.map((station) => (
                <button
                    key={station}
                    onClick={() => onSelectStation(station)}
                    style={{
                        height: '80px',
                        width: '120px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    [{station}]
                </button>
            ))}
        </div>
    );
};
