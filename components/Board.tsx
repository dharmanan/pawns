
import React from 'react';
import type { BoardState, Position } from '../types';

interface BoardProps {
    board: BoardState;
    selectedCell: Position | null;
    validMoves: Position[];
    jumpedPeg: Position | null;
    moveFrom: Position | null;
    moveTo: Position | null;
    onCellClick: (pos: Position) => void;
    isEndGame: boolean;
    isBlurred?: boolean;
}

type PegAnimationState = 'idle' | 'selected' | 'jumped' | 'takeoff' | 'landing';

const Peg: React.FC<{ animationState: PegAnimationState }> = ({ animationState }) => {
    // Görsel ve animasyonlu Peg
    const animationClasses: Record<PegAnimationState, string> = {
        idle: '',
        selected: 'animate-float',
        jumped: 'animate-fade-out-shrink',
        takeoff: 'animate-takeoff',
        landing: 'animate-land',
    };

    // Şık mermer efekti için Tailwind gradient ve shadow
    // Seçili taş için farklı bir gradient
    const isSelected = animationState === 'selected';
    const pegBaseClasses = 'w-full h-full rounded-full transition-all duration-300 relative';
    const normalPegClasses = 'bg-gradient-to-br from-yellow-200 via-amber-300 to-amber-500 shadow-[inset_0_3px_8px_rgba(255,255,255,0.5),0_5px_15px_rgba(0,0,0,0.3)] border-2 border-amber-700';
    const selectedPegClasses = 'bg-gradient-to-br from-white via-yellow-200 to-yellow-400 shadow-[inset_0_2px_6px_rgba(255,255,255,0.7),0_8px_20px_rgba(0,0,0,0.4)] border-2 border-yellow-500';

    return (
        <div className={`relative w-11/12 h-11/12 ${animationClasses[animationState]}`}>
            <svg width="100%" height="100%" viewBox="0 0 100 100">
                <defs>
                    <radialGradient id="pegMarble" cx="30%" cy="30%" r="70%">
                        <stop offset="0%" stopColor={isSelected ? '#fff' : '#f9e7b0'} />
                        <stop offset="40%" stopColor={isSelected ? '#fffbe6' : '#ffe066'} />
                        <stop offset="80%" stopColor={isSelected ? '#ffe066' : '#ffd700'} />
                        <stop offset="100%" stopColor={isSelected ? '#fffbe6' : '#e2b484'} />
                    </radialGradient>
                    <radialGradient id="pegSelectedHighlight" cx="50%" cy="50%" r="60%">
                        <stop offset="0%" stopColor="#fffde4" stopOpacity="1" />
                        <stop offset="60%" stopColor="#ffe066" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#ffd700" stopOpacity="0.3" />
                    </radialGradient>
                    <linearGradient id="veinGold" x1="0" y1="0" x2="100" y2="100">
                        <stop offset="0%" stopColor="#ffe066" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ffd700" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="veinWhite" x1="100" y1="0" x2="0" y2="100">
                        <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <circle
                    cx="50" cy="50" r="46"
                    fill={isSelected ? 'url(#pegSelectedHighlight)' : 'url(#pegMarble)'}
                    stroke={isSelected ? '#ffd700' : '#bfa77a'}
                    strokeWidth={isSelected ? '2.5' : '2'}
                />
                {/* Mermer damarları: gold ve beyaz */}
                <path d="M 32 38 Q 50 18 68 38 Q 78 58 58 78" stroke="url(#veinGold)" strokeWidth="2.2" fill="none" opacity="0.8" />
                <path d="M 42 62 Q 60 52 78 72" stroke="url(#veinWhite)" strokeWidth="1.2" fill="none" opacity="0.7" />
                <path d="M 62 28 Q 57 55 37 72" stroke="url(#veinGold)" strokeWidth="1.5" fill="none" opacity="0.6" />
                {/* Parlak highlight sadece içte */}
                <ellipse
                    cx="40" cy="38" rx="18" ry="8"
                    fill="#fff"
                    opacity={isSelected ? '0.35' : '0.25'}
                />
            </svg>
        </div>
    );
}


