'use client';

import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { SignJWT } from 'jose';

const HomePage: NextPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    // Substitua 'senha123' pela senha real que você deseja usar
    if (password === process.env.NEXT_PUBLIC_SENHA) {
      try {
        // Chave secreta - EM PRODUÇÃO, ISSO DEVE VIR DE UM .ENV SEGURO
        const secret = new TextEncoder().encode(
          process.env.NEXT_PUBLIC_JWTSECRET
        );

        // Tempo de expiração (24 horas a partir de agora)
        const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

        // Gerar JWT
        const jwt = await new SignJWT({
          // Dados que você quer incluir no token
          authenticated: true,
          role: 'USER', // ou qualquer role que você queira definir
        })
          .setProtectedHeader({ alg: 'HS256' }) // Algoritmo HMAC-SHA256
          .setIssuedAt()
          .setExpirationTime(expirationTime) // 24 horas
          .sign(secret);

        // Salvar no localStorage
        const tokenData = {
          token: jwt,
          expiry: expirationTime * 1000, // Convertendo para milissegundos
        };
        localStorage.setItem('authToken', JSON.stringify(tokenData));

        // Redirecionar para a página /chess
        router.push('/chess');
      } catch (err) {
        console.error('Erro ao gerar token:', err);
        setError('Erro durante a autenticação');
      }
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-[#242321] text-white flex items-center justify-center">
      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        {/* Título do xadrez */}
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontFamily: '"Times New Roman", serif',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4,
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

        {/* Caixa de login */}
        <Box
          sx={{
            backgroundColor: '#1a1a1a',
            padding: '2rem',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ mb: 2, textAlign: 'center', color: '#f0d9b5' }}
          >
            Acesso Restrito
          </Typography>

          <TextField
            fullWidth
            label="Senha"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#b58863',
                },
                '&:hover fieldset': {
                  borderColor: '#f0d9b5',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#b58863',
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
            }}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              backgroundColor: '#b58863',
              '&:hover': {
                backgroundColor: '#f0d9b5',
                color: '#1a1a1a',
              },
            }}
          >
            Entrar
          </Button>
        </Box>
      </main>
    </div>
  );
};

export default HomePage;
