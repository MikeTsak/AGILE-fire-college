import Navbar from './components/navbar';
import Footer from './components/footer';
import Logo from './components/Logo';
import ContactUs from './components/ContactUs';
import styles from '../styles/News.module.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
      const response = await fetch('http://localhost:8080/firedep/news');
      const data = await response.json();
      console.log(data.content);
      setNewsItems(data.content);
    };

    fetchData();
  }, []);

  // Function to format the date with the translated month
  const formatDate = (createdAt) => {
    const dateObj = new Date(createdAt);
    const day = dateObj.getDate();
    const monthIndex = dateObj.getMonth();
    const year = dateObj.getFullYear();

    return `${day} ${months[monthIndex]} ${year}`;
  };

  return (
    <div>
      <Navbar />
      <Logo />
      {/* STATIC COMPONENTS */}
      <div className={styles.newsContainer}>
        <div className={styles.newsHeader}>
          <h2 className={styles.collegenameForPage}>{t('collegeName')}</h2>
          <h1 className={styles.aboutMainHeader}>{t('LatestNews')}</h1>
          <br />
          <h3 className={styles.aboutSubHeader}>{t('NewsSubtitle')}</h3>
        </div>
        <div className={styles.newsCards}>
          {newsItems.map((item) => (
            <Link href={`/news/${item.newsId}`} passHref
              key={item.newsId}
              className={styles.newsCard}
              style={{ backgroundImage: `url(data:image/jpeg;base64,${item.image})` }}
            >
              <h4>{item.createdAt && formatDate(item.createdAt)}</h4>
              <h2>{item.title}</h2>
              <h3>{item.subTitle}</h3>
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
