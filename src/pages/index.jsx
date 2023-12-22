import Navbar from './components/navbar';
import Footer from './components/footer';
import Slideshow from './components/slideshow';
import Logo from './components/Logo';
import ContactUs from './components/ContactUs';
import Head from 'next/head'
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
      <div>
          {/* Head section with metadata */}
          <Head>
            <title>{t('HeaderIndex')}</title>
            {/* Description meta tag */}
            <meta name="description" content={'Μέσα από την εκπαίδευση...'} />
            {/* Keywords meta tag */}
            <meta name="keywords" content={'Πυροσβεστικό Σώμα Ελλαδας, Fire Department Training Center, Κέντρο Εκπαίδευσης Πυροσβεστικού Σώματος'} />
            {/* Author meta tag */}
            <meta name="author" content={'Κέντρο Εκπαίδευσης Πυροσβεστικού Σώματος'} />
            {/* Viewport meta tag */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            {/* Open Graph tags */}
            <meta name="og:title" content={'Κέντρο Εκπαίδευσης Πυροσβεστικού Σώματος'} />
            <meta name="og:description" content={'Μέσα από την εκπαίδευση...'} />
            <meta name="og:image" content={'images/slide-4'} />
            <meta name="og:url" content={'kepse.psnet.gr'} />
            <meta name="og:site_name" content={'Κέντρο Εκπαίδευσης Πυροσβεστικού Σώματος'} />
            <meta name="og:type" content={'website'} />
            {/* Twitter tags */}
            <meta name="twitter:card" content={'summary'} />
            <meta name="twitter:site" content={'@psnet'} />
            <meta name="twitter:creator" content={'@psnet'} />
            <meta name="twitter:title" content={'Κέντρο Εκπαίδευσης Πυροσβεστικού Σώματος'} />
            <meta name="twitter:description" content={'Μέσα από την εκπαίδευση...'} />
            <meta name="twitter:image" content={'images/slide-4'} />
            <meta name="twitter:image:alt" content={'Κέντρο Εκπαίδευσης Πυροσβεστικού Σώματος'} />
            {/* Robots meta tag */}
            <meta name="robots" content={'index, follow'} />
          </Head>
          {/* Render the components */}
          <Navbar />
          <Logo />
          <Slideshow />
          <ContactUs />
          <Footer />
      </div>
  );
}

export default Home;
