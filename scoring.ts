
export const getScoreFromPegs = (pegs: number): number => {
    if (pegs === 1) return 200;
    if (pegs === 2) return 175;
    if (pegs === 3) return 150;
    if (pegs === 4) return 125;
    if (pegs === 5) return 100;
    if (pegs === 6) return 75;
    if (pegs === 7) return 50;
    if (pegs === 8) return 25;
    return 0;
};

export const getIntelligenceRatingKey = (pegs: number, raw: boolean = false): string => {
    const keyMap: { [key: number]: string } = {
        1: 'genius',
        2: 'intelligent',
        3: 'cunning',
        4: 'successful',
        5: 'normal',
        6: 'inexperienced',
        7: 'stupid',
        8: 'moron'
    };
    const key = keyMap[pegs] || 'brainless';
    return raw ? key : `ratings.${key}`;
};

export const ACHIEVEMENT_LEVELS = [
    { identifier: 'genius', pegs: 1, nameKey: 'achievements.genius.name', descriptionKey: 'achievements.genius.description' },
    { identifier: 'intelligent', pegs: 2, nameKey: 'achievements.intelligent.name', descriptionKey: 'achievements.intelligent.description' },
    { identifier: 'cunning', pegs: 3, nameKey: 'achievements.cunning.name', descriptionKey: 'achievements.cunning.description' },
    { identifier: 'successful', pegs: 4, nameKey: 'achievements.successful.name', descriptionKey: 'achievements.successful.description' },
    { identifier: 'normal', pegs: 5, nameKey: 'achievements.normal.name', descriptionKey: 'achievements.normal.description' },
    { identifier: 'inexperienced', pegs: 6, nameKey: 'achievements.inexperienced.name', descriptionKey: 'achievements.inexperienced.description' },
    { identifier: 'stupid', pegs: 7, nameKey: 'achievements.stupid.name', descriptionKey: 'achievements.stupid.description' },
    { identifier: 'moron', pegs: 8, nameKey: 'achievements.moron.name', descriptionKey: 'achievements.moron.description' },
    { identifier: 'brainless', pegs: 9, nameKey: 'achievements.brainless.name', descriptionKey: 'achievements.brainless.description' },
];