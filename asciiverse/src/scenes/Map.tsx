import React, { useEffect, useState } from 'react';
import { AsciiCharacter } from '../components/AsciiCharacter';
import { NPC, YOU } from '../ascii/characters';

// --- TYPES ---
interface Point { x: number; y: number; }
interface Station { id: string; label: string; x: number; y: number; }

// --- CONFIGURATION ---
const WIDTH = 100;
const HEIGHT = 40;
const FRAME_SPEED = 60;

const STATIONS: Station[] = [
    { id: 'SUMMARY', label: '[ SUMMARY ]', x: 4, y: 4 },
    { id: 'EDUCATION', label: '[ EDUCATION ]', x: 45, y: 12 },
    { id: 'SKILLS', label: '[ SKILLS ]', x: 75, y: 4 },
    { id: 'EXPERIENCE', label: '[ EXPERIENCE ]', x: 80, y: 20 },
    { id: 'PROJECTS', label: '[ PROJECTS ]', x: 55, y: 30 },
    { id: 'VOLUNTEER', label: '[ VOLUNTEER ]', x: 6, y: 20 },
    { id: 'CONTACT', label: '[ CONTACT ]', x: 15, y: 35 },
];

/**
 * Orthogonal Pathing (Maze Style)
 */
const PATH_POINTS: Point[] = [
    // 1. Summary -> Education (Down-Right zig zag)
    ...line(13, 4, 30, 4),
    ...line(30, 4, 30, 12),
    ...line(30, 12, 45, 12),

    // 2. Education -> Skills (Up-Right zig zag)
    ...line(56, 12, 65, 12),
    ...line(65, 12, 65, 4),
    ...line(65, 4, 75, 4),

    // 3. Skills -> Experience (Winding to enter from left)
    ...line(85, 4, 95, 4),
    ...line(95, 4, 95, 18),
    ...line(95, 18, 72, 18),
    ...line(72, 18, 72, 20),
    ...line(72, 20, 79, 20), // Connection into left side

    // 4. Experience -> Projects (Down-Left)
    ...line(94, 20, 96, 20),
    ...line(96, 20, 96, 26),
    ...line(96, 26, 80, 26),
    ...line(80, 26, 80, 30),
    ...line(80, 30, 67, 30),

    // 5. Projects -> Contact (Left-Up-Left complex)
    ...line(55, 30, 40, 30),
    ...line(40, 30, 40, 20), // Up to center line
    ...line(40, 20, 17, 20), // Left to contact

    // 6. Contact -> Volunteer (Down-Right)
    ...line(6, 20, 2, 20), // Out left
    ...line(2, 20, 2, 35), // Down bottom
    ...line(2, 35, 15, 35), // Right to vol
];

// Helper to generate points between two coordinates linearly
function line(x1: number, y1: number, x2: number, y2: number): Point[] {
    const points: Point[] = [];
    if (x1 === x2) { // Vertical
        const step = y2 > y1 ? 1 : -1;
        for (let y = y1; y !== y2 + step; y += step) points.push({ x: x1, y });
    } else if (y1 === y2) { // Horizontal
        const step = x2 > x1 ? 1 : -1;
        for (let x = x1; x !== x2 + step; x += step) points.push({ x, y: y1 });
    }
    return points;
}

interface MapProps {
    onSelectStation: (station: string) => void;
}

