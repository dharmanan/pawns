export interface CellState {
  hasPeg: boolean;
}

export type BoardState = (CellState | null)[][];

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  from: Position;
  to: Position;
  jumped: Position;
}

export interface GameStats {
  gamesWon: number;
  totalScore: number;
  gamesPlayed: number;
  highScore: number;
  // unlockedBadges dizisi, seviyeye özel başarı takibi için değiştirildi.
  achievementsByLevel: { [level: number]: string[] };
}
