
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
}

type PegAnimationState = 'idle' | 'selected' | 'jumped' | 'takeoff' | 'landing';

const Peg: React.FC<{ animationState: PegAnimationState }> = ({ animationState }) => {
    const isSelected = animationState === 'selected';
    
    const animationClasses: Record<PegAnimationState, string> = {
        idle: '',
        selected: 'animate-float',
        jumped: 'animate-fade-out-shrink',
        takeoff: 'animate-takeoff',
        landing: 'animate-land',
    };

    const pegBaseClasses = 'w-full h-full rounded-full transition-all duration-300 relative';
    
    // Inspired by user-provided image: Creamy marble with wood-like grain.
    const normalPegClasses = `
        bg-[#e0d8c0]
        bg-[image:radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0)_50%),linear-gradient(135deg,rgba(139,69,19,0.3)_0%,rgba(139,69,19,0)_50%),linear-gradient(45deg,rgba(160,82,45,0.35)_30%,rgba(160,82,45,0)_70%),linear-gradient(220deg,rgba(101,67,33,0.25)_20%,rgba(101,67,33,0)_60%)]
        shadow-[inset_0_3px_5px_rgba(255,255,255,0.6),inset_0_-5px_10px_rgba(50,20,0,0.5),0_5px_15px_rgba(0,0,0,0.3)]
    `;

    // Inspired by user-provided image: White marble with sharp, shiny gold veins.
    const selectedPegClasses = `
        bg-white
        bg-[image:radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0)_45%),linear-gradient(165deg,transparent_45%,rgba(218,165,32,0.7)_48%,rgba(255,215,0,0.6)_50%,rgba(184,134,11,0.7)_52%,transparent_55%),linear-gradient(25deg,transparent_30%,rgba(218,165,32,0.5)_48%,rgba(184,134,11,0.6)_52%,transparent_70%),radial-gradient(ellipse_at_90%_80%,#e0e0e0,#f8f8f8_80%)]
        shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),inset_0_-4px_8px_rgba(0,0,0,0.3),0_8px_20px_rgba(0,0,0,0.4)]
    `;

    return (
        <div className={`relative w-11/12 h-11/12 ${animationClasses[animationState]}`}>
            <div className={`${pegBaseClasses} ${isSelected ? selectedPegClasses : normalPegClasses}`}>
                {/* Visuals are now handled by the parent div's classes */}
            </div>
        </div>
    );
};

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

const Board: React.FC<BoardProps> = ({ board, selectedCell, validMoves, jumpedPeg, moveFrom, moveTo, onCellClick, isEndGame }) => {
    // New, realistic wood texture for the board using an inline SVG for the grain.
    const boardStyle = {
        backgroundImage: `
            linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-opacity='0.15' %3E%3Crect x='0' y='0' width='100' height='100' fill='%238a5a2b'/%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm56 20c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-28 50c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm56-22c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zM18 84c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm41-62c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-11 50c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-39-33c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z' fill='%2369431f'/%3E%3C/g%3E%3C/svg%3E")
        `,
        backgroundColor: '#8a5a2b',
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6), 0 10px 30px rgba(0,0,0,0.5)',
        borderWidth: '12px',
        borderStyle: 'solid',
        borderColor: '#5c3a1a #4a2f16 #4a2f16 #5c3a1a', // Simulates 3D beveling
    };
    
    return (
        <div 
            style={boardStyle}
            className="rounded-2xl p-4 sm:p-6 grid grid-cols-7 gap-1 sm:gap-2"
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
    );
};

export default Board;