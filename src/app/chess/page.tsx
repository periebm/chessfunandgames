'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import { CircularProgress, Box, Typography } from '@mui/material';
import Cards from './components/Cards';
import InfoSpeedDial from './components/InfoSpeedDial';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import CountdownTimer from './components/CountdownTimer';
import { getPlayerStatus } from '../../api/chess';
import { jwtVerify } from 'jose';
import { useRouter } from 'next/navigation';

const HomePage: NextPage = () => {
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const router = useRouter();

  // Verifica o token ao carregar a página
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const tokenData = localStorage.getItem('authToken');

        if (!tokenData) {
          throw new Error('Token não encontrado');
        }

        const { token, expiry } = JSON.parse(tokenData);

        // Verifica se o token expirou
        if (Date.now() > expiry) {
          throw new Error('Token expirado');
        }

        // Verifica a assinatura do token
        const secret = new TextEncoder().encode(
          process.env.NEXT_PUBLIC_JWTSECRET
        );
        await jwtVerify(token, secret);

        setIsTokenValid(true);
      } catch (error) {
        console.error('Falha na verificação do token:', error);
        localStorage.removeItem('authToken');
        setIsTokenValid(false);
        router.push('/'); // Redireciona para a página de login
      }
    };

    verifyToken();
  }, [router]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['chessData'],
    queryFn: getPlayerStatus,
    enabled: isTokenValid === true, // Só faz a query se o token for válido
  });

  useEffect(() => {
    if (data) {
      console.log('Dados recebidos:', data);
    }
  }, [data]);

  // Mostra loading enquanto verifica o token
  if (isTokenValid === null) {
    return (
      <div className="min-h-screen bg-[#242321] flex items-center justify-center">
        <CircularProgress color="success" />
      </div>
    );
  }

  // Se o token for inválido, não mostra nada (já redirecionou)
  if (!isTokenValid) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#242321] text-white">
      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        <CountdownTimer />

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
            sx={{
              fontFamily: '"Times New Roman", serif',
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 1,
              color: '#f0d9b5',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              position: 'relative',
              '&::before, &::after': {
                content: '"♔"',
                color: '#b58863',
                fontSize: '1.5rem',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
              },
              '&::before': {
                left: '-40px',
              },
              '&::after': {
                right: '-40px',
              },
            }}
          >
            Xadrez - <span style={{ color: '#b58863' }}>1500 Rápidas</span> até
            Novembro/25
          </Typography>
        </Box>

        <InfoSpeedDial refetch={refetch} />

        {/* Container dos cards dos jogadores */}
        {Array.isArray(data) && data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {data.map((data, index) => (
              <Cards player={data} index={index} key={index} />
            ))}
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress color="success" />
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
