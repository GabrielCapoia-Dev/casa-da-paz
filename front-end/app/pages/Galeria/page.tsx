"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Carousel, Card } from "react-bootstrap";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Footer/page";
import Header from '../Header/page';

interface IEvent {
  id: number;
  nome: string;
  data: string;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface IImage {
  id?: number;
  url_imagem: string;
  evento_id?: number | null;
}

const GaleriaSite = () => {
  const [dadosEventos, setDadosEventos] = useState<IEvent[]>([]);
  const [dadosImagens, setDadosImagens] = useState<IImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar eventos e imagens
  const buscarEventosEImagens = useCallback(async () => {
    setLoading(true);
    try {
      // Buscar eventos
      const eventosResponse = await axios.get("http://localhost:8000/api/eventos");
      const eventos = eventosResponse.data;

      setDadosEventos(eventos);

      // Buscar todas as imagens
      const imagensResponse = await axios.get("http://localhost:8000/api/galeria");
      setDadosImagens(imagensResponse.data);

    } catch (error) {
      console.error("Erro ao buscar eventos e imagens:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    buscarEventosEImagens();
  }, [buscarEventosEImagens]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <Header />

      <div className="container my-5">
        {dadosEventos.length > 0 ? (
          dadosEventos.map((evento) => {
            // Filtra as imagens que pertencem ao evento
            const eventoImagens = dadosImagens.filter(imagem => imagem.evento_id === evento.id);

            // Função para agrupar imagens em conjuntos de 4
            const imagensPorCarrossel = [];
            for (let i = 0; i < eventoImagens.length; i += 4) {
              imagensPorCarrossel.push(eventoImagens.slice(i, i + 4));
            }

            return (
              <section key={evento.id} className="mb-5">
                {/* Card do Evento e Carrossel de Imagens */}
                <Card className="shadow-sm">
                  <Card.Body>
                    <h3 className="card-title text-center">{evento.nome}</h3>
                    <p className="text-center text-muted">Data: {evento.data}</p>
                    <p className="text-center">{evento.logradouro}, {evento.complemento}, {evento.bairro}, {evento.cidade} - {evento.estado}</p>

                    {/* Carrossel de Imagens do Evento */}
                    {eventoImagens.length > 0 && (
                      <Carousel interval={3000} controls={true} indicators={true}>
                        {imagensPorCarrossel.map((imagens, index) => (
                          <Carousel.Item key={index}>
                            <div className="d-flex justify-content-between">
                              {imagens.map((imagem, idx) => (
                                <div key={idx} className="carousel-image-container" style={{ width: "23%" }}>
                                  <Image
                                    src={imagem.url_imagem}
                                    alt={`Imagem do evento ${evento.nome}`}
                                    className="d-block w-100"
                                    width={200} // Largura ajustada conforme a necessidade
                                    height={150} // Altura ajustada
                                    style={{
                                      objectFit: "cover",
                                      borderRadius: "8px",
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    )}
                  </Card.Body>
                </Card>
              </section>
            );
          })
        ) : (
          <p>Nenhum evento encontrado.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default GaleriaSite;
