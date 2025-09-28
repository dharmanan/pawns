import React from 'react';
import { useTranslation } from 'react-i18next';
import { ACHIEVEMENT_LEVELS } from '../scoring';
import { CharacterIcon } from './Characters';

interface AchievementsPanelProps {
    unlockedBadges: string[];
}

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

const Badge: React.FC<{ name: string; description: string; isUnlocked: boolean; identifier: string; }> = ({ name, description, isUnlocked, identifier }) => {
    const unlockedStyle = "bg-yellow-500/10 border-yellow-500/30";
    const lockedStyle = "bg-gray-700/20 border-gray-500/30 filter grayscale";

    return (
        <div 
            title={isUnlocked ? `${name}: ${description}` : `Locked: ${description}`}
            className={`relative flex flex-col items-center justify-center p-2 rounded-lg border transition-transform transform hover:scale-105 ${isUnlocked ? unlockedStyle : lockedStyle}`}
        >
            <div className={`w-16 h-16 ${!isUnlocked ? 'opacity-50' : ''}`}>
                <CharacterIcon ratingName={characterNameMap[identifier]} />
            </div>
            <span className={`mt-1 text-xs font-semibold ${isUnlocked ? 'text-yellow-300' : 'text-gray-400'}`}>{name}</span>
            {!isUnlocked && (
                <div className="absolute top-1 right-1 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-2V6a4 4 0 00-4-4zm-2 4V6a2 2 0 114 0v2H8z" clipRule="evenodd" />
                    </svg>
                </div>
            )}
        </div>
    );
}

const AchievementsPanel: React.FC<AchievementsPanelProps> = ({ unlockedBadges }) => {
    const { t } = useTranslation();
    const unlockedSet = new Set(unlockedBadges);

    return (
        <div>
            <h4 className="text-lg font-bold mb-3 text-yellow-300 border-b-2 border-yellow-400/50 pb-1 text-center">{t('achievements.title')}</h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-2">
                {ACHIEVEMENT_LEVELS.map(level => (
                    <Badge 
                        key={level.identifier}
                        name={t(level.nameKey)}
                        description={t(level.descriptionKey)}
                        isUnlocked={unlockedSet.has(level.identifier)}
                        identifier={level.identifier}
                    />
                ))}
            </div>
        </div>
    );
};

export default AchievementsPanel;