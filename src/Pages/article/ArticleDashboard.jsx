import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ArticleDashboard.scss';

const ArticleDashboard = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:3333/';

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/articles`);
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id_article) => {
    try {
      if (window.confirm('Are you sure you want to delete this article?')) {
        await axios.delete(`${baseUrl}api/articles/${id_article}`);
        setArticles(articles.filter(article => article.id_article !== id_article));
      }
    } catch (error) {
      console.error('Error deleting article:', error.response ? error.response.data : error.message);
    }
  };

  const handleModify = (id_article) => {
    navigate(`/articles/${id_article}/edit`);
  };

  return (
    <div className="article-dashboard">
      <h1>Article Dashboard</h1>
      <table className="article-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date Published</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.id_article}>
              <td>{article.title}</td>
              <td>{new Date(article.date_pub).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleModify(article.id_article)} className="action-button">
                  <FaEdit /> Modify
                </button>
                <button onClick={() => handleDelete(article.id_article)} className="action-button">
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleDashboard;
