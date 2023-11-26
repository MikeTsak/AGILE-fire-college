import Navbar from './components/navbar';
import Footer from './components/footer';
import Slideshow from './components/slideshow';
import Logo from './components/Logo';
import ContactUs from './components/ContactUs';
import styles from '../styles/Home.module.css'


const Home = () => {
  return (
      <div>
          <Navbar />
          <Logo />
          <Slideshow />
          <div className={styles.separatorStyle}>PhoneNumber</div>
          <ContactUs />
          <Footer />
      </div>
  );
}

export default Home;
