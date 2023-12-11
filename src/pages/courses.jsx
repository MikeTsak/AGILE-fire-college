
import Navbar from './components/navbar';
import Footer from './components/footer';
import Logo from './components/Logo';
import ContactUs from './components/ContactUs';
import LoadingFire from './components/LoadingFire';
import styles from '../styles/News.module.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import axios from 'axios';

const Courses = () => {
  const { t, i18n } = useTranslation();
  const [CoursesItems, setCoursesItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentLangPrefix = i18n.language === 'en' ? 'en' : 'el';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/firedep/courses`);
        setCoursesItems(response.data.content);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>{t('CoursesHeader')}</title>
        <meta name="description" content={t('CoursesTextP1')} />
        <meta name="keywords" content={'Πυροσβεστικό Σώμα Ελλαδας, Fire Department Training Center, Κέντρο Εκπαίδευσης Πυροσβεστικού Σώματος'} />
        <meta name="author" content={t('collegeName')} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
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

        {/* COURSE CARDS */}
        <div className={styles.newsCards}>
        {isLoading ? (
          <LoadingFire mode="latestNews" />
        ) : (CoursesItems.map((item) => (
            <Link href={`/courses/${item.courseId}`} passHref key={item.courseId} className={styles.newsCard} style={{ backgroundImage: `url(data:image/jpeg;base64,${item.image})` }}>
                <h4>{item.sectors}</h4>
                <div className={styles.cardContent}>
                  <h3 className={styles.subTitle}>{item[`${currentLangPrefix}Subtitle`]}</h3>
                  <h2>{item[`${currentLangPrefix}Title`]}</h2>
                  <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
                </div>
            </Link>
          )))}
      </div>
      </div>
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Courses;
