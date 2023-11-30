
import Navbar from './components/navbar';
import Footer from './components/footer';
import Logo from './components/Logo';
import ContactUs from './components/ContactUs';
import styles from '../styles/News.module.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const months = [
  "Jan", "Feb", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sep", "Oct", "Nov", "Dec"
];

const News = () => {
  const { t } = useTranslation();
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/firedep/courses');
      const data = await response.json();
      console.log(data.content);
      setNewsItems(data.content);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <Logo />
      {/* STATIC COMPONENTS */}
      <div className={styles.newsContainer}>
        <div className={styles.newsHeader}>
          <h2 className={styles.collegenameForPage}>{t('collegeName')}</h2>
          <h1 className={styles.aboutMainHeader}>{t('Courses')}</h1>
          <br />
          <h3 className={styles.aboutSubHeader}>{t('CoursesSubtitle')}</h3>
        </div>

        {/* NEWS CARDS */}
        <div className={styles.newsCards}>
        {newsItems.map((item) => (
            <Link href={`/news/${item.newsId}`} passHref
                key={item.newsId}
                className={styles.newsCard}
                style={{ backgroundImage: `url(data:image/jpeg;base64,${item.image})` }}
            >
                <h4>{item.sectors && item.sector}</h4>
                <div className={styles.cardContent}>
                    <h3 className={styles.subTitle}>{item.subTitle}</h3>
                    <h2>{item.title}</h2>
                </div>
                <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
            </Link>
            ))}
        </div>
      </div>
      <ContactUs />
      <Footer />
    </div>
  );
};

export default News;
