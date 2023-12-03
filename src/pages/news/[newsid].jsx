// pages/news/[newsid].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Logo from '../components/Logo';
import styles from '../../styles/News.module.css';

const months = [
  "Jan", "Feb", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sep", "Oct", "Nov", "Dec"
];

const formatDate = (createdAt) => {
  const dateObj = new Date(createdAt);
  const day = dateObj.getDate();
  const monthIndex = dateObj.getMonth();
  const year = dateObj.getFullYear();
  return `${day} ${months[monthIndex]} ${year}`;
};

const NewsItemDetail = () => {
  const router = useRouter();
  const { newsid } = router.query;
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/firedep/news/${newsid}`);
        setNewsItem(response.data);
      } catch (error) {
        console.error('Error fetching news item:', error);
      }
    };

    if (newsid) {
      fetchNewsItem();
    }
  }, [newsid]);

  if (!newsItem) {
    return <div>Loading...</div>;
  }

  // Function to render YouTube iframe if videoURL is present
  const renderVideo = (videoURL) => {
    if (!videoURL) return null;
    const videoId = videoURL.split('v=')[1]; // Extract the video ID from the URL
    const embedURL = `https://www.youtube.com/embed/${videoId}`;
    return (
      <div className={styles.videoContainer}>
        <iframe
          width="560"
          height="315"
          src={embedURL}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  };

  return (
    <> 
        <Logo />
      <Navbar />
      <div className={styles.newsItemDetailContainer}>
        <div className={styles.newsHeader}>
          <span className={styles.newsDate}>{newsItem.createdAt && formatDate(newsItem.createdAt)}</span>
          <h1 className={styles.newsTitle}>{newsItem.title}</h1>
          <h2 className={styles.newsSubtitle}>{newsItem.subTitle}</h2>
        </div>
        <div className={styles.newsImageContainer}>
          <img
            src={`data:image/jpeg;base64,${newsItem.image}`}
            alt={newsItem.title}
            className={styles.newsImage}
          />
        </div>
        <br />
        <br />
        <p className={styles.newsContent}>{newsItem.content}</p>
        <br />
        <br />
        {/* Render the video if videoURL exists */}
        {renderVideo(newsItem.videoURL)}
      </div>
      <Footer />
    </>
  );
};

export default NewsItemDetail;
