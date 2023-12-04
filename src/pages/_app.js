// pages/_app.js
import '../../public/lib/i18n';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
