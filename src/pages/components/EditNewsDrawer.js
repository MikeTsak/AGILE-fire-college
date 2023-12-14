//edit news drawer
import { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import styles from '../../styles/Drawer.module.css'; // Βεβαιωθείτε ότι δημιουργήσατε αυτό το CSS module
import 'react-quill/dist/quill.snow.css'; // Εισαγωγή των στυλ του quill

// Δυναμική εισαγωγή του ReactQuill χωρίς SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function EditNewsDrawer({ isOpen, onClose, newsId, onSubmit }) {
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
    const [imagePreview, setImagePreview] = useState(null);
    const [isChangingImage, setIsChangingImage] = useState(false);

    useEffect(() => {
        if (newsId) {
            fetchNewsData(newsId);
        }
    }, [newsId]);

    const fetchNewsData = async (id) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/firedep/news/${id}`);
            setNewsData(response.data);
            setImagePreview(`data:image/jpeg;base64,${response.data.image}`);
        } catch (error) {
            console.error('Σφάλμα κατά τη λήψη των δεδομένων της είδησης:', error);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files[0];
            setNewsData({ ...newsData, image: file });
            setImagePreview(URL.createObjectURL(file));
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
        if (isChangingImage && newsData.image && typeof newsData.image === 'object') {
            formData.append('image', newsData.image);
        } else if (!isChangingImage && typeof newsData.image === 'string') {
            try {
                // Έλεγχος αν η συμβολοσειρά της εικόνας ξεκινά με το σχήμα δεδομένων του URL
                const base64Pattern = /^data:image\/[a-z]+;base64,/;
                if (!base64Pattern.test(newsData.image)) {
                    // Αν το σχήμα δεδομένων του URL λείπει, προσθέστε το (ή χειριστείτε όπως χρειάζεται)
                    newsData.image = `data:image/jpeg;base64,${newsData.image}`;
                }

                const base64String = newsData.image.replace(base64Pattern, '');

                // Μετατροπή της συμβολοσειράς base64 σε Blob
                const byteCharacters = atob(base64String);
                const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'image/jpeg' });

                // Μετατροπή του Blob σε αρχείο (File)
                const imageFile = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                formData.append('image', imageFile);
            } catch (error) {
                console.error('Σφάλμα κατά την επεξεργασία της εικόνας:', error);
                return; // Έξοδος από τη συνάρτηση αν η επεξεργασία της εικόνας αποτύχει
            }
        }

        const { image, ...newsDataForSubmission } = newsData;
        formData.append('news', new Blob([JSON.stringify(newsDataForSubmission)], { type: 'application/json' }));

        try {
            const token = sessionStorage.getItem('token');
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/firedep/news/${newsId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            onSubmit && onSubmit(); // Κλήση της συνάρτησης onSubmit μετά από επιτυχή ενημέρωση
            onClose(); // Κλείσιμο του συρταριού μετά από επιτυχή ενημέρωση
        } catch (error) {
            console.error('Αποτυχία ενημέρωσης της είδησης:', error);
        }
    };

    const handleImageChangeClick = () => {
        setIsChangingImage(true);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.drawer}>
            <div className={styles.drawerContent}>
                <h2>Επεξεργασία Άρθρου</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input
                        name="enTitle"
                        value={newsData.enTitle || ''}
                        onChange={handleChange}
                        placeholder="Τίτλος στα Αγγλικά"
                        className={styles.input}
                    />
                    <input
                        name="enSubtitle"
                        value={newsData.enSubtitle || ''}
                        onChange={handleChange}
                        placeholder="Υπότιτλος στα Αγγλικά"
                        className={styles.input}
                    />
                    {/* <textarea 
                        name="enContent"
                        value={newsData.enContent}
                        onChange={handleChange}
                        placeholder="Περιεχόμενο στα Αγγλικά"
                        className={styles.textarea}
                    /> */}
                    <ReactQuill
                        value={newsData.enContent}
                        onChange={(content) => handleEditorChange('enContent', content)}
                        placeholder="Περιεχόμενο στα Αγγλικά"
                        className={styles.customQuillEditor}
                    />
                    <input
                        name="elTitle"
                        value={newsData.elTitle || ''}
                        onChange={handleChange}
                        placeholder="Τίτλος στα Ελληνικά"
                        className={styles.input}
                    />
                    <input
                        name="elSubtitle"
                        value={newsData.elSubtitle || ''}
                        onChange={handleChange}
                        placeholder="Υπότιτλος στα Ελληνικά"
                        className={styles.input}
                    />
                    {/* <textarea 
                        name="elContent"
                        value={newsData.elContent}
                        onChange={handleChange}
                        placeholder="Περιεχόμενο στα Ελληνικά"
                        className={styles.textarea}
                    /> */}
                    <ReactQuill
                        value={newsData.elContent}
                        onChange={(content) => handleEditorChange('elContent', content)}
                        placeholder="Περιεχόμενο στα Ελληνικά"
                        className={styles.customQuillEditor}
                    />
                    <input
                        name="category"
                        value={newsData.category || ''}
                        onChange={handleChange}
                        placeholder="Κατηγορία"
                        className={styles.input}
                    />
                    {imagePreview && !isChangingImage && (
                        <div className={styles.imagePreviewContainer}>
                            <img src={imagePreview} alt="Προεπισκόπηση" />
                            <p>Τρέχουσα Εικόνα</p>
                            <button onClick={handleImageChangeClick} className={styles.changeImageButton}>
                                Αλλαγή Εικόνας
                            </button>
                        </div>
                    )}
                    {isChangingImage && (
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className={styles.input}
                        />
                    )}
                    <input
                        name="videoURL"
                        value={newsData.videoURL || ''}
                        onChange={handleChange}
                        placeholder="Σύνδεσμος Βίντεο"
                        className={styles.input}
                    />
                    <button type="submit" className={styles.submitButton}>Ενημέρωση</button>
                </form>

                <button onClick={onClose} className={styles.closeButtonTopRight}>Κλείσιμο</button>
            </div>
        </div>
    );
}
