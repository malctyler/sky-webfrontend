import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';

export const formatDate = (date: Date | string | null): string => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'dd/MM/yy', { locale: enGB });
};

export const formatDateExtended = (date: Date | string | null): string => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'dd/MM/yyyy', { locale: enGB });
};

export const formatDateTime = (date: Date | string | null): string => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'dd/MM/yy HH:mm', { locale: enGB });
};

/**
 * Converts a Date to ISO string while preserving the local date
 * (avoids timezone shifts that can change the date)
 */
export const toLocalISOString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const datePickerConfig = {
    format: 'dd/MM/yy',
    locale: enGB,
    // Add explicit timezone handling
    shouldDisableTime: () => false,
    views: ['day'],
    // Set to noon to avoid timezone issues
    ampm: false,
    value: (date: Date) => {
        const d = new Date(date);
        d.setHours(12, 0, 0, 0);
        return d;
    }
};
