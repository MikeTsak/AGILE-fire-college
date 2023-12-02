// CourcesDrawer.js
import { useState } from 'react';
import styles from '../../styles/Drawer.module.css'; // Ensure to create this CSS module

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
        title: '',
        subTitle: '',
        overview: '',
        content: '',
        content2: '',
        content3: '',
        length: '',
        accreditations: '',
        image: null,
        image2: null,
        image3: null,
        sectors: '',
        videoURL: '',
        id: ''
    });

    const handleChange = (e) => {
      let value = e.target.value;
  
      if (e.target.name === 'id') {
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
        Object.keys(courseData).forEach(key => {
            if (key.startsWith('image') && courseData[key]) {
                formData.append(key, courseData[key]);
            } else {
                formData.append(key, courseData[key]);
            }
        });

        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch('http://localhost:8080/firedep/courses', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                    // 'content-type': 'multipart/form-data' is not necessary, as it's set automatically when using FormData
                },
                body: formData
            });

            if (response.ok) {
                onClose(); // Close the drawer after successful submission
                // Optionally, you might want to refresh the course list in the parent component
            } else {
                // Handle errors
            }
        } catch (error) {
            console.error('Failed to submit course:', error);
        }
    };

    if (!isOpen) return null;

    const renderInputsForTemplate = (templateNumber) => {
        switch (templateNumber) {
            case 1:
                return (
                    <>
                        <textarea name="content" value={courseData.content} onChange={handleChange} placeholder="Content" className={styles.textarea} />
                        <textarea name="content2" value={courseData.content2} onChange={handleChange} placeholder="Content 2" className={styles.textarea} />
                        <textarea name="content3" value={courseData.content3} onChange={handleChange} placeholder="Content 3" className={styles.textarea} />
                        <input type="file" name="image2" onChange={handleChange} className={styles.input} />
                        <input type="file" name="image3" onChange={handleChange} className={styles.input} />
                    </>
                );
            case 3:
                return (
                    <>
                        <input type="file" name="image2" onChange={handleChange} className={styles.input} />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.drawer}>
            <div className={styles.drawerContent}>
                <h2>Add Course</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(Number(e.target.value))} className={styles.select}>
                        <option value="1">Template 1</option>
                        <option value="2">Template 2</option>
                        <option value="3">Template 3</option>
                    </select>
                    <input name="title" value={courseData.title} onChange={handleChange} placeholder="Title" className={styles.input} />
                    <input name="subTitle" value={courseData.subTitle} onChange={handleChange} placeholder="Subtitle" className={styles.input} />
                    <textarea name="overview" value={courseData.overview} onChange={handleChange} placeholder="Overview" className={styles.textarea} />
                    {renderInputsForTemplate(selectedTemplate)}
                    <input name="length" value={courseData.length} onChange={handleChange} placeholder="Length" className={styles.input} />
                    <input name="accreditations" value={courseData.accreditations} onChange={handleChange} placeholder="Accreditations" className={styles.input} />
                    <input type="file" name="image" onChange={handleChange} className={styles.input} />
                    <input name="sectors" value={courseData.sectors} onChange={handleChange} placeholder="Sectors" className={styles.input} />
                    <input name="videoURL" value={courseData.videoURL} onChange={handleChange} placeholder="Video URL (optional)" className={styles.input} />
                    <input name="id" value={courseData.id} onChange={handleChange} placeholder="ID" className={styles.input} />
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
                <button onClick={onClose} className={styles.closeButton}>Close</button>
            </div>
        </div>
    );
}
