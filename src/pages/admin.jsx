// admin.jsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/Admin.module.css';
import NewsDrawer from './components/NewsDrawer';
import CourcesDrawer from './components/CourcesDrawer';
import EditNewsDrawer from './components/EditNewsDrawer';
import EditCourcesDrawer from './components/EditCourcesDrawer';
import Logo from './components/Logo';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronLeft, faChevronRight, faTrashAlt, faRightFromBracket, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';

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

  const [isEditNewsDrawerOpen, setIsEditNewsDrawerOpen] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState(null);

  const[isEditCourcesDrawerOpen, setIsEditCourcesDrawerOpen] = useState(false);
  const [editingCourcesId, setEditingCourcesId] = useState(null);

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
      ? "Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το άρθρο ειδήσεων;"
      : "Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το μάθημα;"

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
      ('Σφάλμα κατά τη λήψη των δεδομένων:', error);
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
      console.error('Σφάλμα κατά τη λήψη των μαθημάτων:', error);
    }
  };
  

  const toggleDisplay = () => {
    setShowCourses(!showCourses);
    if (!showCourses) {
      fetchCourses(); // Fetch courses when switching to show courses
    }
  };

  const openEditNewsDrawer = (newsId) => {
    setEditingNewsId(newsId);
    setIsEditNewsDrawerOpen(true);
  };

  const openEditCourcesDrawer = (courcesId) => {
    setEditingCourcesId(courcesId);
    setIsEditCourcesDrawerOpen(true);
  }

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
      console.error(`Αποτυχία διαγραφής ${itemType}:`, error);
    }
  };
  

  return (
    <div className={styles.holePage}>
      <div className={styles.container}>
        <Head>
          <title>Σελίδα Διαχειριστή</title>
        </Head>
        <Logo />
        <div className={styles.header}>
          <h1 className={styles.aboutMainHeader}>Σελιδα Διαχειριστη</h1>
          <button onClick={logout} className={styles.logoutButton}>Αποσύνδεση <FontAwesomeIcon icon={faRightFromBracket} /></button>
        </div>

        <div className={styles.formSection}>
          <button onClick={openDrawerForNews} className={styles.button}>Προσθήκη Άρθρου Ειδήσεων</button>
          <NewsDrawer
            isOpen={isDrawerOpenForNews}
            onClose={closeDrawerForNews}
          />
          <button onClick={openDrawerForCourses} className={styles.button}>Προσθήκη Μαθήματος</button>
          <CourcesDrawer
            isOpen={isDrawerOpenForCourses}
            onClose={closeDrawerForCourses}
          />

          <EditNewsDrawer
            isOpen={isEditNewsDrawerOpen}
            onClose={() => setIsEditNewsDrawerOpen(false)}
            newsId={editingNewsId}
            onSubmit={() => fetchNews()} // Επανάληψη λήψης ειδήσεων μετά την επεξεργασία
          />

          <EditCourcesDrawer
            isOpen={isEditCourcesDrawerOpen}
            onClose={() => setIsEditCourcesDrawerOpen(false)}
            courcesId={editingCourcesId}
            onSubmit={() => fetchCourses()} // Επανάληψη λήψης μαθημάτων μετά την επεξεργασία
          />

          <button onClick={toggleDisplay} className={styles.button}>{showCourses ? 'Εμφάνιση Ειδήσεων' : 'Εμφάνιση Μαθημάτων'}</button>
        </div>

        <div>
          {/* ΕΙΔΗΣΕΙΣ ΑΡΘΡΑ ΑΠΟ ΑΥΤΟ ΤΟ ΣΗΜΕΙΟ ΚΑΙ ΚΑΤΩ */}
          {showCourses ? (
            <div>
              <h2 className={styles.collegenameForPage}>Μαθήματα:</h2>
              <div className={styles.coursesContainer}>
                {courses.map((course) => (
                  <div key={course.courseId} className={styles.newsCardDel}>
                    <div className={styles.newsCard}>
                      <div className={styles.cardContent}>
                        <img src={`data:image/jpeg;base64,${course.image}`} className={styles.imagenews} />
                        <div className={styles.category}>{course.category}
                          <h4>{course.sectors}</h4>
                          <h2 className={styles.collegenameForPage}>{course.enTitle} || {course.elTitle}</h2>
                          <h3 className={styles.subTitle}>{course.subTitle}</h3>
                          <Link href={`/courses/${course.courseId}`} key={course.courseId} className={styles.clickable}><b>Προβολή Μαθήματος</b> <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} /></Link>
                        </div>
                      </div>
                    </div>
                    <div>
                    {/* <button onClick={() => openEditCourcesDrawer(course.courseId)} className={styles.editButton}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </button> */}
                    <button onClick={() => confirmDeleteItem(course.courseId, "courses")} className={styles.deleteButton}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h2 className={styles.collegenameForPage}>Άρθρα Ειδήσεων:</h2>
              <div className={styles.newsCards}>
                {newsItems.map((item) => (
                  <div key={item.newsId} className={styles.newsCardDel}>
                    <div className={styles.newsCard}>
                      <div className={styles.cardContent}>
                        <img src={`data:image/jpeg;base64,${item.image}`} className={styles.imagenews} />
                        <div className={styles.category}>
                          <h4>{item.createdAt}</h4>
                          <h2 className={styles.subTitle}>{item.enTitle} || {item.elTitle}</h2>
                          <h3 className={styles.subTitle}>{item.enubTitle}</h3>
                          <Link href={`/news/${item.newsId}`} key={item.newsId} className={styles.clickable}><b>Προβολή Άρθρου</b> <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} /></Link>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button onClick={() => openEditNewsDrawer(item.newsId)} className={styles.editButton}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </button>
                      <button onClick={() => confirmDeleteItem(item.newsId, "news")} className={styles.deleteButton}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
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
                <span>{`${currentPage + 1} από ${totalPages}`}</span>
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
    </div>
  );
}