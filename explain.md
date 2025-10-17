# 1 table users (bảng người dùng)

id : khóa chính
username : Tên đăng nhập
password : Mật khẩu
email : email
role : vai trò/phân quyền
created_users : ngày tạo
updated_at : ngày cập nhật

# 2 table authors (bảng tác giả)

id : khóa chính
name : Tên tác giả
bio : giới thiệu ngắn bản thân
avatar_url : ảnh đại diện
user_id: liên kết với users.id

# 3 table categories (bảng danh mục)

id : khóa chính
name : Tên danh mục

# 4 table news (bảng tin tức)

id : khóa chính
title : Tên tiêu đề bài viết
content : nội dung bài viết
author_id : id tác giả
category_id : id danh mục
is_hot : tin nổi bật
views : lượt xem
create_at : ngày tạo
update_at : ngày cập nhật

# 5 table comments (bảng bình luận)

id : khóa chính
news_id : id tin tức
user_id : id người dùng
content : nội dung binh luận
create_at : ngày tạo
