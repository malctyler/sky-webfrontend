import apiClient from './apiClient';
import { Note } from '../types/customerTypes';

export const customerNotesService = {
    getAllNotes: async (customerId: number): Promise<Note[]> => {
        const response = await apiClient.get<Note[]>(`/Notes/customer/${customerId}`);
        return response.data;
    },

    createNote: async (customerId: number, note: Omit<Note, 'noteID'>): Promise<Note> => {
        const response = await apiClient.post<Note>(`/Notes`, { ...note, customerId });
        return response.data;
    },

    updateNote: async (noteId: number, note: Omit<Note, 'noteID'>): Promise<Note> => {
        const response = await apiClient.put<Note>(`/Notes/${noteId}`, note);
        return response.data;
    },

    deleteNote: async (noteId: number): Promise<void> => {
        await apiClient.delete(`/Notes/${noteId}`);
    }
};
