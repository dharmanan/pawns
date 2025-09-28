
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ControlsProps {
    onRestart: () => void;
    onOpenSidebar: () => void;
    onOpenLevelSelect: () => void;
    onOpenHelpModal: () => void;
}

// SVG Icons
const RestartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0121.5 12M20 20l-1.5-1.5A9 9 0 002.5 12" />
    </svg>
);

const LevelSelectIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

const StatsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const HelpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const Controls: React.FC<ControlsProps> = ({ onRestart, onOpenSidebar, onOpenLevelSelect, onOpenHelpModal }) => {
    const { t } = useTranslation();
    
    const buttonClasses = `
        flex items-center justify-center
        bg-gradient-to-b from-[#a0522d] to-[#8b4513] 
        text-white font-bold
        py-2 px-5 m-1
        rounded-lg 
        border border-[#5c3a1a] border-b-4 border-b-[#4a2f16]
        shadow-lg
        transition-all duration-150 ease-in-out
        transform 
        hover:from-[#b0623d] hover:to-[#9b5523] hover:-translate-y-px
        active:translate-y-px active:border-b-2 active:from-[#8b4513] active:to-[#a0522d]
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a472a] focus:ring-yellow-400
    `;

    return (
        <div className="mt-5 flex flex-wrap justify-center items-center">
            <button onClick={onRestart} className={buttonClasses}>
                <RestartIcon />
                <span>{t('controls.restart')}</span>
            </button>
            <button onClick={onOpenLevelSelect} className={buttonClasses}>
                <LevelSelectIcon />
                <span>{t('controls.selectLevel')}</span>
            </button>
            <button onClick={onOpenSidebar} className={buttonClasses}>
                <StatsIcon />
                <span>{t('controls.stats')}</span>
            </button>
            <button onClick={onOpenHelpModal} className={buttonClasses}>
                <HelpIcon />
                <span>{t('controls.help')}</span>
            </button>
        </div>
    );
};

export default Controls;
