import Navbar from './components/navbar';
import Footer from './components/footer';
import Logo from './components/Logo';
import ContactUs from './components/ContactUs';
import styles from '../styles/News.module.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const months = [
  "Jan", "Feb", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sep", "Oct", "Nov", "Dec"
];

const News = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [newsItems, setNewsItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const queryPage = router.query.page || 0;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Get the API URL from environment variable
      try {
        const response = await axios.get(`${apiUrl}/firedep/news?page=${queryPage}&items=8`);
        const data = response.data;
        setNewsItems(data.content);
        setTotalPages(data.totalPages);
        setCurrentPage(data.number);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [router.query.page]);

  const goToPage = (pageNumber) => {
    router.push(`/news?page=${pageNumber}&items=8`);
  };


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

        {/* NEWS CARDS */}
        <div className={styles.newsCards}>
          {newsItems.map((item) => (
            <Link href={`/news/${item.newsId}`} key={item.newsId} className={styles.newsCard} style={{ backgroundImage: `url(data:image/jpeg;base64,${item.image})` }}>
                <div className={styles.cardContent}>
                  <h4>{item.createdAt && formatDate(item.createdAt)}</h4>
                  <h3 className={styles.subTitle}>{item.subTitle}</h3>
                  <h2>{item.title}</h2>
                  <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
                </div>
            </Link>
          ))}
        </div>
        {/* Pagination */}
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
      </div>
      <ContactUs />
      <Footer />
    </div>
  );
};

export default News;
