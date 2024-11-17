"use client"; // Indica que este é um Client Component

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Função que lida com a mudança de cor ao rolar a tela
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Altere o valor conforme necessário
    };

    // Limpa o evento ao desmontar
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <>
      <header
        style={{
          backgroundColor: 'rgba(100, 100, 100, 0.9)',
          color: '#343534',
          position: 'fixed',
          width: '100%',
          zIndex: 1,
          transition: 'background-color 0.3s, color 0.3s',
          top: 0,
        }}
        className="py-3 shadow-sm"
      >
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className={`h5 ${isScrolled ? 'text-success' : 'text-white'}`}>Casa da Paz</h1>

          <button
            className="d-md-none btn"
            aria-label="Toggle menu"
            style={{
              fontSize: '1.5rem',
              background: 'none',
              border: 'none',
              color: '#ffffff'
            }}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <nav
            className={`d-md-flex ${isMenuOpen ? 'd-flex' : 'd-none'} flex-column flex-md-row align-items-center`}
            style={{
              position: isMenuOpen ? 'absolute' : 'relative',
              top: isMenuOpen ? '0' : 'auto',
              right: isMenuOpen ? '0' : 'auto',
              backgroundColor: isMenuOpen ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
              minWidth: isMenuOpen ? '100vw' : 'auto',
              height: isMenuOpen ? '100vh' : 'auto',
              transition: '0.3s ease-in-out',
              color: '#3c3d3c',
            }}
          >
            <ul className="nav flex-column flex-md-row text-center">
              <li className="nav-item">
                <Link href="/" className={`nav-link ${isScrolled || isMenuOpen ? 'text-success' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>Início</Link>
              </li>
              <li className="nav-item">
                <Link href="/pages/Sobre" className={`nav-link ${isScrolled || isMenuOpen ? 'text-success' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>Sobre Nós</Link>
              </li>
              <li className="nav-item">
                <Link href="/pages/Doacoes" className={`nav-link ${isScrolled || isMenuOpen ? 'text-success' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>Doações</Link>
              </li>
              <li className="nav-item">
                <Link href="/pages/Galeria" className={`nav-link ${isScrolled || isMenuOpen ? 'text-success' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>Galeria</Link>
              </li>
              <li className="nav-item">
                <Link href="/pages/Bazar" className={`nav-link ${isScrolled || isMenuOpen ? 'text-success' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>Bazar</Link>
              </li>
              <li className="nav-item">
                <Link href="/pages/Premios" className={`nav-link ${isScrolled || isMenuOpen ? 'text-success' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>Prêmios</Link>
              </li>
              <li className="nav-item">
                <Link href="/pages/Contato" className={`nav-link ${isScrolled || isMenuOpen ? 'text-success' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>Contato</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <br />
      <br />
      <br />
    </>
  );
}
