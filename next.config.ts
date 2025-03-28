const nextConfig = {
  output: 'export', // Gera HTML/JS estáticos para GitHub Pages
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '', // Opcional: necessário se estiver em um subdiretório (ex: /meu-repo)
  images: { unoptimized: true }, // Desativa otimização de imagens (necessário para `output: export`)
};

module.exports = nextConfig;
