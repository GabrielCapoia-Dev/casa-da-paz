// pages/premios.js
"use client"; // Indica que este componente deve ser tratado como um Client Component

import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Footer/page';
import Header from '../Header/page';

export default function Premios() {
  return (
    <div>
      <Header/>

      {/* Seção de Introdução com Imagem de Fundo */}
      <section className="header-filter" style={{ 
        backgroundImage: 'url(/images/bannerpremio.jpg)', 
        minHeight: '250px', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
        paddingTop: '60px'
      }}>
        <div className="container text-center h-100 d-flex flex-column justify-content-center">
          <h1 className="display-4 text-white mb-4 font-weight-bold">Prêmios da Casa da Paz</h1>
          <p className="lead text-white mb-4 font-italic">
            Celebramos as conquistas de nossos jovens. Veja os prêmios que temos conquistado!
          </p>
        </div>
      </section>

      {/* Seção de Prêmios */}
      <section className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-success">PRÊMIOS RECEBIDOS</h2>
            <p>
              <strong>Ao longo dos anos, a Casa da Paz se destacou em diversas áreas, promovendo o desenvolvimento e a inclusão social de nossas crianças e adolescentes. Conheça alguns dos prêmios que recebemos em reconhecimento ao nosso trabalho:</strong>
            </p>

            {/* Cards de Prêmios */}
            <div className="row">
              {/* Card 1 */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 hover-effect">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Prêmio de Melhor Projeto Social de 2022</h5>
                    <p className="card-text">Reconhecimento pela implementação do melhor projeto social de 2022, que impactou positivamente nossa comunidade.</p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 hover-effect">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Reconhecimento Nacional em Educação</h5>
                    <p className="card-text">Prêmio nacional pela excelência em educação, destacando nossos programas educativos e pedagógicos.</p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 hover-effect">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Prêmio de Voluntariado Destaque</h5>
                    <p className="card-text">Premiação pelo excelente trabalho realizado por nossos voluntários, que são fundamentais para a Casa da Paz.</p>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 hover-effect">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Menção Honrosa em Eventos Culturais</h5>
                    <p className="card-text">Reconhecimento por nossa participação ativa e contribuições nos eventos culturais de nossa cidade.</p>
                  </div>
                </div>
              </div>

              {/* Card 5 */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 hover-effect">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Prêmio de Melhor Iniciativa Comunitária</h5>
                    <p className="card-text">Conquista pelo desenvolvimento das melhores iniciativas comunitárias voltadas para a inclusão e suporte aos jovens.</p>
                  </div>
                </div>
              </div>
            </div>

            <p>
              <strong>Estes prêmios são uma prova do impacto positivo que podemos ter quando trabalhamos juntos por uma causa maior.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Seção de Como Você Pode Ajudar - Cards para Envolvimento */}
      <section className="container my-5">
        <h2 className="text-warning">COMO VOCÊ PODE AJUDAR</h2>
        <p>
         <strong>Sua contribuição é fundamental para que possamos continuar nosso trabalho e conquistar mais prêmios. Conheça as formas de envolvimento:</strong>
        </p>
        
        {/* Cards de Envolvimento */}
        <div className="row">
          {/* Card 1 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 hover-effect">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Participe de Nossas Atividades</h5>
                <p className="card-text">Junte-se a nós em nossas atividades e eventos. Cada participação conta!</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 hover-effect">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Faça uma Doação</h5>
                <p className="card-text">Contribua financeiramente para que possamos manter nossos projetos e continuar a receber prêmios que reconhecem nosso esforço.</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 hover-effect">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Seja um Voluntário</h5>
                <p className="card-text">Venha fazer parte da nossa equipe! Seu tempo e suas habilidades podem fazer uma grande diferença.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
