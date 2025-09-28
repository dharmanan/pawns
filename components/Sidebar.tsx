import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { GameStats } from '../types';
import StatsPanel from './StatsPanel';
import AchievementsPanel from './AchievementsPanel';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    stats: GameStats;
}

type ActiveTab = 'stats' | 'achievements';

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, stats }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<ActiveTab>('stats');

    const sidebarClasses = `fixed top-0 left-0 h-full bg-[#1a472a] bg-opacity-90 backdrop-blur-sm border-r-2 border-yellow-400/20 shadow-2xl z-50 w-full max-w-sm p-4 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`;
    const backdropClasses = `fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
    
    const getTabClasses = (tabName: ActiveTab) => {
        return `py-2 px-4 text-lg font-semibold rounded-t-lg cursor-pointer transition-colors ${
            activeTab === tabName
                ? 'bg-black/20 text-yellow-300 border-b-2 border-yellow-300'
                : 'text-white hover:bg-white/10'
        }`;
    };
    
    const allUnlockedBadges = useMemo(() => {
        return [...new Set(Object.values(stats.achievementsByLevel || {}).flat())];
    }, [stats.achievementsByLevel]);

    return (
        <>
            <div className={backdropClasses} onClick={onClose} />
            <aside className={sidebarClasses}>
                <div className="flex justify-between items-center mb-4">
                     <h2 className="text-2xl font-bold text-yellow-300">{t('sidebar.title')}</h2>
                     <button onClick={onClose} className="text-white hover:text-yellow-300 text-3xl leading-none">&times;</button>
                </div>
               
                <div className="border-b border-yellow-400/50 mb-4">
                    <nav className="flex space-x-2">
                        <button onClick={() => setActiveTab('stats')} className={getTabClasses('stats')}>
                            {t('sidebar.tabs.stats')}
                        </button>
                        <button onClick={() => setActiveTab('achievements')} className={getTabClasses('achievements')}>
                            {t('sidebar.tabs.achievements')}
                        </button>
                    </nav>
                </div>
                
                <div>
                    {activeTab === 'stats' && <StatsPanel stats={stats} />}
                    {activeTab === 'achievements' && <AchievementsPanel unlockedBadges={allUnlockedBadges} />}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;