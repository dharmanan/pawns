import React from 'react';
import { useTranslation } from 'react-i18next';
import { LEVELS } from '../levels';

interface LevelSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectLevel: (level: number) => void;
    highestUnlockedLevel: number;
}

const LevelSelectModal: React.FC<LevelSelectModalProps> = ({ isOpen, onClose, onSelectLevel, highestUnlockedLevel }) => {
    const { t } = useTranslation();
    if (!isOpen) return null;

    const handleLevelClick = (levelNumber: number) => {
        onSelectLevel(levelNumber);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 animate-fade-in p-4">
            <div className="bg-[#a0522d] border-4 border-[#8b4513] rounded-2xl p-6 sm:p-8 text-center text-white shadow-2xl animate-scale-up w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">{t('levelSelect.title')}</h2>
                    <button onClick={onClose} className="text-white hover:text-yellow-300 text-4xl leading-none">&times;</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {LEVELS.map((level, index) => {
                        const levelNumber = index + 1;
                        const isLocked = levelNumber > highestUnlockedLevel;

                        const buttonClasses = `p-4 rounded-lg text-2xl font-bold transition-all transform hover:scale-105 flex flex-col items-center justify-center aspect-square
                            ${isLocked
                                ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed filter grayscale'
                                : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
                            }`;

                        return (
                            <button
                                key={levelNumber}
                                disabled={isLocked}
                                onClick={() => !isLocked && handleLevelClick(levelNumber)}
                                className={buttonClasses}
                            >
                                {isLocked && (
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-2V6a4 4 0 00-4-4zm-2 4V6a2 2 0 114 0v2H8z" clipRule="evenodd" />
                                    </svg>
                                )}
                                <span>{levelNumber}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LevelSelectModal;