import Navbar from './components/navbar';
import Footer from './components/footer';
import Slideshow from './components/slideshow';
import Logo from './components/Logo';


const Home = () => {
  return (
      <div>
          <Navbar />
          <Logo />
          <Slideshow />
          hello there
          <Footer />
      </div>
  );
}

export default Home;
