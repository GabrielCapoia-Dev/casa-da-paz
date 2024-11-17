'use client'; // Adicione esta linha no topo do arquivo

import React, { useState } from 'react';
import Footer from '../Footer/page';
import Header from '../Header/page';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Carousel } from 'react-bootstrap'; // Importando o Carousel do Bootstrap

const Sobre = () => {
  // Controlando o estado de expansão para cada seção
  const [isExpanded, setIsExpanded] = useState({
    historia: false,
    fazemos: false,
    ajudar: false,
    eventos: false
  });

  // Função para alternar a visibilidade do conteúdo
  const toggleContent = (section: keyof typeof isExpanded) => {
    setIsExpanded(prevState => ({
      ...prevState,
      [section]: !prevState[section] // Agora TypeScript sabe que 'section' é uma chave válida
    }));
  };
  const diretoria = [
    { name: "Rozelene Maria Corso Dalben", role: "Presidente", profession: "Funcionária pública aposentada", img: "/images/presidente.jpg" },
    { name: "Silvia Ribeiro Martins", role: "Vice-presidente", profession: "Farmacêutica aposentada", img: "/images/vicepresidente.jpg" },
    { name: "Anna Carla Ruiz Françolin", role: "Secretária", profession: "Advogada", img: "/images/secretaria.jpg" },
    { name: "Elyssandro Piffer", role: "Tesoureiro", profession: "Analista de Sistema e Professor Universitário", img: "/images/elyssandro.jpg" },
    { name: "Claudio Martins", role: "Segundo Tesoureiro", profession: "Comerciário", img: "/images/claudio.jpg" },
    { name: "Daniel Couto de Brito", role: "Conselheiro Fiscal", profession: "Comerciário", img: "/images/daniel.jpg" },
    { name: "Nair Serafim Gameiro", role: "Conselheira Fiscal", profession: "Professora aposentada", img: "/images/nair.jpg" },
    { name: "Mafalda Serafin Chagas", role: "Conselheira Fiscal", profession: "Professora aposentada", img: "/images/mafalda.jpg" },
    { name: "Maria Cleusa de Souza Silva", role: "Suplente", profession: "Professora aposentada", img: "/images/maria.jpg" }, // Corrigido para "cleusa.jpg"
    { name: "Paulino Alves de Almeida", role: "Suplente", profession: "Aposentado", img: "/images/paulino.jpg" },
    { name: "Amauri Aparecido Martins", role: "Suplente", profession: "Comerciário", img: "/images/amauri.jpg" }
  ];


  return (
    <div>
      <Header />

      {/* Banner superior */}
      <div
        className="d-flex align-items-center justify-content-center text-white text-center"
        style={{
          backgroundImage: "url('/images/bannersobre.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "30vh",
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h1>Bem-vindo à Casa da Paz</h1>
      </div>

      <section className="my-5">
        <div className="container">
          <div className="row">
            {/* Seções do conteúdo */}
            {/* Card para a seção Nossa História */}
            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h2 className="text-success">Nossa História</h2>
                  {isExpanded.historia ? (
                    <p>
                      A <strong>Casa da Paz</strong> é uma entidade sem fins lucrativos localizada em Umuarama, Paraná, dedicada a promover o bem-estar social e educacional de crianças e adolescentes. Fundada há mais de uma década, a instituição tem como principal objetivo oferecer oportunidades para o desenvolvimento integral da juventude em situação de vulnerabilidade social.
                    </p>
                  ) : null}
                  <div className="text-end">
                    {isExpanded.historia ? (
                      <button className="btn btn-link text-success" onClick={() => toggleContent('historia')}>
                        <FaChevronUp />
                      </button>
                    ) : (
                      <button className="btn btn-link text-success" onClick={() => toggleContent('historia')}>
                        <FaChevronDown />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Card para a seção O que Fazemos */}
            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h2 className="text-success">O que Fazemos</h2>
                  {isExpanded.fazemos ? (
                    <>
                      <p>
                        Através de uma equipe de voluntários comprometidos e parcerias com empresas e a comunidade, a Casa da Paz oferece uma variedade de atividades educacionais, culturais e recreativas. Entre nossos principais programas estão:
                      </p>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Oficinas de música, dança e teatro</li>
                        <li className="list-group-item">Aulas de reforço escolar e informática</li>
                        <li className="list-group-item">Atividades esportivas e lazer</li>
                        <li className="list-group-item">Eventos comunitários e campanhas de solidariedade</li>
                      </ul>
                    </>
                  ) : null}
                  <div className="text-end">
                    {isExpanded.fazemos ? (
                      <button className="btn btn-link text-success" onClick={() => toggleContent('fazemos')}>
                        <FaChevronUp />
                      </button>
                    ) : (
                      <button className="btn btn-link text-success" onClick={() => toggleContent('fazemos')}>
                        <FaChevronDown />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Card para a seção Como Ajudar */}
            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h2 className="text-success">Como Ajudar</h2>
                  {isExpanded.ajudar ? (
                    <p>
                      Nossa missão é sustentada por doações e pela renda gerada através de eventos e do bazar permanente, que acontece na sede da Casa da Paz. Doações de roupas, alimentos e outros itens são sempre bem-vindas. Para saber mais sobre como você pode contribuir, entre em contato conosco.
                    </p>
                  ) : null}
                  <div className="text-end">
                    {isExpanded.ajudar ? (
                      <button className="btn btn-link text-success" onClick={() => toggleContent('ajudar')}>
                        <FaChevronUp />
                      </button>
                    ) : (
                      <button className="btn btn-link text-success" onClick={() => toggleContent('ajudar')}>
                        <FaChevronDown />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Card para a seção Eventos Recentes */}
            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h2 className="text-success">Eventos Recentes</h2>
                  {isExpanded.eventos ? (
                    <p>
                      Recentemente, realizamos o <strong>Bazar da Casa da Paz</strong>, uma iniciativa que visa arrecadar fundos para continuar oferecendo nossas atividades gratuitamente para as crianças e adolescentes. Além disso, realizamos o <strong>Festival de Férias</strong>, que foi um sucesso com apresentações de teatro, dança e música pelos nossos alunos.
                    </p>
                  ) : null}
                  <div className="text-end">
                    {isExpanded.eventos ? (
                      <button className="btn btn-link text-success" onClick={() => toggleContent('eventos')}>
                        <FaChevronUp />
                      </button>
                    ) : (
                      <button className="btn btn-link text-success" onClick={() => toggleContent('eventos')}>
                        <FaChevronDown />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Diretoria - Carrossel */}
          <h2 className="text-center text-success my-5">Diretoria</h2>

          <Carousel>
            {diretoria.map((membro, index) => (
              <Carousel.Item key={index}>
                <div className="text-center">
                  <img
                    src={membro.img}
                    alt={membro.name}
                    className="d-block mx-auto rounded-circle"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                  <h5 className="mt-3">{membro.name}</h5>
                  <p>{membro.role}</p>
                  <p>{membro.profession}</p>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sobre;
