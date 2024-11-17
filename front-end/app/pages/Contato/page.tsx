"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import React, { useState } from "react";
import ReactInputMask from "react-input-mask";
import Header from "../Header/page";
import Footer from "../Footer/page";
import axios from "axios";

export default function Contato() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para enviar os dados do formulário para a rota de voluntários
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação simples
    if (!name || !email || !telefone) {
      setFeedback("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      // Envia os dados para o backend
      await axios.post("http://localhost:8000/api/voluntarios", {
        nome: name,
        email,
        telefone,
      });

      // Feedback de sucesso
      setFeedback("Voluntário cadastrado com sucesso!");
      setName("");
      setEmail("");
      setTelefone("");
    } catch (error) {
      console.error("Erro ao cadastrar o voluntário:", error);
      setFeedback("Erro ao cadastrar o voluntário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Função para validar se o nome contém números ou caracteres especiais
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""); // Permite letras e espaços
    setName(filteredValue);
  };

  return (
    <div>
      <Header />

      <section
        className="d-flex align-items-center justify-content-center text-center vh-50 position-relative header-filter"
        style={{
          backgroundImage: "url('/images/bannercontato.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
        }}
      >
        <div className="container text-white">
          <h1
            className="display-4 mb-4"
            style={{
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            Entre em Contato
          </h1>
          <p
            className="lead mb-4"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "1.2rem",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
            }}
          >
            Estamos aqui para ajudar! Fale conosco através dos canais abaixo ou
            preencha o formulário.
          </p>
        </div>
      </section>

      <section className="container my-5">
        <div className="row">
          <div className="col-md-6 mb-4">
            <h2
              style={{
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                color: "#004d40",
              }}
            >
              Informações de Contato
            </h2>
            <div
              className="p-3 border rounded"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <p style={{ fontFamily: "Verdana, sans-serif", fontSize: "1rem" }}>
                <strong>Endereço:</strong> Rua Mimosa, 3172, Jd. Panorama
              </p>
              <p style={{ fontFamily: "Verdana, sans-serif", fontSize: "1rem" }}>
                <strong>Telefone:</strong> (44) 99976-0543
              </p>
              <p style={{ fontFamily: "Verdana, sans-serif", fontSize: "1rem" }}>
                <strong>Email:</strong> casadapazassociacao@gmail.com
              </p>
              <p style={{ fontFamily: "Verdana, sans-serif", fontSize: "1rem" }}>
                <strong>Horário de Funcionamento:</strong> Segunda a Sexta, das
                08h às 18h
              </p>
              <div className="mt-3">
                <p
                  style={{
                    fontFamily: "Verdana, sans-serif",
                    fontSize: "1rem",
                  }}
                >
                  <strong>Siga-nos:</strong>
                </p>
                <a
                  href="https://www.facebook.com/CasaDaPazUmuarama/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="me-3"
                >
                  <FaFacebook size={24} color="#4267B2" /> FACEBOOK
                </a>
                <a
                  href="https://www.instagram.com/casadapaz_umuarama/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={24} color="#C13584" /> INSTAGRAM
                </a>
              </div>
            </div>
            <div className="map-responsive mb-4 mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.7798098782717!2d-53.34563788498489!3d-23.763707384669482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ed1c0c36fabe9b%3A0x61bc5d5cb5e01b8b!2sCasa%20da%20Paz!5e0!3m2!1spt-BR!2sbr!4v1697784508985!5m2!1spt-BR!2sbr"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="col-md-6">
            <h2
              style={{
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                color: "#004d40",
              }}
            >
              Envie uma Mensagem
            </h2>
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-12">
                <label
                  htmlFor="name"
                  className="form-label"
                  style={{ fontFamily: "Verdana, sans-serif" }}
                >
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Seu nome"
                  required
                  value={name}
                  onChange={handleNameChange}
                  style={{ fontFamily: "Verdana, sans-serif", fontSize: "1rem" }}
                />
              </div>

              <div className="col-12">
                <label
                  htmlFor="email"
                  className="form-label"
                  style={{ fontFamily: "Verdana, sans-serif" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Seu email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ fontFamily: "Verdana, sans-serif", fontSize: "1rem" }}
                />
              </div>

              <div className="col-12">
                <label
                  htmlFor="telefone"
                  className="form-label"
                  style={{ fontFamily: "Verdana, sans-serif" }}
                >
                  Telefone
                </label>
                <ReactInputMask
                  mask="(99) 99999-9999"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                >
                  {(inputProps: any) => (
                    <input
                      {...inputProps}
                      type="text"
                      className="form-control"
                      id="telefone"
                      placeholder="(44) 98765-4321"
                      required
                      style={{
                        fontFamily: "Verdana, sans-serif",
                        fontSize: "1rem",
                      }}
                    />
                  )}
                </ReactInputMask>
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#004d40",
                    borderColor: "#004d40",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#00695c")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#004d40")
                  }
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </form>
            {feedback && <p className="mt-3">{feedback}</p>}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
