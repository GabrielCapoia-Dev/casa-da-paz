import React from 'react'
import Header from './pages/Header/page'
import Footer from './pages/Footer/page'
import TransparentBackground from './component/TransparentBackground'



const Home = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Header />
    <section
      style={{
        backgroundImage: 'url(/images/inicio.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flexGrow: 1,
      }}
    >
      
      <TransparentBackground>
        <div className="container">
          <h1 className="display-4 mb-4">Casa da Paz</h1>
          <p className="lead">
            “Sei que meu trabalho é uma gota no oceano, mas sem ele, o oceano seria menor “ - Santa Teresa de Calcutá
          </p>
          <div className="mt-4">
            <a
              href="/pages/Sobre"
              className="btn"
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                borderRadius: '20px',
                padding: '10px 20px',
                marginRight: '10px',
              }}
            >
              Conheça a Casa da Paz
            </a>
            <a
              href="/pages/Doacoes"
              className="btn btn-secondary"
              style={{
                borderRadius: '20px',
                padding: '10px 20px',
              }}
            >
              Sobre Doações
            </a>
          </div>
        </div>
      </TransparentBackground>
    </section>
    <Footer />
  </div>
)

export default Home
