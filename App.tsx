
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Board from './components/Board';
import InfoPanel from './components/InfoPanel';
import Controls from './components/Controls';
import GameOverModal from './components/GameOverModal';
import Sidebar from './components/Sidebar';
import LevelSelectModal from './components/LevelSelectModal';
import HelpModal from './components/HelpModal'; // Import HelpModal
import { LEVELS } from './levels';
import { getScoreFromPegs, getIntelligenceRatingKey } from './scoring';
import type { BoardState, Position, GameStats } from './types';
import { playSound, stopSound } from './sounds';

const initialStats: GameStats = {
    gamesWon: 0,
    totalScore: 0,
    gamesPlayed: 0,
    highScore: 0,
    achievementsByLevel: {},
};

const App: React.FC = () => {
    const { t } = useTranslation();
    const [board, setBoard] = useState<BoardState>([]);
    // DEBUG: Log board state on every render
    useEffect(() => {
        console.log('Board state:', board);
    }, [board]);
    const [selectedCell, setSelectedCell] = useState<Position | null>(null);
    const [gameEnded, setGameEnded] = useState<boolean>(false);
    const [pegCount, setPegCount] = useState<number>(0);
    const [jumpedPeg, setJumpedPeg] = useState<Position | null>(null);
    const [level, setLevel] = useState<number>(1);
    const [moveFrom, setMoveFrom] = useState<Position | null>(null);
    const [moveTo, setMoveTo] = useState<Position | null>(null);
    const [stats, setStats] = useState<GameStats>(initialStats);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isLevelSelectOpen, setIsLevelSelectOpen] = useState<boolean>(false);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false); // State for Help Modal
    const [isEndGame, setIsEndGame] = useState<boolean>(false); // State for end-game animation


    // Load stats from localStorage on initial render
    useEffect(() => {
        try {
            const savedStats = localStorage.getItem('pegSolitaireStats');
            if (savedStats) {
                const parsedStats = JSON.parse(savedStats);
                if (!parsedStats.achievementsByLevel) {
                    parsedStats.achievementsByLevel = {};
                }
                setStats(parsedStats);
            }
        } catch (error) {
            console.error("Failed to load stats from localStorage", error);
        }
    }, []);

    // Save stats to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('pegSolitaireStats', JSON.stringify(stats));
        } catch (error) {
            console.error("Failed to save stats to localStorage", error);
        }
    }, [stats]);

    const initializeBoard = useCallback((levelToLoad: number) => {
        stopSound('suspense');
        const currentLevel = LEVELS[levelToLoad - 1];
        if (!currentLevel) {
            console.error("Level not found!");
            return;
        }

        let initialPegCount = 0;
        const newBoard = currentLevel.layout.map((row, r) =>
            row.map((cell, c) => {
                if (cell === 1) {
                    if (r === currentLevel.startHole.row && c === currentLevel.startHole.col) {
                        return { hasPeg: false };
                    }
                    initialPegCount++;
                    return { hasPeg: true };
                }
                return null;
            })
        );
        setBoard(newBoard);
        setSelectedCell(null);
        setGameEnded(false);
        setPegCount(initialPegCount);
        setJumpedPeg(null);
        setMoveFrom(null);
        setMoveTo(null);
        setIsEndGame(false);
        setLevel(levelToLoad);
    }, []);

    useEffect(() => {
        initializeBoard(1);
    }, [initializeBoard]);
    
    const getValidMoves = useCallback((fromCell: Position | null): Position[] => {
        if (!fromCell || !board[fromCell.row] || !board[fromCell.row][fromCell.col]?.hasPeg) {
            return [];
        }
        const moves: Position[] = [];
        const directions = [[-2, 0], [2, 0], [0, -2], [0, 2]];

        for (const [dr, dc] of directions) {
            const toRow = fromCell.row + dr;
            const toCol = fromCell.col + dc;
            const jumpedRow = fromCell.row + dr / 2;
            const jumpedCol = fromCell.col + dc / 2;

            if (
                toRow >= 0 && toRow < 7 && toCol >= 0 && toCol < 7 &&
                board[toRow]?.[toCol]?.hasPeg === false &&
                board[jumpedRow]?.[jumpedCol]?.hasPeg === true
            ) {
                moves.push({ row: toRow, col: toCol });
            }
        }
        return moves;
    }, [board]);
    
    const validMoves = useMemo(() => getValidMoves(selectedCell), [selectedCell, getValidMoves]);

    const hasAnyValidMoves = useCallback((): boolean => {
        for (let r = 0; r < 7; r++) {
            for (let c = 0; c < 7; c++) {
                if (board[r]?.[c]?.hasPeg) {
                    if (getValidMoves({ row: r, col: c }).length > 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }, [board, getValidMoves]);
    
    // Effect for handling end-game animation and suspense sound trigger
    useEffect(() => {
        // Only manage sounds if the game is active
        if (!gameEnded) {
            if (pegCount > 1 && pegCount <= 5) {
                setIsEndGame(true);
                playSound('suspense', true); // Start looping suspense sound
            } else {
                stopSound('suspense'); // Stop if peg count is not in range
                setIsEndGame(false); // Also reset animation state if pegs increase (e.g. undo)
            }
        } else {
            // Ensure sound is stopped when game ends
            stopSound('suspense');
        }

        // Cleanup on unmount
        return () => stopSound('suspense');
    }, [pegCount, gameEnded]);


    useEffect(() => {
        const initialPegCount = LEVELS[level - 1]?.layout.flat().filter(c => c === 1).length - 1;
        if (pegCount < initialPegCount && !gameEnded) {
            if (pegCount === 1 || !hasAnyValidMoves()) {
                setGameEnded(true);
                 const score = getScoreFromPegs(pegCount);
                 if (score >= 150) { // Cunning or better
                    playSound('win');
                 } else {
                    playSound('lose');
                 }
                 const newBadgeIdentifier = getIntelligenceRatingKey(pegCount, true); // Get the raw identifier

                setStats(prevStats => {
                    const newGamesPlayed = prevStats.gamesPlayed + 1;
                    const newTotalScore = prevStats.totalScore + score;
                    const newHighScore = Math.max(prevStats.highScore, score);
                    const newGamesWon = pegCount <= 3 ? prevStats.gamesWon + 1 : prevStats.gamesWon;
                    
                    const currentLevelBadges = prevStats.achievementsByLevel[level] || [];
                    const newLevelBadges = [...new Set([...currentLevelBadges, newBadgeIdentifier])];

                    return {
                        gamesPlayed: newGamesPlayed,
                        totalScore: newTotalScore,
                        highScore: newHighScore,
                        gamesWon: newGamesWon,
                        achievementsByLevel: {
                            ...prevStats.achievementsByLevel,
                            [level]: newLevelBadges,
                        },
                    };
                });
            }
        }
    }, [board, pegCount, gameEnded, hasAnyValidMoves, level]);


    const makeMove = useCallback((from: Position, to: Position) => {
        playSound('move');
        const jumpedRow = (from.row + to.row) / 2;
        const jumpedCol = (from.col + to.col) / 2;
        const jumpedPosition = { row: jumpedRow, col: jumpedCol };

        setMoveFrom(from);
        setMoveTo(to);
        setJumpedPeg(jumpedPosition);
        setSelectedCell(null);

        setTimeout(() => {
            const newBoard = board.map(row => row.map(cell => cell ? { ...cell } : null));

            newBoard[from.row][from.col]!.hasPeg = false;
            newBoard[jumpedRow][jumpedCol]!.hasPeg = false;
            newBoard[to.row][to.col]!.hasPeg = true;
            
            setBoard(newBoard);
            
            setPegCount(prev => prev - 1);
            
            setMoveFrom(null);
            setMoveTo(null);
            setJumpedPeg(null);
        }, 300);

    }, [board]);


    const handleCellClick = useCallback((pos: Position) => {
        if (gameEnded || jumpedPeg) return;

        const clickedCellHasPeg = board[pos.row]?.[pos.col]?.hasPeg;

        if (selectedCell) {
            if (selectedCell.row === pos.row && selectedCell.col === pos.col) {
                setSelectedCell(null);
                return;
            }

            const isMoveValid = validMoves.some(m => m.row === pos.row && m.col === pos.col);
            if (!clickedCellHasPeg && isMoveValid) {
                makeMove(selectedCell, pos);
            } else if (clickedCellHasPeg) {
                setSelectedCell(pos);
            } else {
                setSelectedCell(null);
            }
        } else {
            if (clickedCellHasPeg) {
                setSelectedCell(pos);
            }
        }
    }, [gameEnded, jumpedPeg, selectedCell, board, validMoves, makeMove]);

    const handleNextLevel = useCallback(() => {
        playSound('levelUp');
        const nextLevel = level + 1;
        if (nextLevel <= LEVELS.length) {
            initializeBoard(nextLevel);
        }
    }, [level, initializeBoard]);

    const handleSelectLevel = (selectedLevel: number) => {
        initializeBoard(selectedLevel);
        closeLevelSelect();
    };

    const highestUnlockedLevel = useMemo(() => {
        let maxLevel = 1;
        // Use raw identifiers for logic
        const requiredBadgeIdentifiers = new Set(['genius', 'intelligent', 'cunning']);
        
        for (let i = 1; i < LEVELS.length; i++) {
            const levelAchievements = stats.achievementsByLevel[i] || [];
            const hasRequiredBadge = levelAchievements.some(badgeIdentifier => requiredBadgeIdentifiers.has(badgeIdentifier));
            if (hasRequiredBadge) {
                maxLevel = i + 1;
            } else {
                break; 
            }
        }
        return maxLevel;
    }, [stats.achievementsByLevel]);

    const openSidebar = () => setIsSidebarOpen(true);
    const closeSidebar = () => setIsSidebarOpen(false);
    const openLevelSelect = () => setIsLevelSelectOpen(true);
    const closeLevelSelect = () => setIsLevelSelectOpen(false);
    const openHelpModal = () => setIsHelpModalOpen(true);
    const closeHelpModal = () => setIsHelpModalOpen(false);

            // DEBUG: Log Board props before render
            console.log('Board props:', {
                board,
                selectedCell,
                validMoves,
                jumpedPeg,
                moveFrom,
                moveTo,
                isEndGame
            });
    return (
        <div className="text-white min-h-screen font-sans p-4">
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} stats={stats} />
            <LevelSelectModal 
                isOpen={isLevelSelectOpen}
                onClose={closeLevelSelect}
                onSelectLevel={handleSelectLevel}
                highestUnlockedLevel={highestUnlockedLevel}
            />
            <HelpModal isOpen={isHelpModalOpen} onClose={closeHelpModal} />
            <div className="container mx-auto flex flex-col justify-center items-center">
                <main className="flex flex-col items-center">
                    <InfoPanel 
                        pegCount={pegCount} 
                        gameEnded={gameEnded} 
                        level={level}
                    />
                    <Board 
                        board={board}
                        selectedCell={selectedCell}
                        validMoves={validMoves}
                        jumpedPeg={jumpedPeg}
                        moveFrom={moveFrom}
                        moveTo={moveTo}
                        onCellClick={handleCellClick}
                        isEndGame={isEndGame}
                    />
                    <Controls 
                        onRestart={() => initializeBoard(level)}
                        onOpenSidebar={openSidebar}
                        onOpenLevelSelect={openLevelSelect}
                        onOpenHelpModal={openHelpModal}
                    />
                    {/* Sosyal medya butonları: Kontrollerin hemen altında ortalanmış */}
                    <div className="flex justify-center items-center space-x-6 mt-6 mb-2">
                        <a href="https://github.com/dharmanan" target="_blank" rel="noopener noreferrer" className="bg-black/60 hover:bg-black/80 rounded-full p-2 shadow-lg transition">
                            {/* Classic GitHub logo SVG */}
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.528 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.34-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.099 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.565 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.578.688.48A10.013 10.013 0 0022 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com/KohenEric" target="_blank" rel="noopener noreferrer" className="bg-black/60 hover:bg-black/80 rounded-full p-2 shadow-lg transition">
                            {/* X (Twitter) logo SVG */}
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                                <path d="M17.53 3H21L14.19 10.59L22.13 21H15.68L10.68 14.19L4.99 21H1.92L9.13 13.01L1.47 3H8.07L12.65 9.23L17.53 3ZM16.36 19H18.19L7.75 5H5.81L16.36 19Z" />
                            </svg>
                        </a>
                    </div>
                </main>
            </div>
            {gameEnded && (
                <GameOverModal 
                    pegCount={pegCount}
                    onRestart={() => initializeBoard(level)}
                    onNextLevel={handleNextLevel}
                    level={level}
                />
            )}
        </div>
    );
};

export default App;
