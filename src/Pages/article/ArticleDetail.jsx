import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 
import './ArticleDetails.scss'; 

const ArticleDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        
        const response = await axios.get(`http://localhost:3333/api/articles/${id}`);
        setArticle(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching article:', err.response ? err.response.data : err.message); 
      }
    };

    fetchArticle();
  }, [id]);

 

  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>Loading...</div>;

  return (
    <div className="article-details">
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <div className="date">{new Date(article.date_pub).toLocaleDateString()}</div>
    </div>
  );
};

export default ArticleDetail;
