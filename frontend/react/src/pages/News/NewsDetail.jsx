import React, {useState, useEffect} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { newsService } from "../../services/newsService";
import {categoryService} from "../../services/categoryService";
import NewsActions from "../../components/news/NewsActions/NewsActions";
import RelatedNews from "../../components/news/RelatedNews/RelatedNews";
import Loading from "../../components/ui/Loading/Loading";
import Button from "../../components/ui/Button/Button";
import { useToast } from "../../hooks/useToast";
import './NewsDetail.scss';
import {
    FaCalendar,
    FaUser,
    FaEye,
    FaFolder,
    FaArrowLeft,
    FaFire
} from "react-icons/fa";


const NewsDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {showError, showSuccess, showInfo} = useToast();
    
    const [news, setNews] = useState(null);
    const [relatedNews, setRelatedNews] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { 
        if(id) {
            loadNewsDetail();
        }
    }, [id]);

    const loadNewsDetail = async () => { 
        try {
            setLoading(true);
            setError(null);

            const newsReponse = await newsService.getNewsById(id);
            if(newsReponse.success && newsReponse.data) {
                const newsData = newsReponse.data;
                setNews(newsData);
                // Nếu bài có category_id thi tìm kiếm tin tức liên quan
                if(newsData.category_id) {
                    try {
                        const relatedReponse = await newsService.getNewsByCategory(newsData.category_id);
                        const relatedNewsData = relatedReponse.data || relatedReponse;
                        setRelatedNews(Array.isArray(relatedNewsData) ? relatedNewsData : []);
                        // set category name
                        const catName = relatedNewsData?.[0]?.category_name || newsData.category_name || ''
                        setCategoryName(catName);
                    } catch (err) {
                        showError('Không thể tải tin tức liên quan');
                        setRelatedNews([]);
                        setCategoryName(newsData.category_name || '');
                    }
                }
                }else {
                    throw new Error('Không thể tìm thấy tin tức');
            }
        } catch (err) {
            const errorMessage = err.reponse?.data?.message || err.message || 'Không thể tải chi tiết tin tức'
            setError(errorMessage);
            showError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        showInfo('Tính năng chỉnh sửa tin tức đang phát triển');
    }

    const handleDelete = async () => {
        if(window.confirm('Bạn có chắc muốn xóa tin tức này?')) {
            try {
                await newsService.deleteNews(id);
                showSuccess('Đã xóa tin tức thành công')
            } catch (err) {
                showError('Không thể xóa tin tức');
            }
        }
    }

    const handleShare = () => {
        if(navigator.share) {
            navigator.share({
                title: news.title,
                text: news.content?.substring(0,100) + '... ',
                url: window.location.href
            });
        }else {
            navigator.clipboard.writeText(window.location.href);
            showSuccess('Đã sao chép link vào clipboard!');
        }
    }

    const handleBookmark = () => {
        showInfo('Tính năng bookmark đang phát triển');
    }

    const formatDate = (dateString) => { 
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if(loading) {
        return (
            <div className="news-detail-loading">
                <Loading size="large" text="Đang tải tin tức ..." />
            </div>
        )
    }

    if (error || !news) {
        return (
            <div className="news-detail-error">
                <div className="container">
                    <div className="news-detail-error__content">
                        <h2>Không tìm thấy tin tức</h2>
                        <p>{error || 'Tin tức bạn đang tìm kiếm không tồn tại.'}</p>
                        <div className="news-detail-error__actions">
                            <Button
                                variant="primary"
                                onClick={() => navigate('/')}
                                className="news-detail-error__btn"
                            >
                                <FaArrowLeft/>
                                Quay về trang chủ
                            </Button>

                            <Button 
                                variant="outline" 
                                onClick={loadNewsDetail}
                                className="news-detail-error__btn"
                            >
                                Thử lại
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="news-detail">
            <div className="container">
                {/* back button */}
                <div className="news-detail__back">
                    <Link to='/' className="news-detail__back-link">
                        <FaArrowLeft /> Quay về trang chủ
                    </Link>
                </div>

                <div className="news-detail__grid">
                    {/* main content */}
                    <article className="news-detail__artical">
                        <header className="news-detail__header">
                            {news.is_hot && (
                                <div className="news-detail__hot-badge">
                                    <FaFire />
                                    <span>HOT</span>
                                </div>
                            )}

                            <div className="news-detail__category">
                                <FaFolder/>
                                <span>{news.categories_name || news.category_name || 'Chưa phân loại'}</span>
                            </div>

                            <h1 className="news-detail__title">{news.title}</h1>

                            <div className="news-detail__meta">
                                <div className="news-detail__meta-item">
                                <FaUser />
                                <span className="news-detail__author">
                                    {news.author_name || 'Ẩn danh'}
                                </span>
                                </div>
                                
                                <div className="news-detail__meta-item">
                                <FaCalendar />
                                <span className="news-detail__date">
                                    {formatDate(news.created_at)}
                                </span>
                                </div>
                                
                                <div className="news-detail__meta-item">
                                <FaEye />
                                <span className="news-detail__views">
                                    {news.views || 0} lượt xem
                                </span>
                                </div>
                            </div>
                        </header>

                        {/* Featured image */}
                        <div className="news-detail__image">
                            {news.image_url ? (
                                <img
                                    src={news.image_url}
                                    alt={news.title}
                                    className="news-detail__image-img"
                                />
                            ): (
                                <div className="news-detail__image-placeholder">
                                    {news.title?.charAt(0)}
                                </div>
                            )}
                        </div>

                        {/* Article content */}
                        <div className="news-detail__content">
                            {news.content && news.content.split('\n').map((paragraph, index)=> (
                                paragraph.trim() && (
                                    <p key={index} className="news-detail__paragraph">
                                        {paragraph}
                                    </p>
                                )
                            ))}
                        </div>

                        {/* News actions */}
                        <NewsActions
                            news={news}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onShare={handleShare}
                            onBookmark={handleBookmark}
                        />
                    </article>

                    {/* sidebar with related news */}
                    {relatedNews.length > 0 && (
                        <aside className="news-detail__sidebar">
                            <RelatedNews 
                                news={relatedNews} 
                                currentNewsId={news.id}
                                categoryName={categoryName|| news.category_name || "Chưa phân loại"}
                            />
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewsDetail;