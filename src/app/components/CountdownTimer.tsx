'use client';

import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

export default function CountdownTimer() {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    // Data final do desafio: 30 de novembro de 2025
    const endDate = new Date('2025-11-30T23:59:59');

    const updateCountdown = () => {
      const today = new Date();
      const diffTime = endDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays > 0 ? diffDays : 0);
    };

    // Atualiza imediatamente e depois a cada 24 horas
    updateCountdown();
    const interval = setInterval(updateCountdown, 86400000); // 24h em ms

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: { xs: 16, sm: 20 },
        left: { xs: 16, sm: 20 },
        zIndex: 99,
        backgroundColor: 'rgba(30, 30, 30, 0.9)',
        borderRadius: '8px',
        px: 2,
        py: 1,
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        border: '1px solid rgba(181, 136, 99, 0.3)',
        '&:hover': {
          backgroundColor: 'rgba(40, 40, 40, 0.95)',
        },
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontFamily: '"Times New Roman", serif',
          color: '#f0d9b5',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          '& span': {
            color: '#b58863',
            fontWeight: 'bolder',
          },
        }}
      >
        <span>{daysLeft}</span> dias até o término
      </Typography>
    </Box>
  );
}
