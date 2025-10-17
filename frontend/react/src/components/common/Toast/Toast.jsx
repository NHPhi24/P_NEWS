import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './Toast.scss';
import e from "cors";

const Toast = () => {
    return (
        <ToastContainer
            position="top-right"    // vị trí
            autoClose= {2000}       //thời gian đóng
            hideProgressBar={false} //ẩn thành tiến trình (progress bar) dưới cùng của toast không
            newestOnTop={false}     //toast mới xuất hiện dưới cùng
            closeOnClick            //có thể đóng thủ công
            rtl={false}             //false: tiếng việt và tiếng Anh / true: dành cho ngôn ngữ viết từ phải sang trái (Ả rập, Do thái)
            pauseOnFocusLoss        //tab trình duyệt sẽ pause taost lại 
            draggable               //có thể chuyển đổi vi_tri
            pauseOnHover            //có thể pause khi hover với toast
            theme="light"           //theme: light, dark, colo
            className="toast-container" //tùy chỉnh css
        />
    )
}

export default Toast;