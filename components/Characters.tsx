
import React from 'react';

const FaceBase = () => (
    <defs>
        <radialGradient id="faceGrad" cx="50%" cy="40%" r="60%" fx="50%" fy="40%">
            <stop offset="0%" stopColor="#f9d4ab" />
            <stop offset="100%" stopColor="#e2b484" />
        </radialGradient>
         <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#444" />
            <stop offset="100%" stopColor="#222" />
        </linearGradient>
    </defs>
);

const Brainless = () => (
    <svg viewBox="0 0 100 100">
        <FaceBase />
        <path d="M 25,60 C 15,40 15,20 40,15 S 60,15 75,25 C 90,35 90,60 80,80 S 40,95 25,80 Z" fill="url(#faceGrad)" stroke="#5c3a1a" strokeWidth="2"/>
        <path d="M40 78 Q50 70 60 78" stroke="#5c3a1a" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <g className="animate-spin-eyes" style={{ transformOrigin: '38px 45px' }}>
            <path d="M30 40 L46 50 M46 40 L30 50" stroke="#5c3a1a" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g className="animate-spin-eyes" style={{ transformOrigin: '62px 45px' }}>
             <path d="M54 40 L70 50 M70 40 L54 50" stroke="#5c3a1a" strokeWidth="3" strokeLinecap="round" />
        </g>
    </svg>
);
const Moron = () => (
    <svg viewBox="0 0 100 100">
        <FaceBase />
        <path d="M 50,10 C 20,10 15,40 20,60 C 25,90 75,90 80,60 C 85,40 80,10 50,10 Z" fill="url(#faceGrad)" stroke="#5c3a1a" strokeWidth="2"/>
        <path d="M 30,15 C 35,5 65,5 70,15" fill="url(#hairGrad)" stroke="black" strokeWidth="1"/>
        <circle cx="38" cy="45" r="6" fill="white" stroke="black" strokeWidth="1" />
        <circle cx="62" cy="45" r="6" fill="white" stroke="black" strokeWidth="1" />
        <circle cx="42" cy="45" r="3" fill="black" className="animate-cross-eye-left" style={{transformOrigin: '38px 45px'}}/>
        <circle cx="58" cy="45" r="3" fill="black" className="animate-cross-eye-right" style={{transformOrigin: '62px 45px'}}/>
        <path d="M40 70 C35 85, 65 85, 60 70 Z" stroke="#5c3a1a" strokeWidth="3" fill="pink" strokeLinecap="round"/>
    </svg>
);
const Stupid = () => (
     <svg viewBox="0 0 100 100">
        <FaceBase />
        <g className="animate-head-bobble">
            <path d="M 20,50 C 20,20 80,20 80,50 C 80,85 65,95 50,95 C 35,95 20,85 20,50 Z" fill="url(#faceGrad)" stroke="#5c3a1a" strokeWidth="2"/>
            <path d="M 30,25 C 40,15 60,15 70,25 L 65,40 L 35,40 Z" fill="url(#hairGrad)"/>
            <ellipse cx="38" cy="50" rx="8" ry="10" fill="white" stroke="black" strokeWidth="1.5"/>
            <ellipse cx="62" cy="50" rx="8" ry="10" fill="white" stroke="black" strokeWidth="1.5"/>
            <circle cx="38" cy="50" r="3" fill="black"/>
            <circle cx="62" cy="50" r="3" fill="black"/>
            <path d="M35 70 C50 90, 65 70, 65 70" stroke="#5c3a1a" strokeWidth="4" fill="#5c3a1a" strokeLinecap="round"/>
            <path d="M38 72 L 62 72" stroke="white" strokeWidth="4" strokeLinecap="round"/>
        </g>
    </svg>
);
const Inexperienced = () => (
    <svg viewBox="0 0 100 100">
        <FaceBase />
        <path d="M 50,15 C 25,15 20,30 20,50 C 20,80 30,95 50,95 C 70,95 80,80 80,50 C 80,30 75,15 50,15 Z" fill="url(#faceGrad)" stroke="#5c3a1a" strokeWidth="2"/>
        <g className="animate-nervous-blink">
            <circle cx="38" cy="55" r="8" fill="white" stroke="black" strokeWidth="1.5"/>
            <circle cx="39" cy="56" r="4" fill="black"/>
        </g>
        <g className="animate-nervous-blink" style={{ animationDelay: '0.1s' }}>
            <circle cx="62" cy="55" r="8" fill="white" stroke="black" strokeWidth="1.5"/>
            <circle cx="63" cy="56" r="4" fill="black"/>
        </g>
        <path d="M45 78 Q50 75 55 78" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M30 45 C 35 40 45 40 48 45" fill="none" stroke="black" strokeWidth="2"/>
        <path d="M70 45 C 65 40 55 40 52 45" fill="none" stroke="black" strokeWidth="2"/>
    </svg>
);
const Normal = () => (
    <svg viewBox="0 0 100 100">
        <FaceBase />
        <g className="animate-gentle-nod">
            <path d="M 50,12 C 25,12 18,30 20,55 C 22,85 35,98 50,98 C 65,98 78,85 80,55 C 82,30 75,12 50,12 Z" fill="url(#faceGrad)" stroke="#5c3a1a" strokeWidth="2"/>
            <path d="M 20,40 C 30,20 70,20 80,40 C 70,30 30,30 20,40 Z" fill="url(#hairGrad)"/>
            <circle cx="38" cy="60" r="4" fill="black"/>
            <circle cx="62" cy="60" r="4" fill="black"/>
            <path d="M40 80 Q50 85 60 80" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </g>
    </svg>
);
const Successful = () => (
    <svg viewBox="0 0 100 100">
        <FaceBase />
        <g className="animate-proud-chest">
            <path d="M 50,15 C 30,15 25,30 25,50 C 25,80 40,95 50,95 C 60,95 75,80 75,50 C 75,30 70,15 50,15 Z" fill="url(#faceGrad)" stroke="#5c3a1a" strokeWidth="2"/>
            <path d="M 25,40 C 40,25 60,25 75,40 L 70,30 L 30,30 Z" fill="url(#hairGrad)"/>
            <path d="M35 55 C 40 50 45 50 50 55" stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M65 55 C 60 50 55 50 50 55" stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M35 75 Q50 90 65 75" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round"/>
        </g>
    </svg>
);
const Cunning = () => (
    <svg viewBox="0 0 100 100">
        <FaceBase />
        <path d="M 50,15 C 25,15 20,40 25,60 C 30,90 70,90 75,60 C 80,40 75,15 50,15 Z" fill="url(#faceGrad)" stroke="#5c3a1a" strokeWidth="2"/>
        <path d="M 30,20 C 40,10 60,10 70,20" fill="url(#hairGrad)"/>
        <circle cx="38" cy="55" r="4" fill="black"/>
        <path d="M58 55 L68 55" stroke="black" strokeWidth="3" className="animate-wink" strokeLinecap="round"/>
        <path d="M35 45 C 40 40 45 40 48 45" fill="none" stroke="black" strokeWidth="2"/>
        <path d="M30 75 Q50 80 70 70" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
);
const Intelligent = () => (
    <svg viewBox="0 0 100 100">
        <FaceBase />
        <path d="M 50,10 C 25,10 20,30 20,50 C 20,80 35,98 50,98 C 65,98 80,80 80,50 C 80,30 75,10 50,10 Z" fill="url(#faceGrad)" stroke="#5c3a1a" strokeWidth="2"/>
        <path d="M 20,35 C 30,15 70,15 80,35 L 75,25 L 25,25 Z" fill="url(#hairGrad)"/>
        <g stroke="black" strokeWidth="2.5" fill="none">
            <circle cx="38" cy="55" r="12"/>
            <circle cx="68" cy="55" r="12"/>
            <path d="M50 55 H 56"/>
        </g>
        <circle cx="38" cy="55" r="3" fill="black"/>
        <circle cx="68" cy="55" r="3" fill="black"/>
        <path d="M45 80 H 60" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <g className="animate-thought-bubble">
            <circle cx="85" cy="25" r="8" fill="white" stroke="black" strokeWidth="1.5" />
            <circle cx="78" cy="38" r="4" fill="white" stroke="black" strokeWidth="1" />
        </g>
    </svg>
);
const Genius = () => (
    <svg viewBox="0 0 100 100">
        <FaceBase />
        <path d="M 50,15 C 25,15 20,35 20,55 C 20,85 35,98 50,98 C 65,98 80,85 80,55 C 80,35 75,15 50,15 Z" fill="url(#faceGrad)" stroke="#5c3a1a" strokeWidth="2"/>
        <path d="M20 45 C30 20, 70 20, 80 45" fill="white" stroke="gray" strokeWidth="1"/>
        <path d="M25 50 C30 40, 40 40, 45 50" stroke="black" strokeWidth="2" fill="none"/>
        <path d="M55 50 C60 40, 70 40, 75 50" stroke="black" strokeWidth="2" fill="none"/>
        <path d="M30 75 Q50 70 70 75" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M40 85 Q50 92 60 85" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round" className="animate-wise-smile"/>
        <circle cx="38" cy="60" r="3" fill="black"/>
        <circle cx="62" cy="60" r="3" fill="black"/>
    </svg>
);


const characterMap: Record<string, React.FC> = {
    'Bilgin': Genius,
    'Zeki': Intelligent,
    'Kurnaz': Cunning,
    'Başarılı': Successful,
    'Normal': Normal,
    'Tecrübesiz': Inexperienced,
    'Aptal': Stupid,
    'Geri Zekalı': Moron,
    'Beyinsiz': Brainless,
};

// ratingName will be the original Turkish names which are used as stable identifiers
export const CharacterIcon: React.FC<{ ratingName: string }> = ({ ratingName }) => {
    const CharacterComponent = characterMap[ratingName] || Brainless;
    return <CharacterComponent />;
};