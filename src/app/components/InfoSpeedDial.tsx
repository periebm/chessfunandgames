'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { Paper, Typography, IconButton } from '@mui/material';

export default function InfoSpeedDial() {
  const [open, setOpen] = React.useState(false);
  const [infoVisible, setInfoVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = React.useState(false);

  const actions = [
    {
      icon: infoVisible ? <CloseIcon /> : <InfoIcon />,
      name: infoVisible ? 'Fechar' : 'Informações',
      onClick: () => setInfoVisible(!infoVisible),
    },
  ];

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - startX,
        y: e.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      {/* Caixa de informações (draggable) */}
      {infoVisible && (
        <Paper
          elevation={6}
          sx={{
            position: 'fixed',
            top: `${position.y}px`,
            left: `${position.x}px`,
            width: '300px',
            zIndex: 1000,
            p: 2,
            bgcolor: 'rgba(0, 0, 0, 0.3)',
            color: 'white',
            cursor: isDragging ? 'grabbing' : 'grab ',
            userSelect: 'none',
          }}
          onMouseDown={handleDragStart}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" gutterBottom>
              Informações
            </Typography>
            <IconButton
              size="small"
              onClick={() => setInfoVisible(false)}
              sx={{
                ml: 2,
                color: 'white',
              }}
            >
              <CloseIcon fontSize="small" className="" />
            </IconButton>
          </Box>
          <Typography variant="body2">
            Este é um painel de informações sobre o Chess Status. Aqui você pode
            ver os ratings de três jogadores de xadrez em diferentes
            modalidades: Rápidas, Blitz, Bullet e Táticas. Os dados são obtidos
            através da API do Chess.com.
          </Typography>
        </Paper>
      )}

      {/* SpeedDial */}
      <Box
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          transform: 'translateZ(0px)',
          zIndex: 100,
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial informativo"
          icon={<SpeedDialIcon />}
          direction="down"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
            />
          ))}
        </SpeedDial>
      </Box>
    </>
  );
}