const FireAnimation: React.FC = () => (
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none fire-hole-animation">
        {/* Glow effect */}
        <div
            className="absolute w-2/3 h-2/3 bg-orange-500 rounded-full blur-lg glow"
            style={{ opacity: 0.5 }}
        ></div>
        <div
            className="absolute w-1/2 h-1/2 bg-yellow-300 rounded-full blur-md glow"
            style={{ animationDelay: '0.3s' }}
        ></div>
        
        {/* Sparkles */}
        <div className="spark" style={{ width: '3px', height: '3px', animationDelay: '0s', left: '50%' }}></div>
        <div className="spark" style={{ width: '2px', height: '2px', animationDelay: '0.7s', left: '40%' }}></div>
        <div className="spark" style={{ width: '4px', height: '4px', animationDelay: '1.2s', left: '60%' }}></div>
        <div className="spark" style={{ width: '2px', height: '2px', animationDelay: '1.6s', left: '45%' }}></div>
    </div>
);


const Hole: React.FC<{
    children: React.ReactNode;
    isValidMove: boolean;
    onClick: () => void;
}> = ({ children, isValidMove, onClick }) => {
    return (
        <div className="w-12 h-12 sm:w-16 sm:h-16 flex justify-center items-center cursor-pointer" onClick={onClick}>
            {/* Darker, more defined hole to contrast with the new wood board */}
            <div className="relative w-full h-full rounded-full flex justify-center items-center bg-[#4d2f18] shadow-[inset_0_8px_10px_rgba(0,0,0,0.6)]">
                {/* Highlight on top edge for 3D effect */}
                <div className="absolute -top-px left-0 right-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/5 to-transparent"></div>
                
                {isValidMove && (
                    <div className="absolute w-full h-full rounded-full bg-green-500/30 shadow-[0_0_15px_5px_rgba(134,239,172,0.4)] animate-pulse"></div>
                )}
                {children}
            </div>
        </div>
    );
};

const Board: React.FC<BoardProps> = ({ board, selectedCell, validMoves, jumpedPeg, moveFrom, moveTo, onCellClick, isEndGame, isBlurred }) => {
    // ...existing code...
    const boardStyle = {
        backgroundImage: `
            linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-opacity='0.15' %3E%3Crect x='0' y='0' width='100' height='100' fill='%238a5a2b'/%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm56 20c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-28 50c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm56-22c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zM18 84c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm41-62c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-11 50c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-39-33c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z' fill='%2369431f'/%3E%3C/g%3E%3C/svg%3E")
        `,
        backgroundColor: '#8a5a2b',
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6), 0 10px 30px rgba(0,0,0,0.5)',
        borderWidth: '12px',
        borderStyle: 'solid',
        borderColor: '#5c3a1a #4a2f16 #4a2f16 #5c3a1a',
    };

    return (
        <div className="relative flex flex-col items-center">
            <div 
                style={boardStyle}
                className={`rounded-2xl p-4 sm:p-6 grid grid-cols-7 gap-1 sm:gap-2 ${typeof isBlurred !== 'undefined' && isBlurred ? 'blur-sm pointer-events-none brightness-90' : ''}`}
            >
                {board.map((row, r) =>
                    row.map((cell, c) => {
                        if (!cell) {
                            return <div key={`${r}-${c}`} className="w-12 h-12 sm:w-16 sm:h-16" />;
                        }

                        const isSelected = selectedCell?.row === r && selectedCell?.col === c;
                        const isValidMove = validMoves.some(m => m.row === r && m.col === c);
                        const isJumped = jumpedPeg?.row === r && jumpedPeg?.col === c;
                        const isTakeoff = moveFrom?.row === r && moveFrom?.col === c;
                        const isLanding = moveTo?.row === r && moveTo?.col === c;

                        const hasVisiblePeg = (cell.hasPeg || isJumped || isTakeoff) && !isLanding;

                        let pegAnimationState: PegAnimationState = 'idle';
                        if (isSelected) pegAnimationState = 'selected';
                        else if (isTakeoff) pegAnimationState = 'takeoff';
                        else if (isJumped) pegAnimationState = 'jumped';

                        return (
                            <Hole
                                key={`${r}-${c}`}
                                isValidMove={isValidMove && !cell.hasPeg}
                                onClick={() => onCellClick({ row: r, col: c })}
                            >
                               {hasVisiblePeg && <Peg animationState={pegAnimationState} />}
                               {isLanding && <Peg animationState="landing" />}
                               {isEndGame && !cell.hasPeg && <FireAnimation />}
                            </Hole>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default Board;