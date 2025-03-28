'use client';

import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  Tooltip,
  Grid,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import Link from '@mui/material/Link';
import { PlayerStatus } from '../../../api/types';

export default function Cards({
  player,
  index,
}: {
  player: PlayerStatus;
  index: number;
}) {
  // Dados de exemplo - substitua pelos seus dados reais
  const ratingData = [
    {
      type: 'Rápidas',
      initial: player.ratings.chess_rapid.fixed_mar_26.rating,
      current: player.ratings.chess_rapid.last, // Exemplo de variação
      color: 'rgb(74, 222, 128)',
      tooltip: `Maior rating no início do desafio (26/03/25): ${player.ratings.chess_rapid.fixed_mar_26.best}`,
    },
    {
      type: 'Blitz',
      initial: player.ratings.chess_blitz.fixed_mar_26.rating,
      current: player.ratings.chess_blitz.last,
      color: '#FAD541',
    },
    {
      type: 'Bullet',
      initial: player.ratings.chess_bullet.fixed_mar_26.rating,
      current: player.ratings.chess_bullet.last,
      color: '#E3AA24',
    },
    /*     {
      type: 'Táticas',
      initial: player.tacticsRating,
      current: player.tacticsRating + 30,
      color: '#FA742C',
    }, */
  ];

  return (
    <Card
      key={index}
      sx={{
        background: 'rgba(30, 30, 30, 0.8)',
        color: 'white',
        borderRadius: '10px',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Linha com Avatar e Nome */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            mb: 3,
          }}
        >
          <Avatar
            src={player.avatar}
            alt={player.username}
            sx={{
              width: 70,
              height: 70,
              border: '2px solid rgba(255,255,255,0.1)',
            }}
          />

          <Divider
            orientation="vertical"
            flexItem
            sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}
          />

          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 'bold',
              flexGrow: 1,
            }}
          >
            {player.username}
          </Typography>

          {/* Link para o perfil - Adicione esta parte */}
          <Link
            href={`https://www.chess.com/member/${player.username}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              '&:hover': {
                color: 'rgb(74, 222, 128)',
                textDecoration: 'underline',
              },
              fontSize: '0.875rem',
              ml: 'auto', // Isso empurra o link para a direita
              pr: 2, // Espaçamento à direita
            }}
          >
            Ir para perfil
          </Link>
        </Box>

        {/* Cabeçalho das colunas */}
        <Grid container spacing={1} sx={{ mb: 1, px: 1.5 }}>
          <Grid item xs={5}>
            <Typography variant="subtitle2" color="white"></Typography>
          </Grid>
          <Grid item xs={3.5}>
            <Typography variant="subtitle2" color="white">
              Rating Inicial
            </Typography>
          </Grid>
          <Grid item xs={3.5}>
            <Typography variant="subtitle2" color="white">
              Rating Atual
            </Typography>
          </Grid>
        </Grid>

        {/* Ratings em formato de tabela */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {ratingData.map((rating, i) => (
            <Box
              key={i}
              sx={{
                p: 1,
                borderRadius: '6px',
                bgcolor:
                  rating.type === 'Rápidas'
                    ? 'rgba(74, 222, 128, 0.15)'
                    : 'transparent',
              }}
            >
              <Grid container spacing={1} alignItems="center">
                {/* Coluna Modalidade */}
                <Grid item xs={5}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography sx={{ color: 'white' }}>
                      {rating.type}
                    </Typography>
                    {rating.tooltip && (
                      <Tooltip title={rating.tooltip} arrow>
                        <InfoIcon
                          fontSize="small"
                          sx={{ color: 'rgba(255,255,255,0.5)' }}
                        />
                      </Tooltip>
                    )}
                  </Box>
                </Grid>

                {/* Coluna Rating Inicial */}
                <Grid item xs={3.5}>
                  <Typography
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      color: rating.color,
                    }}
                  >
                    {rating.initial}
                  </Typography>
                </Grid>

                {/* Coluna Rating Atual */}
                <Grid item xs={3.5}>
                  <Typography
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      color: rating.color,
                    }}
                  >
                    {rating.current.rating}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
