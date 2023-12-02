import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // CORS policy
import styles from '../styles/Admin.module.css';
import NewsDrawer from './components/NewsDrawer';
import CourcesDrawer from './components/CourcesDrawer';
import Logo from './components/Logo';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronLeft, faChevronRight, faTrashAlt  } from '@fortawesome/free-solid-svg-icons';

export default function Admin() {
  const [news, setNews] = useState([]);
  const [courses, setCourses] = useState([]);
  const router = useRouter();
  const [newsItems, setNewsItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isDrawerOpenForNews, setIsDrawerOpenForNews] = useState(false);
  const [isDrawerOpenForCourses, setIsDrawerOpenForCourses] = useState(false);

  const openDrawerForNews = () => setIsDrawerOpenForNews(true);
  const closeDrawerForNews = () => setIsDrawerOpenForNews(false);
  const openDrawerForCourses = () => setIsDrawerOpenForCourses(true);
  const closeDrawerForCourses = () => setIsDrawerOpenForCourses(false);

  const apiBaseURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      fetchNews();
    }
  }, [router]);

  const logout = () => {
    sessionStorage.removeItem('token'); // Remove the token from session storage
    router.push('/login'); // Redirect to login page
  };
  const confirmDeleteNews = (id) => {
    if (window.confirm("Are you sure you want to delete this news article?")) {
      deleteNews(id);
    }
  };

  const fetchNews = async () => {
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

  const deleteNews = async (id) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.delete(`${apiBaseURL}/news/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setNewsItems(prevNewsItems => prevNewsItems.filter(item => item.newsId !== id));
      }
    } catch (error) {
      console.error('Failed to delete news:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Logo />
      <div className={styles.header}>
        <h1 className={styles.aboutMainHeader}>Admin Page</h1>
        <button onClick={logout} className={styles.logoutButton}>Logout</button>
      </div>
  
      <div className={styles.formSection}>  
      <button onClick={openDrawerForNews} className={styles.button}>Add News Article</button>
      <NewsDrawer
        isOpen={isDrawerOpenForNews}
        onClose={closeDrawerForNews}
      />
      <button onClick={openDrawerForCourses} className={styles.button}>Add Course</button>
      <CourcesDrawer
        isOpen={isDrawerOpenForCourses}
        onClose={closeDrawerForCourses}
      />

      <button className={styles.button}>Show Courses</button>
      </div>
  
      <div>
        {/* NEWS ARTICLES FROM THIS POINT DOWNWARD */}
        <h2 className={styles.collegenameForPage}>News Articles:</h2>
        <div className={styles.newsCards}>
          {newsItems.map((item) => (
            <div key={item.newsId} className={styles.newsCardDel}>
              <div className={styles.newsCard}>
                  <div className={styles.cardContent}>
                    <img src={`data:image/jpeg;base64,${item.image}`} className={styles.imagenews}/>
                    <div className={styles.category}>{item.category}
                    <h4>{item.createdAt}</h4>
                    <h2 className={styles.collegenameForPage}>{item.title}</h2>
                    <h3 className={styles.subTitle}>{item.subTitle}</h3>
                    <Link href={`/news/${item.newsId}`} key={item.newsId} className={styles.clickable}><b>View Article</b> <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} /></Link>
                    </div>
                  </div>
              </div>
              <button onClick={() => confirmDeleteNews(item.newsId)} className={styles.deleteButton}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            </div>
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
  
      {/* Render courses here */}
    </div>
  );
}