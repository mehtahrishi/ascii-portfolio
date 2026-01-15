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
    { id: 'EXP', label: '[ EXP ]', x: 85, y: 20 },
    { id: 'PROJECTS', label: '[ PROJECTS ]', x: 55, y: 30 },
    { id: 'VOLUNTEER', label: '[ VOLUNTEER ]', x: 15, y: 35 },
    { id: 'CONTACT', label: '[ CONTACT ]', x: 6, y: 20 },
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

    // 3. Skills -> Exp (Down-Right winding)
    ...line(85, 4, 95, 4), // Far right
    ...line(95, 4, 95, 20), // Down
    ...line(95, 20, 92, 20), // Left into Exp

    // 4. Exp -> Projects (Down-Left)
    ...line(85, 20, 80, 20),
    ...line(80, 20, 80, 30),
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
  \\______________________   _/
                        \\ /`;

    const BUBBLE_VISITOR_1 = `
   __________________________________
  /                                  \\
 | Yes i can well its a bit of maze   |
  \\_   _____________________________/
   \\ /`;

    const BUBBLE_ME_2 = `
   _______________________________________
  /                                       \\
 | Well i am here to help you mate.        |
 | I'll help you in each destination hehe  |
  \\____________________________________   _/
                                       \\ /`;

    const BUBBLE_VISITOR_2 = `
   ________
  /        \\
 |   Cool   |
  \\_   ____/
   \\ /`;

    const renderMap = () => {
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

        // 3. Draw Stations
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

        return grid.map(r => r.join('')).join('\n');
    };

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyPress = () => {
            onSelectStation('SUMMARY');
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [onSelectStation]);

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
                            left: '-20px',
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
                        {renderMap()}
                    </pre>

                    {/* Hitboxes Overlay aligned to Map */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: `${WIDTH}ch`, height: `${HEIGHT}em` }}>
                        {STATIONS.map(s => (
                            <button
                                key={s.id}
                                onClick={() => onSelectStation(s.id)}
                                style={{
                                    position: 'absolute',
                                    left: `${s.x}ch`,
                                    top: `${s.y}em`,
                                    width: `${s.label.length}ch`,
                                    height: '1em',
                                    opacity: 0,
                                    cursor: 'pointer'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* YOU - Right Side */}
                <div style={{ flexShrink: 0, position: 'relative' }}>
                    {(dialogueStep === 1 || dialogueStep === 3) && (
                        <pre style={{
                            position: 'absolute',
                            bottom: '100%',
                            right: '-20px',
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
                [ PRESS ANY KEY TO ENTER SYSTEM ]
            </div>

        </div>
    );
};
