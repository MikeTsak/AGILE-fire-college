import Navbar from './components/navbar';
import Footer from './components/footer';
import Slideshow from './components/slideshow';
import Logo from './components/Logo';
import ContactUs from './components/ContactUs';

const Home = () => {
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
