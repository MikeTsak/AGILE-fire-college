// NewsDrawer.js
import { useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import styles from '../../styles/Drawer.module.css';

// Dynamically import ReactQuill with no SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function NewsDrawer({ isOpen, onClose, onSubmit }) {
    const [newsData, setNewsData] = useState({
        enTitle: '',
        enSubtitle: '',
        enContent: '',
        elTitle: '',
        elSubtitle: '',
        elContent: '',
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

    const handleEditorChange = (name, value) => {
        setNewsData({ ...newsData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('image', newsData.image);

        // Convert the news object to a JSON string
        const newsJson = JSON.stringify(newsData);
        console.log(newsJson);
      
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
                setNewNewsId(response.data); // Assuming the response contains the id of the new news
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
                    <p className={styles.aboutMainHeader}>Το άρθρο προστέθηκε με επιτυχία!</p>
                    <button onClick={handleViewArticle} className={styles.submitButton}>Προβολή Άρθρου</button>
                    <button 
                        onClick={() => {
                            onClose();
                            setSubmitSuccess(false);
                        }} 
                        className={styles.closeButton}
                    >
                        Κλείσιμο
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.drawer}>
            <div className={styles.drawerContent}>
            <button onClick={onClose} className={styles.closeButtonTopRight}>Κλείσιμο</button>
                <h2>Προσθήκη Άρθρου Ειδήσεων</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className={styles.sectionDivider}>Περιεχόμενο στα Αγγλικά</div>
                    <input 
                        name="enTitle"
                        value={newsData.enTitle}
                        onChange={handleChange}
                        placeholder="Τίτλος στα Αγγλικά"
                        className={styles.input}
                    />
                    <input 
                        name="enSubtitle"
                        value={newsData.enSubtitle}
                        onChange={handleChange}
                        placeholder="Υπότιτλος στα Αγγλικά"
                        className={styles.input}
                    />
                    <ReactQuill
                        value={newsData.enContent}
                        onChange={(content) => handleEditorChange('enContent', content)}
                        placeholder="Περιεχόμενο στα Αγγλικά"
                        className={styles.customQuillEditor}
                    />
                    <br />
                    <div className={styles.sectionDivider}>Περιεχόμενο στα Ελληνικά</div>
                    <input 
                        name="elTitle"
                        value={newsData.elTitle}
                        onChange={handleChange}
                        placeholder="Τίτλος στα Ελληνικά"
                        className={styles.input}
                    />
                    <input 
                        name="elSubtitle"
                        value={newsData.elSubtitle}
                        onChange={handleChange}
                        placeholder="Υπότιτλος στα Ελληνικά"
                        className={styles.input}
                    />
                    <ReactQuill
                        value={newsData.elContent}
                        onChange={(content) => handleEditorChange('elContent', content)}
                        placeholder="Περιεχόμενο στα Ελληνικά"
                        className={styles.customQuillEditor}
                    />
                    <br />
                    <div className={styles.sectionDivider}>Γενικές Πληροφορίες</div>
                    <input 
                        name="category"
                        value={newsData.category}
                        onChange={handleChange}
                        placeholder="Κατηγορία"
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
                        placeholder="Σύνδεσμος Βίντεο"
                        className={styles.input}
                    />
                    <button type="submit" className={styles.submitButton}>Υποβολή</button>
                </form>
            </div>
        </div>
    );
}
