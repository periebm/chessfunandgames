/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Isso gera arquivos estáticos
  images: { unoptimized: true }, // Desativa otimização de imagens (necessário para deploy estático)
  // Se seu repositório NÃO for "<usuário>.github.io", adicione:
  basePath: process.env.NODE_ENV === 'production' ? '/chessfunandgames' : '', // Substitua pelo nome do seu repositório
};

module.exports = nextConfig;