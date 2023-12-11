// pages/news/[newsid].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Logo from '../components/Logo';
import styles from '../../styles/News.module.css';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation();

    const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };


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


  const currentLanguage = i18n.language;
  const title = currentLanguage === 'en' ? newsItem.enTitle : newsItem.elTitle;
  const subTitle = currentLanguage === 'en' ? newsItem.enSubtitle : newsItem.elSubtitle;
  const content = currentLanguage === 'en' ? newsItem.enContent : newsItem.elContent;

  return (
    <> 
      <Head>
        <title>{newsItem.title}</title>
        <meta name="description" content={newsItem.subTitle} />
        <meta property="og:title" content={newsItem.title} />
        <meta property="og:description" content={newsItem.subTitle} />
        <meta property="og:image" content={`data:image/jpeg;base64,${newsItem.image}`} />
        <meta property="og:url" content={`https://firedep.com/news/${newsItem.newsId}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Firedep" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={newsItem.title} />
        <meta name="twitter:description" content={newsItem.subTitle} />
        <meta name="twitter:image" content={`data:image/jpeg;base64,${newsItem.image}`} />
        <meta name="twitter:image:alt" content={newsItem.title} />
      </Head>
        <Logo />
      <Navbar />
      <div className={styles.newsItemDetailContainer}>
        <div className={styles.newsHeader}>
          <span className={styles.newsDate}>{newsItem.createdAt && formatDate(newsItem.createdAt)}</span>
          <h1 className={styles.newsTitle}>{title}</h1>
          <h2 className={styles.newsSubtitle}>{subTitle}</h2>
        </div>
        <div className={styles.newsImageContainer}>
          <img
            src={`data:image/jpeg;base64,${newsItem.image}`}
            alt={title}
            className={styles.newsImage}
          />
        </div>
        <br /><br />
  <div className={styles.newsContent} dangerouslySetInnerHTML={createMarkup(content)} />
  <br /><br />
        {renderVideo(newsItem.videoURL)}
      </div>
      <Footer />
    </>
  );
};

export default NewsItemDetail;
