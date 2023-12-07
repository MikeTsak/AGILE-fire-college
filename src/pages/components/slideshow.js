// components/Slideshow.js
import { useState, useEffect } from 'react';
import styles from '../../styles/Slideshow.module.css'; // Update the path as needed
import { useTranslation } from 'react-i18next';

const Slideshow = () => {
    const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { img: '/images/slide-1.jpg', text: t('imageText1') }, // Replace with your image paths and texts
    { img: '/images/slide-2.jpg', text: t('imageText2') },
    { img: '/images/slide-3.jpg', text: t('imageText3') },
    { img: '/images/slide-4.png', text: t('imageText3') },
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
