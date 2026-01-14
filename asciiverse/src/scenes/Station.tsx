import React from 'react';

interface StationProps {
    name: string;
    onBack: () => void;
}

export const Station: React.FC<StationProps> = ({ name, onBack }) => {
    return (
        <div className="scene station" style={{ textAlign: 'center' }}>
            <h1>{`{ ${name} }`}</h1>
            <p style={{ margin: '2rem 0' }}>
                [ Content for {name} loading... ]
                <br />
                .........................
            </p>
            <button onClick={onBack}>&lt; RETURN TO MAP</button>
        </div>
    );
};
