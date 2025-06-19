export const setCookie = (name: string, value: string, minutes: number = 60) => {
    const date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; Secure; SameSite=None";
};

export const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let c of ca) {
        let cookiePair = c;
        while (cookiePair.charAt(0) === ' ') {
            cookiePair = cookiePair.substring(1);
        }
        if (cookiePair.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookiePair.substring(nameEQ.length));
        }
    }
    return null;
};

export const removeCookie = (name: string) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; Secure; SameSite=None';
};
