// CourcesDrawer.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import styles from '../../styles/Drawer.module.css'; 
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }); // Dynamically import ReactQuill with no SSR

const greekToLatinMap = {
  'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'h', 'θ': 'th',
  'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x', 'ο': 'o', 'π': 'p',
  'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'u', 'φ': 'f', 'χ': 'ch', 'ψ': 'ps', 'ω': 'o',
  'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'H', 'Θ': 'TH',
  'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': 'X', 'Ο': 'O', 'Π': 'P',
  'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'U', 'Φ': 'F', 'Χ': 'CH', 'Ψ': 'PS', 'Ω': 'O'
};

export default function CourcesDrawer({ isOpen, onClose }) {
    const [selectedTemplate, setSelectedTemplate] = useState(1);
    const [courseData, setCourseData] = useState({
        enTitle: '',
        enSubtitle: '',
        enOverview: '',
        enContent: '',
        enContent2: '',
        enContent3: '',
        enLength: '',
        enAccreditations: '',
        elTitle: '',
        elSubtitle: '',
        elOverview: '',
        elContent: '',
        elContent2: '',
        elContent3: '',
        elLength: '',
        elAccreditations: '',
        image: null,
        image2: null,
        image3: null,
        enSectors: '',
        elSectors: '',
        videoURL: '',
        courseId: ''
    });


    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [newCourseId, setNewCourseId] = useState(null);
    const router = useRouter();

    const renderTemplateButtons = () => {
        return (
            <div className={styles.templateButtonsContainer}>
                <button 
                    onClick={() => setSelectedTemplate(1)}
                    className={selectedTemplate === 1 ? styles.templateButtonActive : styles.templateButton}
                >
                    Πρότυπο 1
                </button>
                <button 
                    onClick={() => setSelectedTemplate(2)}
                    className={selectedTemplate === 2 ? styles.templateButtonActive : styles.templateButton}
                >
                    Πρότυπο 2
                </button>
                <button 
                    onClick={() => setSelectedTemplate(3)}
                    className={selectedTemplate === 3 ? styles.templateButtonActive : styles.templateButton}
                >
                    Πρότυπο 3
                </button>
            </div>
        );
    };

    const handleChange = (e) => {
      let value = e.target.value;
  
      if (e.target.name === 'courseId') {
          // Replace Greek letters with corresponding Latin letters
          value = value.split('').map(char => greekToLatinMap[char] || char).join('');
  
          // Convert to lowercase and replace invalid characters with '-'
          value = value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  
          // Remove leading '-' if present
          if (value.startsWith('-')) {
              value = value.substring(1);
          }
      } else if (e.target.name.startsWith('image')) {
          setCourseData({ ...courseData, [e.target.name]: e.target.files[0] });
          return;
      }
  
      setCourseData({ ...courseData, [e.target.name]: value });
  };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        ['image', 'image2', 'image3'].forEach(key => {
            if (courseData[key]) {
                formData.append(key, courseData[key]);
            }
        });

        // Prepare the non-file data as JSON
        const { image, image2, image3, ...courseInfo } = courseData;
        // Add templateType to courseInfo
        courseInfo.templateType = selectedTemplate.toString();
        // Convert to JSON string and then to Blob
        const courseInfoJson = JSON.stringify(courseInfo);
        const courseInfoBlob = new Blob([courseInfoJson], {
            type: 'application/json'
        });
        formData.append('coursesCreateDto', courseInfoBlob);
        // console.log(courseInfoJson);
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/firedep/courses`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                onClose();
                setSubmitSuccess(true);
                setNewCourseId(response.data.courseId);
            } else {
                // Handle errors
            }
        } catch (error) {
            console.error('Failed to submit course:', error);
        }
    };

    const handleEditorChange = (name, value) => {
        setCourseData({ ...courseData, [name]: value });
    };

    const handleViewCourse = () => {
        router.push(`/courses/${newCourseId}`); // Redirect to the new course page.
    };    

    if (!isOpen) return null;

    if (submitSuccess) {
        return (
          <div className={styles.drawer}>
            <div className={styles.drawerContent}>
              <p className={styles.aboutMainHeader}>Course successfully added!</p>
              <button onClick={handleViewCourse} className={styles.submitButton}>View Course</button>
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
      

      const renderInputsForTemplate = (templateNumber) => {
        switch (templateNumber) {
            case 1:
                return (
                    <>
                    <div className={styles.sectionDivider}>Πεδία Συγκεκριμένα για το Πρότυπο</div>
                    <div className={styles.sectionDivider}>Πρότυπο 1 - Αγγλικό Πρόσθετο Περιεχόμενο</div>
                        <ReactQuill
                            value={courseData.enContent2}
                            onChange={(content) => handleEditorChange('enContent2', content)}
                            placeholder="Αγγλικό Περιεχόμενο 2"
                            className={styles.customQuillEditor}
                        />
                        <ReactQuill
                            value={courseData.enContent3}
                            onChange={(content) => handleEditorChange('enContent3', content)}
                            placeholder="Αγγλικό Περιεχόμενο 3"
                            className={styles.customQuillEditor}
                        />
                        <div className={styles.sectionDivider}>Πρότυπο 1 - Ελληνικό Πρόσθετο Περιεχόμενο</div>
                        <ReactQuill
                            value={courseData.elContent2}
                            onChange={(content) => handleEditorChange('elContent2', content)}
                            placeholder="Ελληνικό Περιεχόμενο 2"
                            className={styles.customQuillEditor}
                        />
                        <ReactQuill
                            value={courseData.elContent3}
                            onChange={(content) => handleEditorChange('elContent3', content)}
                            placeholder="Ελληνικό Περιεχόμενο 3"
                            className={styles.customQuillEditor}
                        />
                        <div className={styles.sectionDivider}>Πρότυπο 1 - Επιπρόσθετες Εικόνες</div>
                        <input type="file" name="image2" onChange={handleChange} className={styles.input} />
                        <input type="file" name="image3" onChange={handleChange} className={styles.input} />
                    </>
                );
            case 3:
                return (
                    <>
                    <div className={styles.sectionDivider}>Πεδία Συγκεκριμένα για το Πρότυπο</div>
                    <div className={styles.sectionDivider}>Πρότυπο 3 - Επιπρόσθετη Εικόνα και Περιεχόμενο</div>
                        <input type="file" name="image2" onChange={handleChange} className={styles.input} />
                        <ReactQuill
                            value={courseData.enContent2}
                            onChange={(content) => handleEditorChange('enContent', content)}
                            placeholder="Αγγλικό Περιεχόμενο 2"
                            className={styles.customQuillEditor}
                        />
                        <ReactQuill
                            value={courseData.elContent2}
                            onChange={(content) => handleEditorChange('enContent', content)}
                            placeholder="Ελληνικό Περιεχόμενο 2"
                            className={styles.customQuillEditor}
                        />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.drawer}>
            <div className={styles.drawerContent}>
                <h2>Προσθήκη Μαθήματος</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {renderTemplateButtons()}
                    {/* Φόρμα για την αγγλική έκδοση */}
                    <div className={styles.sectionDivider}>Αγγλικό Περιεχόμενο</div>
                    <input name="enTitle" value={courseData.enTitle} onChange={handleChange} placeholder="Τίτλος στα Αγγλικά" className={styles.input} />
                    <input name="enSubtitle" value={courseData.enSubtitle} onChange={handleChange} placeholder="Υπότιτλος στα Αγγλικά" className={styles.input} />
                    <ReactQuill
                        value={courseData.enOverview}
                        onChange={(content) => handleEditorChange('enOverview', content)}
                        placeholder="Αγγλική Επισκόπηση"
                        className={styles.customQuillEditor}
                    />
                    <ReactQuill
                        value={courseData.enContent}
                        onChange={(content) => handleEditorChange('enContent', content)}
                        placeholder="Αγγλικό Περιεχόμενο"
                        className={styles.customQuillEditor}
                    />
                    <input name="enLength" value={courseData.enLength} onChange={handleChange} placeholder="Διάρκεια στα Αγγλικά" className={styles.input} />
                    <input name="enAccreditations" value={courseData.enAccreditations} onChange={handleChange} placeholder="Αγγλικές Πιστοποιήσεις" className={styles.input} />
                    <input name="enSectors" value={courseData.enSectors} onChange={handleChange} placeholder="Αγγλικοί Τομείς" className={styles.input} />
    
                    {/* Φόρμα για την ελληνική έκδοση */}
                    <div className={styles.sectionDivider}>Ελληνικό Περιεχόμενο</div>
                    <input name="elTitle" value={courseData.elTitle} onChange={handleChange} placeholder="Τίτλος στα Ελληνικά" className={styles.input} />
                    <input name="elSubtitle" value={courseData.elSubtitle} onChange={handleChange} placeholder="Υπότιτλος στα Ελληνικά" className={styles.input} />
                    <ReactQuill
                        value={courseData.elOverview}
                        onChange={(content) => handleEditorChange('elOverview', content)}
                        placeholder="Ελληνική Επισκόπηση"
                        className={styles.customQuillEditor}
                    />
                    <ReactQuill
                        value={courseData.elContent}
                        onChange={(content) => handleEditorChange('elContent', content)}
                        placeholder="Ελληνικό Περιεχόμενο"
                        className={styles.customQuillEditor}
                    />
                    <input name="elLength" value={courseData.elLength} onChange={handleChange} placeholder="Διάρκεια στα Ελληνικά" className={styles.input} />
                    <input name="elAccreditations" value={courseData.elAccreditations} onChange={handleChange} placeholder="Ελληνικές Πιστοποιήσεις" className={styles.input} />
                    <input name="elSectors" value={courseData.elSectors} onChange={handleChange} placeholder="Ελληνικοί Τομείς" className={styles.input} />
    
                    {/* Ανέβασμα εικόνας και άλλα πεδία */}
                    <input type="file" name="image" onChange={handleChange} className={styles.input} />
                    {renderInputsForTemplate(selectedTemplate)}
                    <div className={styles.sectionDivider}>Κοινά Πεδία</div>
    
                    <input name="videoURL" value={courseData.videoURL} onChange={handleChange} placeholder="Σύνδεσμος Βίντεο (προαιρετικό)" className={styles.input} />
                    <input name="courseId" value={courseData.courseId} onChange={handleChange} placeholder="Αναγνωριστικό Μαθήματος" className={styles.input} />
    
                    <button type="submit" className={styles.submitButton}>Υποβολή</button>
                </form>
                <button onClick={onClose} className={styles.closeButtonTopRight }>Κλείσιμο</button>
            </div>
        </div>
    );
}
