import { useCallback } from "react";
import { toastService } from "../services/toastService";

export const useToast = () => {
    const showSuccess = useCallback((message, options) => { 
        toastService.success(message, options);
    }, []);

    const showError = useCallback((message, options) => { 
        toastService.error(message, options);
    }, []);

    const showWarning = useCallback((message, options) => { 
        toastService.warning(message, options);
    }, []);

    const showInfo = useCallback((message, options) => { 
        toastService.info(message, options);
    }, []);

    const showDefault = useCallback((message, options) => { 
        toastService.default(message, options);
    }, []);
    
    const showConfirm = (title, message) => {
        return new Promise((resolve) => {
            const result = window.confirm(`${title}\n\n${message}`)
            resolve(result);
        })
    }
    return { showSuccess, showError, showWarning, showInfo, showDefault, showConfirm };

}