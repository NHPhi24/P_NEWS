import api from "./api";
import { toastService } from "./toastService";

export const authorService = {
    getAllAuthors: async () =>{ 
        try {
            const response = await api.get(`/authors`)
            return response.data
        } catch (err) {
            toastService.error('Không thể tải danh sách tác giả')
            throw err;
        }
    },
    
    getAuthorById: async (id) => {
        try {
            const response = await api.get(`/authors/${id}`)
            return response.data
        } catch (err) {
            toastService.error('Không thể tải chi tiết tác giả')
            throw err;
        }
    }
}