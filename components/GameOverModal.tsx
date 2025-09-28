import React from 'react';
import { useTranslation } from 'react-i18next';
import { LEVELS } from '../levels';
import { getScoreFromPegs, getIntelligenceRatingKey } from '../scoring';
import { CharacterIcon } from './Characters';

interface GameOverModalProps {
    pegCount: number;
    onRestart: () => void;
    onNextLevel: () => void;
    level: number;
}

const Character: React.FC<{ pegCount: number }> = ({ pegCount }) => {
    const ratingKey = getIntelligenceRatingKey(pegCount, true);
    // CharacterIcon expects the identifier ('genius', 'cunning') not the full translation key.
    // The mapping from identifier to component is internal to Characters.tsx
    // The identifier is language-agnostic, so we need to map our translated keys back or just use the raw key.
    const characterNameMap: Record<string, string> = {
        'genius': 'Bilgin',
        'intelligent': 'Zeki',
        'cunning': 'Kurnaz',
        'successful': 'Başarılı',
        'normal': 'Normal',
        'inexperienced': 'Tecrübesiz',
        'stupid': 'Aptal',
        'moron': 'Geri Zekalı',
        'brainless': 'Beyinsiz',
    };

    return (
        <div className="w-36 h-36 mx-auto animate-pop-in drop-shadow-lg">
           <CharacterIcon ratingName={characterNameMap[ratingKey]} />
        </div>
    );
};

const GameOverModal: React.FC<GameOverModalProps> = ({ pegCount, onRestart, onNextLevel, level }) => {
    const { t } = useTranslation();
    const canAdvance = pegCount <= 3;
    const isLastLevel = level === LEVELS.length;
    
    const getIntelligenceRating = (pegs: number): string => {
        const score = getScoreFromPegs(pegs);
        const rating = t(getIntelligenceRatingKey(pegs));
        return t('ratingWithScore', { rating, score });
    };

    const renderButton = () => {
        if (canAdvance && !isLastLevel) {
            return (
                 <button
                    onClick={onNextLevel}
                    className="bg-green-600 hover:bg-green-700 text-white border-none py-3 px-8 rounded-lg cursor-pointer text-xl font-semibold transition-transform transform hover:scale-105"
                >
                    {t('gameOver.nextLevel')}
                </button>
            );
        }
        return (
            <button
                onClick={onRestart}
                className="bg-gray-600 hover:bg-gray-700 text-white border-none py-3 px-8 rounded-lg cursor-pointer text-xl font-semibold transition-transform transform hover:scale-105"
            >
                {t('gameOver.playAgain')}
            </button>
        );
    };
    
    const renderTitle = () => {
        if (canAdvance && isLastLevel) {
            return t('gameOver.congratulations');
        }
        return t('gameOver.title');
    }
    
    const renderMessage = () => {
        if (canAdvance && isLastLevel) {
            return <h3 className="text-2xl mt-4 font-semibold">{t('gameOver.allLevelsCompleted')}</h3>;
        }
        return <h3 className="text-2xl mt-4 font-semibold">{getIntelligenceRating(pegCount)}</h3>
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 animate-fade-in p-4">
            <div className="bg-[#a0522d] border-4 border-[#8b4513] rounded-2xl p-6 sm:p-8 text-center text-white shadow-2xl animate-scale-up w-full max-w-sm">
                <h2 className="text-4xl font-bold mb-4">{renderTitle()}</h2>
                <Character pegCount={pegCount} />
                {renderMessage()}
                <p className="text-lg mb-6">{t('pegsRemaining')}: {pegCount}</p>
                {renderButton()}
            </div>
        </div>
    );
};

export default GameOverModal;