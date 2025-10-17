import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaFire, FaClock } from 'react-icons/fa';
import './NewsCard.scss';

const NewsCard = ({ news }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <article className="news-card">
      {news.is_hot && (
        <div className="news-card__hot-badge">
          <FaFire />
          <span>Nổi bật</span>
        </div>
      )}
      
      <div className="news-card__image">
        {news.image_url ? (
          <img
            src={news.image_url}
            alt={news.title}
            className="news-card__image-img"
            loading="lazy"
          />
        ) : (
          <div className="news-card__image-placeholder">
            {news.title?.charAt(0)}
          </div>
        )}
      </div>

      <div className="news-card__content">
        <div className="news-card__meta">
          <span className="news-card__category">
            {news.categories_name || news.category_name || 'Chưa phân loại'}
          </span>
          <span className="news-card__date">
            <FaClock />
            {formatDate(news.created_at)}
          </span>
        </div>

        <h3 className="news-card__title">
          <Link to={`/news/${news.id}`}>
            {truncateText(news.title, 80)}
          </Link>
        </h3>

        <p className="news-card__excerpt">
          {truncateText(news.content, 120)}
        </p>

        <div className="news-card__footer">
          <div className="news-card__author">
            <span className="news-card__author-name">
              {news.author_name || 'Ẩn danh'}
            </span>
          </div>
          
          <div className="news-card__views">
            <FaEye />
            <span>{news.views || 0}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;