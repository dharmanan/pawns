import React from 'react';
import { useTranslation } from 'react-i18next';
import { getScoreFromPegs, getIntelligenceRatingKey } from '../scoring';
import LanguageSwitcher from './LanguageSwitcher';

interface InfoPanelProps {
    pegCount: number;
    gameEnded: boolean;
    level: number;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ pegCount, gameEnded, level }) => {
    const { t } = useTranslation();
    
    const getIntelligenceRating = (pegs: number): string => {
        const score = getScoreFromPegs(pegs);
        const rating = t(getIntelligenceRatingKey(pegs));
        return t('ratingWithScore', { rating, score });
    };

    return (
        <div className="my-5 text-center w-full max-w-2xl px-2 sm:px-4">
            <div className="flex flex-col items-center">
                <LanguageSwitcher />
                <h1 className="game-title mt-2">{t('mainTitle')}</h1>
            </div>
            <div className="info-panel-details space-x-6">
                <h2 className="info-text">{t('level')}: {level}</h2>
                <h2 className="info-text">{t('pegsRemaining')}: {pegCount}</h2>
            </div>
            {gameEnded && (
                <h3 className="text-xl mt-2 text-yellow-300">
                    {t('result')}: {getIntelligenceRating(pegCount)}
                </h3>
            )}
        </div>
    );
};

export default InfoPanel;