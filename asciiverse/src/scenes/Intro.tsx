import React, { useState, useEffect } from 'react';
import { NPC, YOU } from '../ascii/characters';
import { AsciiCharacter } from '../components/AsciiCharacter';

interface IntroProps {
    onComplete: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [text, setText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const welcomeMessage = "Welcome to AsciiVerse. I am your guide.";
    const promptMessage = "Are you ready to explore?";

    useEffect(() => {
        if (step === 0) {
            typeText(welcomeMessage, () => setStep(1));
        } else if (step === 2) {
            typeText(promptMessage, () => setStep(3));
        }
    }, [step]);

    const typeText = (fullText: string, callback: () => void) => {
        setIsTyping(true);
        setText('');
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i + 1));
            i++;
            if (i === fullText.length) {
                clearInterval(interval);
                setIsTyping(false);
                setTimeout(callback, 500); // pause after typing
            }
        }, 50);
    };

    return (
        <div className="scene intro" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

            {/* Stage Area */}
            <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-end', minHeight: '150px' }}>

                {/* NPC */}
                <div style={{ textAlign: 'center' }}>
                    <AsciiCharacter
                        frames={NPC}
                        state={isTyping ? 'talking' : 'idle'}
                    />
                    <div style={{ marginTop: '1rem', color: '#aaa', fontSize: '0.8rem' }}>GUIDE</div>
                </div>

                {/* DIALOGUE BUBBLE (CSS Border) */}
                <div style={{
                    border: '1px solid #fff',
                    padding: '1rem',
                    width: '300px',
                    minHeight: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}>
                    {text}
                    {step === 1 && (
                        <button onClick={() => setStep(2)} style={{ marginLeft: '10px' }}>▼</button>
                    )}
                </div>

                {/* PLAYER (Hidden initially or fades in? Prompt says "Left: NPC, Right: You". Let's show You) */}
                <div style={{ textAlign: 'center', opacity: step >= 2 ? 1 : 0.5, transition: 'opacity 1s' }}>
                    <AsciiCharacter
                        frames={YOU}
                        state={'idle'}
                    />
                    <div style={{ marginTop: '1rem', color: '#aaa', fontSize: '0.8rem' }}>YOU</div>
                </div>

            </div>

            {step === 3 && (
                <button onClick={onComplete} style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
                    [ ENTER SYSTEM ]
                </button>
            )}

        </div>
    );
};
