import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import Button from "../../ui/Button/Button";
import { FaEdit, FaTrash, FaShare, FaBookmark } from "react-icons/fa";
import "./NewsActions.scss";
import { toastService } from "../../../services/toastService";

const NewsActions = ({news, onEdit, onDelete, onShare, onBookmark}) => {
    const {isAuthenticated, isAdmin, user} = useAuth();
    const canEdit = isAuthenticated && isAdmin; 
    const canDelete = isAuthenticated && isAdmin;

    const handleShare = () => { 
        if(navigator.share) {
            navigator.share({
                title: news.title,
                text: news.content?.substring(0,100) + '... ',
                url: window.location.href
            });
        }else {
            navigator.clipboard.writeText(window.location.href);
            toastService.success('Đã sao chép link vào clipboard!');
        }
    };

    return (
        <div className="news-actions">
            <div className="news-actions__left">
            </div>

            <div className="news-actions__right">
                <Button
                    variant="outline"
                    size="small"
                    onClick={handleShare}
                    className="news-actions__btn"
                >
                    <FaShare />
                    Chia sẻ
                </Button>

                {isAuthenticated && (
                    <Button
                        variant="outline"
                        size="small"
                        onClick={onBookmark}
                        className="news-actions__btn"
                    >
                        <FaBookmark />
                        Lưu
                    </Button>
                )}
            </div>
        </div>
    );
};

export default NewsActions;