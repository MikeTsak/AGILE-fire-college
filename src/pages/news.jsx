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
import { useRouter } from 'next/router'; // Importing the useRouter hook from Next.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesome icons
import { faArrowRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Importing specific FontAwesome icons
import axios from 'axios'; // Importing Axios for making HTTP requests
import Head from 'next/head'; // Importing the Head component from Next.js

const months = [
  "Jan", "Feb", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sep", "Oct", "Nov", "Dec"
];

const News = () => {
  const { t, i18n } = useTranslation(); // Initializing the translation function and language hook
  const router = useRouter(); // Initializing the router hook for route management
  const [newsItems, setNewsItems] = useState([]); // Initializing state for news items
  const [currentPage, setCurrentPage] = useState(0); // Initializing state for the current page
  const [totalPages, setTotalPages] = useState(0); // Initializing state for total pages
  const [isLoading, setIsLoading] = useState(true); // Initializing state for loading indicator

  // Determine the current language prefix
  const currentLangPrefix = i18n.language === 'en' ? 'en' : 'el';

  useEffect(() => {
    // Fetch news data when the component mounts or when the page query parameter changes
    const fetchData = async () => {
      const queryPage = router.query.page || 0; // Get the page query parameter from the router
      const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Get the API URL from environment variable

      try {
        // Send a GET request to the API to fetch news data
        const response = await axios.get(`${apiUrl}/firedep/news?page=${queryPage}&items=8`);
        const data = response.data;
        setNewsItems(data.content); // Update the news items in state
        setTotalPages(data.totalPages); // Update the total pages in state
        setCurrentPage(data.number); // Update the current page in state
        setIsLoading(false); // Set loading indicator to false
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Set loading indicator to false in case of an error
      }
    };

    fetchData(); // Call the fetchData function when the component mounts or when the page query parameter changes
  }, [router.query.page]); // The effect depends on the router query parameter

  // Function to navigate to a specific page
  const goToPage = (pageNumber) => {
    router.push(`/news?page=${pageNumber}&items=8`); // Use the router to navigate to the specified page
  };

  // Function to format a date in a specific format
  const formatDate = (createdAt) => {
    const dateObj = new Date(createdAt);
    const day = dateObj.getDate();
    const monthIndex = dateObj.getMonth();
    const year = dateObj.getFullYear();

    return `${day} ${months[monthIndex]} ${year}`;
  };

  return (
    <div>
      <Head>
        {/* Define metadata for the page */}
        <title>{t('NewsHeader')}</title>
        <meta name="description" content={t('NewsTextP1')} />
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
          <h1 className={styles.aboutMainHeader}>{t('LatestNews')}</h1>
          <br />
          <h3 className={styles.aboutSubHeader}>{t('NewsSubtitle')}</h3>
        </div>

        {/* NEWS CARDS */}
        <div className={styles.newsCards}>
          {isLoading ? (
            <LoadingFire mode="latestNews" />
          ) : (
            // Map and render news items as cards
            newsItems.map((item) => (
              <Link href={`/news/${item.newsId}`} key={item.newsId} className={styles.newsCard} style={{ backgroundImage: `url(data:image/jpeg;base64,${item.image})` }}>
                <div className={styles.cardContent}>
                  <h4>{item.createdAt && formatDate(item.createdAt)}</h4>
                  <h3 className={styles.subTitle}>{item[`${currentLangPrefix}Subtitle`]}</h3>
                  <h2>{item[`${currentLangPrefix}Title`]}</h2>
                  <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
                </div>
              </Link>
            ))
          )}
        </div>
        {/* Pagination */}
        {isLoading ? null : (
          <div className={styles.pagination}>
            <button 
              onClick={() => goToPage(currentPage - 1)} 
              disabled={currentPage <= 0}
              className={currentPage <= 0 ? styles.disabled : ''}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span>{`${currentPage + 1} of ${totalPages}`}</span>
            <button 
              onClick={() => goToPage(currentPage + 1)} 
              disabled={currentPage >= totalPages - 1}
              className={currentPage >= totalPages - 1 ? styles.disabled : ''}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
      </div>
      <ContactUs /> {/* Render the ContactUs component */}
      <Footer /> {/* Render the Footer component */}
    </div>
  );
};

export default News;
