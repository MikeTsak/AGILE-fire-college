
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
          <Head>
            <title>{t('HeaderIndex')}</title>
            <meta name="description" content={'Μέσα από την εκπαίδευση οι υποψήφιοι Εθελοντές μπορούν να λάβουν την απαραίτητη και βασική γνώση, ώστε να είναι ικανοί να συμμετέχουν στην άσκηση του πυροσβεστικού έργου με ασφάλεια δίπλα στους επαγγελματίες πυροσβέστες.'} />
            <meta name="keywords" content={'Πυροσβεστικό Σώμα Ελλαδας, Fire Department Training Center, Κέντρο Εκπαίδευσης Πυροσβεστικού Σώματος'} />
            <meta name="author" content={'Κέντρο Εκπαίδευσης Πυροσβεστικού Σώματος'} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="og:title" content={'Κέντρο Εκπαίδευσης Πυροσβεστικού Σώματος'} />
            <meta name="og:description" content={'Μέσα από την εκπαίδευση οι υποψήφιοι Εθελοντές μπορούν να λάβουν την απαραίτητη και βασική γνώση, ώστε να είναι ικανοί να συμμετέχουν στην άσκηση του πυροσβεστικού έργου με ασφάλεια δίπλα στους επαγγελματίες πυροσβέστες.'} />
            <meta name="og:image" content={'images/slide-4'} />
            <meta name="og:url" content={'kepse.psnet.gr'} />
            <meta name="og:site_name" content={'Κέντρο Εκπαίδευσης Πυροσβεστικού Σώματος'} />
            <meta name="og:type" content={'website'} />
            <meta name="twitter:card" content={'summary'} />
            <meta name="twitter:site" content={'@psnet'} />
            <meta name="twitter:creator" content={'@psnet'} />
            <meta name="twitter:title" content={'Κέντρο Εκπαίδευσης Πυροσβεστικού Σώματος'} />
            <meta name="twitter:description" content={'Μέσα από την εκπαίδευση οι υποψήφιοι Εθελοντές μπορούν να λάβουν την απαραίτητη και βασική γνώση, ώστε να είναι ικανοί να συμμετέχουν στην άσκηση του πυροσβεστικού έργου με ασφάλεια δίπλα στους επαγγελματίες πυροσβέστες.'} />
            <meta name="twitter:image" content={'images/slide-4'} />
            <meta name="twitter:image:alt" content={'Κέντρο Εκπαίδευσης Πυροσβεστικού Σώματος'} />
            <meta name="robots" content={'index, follow'} />
          </Head>
          <Navbar />
          <Logo />
          <Slideshow />
          <ContactUs />
          <Footer />
      </div>
  );
}

export default Home;
