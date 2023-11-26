import Navbar from './components/navbar';
import Footer from './components/footer';
import Logo from './components/Logo';
import ContactUs from './components/ContactUs';

import { useTranslation } from 'react-i18next';


const Home = () => {
  const { t } = useTranslation();
  return (
      <div>
          <Navbar />
          <Logo />
          <ContactUs />
          <Footer />
      </div>
  );
}

export default Home;
