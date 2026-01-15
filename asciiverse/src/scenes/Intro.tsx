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

    const welcomeMessage = "Welcome to My Portfolio. I am your guide to walk you through my portfolio. ";
    const promptMessage = "Are you ready to explore?";

    useEffect(() => {
        // Typewriter triggering logic
        if (step === 0) {
            typeText(welcomeMessage, () => setStep(1));
        } else if (step === 2) {
            typeText(promptMessage, () => setStep(3));
        }

        // Interaction logic
        const handleInteraction = () => {
            if (step === 1) setStep(2);
            if (step === 3) onComplete();
        };

        const handleKeyDown = () => handleInteraction();

        // Swipe logic
        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchEnd = (e: TouchEvent) => {
            const touchEndY = e.changedTouches[0].clientY;
            if (touchStartY - touchEndY > 50) { // Swipe Up detected
                handleInteraction();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [step, onComplete]);

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
        <div className="scene intro" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', height: '100%', justifyContent: 'center' }}>

            {/* Stage Area */}
            <div style={{ display: 'flex', gap: '15rem', alignItems: 'flex-end', minHeight: '150px' }}>

                {/* NPC (Now Visitor) */}
                <div style={{ textAlign: 'center' }}>
                    <AsciiCharacter
                        frames={NPC}
                        state={'idle'}
                    />
                    <div style={{ marginTop: '1rem', color: '#aaa', fontSize: '0.8rem' }}>VISITOR</div>
                </div>

                {/* DIALOGUE BUBBLE (CSS Border) */}
                <div style={{
                    border: '1px solid #fff',
                    padding: '1rem',
                    width: '500px',
                    minHeight: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}>
                    {text}
                </div>

                {/* PLAYER (Now ME/Guide) */}
                <div style={{ textAlign: 'center' }}>
                    <AsciiCharacter
                        frames={YOU}
                        state={isTyping ? 'talking' : 'idle'}
                    />
                    <div style={{ marginTop: '1rem', color: '#aaa', fontSize: '0.8rem' }}>ME</div>
                </div>

            </div>

            {/* Footer Interaction Hint */}
            {(step === 1 || step === 3) && (
                <div className="blink" style={{ marginTop: '4rem', color: '#888', fontSize: '0.9rem' }}>
                    [ PRESS ANY KEY OR SWIPE UP TO CONTINUE ]
                </div>
            )}

        </div>
    );
};
