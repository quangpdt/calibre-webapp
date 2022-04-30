import axios, { AxiosResponse } from 'axios';

export const apiClient = axios.create({
    baseURL: process.env.API_URL,
});

export const createApi = () => {
    return {
        get: {
            libraryStatistics: (): Promise<AxiosResponse> => apiClient.get(`library/statistics`),
            booksList: (pageNumber: number) => apiClient.get(`books/list/${pageNumber}/20`),
            bookDetail: (bookId: number) => apiClient.get(`books/${bookId}`),
            authorList: (pageNumber: number) => apiClient.get(`authors/list/${pageNumber}/20`),
            bookListByAuthor: (authorId: number, pageNumber: number) => apiClient.get(`authors/${authorId}/books/${pageNumber}/20`),
            publisherList: () => apiClient.get(`publishers/list`),
            bookListByPublisher: (publisherId: number, pageNumber: number) => apiClient.get(`publishers/${publisherId}/books/${pageNumber}/20`),
            tagList: () => apiClient.get(`tags/list`),
            bookListByTag: (tagId: number, pageNumber: number) => apiClient.get(`tags/${tagId}/books/${pageNumber}/20`),
        },
    };
};
