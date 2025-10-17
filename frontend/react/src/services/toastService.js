import { toast } from "react-toastify";

export const toastService = { 
    // Success toast
    success: (message, options = {}) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgessBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true, 
            ...options
        });
    },

    // Error toast
    error: (message, options = {}) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgessBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true, 
            ...options
        });
    },

    // warning toast
    warning: (message, options = {}) => {
        toast.warning(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgessBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true, 
            ...options
        });
    },

    // default toast
    default: (message, options = {}) => {
        toast(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgessBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true, 
            ...options
        });
    }
};