import { useState } from 'react';
import styles from '../../styles/NewsDrawer.module.css'; // Ensure to create this CSS module

export default function NewsDrawer({ isOpen, onClose, onSubmit }) {
    const [newsData, setNewsData] = useState({
        title: '',
        subTitle: '',
        content: '',
        category: '',
        videoURL: '',
        image: null
      });

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
        formData.append('news', JSON.stringify({
          title: newsData.title,
          subTitle: newsData.subTitle,
          content: newsData.content,
          category: newsData.category,
          videoURL: newsData.videoURL
        }));
    
        try {
          const token = sessionStorage.getItem('token');
          const response = await fetch('http://localhost:8080/firedep/news', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'content-type': 'multipart/form-data'
            },
            body: formData
          });
          console.log(token)
          console.log(response);
          if (response.ok) {
            onClose(); // Close the drawer after successful submission
            // Optionally, you might want to refresh the news list in the parent component
          } else {
            // Handle errors
          }
        } catch (error) {
          console.error('Failed to submit news:', error);
        }
      };
    
      if (!isOpen) return null;

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
