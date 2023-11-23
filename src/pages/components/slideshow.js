// components/Slideshow.js
import { useState, useEffect } from 'react';
import styles from '../../styles/Slideshow.module.css'; // Update the path as needed
import { useTranslation } from 'react-i18next';

const Slideshow = () => {
    const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { img: 'https://www.orthodoxianewsagency.gr/wp-content/uploads/2020/05/fotia-purkagia-purosbestiki-purosbestis-1024x640.jpg', text: t('imageText1') }, // Replace with your image paths and texts
    { img: 'https://www.ekathimerini.com/wp-content/uploads/2018/07/snf_web.jpg', text: t('imageText2') },
    { img: 'https://scontent.fath2-1.fna.fbcdn.net/v/t39.30808-6/292888555_5168127076588806_8978615676114213324_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=5B5ARkdyxI8AX-azSfJ&_nc_ht=scontent.fath2-1.fna&oh=00_AfAHHbBr3PG9b9UPeJZg0EYtSNQe3mozWAY02lmSmVY6qA&oe=656489FC', text: t('imageText3') },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide) => (currentSlide + 1) % slides.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className={styles.slideshow}>
      {slides.map((slide, index) => (
        <div
          className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
          key={index}
          style={{ backgroundImage: `url(${slide.img})` }}
        >
          {index === currentSlide && <div className={styles.text}>{slide.text}</div>}
        </div>
      ))}
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
