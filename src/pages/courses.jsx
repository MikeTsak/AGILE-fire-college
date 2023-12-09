
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
import Head from 'next/head';

const Courses = () => {
  const { t } = useTranslation();
  const [CoursesItems, setCoursesItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/firedep/courses`);
      const data = await response.json();
      // console.log(data.content);
      setCoursesItems(data.content);
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

        {/* NEWS CARDS */}
        <div className={styles.newsCards}>
        {CoursesItems.map((item) => (
            <Link href={`/courses/${item.courseId}`} passHref
                key={item.newsId}
                className={styles.newsCard}
                style={{ backgroundImage: `url(data:image/jpeg;base64,${item.image})` }}
            >
                <h4>{item.sectors}</h4>
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

export default Courses;
