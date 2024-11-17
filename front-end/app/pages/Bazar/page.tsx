"use client"; // Indica que o componente deve ser tratado como um Client Component

import React from 'react';
import Footer from '../Footer/page';
import Header from '../Header/page';
import 'bootstrap/dist/css/bootstrap.min.css';

const Bazar = () => {
  return (
    <div>
      <Header />

      {/* Banner com imagem de fundo */}
      <div
        style={{
          backgroundImage: "url('/images/bannerbazar.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "30vh",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h1 className="text-center">Bazar</h1>
      </div>

      <section className="my-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto">
              {/* Card para boas-vindas */}
              <div className="card mb-4 shadow-lg border-radius-15">
                <div className="card-body">
                  <h2 className="text-success">Bem-vindo ao nosso Bazar Permanente Beneficente!</h2>
                  <p>
                    A Casa da Paz organiza um Bazar Permanente Beneficente como uma das formas de arrecadar fundos para apoiar nossos programas e serviços. Em nosso bazar, você encontrará uma variedade de itens novos e usados, incluindo roupas, acessórios, livros, brinquedos e muito mais, tudo a preços acessíveis.
                  </p>
                </div>
              </div>

              {/* Card para Como Funciona */}
              <div className="card mb-4 shadow-lg border-radius-15">
                <div className="card-body">
                  <h4>Como Funciona:</h4>
                  <h5>Localização:</h5>
                  <p>
                    O bazar está localizado na Av. Rio de Janeiro, 4453, Zona II e está aberto ao público de terça a sexta das 8 às 17h e no sábado das 8 às 12h.
                  </p>

                  <h5>Doações:</h5>
                  <p>
                    Aceitamos doações de itens em bom estado para revenda no bazar. Se você deseja contribuir, entre em contato conosco para agendar a entrega.
                  </p>

                  <h5>Voluntariado:</h5>
                  <p>
                    Contamos com o apoio de voluntários para ajudar na organização e operação do bazar. Se você gostaria de se envolver, ficaremos felizes em recebê-lo em nossa equipe.
                  </p>
                </div>
              </div>

              {/* Card para Benefícios */}
              <div className="card mb-4 shadow-lg border-radius-15">
                <div className="card-body">
                  <h4>Benefícios:</h4>
                  <h5>Para a Comunidade:</h5>
                  <p>
                    O bazar oferece uma maneira de adquirir itens de qualidade a preços acessíveis, promovendo a sustentabilidade e o consumo consciente.
                  </p>

                  <h5>Para a Casa da Paz:</h5>
                  <p>
                    Todos os recursos arrecadados no bazar são destinados diretamente aos nossos programas de apoio a crianças e adolescentes, contribuindo para a melhoria de suas vidas e o fortalecimento de nossos serviços.
                  </p>
                </div>
              </div>

              {/* Card para Visite Nosso Bazar */}
              <div className="card mb-4 shadow-lg border-radius-15">
                <div className="card-body">
                  <h4>Visite Nosso Bazar:</h4>
                  <p>
                    Sua participação e apoio são fundamentais para o sucesso do nosso bazar. Venha nos visitar, faça compras, doe itens ou ofereça seu tempo como voluntário. Cada ação ajuda a fazer a diferença na vida das crianças e adolescentes atendidos pela Casa da Paz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Bazar Link Section */}
      <section className="text-center my-4">
        <h4>Instagram Bazar Beneficente:</h4>
        <p>
          Siga-nos em 
          <a 
            href="https://www.instagram.com/bazaresebo_casadapaz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="d-flex align-items-center justify-content-center"
          >
            {/* Ícone do Instagram */}
            <i className="fab fa-instagram me-2" style={{ fontSize: '1.5rem' }}></i>
            @bazaresebo_casadapaz
          </a>
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default Bazar;
