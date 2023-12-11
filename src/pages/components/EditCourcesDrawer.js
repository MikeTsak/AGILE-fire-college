// EditCoursesDrawer.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import styles from '../../styles/Drawer.module.css'; // Ensure to create this CSS module
import 'react-quill/dist/quill.snow.css'; // Import quill styles

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }); // Dynamically import ReactQuill with no SSR

export default function EditCoursesDrawer({ isOpen, onClose, courseId }) {
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
        selectedTemplate: 1
    });

    useEffect(() => {
        if (courseId) {
            fetchCourseData(courseId);
        }
    }, [courseId]);

    const fetchCourseData = async (id) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/firedep/courses/${id}`);
            setCourseData(response.data);
            // Handle image previews if needed
        } catch (error) {
            console.error('Error fetching course data:', error);
        }
    };

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setCourseData({ ...courseData, [e.target.name]: e.target.files[0] });
        } else {
            setCourseData({ ...courseData, [e.target.name]: e.target.value });
        }
    };

    const handleEditorChange = (name, value) => {
        setCourseData({ ...courseData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(courseData).forEach(key => {
            if (courseData[key] != null) {
                formData.append(key, courseData[key]);
            }
        });

        try {
            const token = sessionStorage.getItem('token');
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/firedep/courses/${courseId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            onClose(); // Close the drawer on successful update
        } catch (error) {
            console.error('Failed to update course:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.drawer}>
            <div className={styles.drawerContent}>
                <h2>Edit Course</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* English Content */}
                    <input name="enTitle" value={courseData.enTitle} onChange={handleChange} placeholder="English Title" className={styles.input} />
                    <input name="enSubtitle" value={courseData.enSubtitle} onChange={handleChange} placeholder="English Subtitle" className={styles.input} />
                    <ReactQuill value={courseData.enOverview} onChange={(content) => handleEditorChange('enOverview', content)} placeholder="English Overview" />
                    <ReactQuill value={courseData.enContent} onChange={(content) => handleEditorChange('enContent', content)} placeholder="English Content" />
                    {/* Additional English fields */}
                    <ReactQuill value={courseData.enContent2} onChange={(content) => handleEditorChange('enContent2', content)} placeholder="Additional English Content 2" />
                    <ReactQuill value={courseData.enContent3} onChange={(content) => handleEditorChange('enContent3', content)} placeholder="Additional English Content 3" />
                    
                    {/* Greek Content */}
                    <input name="elTitle" value={courseData.elTitle} onChange={handleChange} placeholder="Greek Title" className={styles.input} />
                    <input name="elSubtitle" value={courseData.elSubtitle} onChange={handleChange} placeholder="Greek Subtitle" className={styles.input} />
                    <ReactQuill value={courseData.elOverview} onChange={(content) => handleEditorChange('elOverview', content)} placeholder="Greek Overview" />
                    <ReactQuill value={courseData.elContent} onChange={(content) => handleEditorChange('elContent', content)} placeholder="Greek Content" />
                    {/* Additional Greek fields */}
                    <ReactQuill value={courseData.elContent2} onChange={(content) => handleEditorChange('elContent2', content)} placeholder="Additional Greek Content 2" />
                    <ReactQuill value={courseData.elContent3} onChange={(content) => handleEditorChange('elContent3', content)} placeholder="Additional Greek Content 3" />

                    {/* Common fields */}
                    <input type="file" name="image" onChange={handleChange} className={styles.input} />
                    <input type="file" name="image2" onChange={handleChange} className={styles.input} />
                    <input type="file" name="image3" onChange={handleChange} className={styles.input} />
                    <input name="videoURL" value={courseData.videoURL} onChange={handleChange} placeholder="Video URL" className={styles.input} />

                    <button type="submit" className={styles.submitButton}>Update</button>
                </form>

                <button onClick={onClose} className={styles.closeButtonTopRight}>Close</button>
            </div>
        </div>
    );
}
