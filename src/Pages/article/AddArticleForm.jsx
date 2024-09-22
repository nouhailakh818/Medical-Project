import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ArticleForm.scss';

const AddArticleForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date_pub, setDatePub] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('date_pub', date_pub);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      // Create new article
      await axios.post('http://localhost:3333/api/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/articles');
    } catch (error) {
      console.error('Error saving article:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="article-form">
      <h1>Create Article</h1>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form">
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form2">
          <label>Date Published:</label>
          <input
            type="date"
            value={date_pub}
            onChange={(e) => setDatePub(e.target.value)}
          />
        </div>
        <div className="form">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={(event) => setSelectedImage(event.target.files[0])}
          />
        </div>
        <button type="submit">Create Article</button>
      </form>
    </div>
  );
};

export default AddArticleForm;
