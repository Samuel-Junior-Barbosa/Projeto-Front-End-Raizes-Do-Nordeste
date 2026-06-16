import { useState, useEffect } from 'react';

export default function Navbar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;

      // Se rolou para baixo e passou do tamanho da barra (60px), esconde
      if (currentScroll > lastScroll && currentScroll > 60) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      // Evita valores negativos de scroll (comum no iOS)
      lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    
    // Limpeza do evento ao desmontar o componente (evita memory leak)
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      style={{
        position: 'fixed',
        top: hidden ? '-70px' : '0', // Esconde jogando para fora da tela
        left: 0,
        width: '100%',
        height: '60px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        transition: 'top 0.3s ease-in-out', // Transição suave
        zIndex: 1000,
        display: 'flex',
        align-items: 'center',
        justify-content: 'space-around'
      }}
    >
      <a href="#inicio">Início</a>
      <a href="#links">Links</a>
      <a href="#config">Opções</a>
    </nav>
  );
}
