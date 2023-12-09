// NewsDrawer.js
import { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Drawer.module.css'; // Ensure to create this CSS module

export default function NewsDrawer({ isOpen, onClose, onSubmit }) {
    const [newsData, setNewsData] = useState({
        title: '',
        subTitle: '',
        content: '',
        category: '',
        videoURL: '',
        image: null
      });

      const [submitSuccess, setSubmitSuccess] = useState(false);
      const [newNewsId, setNewNewsId] = useState(null);

      const handleChange = (e) => {
        if (e.target.name === 'image') {
          setNewsData({ ...newsData, image: e.target.files[0] });
        } else {
          setNewsData({ ...newsData, [e.target.name]: e.target.value });
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('image', newsData.image);
      
        const news = {
          title: newsData.title,
          subTitle: newsData.subTitle,
          content: newsData.content,
          category: newsData.category,
          videoURL: newsData.videoURL
        };
      
        // Convert the news object to a JSON string
        const newsJson = JSON.stringify(news);
      
        // Create a blob from the JSON string
        const newsBlob = new Blob([newsJson], {
          type: 'application/json'
        });
      
        // Append the blob to the formData
        formData.append('news', newsBlob);
      
        try {
          const token = sessionStorage.getItem('token');
          const response = await axios({
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_API_URL}/firedep/news`,
            data: formData,
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
      
          if (response.status) {
            setSubmitSuccess(true);
            setNewNewsId(response.data);
            console.log(response.data);
          } else {
            // Handle errors
          }
        } catch (error) {
          console.error('Failed to submit news:', error);
        }
      };

      const handleViewArticle = () => {
        window.location.href = `/news/${newNewsId}`; // Redirect to the new article
      };    
      
    
      if (!isOpen) return null;

      if (submitSuccess) {
        return (
          <div className={styles.drawer}>
            <div className={styles.drawerContentSuccess}>
              <p className={styles.aboutMainHeader}>Article successfully added!</p>
              <button onClick={handleViewArticle} className={styles.submitButton}>View Article</button>
              <button 
                onClick={() => {
                  onClose();
                  setSubmitSuccess(false);
                }} 
                className={styles.closeButton}
              >
                Close
              </button>

            </div>
          </div>
        );
      }

  return (
    <div className={styles.drawer}>
      <div className={styles.drawerContent}>
        <h2>Add News Article</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input 
            name="title"
            value={newsData.title}
            onChange={handleChange}
            placeholder="Title"
            className={styles.input}
          />
          <input 
            name="subTitle"
            value={newsData.subTitle}
            onChange={handleChange}
            placeholder="Subtitle"
            className={styles.input}
          />
          <textarea 
            name="content"
            value={newsData.content}
            onChange={handleChange}
            placeholder="Content"
            className={styles.textarea}
          />
          <input 
            name="category"
            value={newsData.category}
            onChange={handleChange}
            placeholder="Category"
            className={styles.input}
          />
        <input 
            type="file"
            name="image"
            onChange={handleChange}
            className={styles.input}
          />
          <input 
            name="videoURL"
            value={newsData.videoURL}
            onChange={handleChange}
            placeholder="Video URL"
            className={styles.input}
          />
          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
        <button onClick={onClose} className={styles.closeButton}>Close</button>
      </div>
    </div>
  );
}
