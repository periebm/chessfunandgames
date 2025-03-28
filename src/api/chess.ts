import axios from 'axios';
import { ChessPlayer, ChessProfile, PlayerStatus } from './types';

export async function getPlayerStatus() {
  const playersArray = ['periebm', 'tarcnux', 'rafael_azambuja'];
  const fixedRatings = {
    periebm: {
      chess_rapid: 1191,
      chess_blitz: 1040,
      chess_bullet: 1002,

    },
    rafael_azambuja: {
      chess_rapid: 1292,
      chess_blitz: 1239,
      chess_bullet: 720,
    },
    tarcnux: {
      chess_rapid: 1354,
      chess_blitz: 1104,
      chess_bullet: 914,
    },
  };

  // Melhores ratings por jogador
  const bestRatingsMar = {
    periebm: {
      chess_rapid: 1191,
    },
    rafael_azambuja: {
      chess_rapid: 1319,
    },
    tarcnux: {
      chess_rapid: 1484,
    },
  };
  const playerStats: PlayerStatus[] = [];

  for (const player of playersArray) {
    try {
      const informationResponse = await axios.get(
        `https://api.chess.com/pub/player/${player}`
      );

      const statsResponse = await axios.get(
        `https://api.chess.com/pub/player/${player}/stats`
      );

      // Extrai os dados do jogador
      const playerInfo: ChessPlayer = informationResponse.data;
      const playerData: ChessProfile = statsResponse.data;

      const playerObject: PlayerStatus = {
        avatar: playerInfo.avatar,
        url: playerInfo.url,
        name: playerInfo.name,
        username: playerInfo.username,
        last_online: playerInfo.last_online,
        status: playerInfo.status,
        ratings: {
          chess_rapid: playerData.chess_rapid
            ? {
                last: {
                  rating: playerData.chess_rapid.last.rating,
                  date: playerData.chess_rapid.last.date,
                },
                best: {
                  rating: playerData.chess_rapid.best.rating,
                  date: playerData.chess_rapid.best.date,
                  game: playerData.chess_rapid.best.game,
                },
                fixed_mar_26: {
                  rating: fixedRatings[player].chess_rapid,
                  best: bestRatingsMar[player].chess_rapid,
                },
              }
            : null,
          chess_bullet: playerData.chess_bullet
            ? {
                last: {
                  rating: playerData.chess_bullet.last.rating,
                  date: playerData.chess_bullet.last.date,
                },
                best: {
                  rating: playerData.chess_bullet.best?.rating || 0,
                  date: playerData.chess_bullet.best?.date || 0,
                  game: playerData.chess_bullet.best?.game || '',
                },
                fixed_mar_26: {
                  rating: fixedRatings[player].chess_bullet,
                },
              }
            : null,
          chess_blitz: playerData.chess_blitz
            ? {
                last: {
                  rating: playerData.chess_blitz.last.rating,
                  date: playerData.chess_blitz.last.date,
                },
                best: {
                  rating: playerData.chess_blitz.best.rating,
                  date: playerData.chess_blitz.best.date,
                  game: playerData.chess_blitz.best.game,
                },
                fixed_mar_26: {
                  rating: fixedRatings[player].chess_blitz,
                },
              }
            : null,
        },
      };

      // Adiciona o jogador ao array
      playerStats.push(playerObject);
    } catch (error) {
      console.error(`Erro ao buscar dados do jogador ${player}:`, error);
    }
  }

  console.log(`Dados`, playerStats);
  return playerStats;
}
