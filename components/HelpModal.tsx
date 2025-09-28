
import React from 'react';
import { useTranslation } from 'react-i18next';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 animate-fade-in p-4">
            <div className="bg-[#a0522d] border-4 border-[#8b4513] rounded-2xl p-6 sm:p-8 text-white shadow-2xl animate-scale-up w-full max-w-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">{t('helpModal.title')}</h2>
                    <button onClick={onClose} className="text-white hover:text-yellow-300 text-4xl leading-none">&times;</button>
                </div>
                <div className="text-left space-y-6 text-lg">
                    <div>
                        <h3 className="text-xl font-semibold text-yellow-300 mb-2">{t('helpModal.rulesTitle')}</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>{t('helpModal.rulesPoint1')}</li>
                            <li>{t('helpModal.rulesPoint2')}</li>
                            <li>{t('helpModal.rulesPoint3')}</li>
                            <li>{t('helpModal.rulesPoint4')}</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-yellow-300 mb-1">{t('helpModal.levelUpTitle')}</h3>
                        <p>{t('helpModal.levelUpDescription')}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-yellow-300 mb-1">{t('helpModal.replayTitle')}</h3>
                        <p>{t('helpModal.replayDescription')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpModal;