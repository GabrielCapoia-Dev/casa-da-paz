// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'; // Se você tiver um arquivo global de estilos

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
