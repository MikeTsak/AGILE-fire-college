import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // CORS policy
import styles from '../styles/Admin.module.css';
import NewsDrawer from './components/NewsDrawer';
import CourcesDrawer from './components/CourcesDrawer';
import Logo from './components/Logo';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronLeft, faChevronRight, faTrashAlt, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';

export default function Admin() {
  const [news, setNews] = useState([]);
  const [courses, setCourses] = useState([]);
  const router = useRouter();
  const [newsItems, setNewsItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [showCourses, setShowCourses] = useState(false); // State to toggle between news and courses


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
  const confirmDeleteItem = (id, itemType) => {
    const message = itemType === 'news'
      ? "Are you sure you want to delete this news article?"
      : "Are you sure you want to delete this course?";
    
    if (window.confirm(message)) {
      deleteItem(id, itemType);
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

  // Function to fetch courses
  const fetchCourses = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.get(`${apiUrl}/firedep/courses`);
      console.log(response.data.content); 
      setCourses(response.data.content); 
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
  

  const toggleDisplay = () => {
    setShowCourses(!showCourses);
    if (!showCourses) {
      fetchCourses(); // Fetch courses when switching to show courses
    }
  };

  const deleteItem = async (id, itemType) => {
    try {
      const token = sessionStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
      const response = await axios({
        method: 'delete',
        url: `${apiUrl}/firedep/${itemType}/${id}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
  
      if (response.status === 200) {
        if (itemType === 'news') {
          setNewsItems(prevItems => prevItems.filter(item => item.newsId !== id));
        } else if (itemType === 'courses') {
          setCourses(prevItems => prevItems.filter(item => item.courseId !== id));
        }
      } else {
        // Handle other status codes or response scenarios
      }
    } catch (error) {
      console.error(`Failed to delete ${itemType}:`, error);
    }
  };
  

  return (
    <div className={styles.container}>
      <Logo />
      <div className={styles.header}>
        <h1 className={styles.aboutMainHeader}>Admin Page</h1>
        <button onClick={logout} className={styles.logoutButton}>Logout <FontAwesomeIcon icon={faRightFromBracket} /></button>
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

      <button onClick={toggleDisplay} className={styles.button}>{showCourses ? 'Show News' : 'Show Courses'}</button>
      </div>
  
      <div>
        {/* NEWS ARTICLES FROM THIS POINT DOWNWARD */}
        {showCourses ? (
        <div>
          <h2 className={styles.collegenameForPage}>Courses:</h2>
          <div className={styles.coursesContainer}>
            {courses.map((course) => (
              <div key={course.courseId} className={styles.newsCardDel}>
              <div className={styles.newsCard}>
                  <div className={styles.cardContent}>
                    <img src={`data:image/jpeg;base64,${course.image}`} className={styles.imagenews}/>
                    <div className={styles.category}>{course.category}
                    <h4>{course.sectors}</h4>
                    <h2 className={styles.collegenameForPage}>{course.title}</h2>
                    <h3 className={styles.subTitle}>{course.subTitle}</h3>
                    <Link href={`/courses/${course.courseId}`} key={course.courseId} className={styles.clickable}><b>View Course</b> <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} /></Link>
                    </div>
                  </div>
              </div>
              <button onClick={() => confirmDeleteItem(course.courseId, "courses")} className={styles.deleteButton}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
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
              <button onClick={() => confirmDeleteItem(item.newsId, "news")} className={styles.deleteButton}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            </div>
            ))}
          </div>
          {/* ...pagination */}
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
      )}

      </div>
    </div>
  );
}