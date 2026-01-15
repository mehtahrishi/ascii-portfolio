import React, { useState, useEffect } from 'react';
import { SUMMARY } from '../data/summary';
import { SKILLS } from '../data/skillsList';
import { AsciiCharacter } from '../components/AsciiCharacter';
import { NPC, YOU } from '../ascii/characters';

interface StationProps {
    name: string;
    onBack: () => void;
}

interface StationProps {
    name: string;
    onBack: () => void;
    onNavigate: (station: string) => void;
}

export const Station: React.FC<StationProps> = ({ name, onBack, onNavigate }) => {
    // Dialogue Logic
    const [dialogueStep, setDialogueStep] = useState(0);

    useEffect(() => {
        // Reset dialogue when entering SUMMARY
        if (name === 'SUMMARY') {
            const t1 = setTimeout(() => setDialogueStep(1), 1000);  // Visitor: Tell me about yourself?
            const t2 = setTimeout(() => setDialogueStep(2), 4000);  // Me: I am Hrishi Mehta
            const t3 = setTimeout(() => setDialogueStep(3), 7000);  // Me: Full Stack...
            const t4 = setTimeout(() => setDialogueStep(4), 11000); // Me: Secure apps...
            const t5 = setTimeout(() => setDialogueStep(5), 15000); // Visitor: Whoa...
            const t6 = setTimeout(() => setDialogueStep(6), 20000); // Me: Haha thanks...
            const t7 = setTimeout(() => setDialogueStep(7), 24000); // Me: So let's hop to Skills?
            const t8 = setTimeout(() => setDialogueStep(8), 28000); // Visitor: Yeah curious...
            const t9 = setTimeout(() => setDialogueStep(9), 32000); // Wait for input

            return () => {
                clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
                clearTimeout(t4); clearTimeout(t5); clearTimeout(t6);
                clearTimeout(t7); clearTimeout(t8); clearTimeout(t9);
            };
        } else {
            setDialogueStep(0);
        }
    }, [name]);

    // Handle key press for next station
    useEffect(() => {
        const handleKeyPress = () => {
            if (name === 'SUMMARY' && dialogueStep >= 9) {
                onNavigate('SKILLS');
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [name, dialogueStep, onNavigate]);

    const BUBBLES = {
        VISITOR_1: `
   ______________________________________
  /                                      \\
 | So, tell me a little about yourself?   |
  \\__________________   _________________/
                     \\ /`,
        ME_1: `
   _______________________
  /                       \\
 | I am Hrishi Mehta.      |
  \\__________   __________/
             \\ /`,
        ME_2: `
   _________________________________________________
  /                                                 \\
 | I'm a Full Stack Dev, DevOps & AI enthusiast.     |
  \\_______________________   ______________________/
                          \\ /`,
        ME_3: `
   ______________________________________________
  /                                              \\
 | I build secure, scalable apps for innovation.  |
  \\______________________   _____________________/
                         \\ /`,
        VISITOR_2: `
   _____________________________________________
  /                                             \\
 | Whoa, covers everything from Code to Cloud!   |
 | Impressive stack you got there.               |
  \\_____________________   ____________________/
                        \\ /`,
        ME_4: `
   ___________________________________________
  /                                           \\
 | Haha thanks! I just love building           |
 | high-quality things that live on the web.   |
  \\____________________   ____________________/
                       \\ /`,
        ME_5: `
   __________________________________________
  /                                          \\
 | So, let's hop to my SKILLS?                |
  \\____________________   ___________________/
                       \\ /`,
        VISITOR_3: `
   ________________________________________
  /                                        \\
 | Yeah, now I am curious about your skills.|
  \\_________________   ____________________/
                    \\ /`
    };

    // Typewriter State
    const [typedName, setTypedName] = useState('');
    const [typedRoles, setTypedRoles] = useState('');
    const [typedDesc, setTypedDesc] = useState('');
    const [showSkills, setShowSkills] = useState(false);

    // Start typing content after dialogue roughly finishes or alongside it
    useEffect(() => {
        if (name === 'SUMMARY') {
            // Typing Name
            let n = 0;
            const tName = setInterval(() => {
                setTypedName(SUMMARY.name.slice(0, n + 1));
                n++;
                if (n >= SUMMARY.name.length) clearInterval(tName);
            }, 50);

            // Typing roles (start after name)
            setTimeout(() => {
                let r = 0;
                const fullRoles = SUMMARY.roles.join(' | ');
                const tRoles = setInterval(() => {
                    setTypedRoles(fullRoles.slice(0, r + 1));
                    r++;
                    if (r >= fullRoles.length) clearInterval(tRoles);
                }, 20);
            }, 1000);

            // Typing Description (start after roles)
            setTimeout(() => {
                let d = 0;
                const tDesc = setInterval(() => {
                    setTypedDesc(SUMMARY.description.slice(0, d + 1));
                    d++;
                    if (d >= SUMMARY.description.length) clearInterval(tDesc);
                }, 10);
            }, 3000);
        }
        if (name === 'SKILLS') {
            setShowSkills(false);
            const t = setTimeout(() => setShowSkills(true), 100);
            return () => clearTimeout(t);
        }
    }, [name]);

    // Helper to render content based on station name
    const renderContent = () => {
        if (name === 'SUMMARY') {
            return (
                <div style={{ maxWidth: '600px', width: '100%', margin: '0 2rem', textAlign: 'left', lineHeight: '1.6' }}>
                    <h2 style={{ color: '#fff', marginBottom: '1rem', minHeight: '2rem' }}>
                        {typedName}
                        <span className="blink">_</span>
                    </h2>
                    <p style={{ color: '#aaa', marginBottom: '1rem', fontStyle: 'italic', minHeight: '1.6rem' }}>
                        {typedRoles}
                    </p>
                    <p style={{ marginBottom: '2rem', minHeight: '6rem' }}>
                        {typedDesc}
                    </p>
                </div>
            );
        }

        if (name === 'SKILLS') {
            return (
                <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', textAlign: 'left' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.75rem' }}>
                        {SKILLS.map((category) => (
                            <div key={category.category} style={{
                                marginBottom: '0.5rem',
                                gridColumn: category.category === 'No Code' ? '1 / -1' : 'auto'
                            }}>
                                <h3 style={{ color: '#fff', borderBottom: '1px solid #444', paddingBottom: '0.25rem', marginBottom: '0.5rem', fontSize: '1rem' }}>
                                    {category.category}
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                    {category.items.map((skill) => (
                                        <span key={skill.name} style={{
                                            background: '#222',
                                            padding: '0.2rem 0.4rem',
                                            borderRadius: '3px',
                                            color: '#aaa',
                                            fontSize: '0.8rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.4rem'
                                        }}>
                                            <span style={{
                                                color: '#0f0',
                                                display: 'flex',
                                                opacity: showSkills ? 1 : 0,
                                                transform: showSkills ? 'scale(1)' : 'scale(0.5)',
                                                transition: 'all 0.3s ease-out'
                                            }}>
                                                {skill.icon}
                                            </span>
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <p style={{ margin: '2rem 0' }}>
                [ Content for {name} loading... ]
                <br />
                .........................
            </p>
        );
    };

    return (
        <div className="scene station" style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6rem',
            padding: '2rem 2rem 15vh 2rem' // Added large bottom padding to shift everything up
        }}>
            {/* NPC - Left Side - Avoiding Overlay */}
            <div style={{ flexShrink: 0, position: 'relative', width: '180px', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {(dialogueStep === 1 || dialogueStep === 5 || dialogueStep === 8) && (
                    <pre style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: dialogueStep === 5 ? 'translateX(-60%)' : 'translateX(-50%)',
                        color: '#fff',
                        marginBottom: '5px',
                        textShadow: '0 0 5px #000',
                        zIndex: 30,
                        pointerEvents: 'none'
                    }}>
                        {dialogueStep === 1 ? BUBBLES.VISITOR_1 :
                            dialogueStep === 5 ? BUBBLES.VISITOR_2 : BUBBLES.VISITOR_3}
                    </pre>
                )}
                <div style={{ position: 'relative' }}>
                    <AsciiCharacter
                        frames={NPC}
                        state={(dialogueStep === 1 || dialogueStep === 5 || dialogueStep === 8) ? "talking" : (dialogueStep === 5 || dialogueStep === 8 ? "surprised" : (dialogueStep >= 6 ? "happy" : "idle"))}
                    />
                </div>
                <div style={{ textAlign: 'center', marginTop: '1rem', color: '#666', fontSize: '0.8rem' }}>VISITOR</div>
            </div>

            {/* Central Content */}
            <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, minWidth: '400px' }}>
                <h1 style={{ marginBottom: '2rem' }}>{`{ ${name} }`}</h1>
                {renderContent()}

                {dialogueStep >= 9 && (
                    <div className="blink" style={{ marginTop: '2rem', color: '#666', fontSize: '0.9rem' }}>
                        [ PRESS ANY KEY TO GO TO SKILLS ]
                    </div>
                )}

                <button onClick={onBack} style={{ marginTop: '1rem', cursor: 'pointer', background: 'none', border: '1px solid #444', color: '#888', padding: '0.5rem 1rem' }}>
                    &lt; RETURN TO MAP
                </button>
            </div>

            {/* YOU - Right Side */}
            <div style={{ flexShrink: 0, position: 'relative', width: '180px', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {(dialogueStep === 2 || dialogueStep === 3 || dialogueStep === 4 || dialogueStep === 6 || dialogueStep === 7) && (
                    <pre style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-60%)', // Shifted left slightly
                        color: '#fff',
                        marginBottom: '5px',
                        textShadow: '0 0 5px #000',
                        zIndex: 30,
                        pointerEvents: 'none'
                    }}>
                        {dialogueStep === 2 ? BUBBLES.ME_1 :
                            dialogueStep === 3 ? BUBBLES.ME_2 :
                                dialogueStep === 4 ? BUBBLES.ME_3 :
                                    dialogueStep === 6 ? BUBBLES.ME_4 : BUBBLES.ME_5}
                    </pre>
                )}
                <div style={{ position: 'relative' }}>
                    <AsciiCharacter
                        frames={YOU}
                        state={(dialogueStep === 2 || dialogueStep === 3 || dialogueStep === 4 || dialogueStep === 6 || dialogueStep === 7) ? "talking" : (dialogueStep >= 6 ? "happy" : "idle")}
                    />
                </div>
                <div style={{ textAlign: 'center', marginTop: '1rem', color: '#666', fontSize: '0.8rem' }}>ME</div>
            </div>

        </div>
    );
};
