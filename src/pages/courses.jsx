// Import necessary components and libraries
import Navbar from './components/navbar'; // Importing the Navbar component
import Footer from './components/footer'; // Importing the Footer component
import Logo from './components/Logo'; // Importing the Logo component
import ContactUs from './components/ContactUs'; // Importing the ContactUs component
import LoadingFire from './components/LoadingFire'; // Importing the LoadingFire component
import styles from '../styles/News.module.css'; // Importing CSS styles
import { useTranslation } from 'react-i18next'; // Importing the useTranslation hook for internationalization
import { useEffect, useState } from 'react'; // Importing the useEffect and useState hooks from React
import Link from 'next/link'; // Importing the Link component from Next.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesome icons
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Importing specific FontAwesome icons
import Head from 'next/head'; // Importing the Head component from Next.js
import axios from 'axios'; // Importing Axios for making HTTP requests

const Courses = () => {
  const { t, i18n } = useTranslation(); // Initializing the translation function and language hook
  const [CoursesItems, setCoursesItems] = useState([]); // Initializing state for course items
  const [isLoading, setIsLoading] = useState(true); // Initializing state for loading indicator

  // Determine the current language prefix
  const currentLangPrefix = i18n.language === 'en' ? 'en' : 'el';

  useEffect(() => {
    // Fetch course data when the component mounts
    const fetchData = async () => {
      try {
        // Send a GET request to the course API endpoint
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/firedep/courses`);
        setCoursesItems(response.data.content); // Update the course items in state
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Set loading indicator to false whether the request succeeds or fails
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // The effect runs once when the component mounts

  return (
    <div>
      <Head>
        {/* Define metadata for the page */}
        <title>{t('CoursesHeader')}</title>
        <meta name="description" content={t('CoursesTextP1')} />
        <meta name="keywords" content={'Πυροσβεστικό Σώμα Ελλαδας, Fire Department Training Center, Κέντρο Εκπαίδευσης Πυροσβεστικού Σώματος'} />
        <meta name="author" content={t('collegeName')} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar /> {/* Render the Navbar component */}
      <Logo /> {/* Render the Logo component */}
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
          ) : (
            // Map and render course items as cards
            CoursesItems.map((item) => (
              <Link href={`/courses/${item.courseId}`} passHref key={item.courseId} className={styles.newsCard} style={{ backgroundImage: `url(data:image/jpeg;base64,${item.image})` }}>
                <h4>{item.sectors}</h4>
                <div className={styles.cardContent}>
                  <h3 className={styles.subTitle}>{item[`${currentLangPrefix}Subtitle`]}</h3>
                  <h2>{item[`${currentLangPrefix}Title`]}</h2>
                  <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      <ContactUs /> {/* Render the ContactUs component */}
      <Footer /> {/* Render the Footer component */}
    </div>
  );
};

export default Courses;
