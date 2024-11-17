"use client"; // Indica que este componente deve ser tratado como um Client Component

import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        {/* Navegação do rodapé */}
        <ul className="list-unstyled d-flex flex-wrap justify-content-center mb-3">
          <li className="mx-3">
            <Link href="/" className="text-white text-decoration-none">Início</Link>
          </li>
          <li className="mx-3">
            <Link href="/pages/Sobre" className="text-white text-decoration-none">Sobre Nós</Link>
          </li>
          <li className="mx-3">
            <Link href="/pages/Comoajudar" className="text-white text-decoration-none">Como Ajudar</Link>
          </li>
          <li className="mx-3">
            <Link href="/pages/Doacoes" className="text-white text-decoration-none">Doações</Link>
          </li>
          <li className="mx-3">
            <Link href="/pages/Galeria" className="text-white text-decoration-none">Galeria</Link>
          </li>
          <li className="mx-3">
            <Link href="/pages/Bazar" className="text-white text-decoration-none">Bazar</Link>
          </li>
          <li className="mx-3">
            <Link href="/pages/Premios" className="text-white text-decoration-none">Prêmios</Link>
          </li>
          <li className="mx-3">
            <Link href="/pages/Contato" className="text-white text-decoration-none">Contato</Link>
          </li>
        </ul>

        {/* Texto adicional */}
        <p className="text-center mb-2">
          &copy; 2024 Casa da Paz de Umuarama. Todos os direitos reservados.
        </p>
        <p className="text-center">
          Desenvolvido em parceria com a{' '}
          <a href="https://www.alfaumuarama.edu.br" target="_blank" className="text-white text-decoration-none">
            Faculdade ALFA Umuarama
          </a>,{' '}
          <a href="https://www.unipar.br" target="_blank" className="text-white text-decoration-none">
            UNIPAR-Umuarama-PR
          </a> e Instituto GRPCom
        </p>
      </div>
    </footer>
  );
};

export default Footer;
