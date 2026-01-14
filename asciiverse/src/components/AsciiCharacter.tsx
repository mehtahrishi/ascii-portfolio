import React, { useEffect, useState } from 'react';
import type { CharacterFrames, CharacterState } from '../ascii/characters';
import { getCharacterHeight, getFrameLines } from '../ascii/renderer';

interface AsciiCharacterProps {
    frames: CharacterFrames;
    state: CharacterState;
    speed?: number; // ms per frame
}

export const AsciiCharacter: React.FC<AsciiCharacterProps> = ({ frames, state, speed = 250 }) => {
    const [frameIndex, setFrameIndex] = useState(0);

    const height = getCharacterHeight(frames);
    const currentSequence = frames[state] || frames['idle'];
    const frameCount = Math.max(1, Math.floor(currentSequence.length / height));

    useEffect(() => {
        setFrameIndex(0);
        if (frameCount <= 1) return;

        const interval = setInterval(() => {
            setFrameIndex((prev) => (prev + 1) % frameCount);
        }, speed);

        return () => clearInterval(interval);
    }, [state, frameCount, speed]);

    const currentFrameLines = getFrameLines(frames, state, frameIndex);

    return (
        <pre className="ascii-character" style={{ lineHeight: '1.2em' }}>
            {currentFrameLines.join('\n')}
        </pre>
    );
};