export const Map: React.FC<MapProps> = ({ onSelectStation }) => {
    // Dialogue Logic
    const [dialogueStep, setDialogueStep] = useState(0); // 0: Start, 1: ME, 2: VISITOR, 3: ME (Final), 4: Done
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        // Animation Loop
        const timer = setInterval(() => {
            setFrame(f => (f + 1) % PATH_POINTS.length);
        }, FRAME_SPEED);

        // Dialogue Timeline
        const t1 = setTimeout(() => setDialogueStep(1), 1000);
        const t2 = setTimeout(() => setDialogueStep(2), 5000);
        const t3 = setTimeout(() => setDialogueStep(3), 9000);
        const t4 = setTimeout(() => setDialogueStep(4), 14000); // 14s: VISITOR "Cool"
        const t5 = setTimeout(() => setDialogueStep(5), 17000); // 17s: Clear

        return () => {
            clearInterval(timer);
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
        };
    }, []);

    const BUBBLE_ME_1 = `
   _________________________
  /                         \\
 | Hey u see the map right?  |
  \\___________   ___________/
              \\ /`;

    const BUBBLE_VISITOR_1 = `
   _________________________________
  /                                 \\
 | Yes i can well its a bit of maze  |
  \\_______________   _______________/
                  \\ /`;

    const BUBBLE_ME_2 = `
   _______________________________________
  /                                       \\
 | Well i am here to help you mate.        |
 | I'll help you in each destination hehe  |
  \\_______   _____________________________/
          \\ /`;

    const BUBBLE_VISITOR_2 = `
   __________
  /          \\
 |   Cool!    |
  \\____   ___/
       \\ /`;

    const renderMapElements = () => {
        // 1. Init Grid
        const grid: string[][] = Array(HEIGHT).fill(null).map(() => Array(WIDTH).fill(' '));

        // 2. Draw Paths
        for (let i = 0; i < PATH_POINTS.length - 1; i++) {
            const p1 = PATH_POINTS[i];
            const p2 = PATH_POINTS[i + 1];

            let char = ' ';
            // Horizontal
            if (p1.y === p2.y) char = '-';
            // Vertical
            if (p1.x === p2.x) char = '|';

            // Junction logic
            if (i < PATH_POINTS.length - 2) {
                const pNext = PATH_POINTS[i + 2];
                if ((p1.x !== pNext.x) && (p1.y !== pNext.y)) {
                    char = '+';
                }
            }

            if (grid[p1.y] && grid[p1.y][p1.x]) {
                grid[p1.y][p1.x] = char;
            }
        }

        // 3. Draw Stations (Inject text into grid)
        STATIONS.forEach(s => {
            const text = s.label;
            for (let i = 0; i < text.length; i++) {
                if (grid[s.y] && grid[s.y][s.x + i] !== undefined) {
                    grid[s.y][s.x + i] = text[i];
                }
            }
        });

        // 4. Draw Arrow
        const arrow = PATH_POINTS[frame];
        const nextArrow = PATH_POINTS[(frame + 1) % PATH_POINTS.length];

        if (arrow && grid[arrow.y]) {
            let dirChar = '>';
            if (nextArrow.x > arrow.x) dirChar = '>';
            else if (nextArrow.x < arrow.x) dirChar = '<';
            else if (nextArrow.y > arrow.y) dirChar = 'v';
            else if (nextArrow.y < arrow.y) dirChar = '^';

            grid[arrow.y][arrow.x] = dirChar;
        }

        // 5. Convert Grid to React Elements with Clickable Buttons
        return grid.map((rowChars, rowIndex) => {
            const rowString = rowChars.join('');

            // Find stations on this row
            const rowStations = STATIONS.filter(s => s.y === rowIndex).sort((a, b) => a.x - b.x);

            if (rowStations.length === 0) {
                // Return simple text row
                return <div key={rowIndex} style={{ height: '12px' }}>{rowString}</div>;
            }

            // Slice row into interactive segments
            const segments = [];
            let currentX = 0;

            rowStations.forEach(station => {
                const start = station.x;
                const end = station.x + station.label.length;

                // Text before starts
                if (start > currentX) {
                    segments.push(
                        <span key={`${rowIndex}-pre-${station.id}`}>
                            {rowString.slice(currentX, start)}
                        </span>
                    );
                }

                // Station Button (The Label itself becomes the button)
                segments.push(
                    <button
                        key={station.id}
                        onClick={() => onSelectStation(station.id)}
                        className="station-text-btn"
                        aria-label={`Go to ${station.label}`}
                    >
                        {rowString.slice(start, end)}
                    </button>
                );

                currentX = end;
            });

            // Remaining text after last station
            if (currentX < rowString.length) {
                segments.push(
                    <span key={`${rowIndex}-post`}>
                        {rowString.slice(currentX)}
                    </span>
                );
            }

            return <div key={rowIndex} style={{ height: '12px', display: 'flex' }}>{segments}</div>;
        });
    };

    // Keyboard Navigation
    // Keyboard Navigation removed to keep map pure clickable
    /*
    useEffect(() => {
        const handleKeyPress = () => {
            onSelectStation('SUMMARY');
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [onSelectStation]);
    */

    return (
        <div className="scene map" style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column', // Changed to column to stack footer
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem', // Reduced gap since we have footer
            padding: '0 2rem'
        }}>

            {/* Main Content Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>
                {/* NPC - Left Side */}
                <div style={{ flexShrink: 0, position: 'relative' }}>
                    {(dialogueStep === 2 || dialogueStep === 4) && (
                        <pre style={{
                            position: 'absolute',
                            bottom: '100%',
                            left: dialogueStep === 4 ? '10px' : '-140px',
                            color: '#fff',
                            marginBottom: '5px',
                            textShadow: '0 0 5px #000'
                        }}>
                            {dialogueStep === 2 ? BUBBLE_VISITOR_1 : BUBBLE_VISITOR_2}
                        </pre>
                    )}
                    <AsciiCharacter frames={NPC} state={dialogueStep === 2 ? "talking" : (dialogueStep >= 4 ? "happy" : "idle")} />
                    <div style={{ textAlign: 'center', marginTop: '1rem', color: '#666', fontSize: '0.8rem' }}>VISITOR</div>
                </div>

                {/* Map Container - Center */}
                <div style={{ position: 'relative', width: 'fit-content' }}>
                    <pre style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: '12px',
                        lineHeight: '12px',
                        color: '#ccc',
                        background: 'transparent',
                        padding: '0',
                        margin: '0',
                        textAlign: 'left'
                    }}>
                        {renderMapElements()}
                    </pre>
                </div>

                {/* YOU - Right Side */}
                <div style={{ flexShrink: 0, position: 'relative' }}>
                    {(dialogueStep === 1 || dialogueStep === 3) && (
                        <pre style={{
                            position: 'absolute',
                            bottom: '100%',
                            right: '-60px',
                            color: '#fff',
                            marginBottom: '5px',
                            textShadow: '0 0 5px #000'
                        }}>
                            {dialogueStep === 1 ? BUBBLE_ME_1 : BUBBLE_ME_2}
                        </pre>
                    )}
                    <AsciiCharacter
                        frames={YOU}
                        state={(dialogueStep === 1 || dialogueStep === 3) ? "talking" : "happy"}
                    />
                    <div style={{ textAlign: 'center', marginTop: '1rem', color: '#666', fontSize: '0.8rem' }}>ME</div>
                </div>
            </div>

            {/* Footer Hint */}
            <div className="blink" style={{ marginTop: '2rem', color: '#666', fontSize: '0.9rem' }}>
                [ CLICK OR TAP A DESTINATION ]
            </div>

        </div>
    );
};
