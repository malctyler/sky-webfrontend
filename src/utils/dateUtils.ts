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

export const datePickerConfig = {
    format: 'dd/MM/yy',
    locale: enGB
};
