'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import {
  Paper,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { PlayerStatus } from '../../../api/types';
import { IoRefreshCircleOutline } from 'react-icons/io5';

export default function InfoSpeedDial({
  refetch,
}: {
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<PlayerStatus[], Error>>;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);
  const [infoVisible, setInfoVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = React.useState(false);

  const actions = [
    {
      icon: <IoRefreshCircleOutline />,
      name: 'Atualizar',
      onClick: () => refetch(),
    },
    {
      icon: infoVisible ? <CloseIcon /> : <InfoIcon />,
      name: infoVisible ? 'Fechar' : 'Informações',
      onClick: () => setInfoVisible(!infoVisible),
    },
  ];

  const handleDragStart = (e: React.MouseEvent) => {
    if (isMobile) return; // Desativa drag em mobile

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

  // Reset position on mobile when opening
  React.useEffect(() => {
    if (infoVisible && isMobile) {
      setPosition({ x: 0, y: 0 });
    }
  }, [infoVisible, isMobile]);

  return (
    <>
      {/* Caixa de informações (draggable) */}
      {infoVisible && (
        <Paper
          elevation={6}
          sx={{
            position: isMobile ? 'fixed' : 'fixed',
            top: isMobile ? 0 : `${position.y}px`,
            left: isMobile ? 0 : `${position.x}px`,
            width: isMobile ? '100%' : '1000px',
            maxWidth: '95vw',
            maxHeight: isMobile ? '80vh' : 'auto',
            overflowY: 'auto',
            zIndex: 1000,
            p: 3,
            bgcolor: 'rgba(30, 30, 30, 0.95)',
            color: 'white',
            cursor: isMobile ? 'default' : isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            border: isMobile ? 'none' : '1px solid rgba(255,255,255,0.1)',
            borderRadius: isMobile ? '0' : '8px',
          }}
          onMouseDown={handleDragStart}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#f0d9b5' }}
            >
              ♟️ Termos do Desafio de Rating
            </Typography>
            <IconButton
              size="small"
              onClick={() => setInfoVisible(false)}
              sx={{ color: 'white' }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography paragraph sx={{ mb: 2 }}>
              Fica estabelecido o presente compromisso desportivo, mediante o
              qual os participantes se obrigam, de forma livre e espontânea, a
              atingir o rating mínimo de <strong>1500 pontos</strong> na
              modalidade Rápidas até <strong>30 de novembro de 2025</strong>.
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 'bold', mt: 3, mb: 1, color: '#b58863' }}
            >
              1. Cláusula de Contribuição
            </Typography>
            <Typography paragraph sx={{ mb: 2 }}>
              O não atingimento da meta supracitada acarretará, por livre
              deliberação do participante, a obrigação de contribuir com o valor
              de <strong>R$ 300,00 (trezentos reais)</strong> para o fundo
              coletivo destinado a evento social (churrasco).
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 'bold', mt: 3, mb: 1, color: '#b58863' }}
            >
              2. Divisão de Responsabilidade
            </Typography>
            <Typography paragraph sx={{ mb: 2 }}>
              Caso múltiplos participantes não atinjam a meta, o valor total
              será rateado igualmente entre os inadimplentes.
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 'bold', mt: 3, mb: 1, color: '#b58863' }}
            >
              3. Cláusula de Exceção - Jogador periebm
            </Typography>
            <Typography paragraph sx={{ mb: 2 }}>
              Considerando sua condição inicial distinta (rating
              significativamente inferior), aplica-se regime especial:
            </Typography>
            <Box component="ul" sx={{ pl: 2, mt: 1, mb: 2 }}>
              <Box component="li" sx={{ mb: 1 }}>
                Se atingir rating entre <strong>1401 e 1499</strong>, a
                contribuição será reduzida para{' '}
                <strong>R$ 150,00 (cento e cinquenta reais)</strong>.
              </Box>
              <Box component="li">
                Persistindo o rateio com outros participantes, o valor será
                calculado <em>pro rata</em>.
              </Box>
            </Box>

            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 'bold', mt: 3, mb: 1, color: '#b58863' }}
            >
              4. Disposições Gerais
            </Typography>
            <Typography paragraph sx={{ mb: 2 }}>
              A verificação dos ratings será realizada em{' '}
              <strong>1º de dezembro de 2025</strong>, mediante print oficial do
              Chess.com. Eventuais divergências serão resolvidas por consenso
              entre os participantes.
            </Typography>
            <Typography
              variant="caption"
              sx={{ display: 'block', mt: 3, fontStyle: 'italic' }}
            >
              Este compromisso é firmado em espírito de fair play e incentivo ao
              desenvolvimento enxadrístico, sem caráter coercitivo. Apenas por
              diversão e para desenvolvimento pessoal :)
            </Typography>
          </Box>
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
          ariaLabel="SpeedDial ações"
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
              tooltipOpen // Mantém o tooltip sempre visível quando aberto
            />
          ))}
        </SpeedDial>
      </Box>
    </>
  );
}
