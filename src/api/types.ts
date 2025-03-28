type ChessStats = {
  last: {
    rating: number;
    date: number;
    rd: number;
  };
  best: {
    rating: number;
    date: number;
    game: string;
  };
  record: {
    win: number;
    loss: number;
    draw: number;
    time_per_move?: number;
    timeout_percent?: number;
  };
};

type TacticsStats = {
  highest: {
    rating: number;
    date: number;
  };
  lowest: {
    rating: number;
    date: number;
  };
};

type PuzzleRushStats = {
  best: {
    total_attempts: number;
    score: number;
  };
};

export type ChessProfile = {
  chess_daily: ChessStats;
  chess_rapid: ChessStats;
  chess_bullet: ChessStats;
  chess_blitz: ChessStats;
  fide: number;
  tactics: TacticsStats;
  puzzle_rush: PuzzleRushStats;
};

export type ChessPlayer = {
  avatar: string;
  player_id: number;
  '@id': string;
  url: string;
  name: string;
  username: string;
  followers: number;
  country: string;
  last_online: number;
  joined: number;
  status: string;
  is_streamer: boolean;
  verified: boolean;
  league: string;
  streaming_platforms: string[];
};

type ChessRating = {
  last: {
    rating: number;
    date: number;
  };
  best: {
    rating: number;
    date: number;
    game: string;
  };
  fixed_mar_26?: {
    // Adicionando o novo campo opcional
    rating: number;
    best?: number; // Para indicar se é o maior rating do jogador
  };
};

export type PlayerRatings = {
  chess_rapid: ChessRating | null;
  chess_bullet: ChessRating | null;
  chess_blitz: ChessRating | null;
};

export type PlayerStatus = {
  avatar: string;
  url: string;
  name: string;
  username: string;
  last_online: number;
  status: string;
  ratings: PlayerRatings;
};
