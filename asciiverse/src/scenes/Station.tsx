import React, { useState, useEffect } from 'react';
import { SUMMARY } from '../data/summary';
import { SKILLS } from '../data/skillsList';
import { EDUCATION } from '../data/education';
import { AsciiCharacter } from '../components/AsciiCharacter';
import { NPC, YOU } from '../ascii/characters';

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
            if (name === 'SKILLS' && dialogueStep >= 21) {
                onNavigate('EDUCATION');
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [name, dialogueStep, onNavigate]);

    const BUBBLES = {
        VISITOR_1: `
______________________________________
    /                                      \\
 | So, tell me a little about yourself ?   |
\\__________________   _________________ /
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
                    \\ /`,
        VISITOR_SKILLS_1: `
   __________________________________________
  /                                          \\
 | Woah. Docker, K8s, And Graph DBs?          |
 | You running a startup or just showing off? |
  \\_____________________   __________________/
                        | |
                        \\ /`,
        ME_SKILLS_1: `
   ______________________________________________
  /                                              \\
 | Haha. I don't just build UIs; I architect      |
 | ecosystems.                                    |
  \\________________________   __________________/
                           | |
                           \\ /`,
        ME_SKILLS_1_B: `
   ______________________________________
  /                                      \\
 | If it doesn't scale, it doesn't exist. |
  \\__________________   _________________/
                     | |
                     \\ /`,
        VISITOR_SKILLS_2: `
   ___________________________________________
  /                                           \\
 | Fair. But "No Code" & AI bots? Copilot?     |
  \\_______________________   _________________/
                          | |
                          \\ /`,
        VISITOR_SKILLS_2_B: `
   ___________________________________________
  /                                           \\
 | Isn't that... cheating for a "real" dev?    |
  \\_______________________   _________________/
                          | |
                          \\ /`,
        ME_SKILLS_2: `
   ________________________________________________
  /                                                \\
 | It's acceleration. Gemini handles boilerplate.   |
  \\__________________________   __________________/
                             | |
                             \\ /`,
        ME_SKILLS_2_B: `
   ____________________________________________________
  /                                                    \\
 | n8n does the piping. Antigravity boosts the speed.   |
  \\__________________________     ____________________/
                             |   |
                             \\   /`,
        ME_SKILLS_2_C: `
   _________________________________
  /                                 \\
 | I focus on the complex logic.     |
  \\_______________   ______________/
                  | |
                  \\ /`,
        VISITOR_SKILLS_3: `
   _________________________________________
  /                                         \\
 | So you're a full-stack automated army?    |
  \\_____________________   ________________/
                        | |
                        \\ /`,
        ME_SKILLS_3: `
   _________________________________________
  /                                         \\
 | Exactly. We move fast here.               |
 | Want to see what I've actually built?     |
  \\_____________________   _________________/
                        | |
                        \\ /`,
        VISITOR_EDU_1: `
   ___________________________________
  /                                   \\
 |  Wait, you actually went to class?  |
  \\________________   ________________/
                   | |
                   \\ /`,
        VISITOR_EDU_1_B: `
   _________________________________________
  /                                         \\
 |  I thought you were born in a terminal.   |
  \\___________________   ___________________/
                      | |
                      \\ /`,
        ME_EDU_1: `
   _______________________________________________
  /                                               \\
 |  Yeah, I graduated from University of Mumbai.   |
  \\__________________________   __________________/
                             | |
                             \\ /`,
        ME_EDU_1_B: `
   _______________________________________________
  /                                               \\
 |  I might've wrote script for attendance. Hehe.  |
  \\__________________________   __________________/
                             | |
                             \\ /`,
        VISITOR_EDU_2: `
   _________________________________________
  /                                         \\
 |  8.7 CGPA. So you really know theory?     |
  \\___________________   ___________________/
                      | |
                      \\ /`,
        ME_EDU_2: `
   _________________________________________
  /                                         \\
 |  Syntax changes. Logic is forever.        |
 |  The rule from my University.             |
  \\___________________   ___________________/
                      | |
                      \\ /`
    };

    // Typewriter State
    const [typedName, setTypedName] = useState('');
    const [typedRoles, setTypedRoles] = useState('');
    const [typedDesc, setTypedDesc] = useState('');
    const [eduProgress, setEduProgress] = useState(0);
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

            // SKILLS Dialogue Sequence (11-21)
            const s1 = setTimeout(() => setDialogueStep(11), 1000); // V: Woah...
            const s2 = setTimeout(() => setDialogueStep(12), 6000); // M: Ecosystems...
            const s2b = setTimeout(() => setDialogueStep(13), 10000); // M: Scale...
            const s3 = setTimeout(() => setDialogueStep(14), 13000); // V: NoCode/AI?
            const s3b = setTimeout(() => setDialogueStep(15), 17000); // V: Cheating? (NEW)
            const s4 = setTimeout(() => setDialogueStep(16), 21000); // M: Gemini... (NEW)
            const s4b = setTimeout(() => setDialogueStep(17), 25000); // M: n8n/Antigrav... (NEW)
            const s4c = setTimeout(() => setDialogueStep(18), 29000); // M: Logic... (NEW)
            const s5 = setTimeout(() => setDialogueStep(19), 32000); // V: Army? (SHIFTED)
            const s6 = setTimeout(() => setDialogueStep(20), 36000); // M: Projects? (SHIFTED)
            const s7 = setTimeout(() => setDialogueStep(21), 40000); // End (SHIFTED)

            return () => {
                clearTimeout(t);
                clearTimeout(s1); clearTimeout(s2); clearTimeout(s2b); clearTimeout(s3);
                clearTimeout(s3b); clearTimeout(s4); clearTimeout(s4b); clearTimeout(s4c);
                clearTimeout(s5); clearTimeout(s6); clearTimeout(s7);
            };
        }
        if (name === 'EDUCATION') {
            setEduProgress(0);
            const total = EDUCATION.reduce((sum, edu) =>
                sum + edu.degree.length + edu.institution.length + edu.period.length + edu.location.length + edu.grade.length, 0);

            let p = 0;
            const tEdu = setInterval(() => {
                p++;
                setEduProgress(p);
                if (p >= total) clearInterval(tEdu);
            }, 10);

            // EDUCATION Dialogue Sequence (22-28)
            const e1 = setTimeout(() => setDialogueStep(22), 1000); // V: Wait...
            const e1b = setTimeout(() => setDialogueStep(23), 4000); // V: Terminal...
            const e2 = setTimeout(() => setDialogueStep(24), 8000); // M: Mumbai...
            const e2b = setTimeout(() => setDialogueStep(25), 13000); // M: Script...
            const e3 = setTimeout(() => setDialogueStep(26), 19000); // V: CGPA...
            const e4 = setTimeout(() => setDialogueStep(27), 23000); // M: Syntax...
            const e7 = setTimeout(() => setDialogueStep(28), 28000); // End

            return () => {
                clearInterval(tEdu);
                clearTimeout(e1); clearTimeout(e1b); clearTimeout(e2); clearTimeout(e2b);
                clearTimeout(e3); clearTimeout(e4); clearTimeout(e7);
            };
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem' }}>
                        {SKILLS.map((category) => {
                            const isNoCode = category.category === 'No Code';
                            return (
                                <div key={category.category} style={{
                                    marginBottom: '0.5rem',
                                    gridColumn: isNoCode ? '1 / -1' : 'auto',
                                    display: isNoCode ? 'flex' : 'block',
                                    alignItems: isNoCode ? 'center' : 'initial',
                                    gap: isNoCode ? '1rem' : '0'
                                }}>
                                    <h3 style={{
                                        color: '#fff',
                                        borderBottom: isNoCode ? 'none' : '1px solid #444',
                                        paddingBottom: isNoCode ? '0' : '0.25rem',
                                        marginBottom: isNoCode ? '0' : '0.5rem',
                                        fontSize: '1rem',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {category.category}
                                    </h3>

                                    {isNoCode && <span style={{ color: '#666' }}>-</span>}

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
                            );
                        })}
                    </div>
                </div>
            );
        }

        if (name === 'EDUCATION') {
            let globalCharIdx = 0;
            return (
                <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto', textAlign: 'left' }}>
                    {EDUCATION.map((edu, index) => {
                        const getFieldProgress = (text: string) => {
                            const start = globalCharIdx;
                            globalCharIdx += text.length;
                            const progress = Math.max(0, eduProgress - start);
                            const typedText = text.slice(0, progress);
                            const isTyping = progress > 0 && progress < text.length;
                            const isJustFinished = progress === text.length && globalCharIdx === eduProgress;
                            return {
                                text: typedText,
                                showCursor: isTyping || isJustFinished
                            };
                        };

                        const degreeRes = getFieldProgress(edu.degree);
                        const instRes = getFieldProgress(edu.institution);
                        const periodRes = getFieldProgress(edu.period);
                        const locRes = getFieldProgress(edu.location);
                        const gradeRes = getFieldProgress(edu.grade);

                        return (
                            <div key={index} style={{
                                border: '1px solid #444',
                                background: '#111',
                                padding: '1.5rem',
                                marginBottom: '1rem',
                                borderRadius: '4px',
                                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                                minHeight: '150px'
                            }}>
                                <h3 style={{ color: '#0f0', marginBottom: '0.5rem', fontSize: '1.2rem', minHeight: '1.4rem', whiteSpace: 'pre-wrap' }}>
                                    {degreeRes.text}{degreeRes.showCursor && <span className="blink">_</span>}
                                </h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', marginBottom: '0.5rem', fontSize: '1rem', minHeight: '1.2rem' }}>
                                    <span>
                                        {instRes.text}{instRes.showCursor && <span className="blink">_</span>}
                                    </span>
                                    <span>
                                        {periodRes.text}{periodRes.showCursor && <span className="blink">_</span>}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '0.9rem', minHeight: '1.1rem' }}>
                                    <span>
                                        {locRes.text}{locRes.showCursor && <span className="blink">_</span>}
                                    </span>
                                    <span style={{ color: '#fff', fontWeight: 'bold' }}>
                                        {gradeRes.text}{gradeRes.showCursor && <span className="blink">_</span>}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
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
                {/* Shows bubble for SUMMARY steps 1,5,8 AND SKILLS steps 11,14,15,19 AND EDUCATION steps 22,23,26 */}
                {(dialogueStep === 1 || dialogueStep === 5 || dialogueStep === 8 || dialogueStep === 11 || dialogueStep === 14 || dialogueStep === 15 || dialogueStep === 19 || dialogueStep === 22 || dialogueStep === 23 || dialogueStep === 26) && (
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
                            dialogueStep === 5 ? BUBBLES.VISITOR_2 :
                                dialogueStep === 8 ? BUBBLES.VISITOR_3 :
                                    dialogueStep === 11 ? BUBBLES.VISITOR_SKILLS_1 :
                                        dialogueStep === 14 ? BUBBLES.VISITOR_SKILLS_2 :
                                            dialogueStep === 15 ? BUBBLES.VISITOR_SKILLS_2_B :
                                                dialogueStep === 19 ? BUBBLES.VISITOR_SKILLS_3 :
                                                    dialogueStep === 22 ? BUBBLES.VISITOR_EDU_1 :
                                                        dialogueStep === 23 ? BUBBLES.VISITOR_EDU_1_B :
                                                            BUBBLES.VISITOR_EDU_2}
                    </pre>
                )}
                <div style={{ position: 'relative' }}>
                    <AsciiCharacter
                        frames={NPC}
                        state={
                            (dialogueStep === 1 || dialogueStep === 5 || dialogueStep === 8 || dialogueStep === 11 || dialogueStep === 14 || dialogueStep === 15 || dialogueStep === 19 || dialogueStep === 22 || dialogueStep === 23 || dialogueStep === 26) ? "talking" :
                                (dialogueStep === 5 || dialogueStep === 8 || dialogueStep === 11 || dialogueStep === 15 || dialogueStep === 22 || dialogueStep === 23) ? "surprised" :
                                    (dialogueStep >= 6 || dialogueStep >= 19 || dialogueStep >= 28) ? "happy" : "idle"
                        }
                    />
                </div>
                <div style={{ textAlign: 'center', marginTop: '1rem', color: '#666', fontSize: '0.8rem' }}>VISITOR</div>
            </div>

            {/* Central Content */}
            <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, minWidth: '400px' }}>
                <h1 style={{ marginBottom: '2rem' }}>{`{ ${name} }`}</h1>
                {renderContent()}

                {dialogueStep >= 9 && name === 'SUMMARY' && (
                    <div className="blink" style={{ marginTop: '2rem', color: '#666', fontSize: '0.9rem' }}>
                        [ PRESS ANY KEY TO GO TO SKILLS ]
                    </div>
                )}

                {dialogueStep >= 21 && name === 'SKILLS' && (
                    <div className="blink" style={{ marginTop: '2rem', color: '#666', fontSize: '0.9rem' }}>
                        [ PRESS ANY KEY TO GO TO EDUCATION ]
                    </div>
                )}

                {dialogueStep >= 28 && name === 'EDUCATION' && (
                    <div className="blink" style={{ marginTop: '2rem', color: '#666', fontSize: '0.9rem' }}>
                        [ PRESS ANY KEY TO CONTINUE ]
                    </div>
                )}

                <button onClick={onBack} style={{ marginTop: '1rem', cursor: 'pointer', background: 'none', border: '1px solid #444', color: '#888', padding: '0.5rem 1rem' }}>
                    &lt; RETURN TO MAP
                </button>
            </div>

            {/* YOU - Right Side */}
            <div style={{ flexShrink: 0, position: 'relative', width: '180px', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* ME Steps: SUMMARY 2,3,4,6,7 | SKILLS 12,13,16,17,18,20 | EDUCATION 24,25,27 */}
                {(dialogueStep === 2 || dialogueStep === 3 || dialogueStep === 4 || dialogueStep === 6 || dialogueStep === 7 || dialogueStep === 12 || dialogueStep === 13 || dialogueStep === 16 || dialogueStep === 17 || dialogueStep === 18 || dialogueStep === 20 || dialogueStep === 24 || dialogueStep === 25 || dialogueStep === 27) && (
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
                                    dialogueStep === 6 ? BUBBLES.ME_4 :
                                        dialogueStep === 7 ? BUBBLES.ME_5 :
                                            dialogueStep === 12 ? BUBBLES.ME_SKILLS_1 :
                                                dialogueStep === 13 ? BUBBLES.ME_SKILLS_1_B :
                                                    dialogueStep === 16 ? BUBBLES.ME_SKILLS_2 :
                                                        dialogueStep === 17 ? BUBBLES.ME_SKILLS_2_B :
                                                            dialogueStep === 18 ? BUBBLES.ME_SKILLS_2_C :
                                                                dialogueStep === 20 ? BUBBLES.ME_SKILLS_3 :
                                                                    dialogueStep === 24 ? BUBBLES.ME_EDU_1 :
                                                                        dialogueStep === 25 ? BUBBLES.ME_EDU_1_B :
                                                                            BUBBLES.ME_EDU_2}
                    </pre>
                )}
                <div style={{ position: 'relative' }}>
                    <AsciiCharacter
                        frames={YOU}
                        state={
                            (dialogueStep === 2 || dialogueStep === 3 || dialogueStep === 4 || dialogueStep === 6 || dialogueStep === 7 || dialogueStep === 12 || dialogueStep === 13 || dialogueStep === 16 || dialogueStep === 17 || dialogueStep === 18 || dialogueStep === 20 || dialogueStep === 24 || dialogueStep === 25 || dialogueStep === 27) ? "talking" :
                                (dialogueStep >= 6 || dialogueStep >= 20 || dialogueStep >= 28) ? "happy" : "idle"
                        }
                    />
                </div>
                <div style={{ textAlign: 'center', marginTop: '1rem', color: '#666', fontSize: '0.8rem' }}>ME</div>
            </div>

        </div>
    );
};
