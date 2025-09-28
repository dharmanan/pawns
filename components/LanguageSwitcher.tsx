import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const getButtonClass = (lang: string) => {
        return `w-8 h-8 rounded-full overflow-hidden border-2 transition-all duration-200 ${
            i18n.language === lang 
                ? 'border-yellow-400 scale-110' 
                : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
        }`;
    };

    return (
        <div className="flex space-x-2 p-1 bg-black/20 rounded-full">
            <button onClick={() => changeLanguage('tr')} className={getButtonClass('tr')} title="Türkçe">
                <img src="https://flagcdn.com/w40/tr.png" alt="Turkish Flag" className="w-full h-full object-cover" />
            </button>
            <button onClick={() => changeLanguage('en')} className={getButtonClass('en')} title="English">
                <img src="https://flagcdn.com/w40/gb.png" alt="British Flag" className="w-full h-full object-cover" />
            </button>
        </div>
    );
};

export default LanguageSwitcher;
