import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { GameStats } from '../types';
import AchievementsPanel from './AchievementsPanel';

interface StatsPanelProps {
    stats: GameStats;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
    const { t } = useTranslation();
    const { gamesWon, totalScore, gamesPlayed, highScore, achievementsByLevel } = stats;
    const averageScore = gamesPlayed > 0 ? Math.round(totalScore / gamesPlayed) : 0;
    
    const allUnlockedBadges = useMemo(() => {
        return [...new Set(Object.values(achievementsByLevel || {}).flat())];
    }, [achievementsByLevel]);

    return (
        <div className="p-4 bg-black/20 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3 text-yellow-300 border-b-2 border-yellow-400/50 pb-2 text-center">{t('stats.title')}</h3>
            <div className="grid grid-cols-3 gap-4 text-lg mb-4">
                <div className="flex flex-col items-center">
                    <span className="font-semibold text-gray-300">{t('stats.won')}</span>
                    <span className="text-2xl font-bold text-white">{gamesWon}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-semibold text-gray-300">{t('stats.avgScore')}</span>
                    <span className="text-2xl font-bold text-white">{averageScore}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-semibold text-gray-300">{t('stats.highScore')}</span>
                    <span className="text-2xl font-bold text-white">{highScore}</span>
                </div>
            </div>
             <AchievementsPanel unlockedBadges={allUnlockedBadges} />
        </div>
    );
};

export default StatsPanel;