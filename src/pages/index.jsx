import Navbar from './components/navbar';
import Footer from './components/footer';
import Slideshow from './components/slideshow';
import Logo from './components/Logo';
import ContactUs from './components/ContactUs';
import styles from '../styles/Home.module.css'

import { useTranslation } from 'react-i18next';


const Home = () => {
  const { t } = useTranslation();
  return (
      <div>
          <Navbar />
          <Logo />
          <Slideshow />
          <ContactUs />
          <Footer />
      </div>
  );
}

export default Home;
