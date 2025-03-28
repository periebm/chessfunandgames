import axios from 'axios';
import { ChessPlayer, ChessProfile } from './types';

export async function getPlayerStatus() {
  const playersArray = ['periebm', 'tarcnux', 'rafael_azambuja'];

  const playerStats = [];

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

      const playerObject = {
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
              }
            : null,
          chess_bullet: playerData.chess_bullet
            ? {
                last: {
                  rating: playerData.chess_bullet.last.rating,
                  date: playerData.chess_bullet.last.date,
                },
                best: {
                  rating: playerData.chess_bullet.best.rating,
                  date: playerData.chess_bullet.best.date,
                  game: playerData.chess_bullet.best.game,
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

  return playerStats;
}

/*
/
{
    "avatar": "https://images.chesscomfiles.com/uploads/v1/user/326053435.6c90b93d.200x200o.7575f5f8e190.jpg",
    "url": "https://www.chess.com/member/periebm",
    "name": "Péricles Elias Barros Mendes",
    "username": "periebm",
    "last_online": 1743197847,
    "status": "premium",
    "ratings": {
    "chess_rapid": {
        "last": {
            "rating": 1200,
            "date": 1743039425,
        },
        "best": {
            "rating": 1161,
            "date": 1738716773,
            "game": "https://www.chess.com/game/live/132453642951"
        },
    },
    "chess_bullet": {
        "last": {
            "rating": 1002,
            "date": 1736179249,
        },
        "best": {
            "rating": 1002,
            "date": 1736178715,
            "game": "https://www.chess.com/game/live/99417191911"
        },
    },
    "chess_blitz": {
        "last": {
            "rating": 1040,
            "date": 1742514822,
        },
        "best": {
            "rating": 1111,
            "date": 1738362342,
            "game": "https://www.chess.com/game/live/132100824181"
        },
    },
}


*/
