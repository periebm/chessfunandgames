'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import { CircularProgress, Box, Typography } from '@mui/material';
import Cards from './components/Cards';
import InfoSpeedDial from './components/InfoSpeedDial';

const HomePage: NextPage = () => {
  // Dados estáticos dos jogadores (substitua pelos dados reais)
  const players = [
    {
      username: 'chessmaster123',
      image: '/player1.jpg', // Substitua pelas imagens reais
      rapidRating: 1850,
      blitzRating: 1720,
      bulletRating: 1680,
      tacticsRating: 2100,
    },
    {
      username: 'grandmasterX',
      image: '/player2.jpg',
      rapidRating: 2450,
      blitzRating: 2380,
      bulletRating: 2320,
      tacticsRating: 2650,
    },
    {
      username: 'openingexpert',
      image: '/player3.jpg',
      rapidRating: 2200,
      blitzRating: 2150,
      bulletRating: 2080,
      tacticsRating: 2500,
    },
  ];
  /*
  peri: rapidas: 1191
           maior: 1191
        blitz: 1040
        bullet: 1002

  rafa: rapidas: 1292
            maior: 1319
        blitz: 1239
        bullet: 1002
        problemas: 2128

  tata: rapidas: 1354
            maior: 1484 
        blitz: 1104
        bullet: 914
        problemas: 2348
  */
  const isLoading = true;
  const error = false;

  return (
    <div className="min-h-screen bg-[#242321] text-white">
      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        {/* Área da logo */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            my: 4,
          }}
        >
          <Image
            src="/logo.png"
            alt="Chess Status Logo"
            width={200}
            height={200}
          />

          <Typography
            variant="h3"
            component="h1"
            className="text-center font-bold mb-1"
          >
            Chess Status
          </Typography>
        </Box>

        <InfoSpeedDial />

        {/* Container dos cards dos jogadores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {players.map((player, index) => (
            <Cards player={player} index={index} key={index} />
          ))}
        </div>

        {/* Loading state */}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress color="success"/>
          </Box>
        )}

        {/* Error state */}
        {error && (
          <Typography color="error" className="my-4">
            Erro ao carregar dados
          </Typography>
        )}
      </main>
    </div>
  );
};

export default HomePage;
