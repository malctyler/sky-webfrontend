import type { ReactNode } from 'react';
import { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { blue, indigo, orange, grey, teal } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

interface ThemeContextType {
    toggleTheme: () => void;
    isDarkMode: boolean;
    changeThemeColor: (colorName: ThemeColorOption) => void;
    currentThemeColor: ThemeColorOption;
}

interface ThemeProviderProps {
    children: ReactNode;
}

// Available theme color options
export type ThemeColorOption = 'blue' | 'orange' | 'teal' | 'indigo';

// Theme color palettes
const themeColors: Record<ThemeColorOption, Record<string, any>> = {
    blue: {
        light: {
            primary: {
                main: '#0066cc',
                light: '#4f82d1',
                dark: '#004999',
                contrastText: '#ffffff',
            }
        },
        dark: {
            primary: {
                main: '#66b3ff',
                light: '#99cbff',
                dark: '#004999',
                contrastText: '#000000',
            }
        },
        cssVars: {
            light: {
                linkColorRgb: '0, 102, 204',
                linkColor: '#0066cc',
                linkColorDark: '#004999',
                navBg: '#ffffff',
                borderColor: '#e0e0e0',
                backgroundDefault: '#f5f5f5',
                textPrimary: '#323a46',
                textMuted: '#6c757d'
            },
            dark: {
                linkColorRgb: '102, 179, 255',
                linkColor: '#66b3ff',
                linkColorDark: '#4f82d1',
                navBg: '#1a1e24',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backgroundDefault: '#282c34',
                textPrimary: '#ffffff',
                textMuted: 'rgba(255, 255, 255, 0.7)'
            }
        }
    },
    orange: {
        light: {
            primary: {
                main: '#f57c00',
                light: '#ff9d3f',
                dark: '#bb4d00',
                contrastText: '#ffffff',
            }
        },
        dark: {
            primary: {
                main: '#ffb74d',
                light: '#ffcc80', 
                dark: '#c88719',
                contrastText: '#000000',
            }
        },
        cssVars: {
            light: {
                linkColorRgb: '245, 124, 0',
                linkColor: '#f57c00',
                linkColorDark: '#bb4d00',
                navBg: '#ffffff',
                borderColor: '#e0e0e0',
                backgroundDefault: '#f5f5f5',
                textPrimary: '#323a46',
                textMuted: '#6c757d'
            },
            dark: {
                linkColorRgb: '255, 183, 77',
                linkColor: '#ffb74d',
                linkColorDark: '#c88719',
                navBg: '#1a1e24',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backgroundDefault: '#282c34',
                textPrimary: '#ffffff',
                textMuted: 'rgba(255, 255, 255, 0.7)'
            }
        }
    },
    teal: {
        light: {
            primary: {
                main: '#00897b',
                light: '#4ebaaa',
                dark: '#005b4f',
                contrastText: '#ffffff',
            }
        },
        dark: {
            primary: {
                main: '#4db6ac',
                light: '#80cbc4',
                dark: '#00897b',
                contrastText: '#000000',
            }
        },
        cssVars: {
            light: {
                linkColorRgb: '0, 137, 123',
                linkColor: '#00897b',
                linkColorDark: '#005b4f',
                navBg: '#ffffff',
                borderColor: '#e0e0e0',
                backgroundDefault: '#f5f5f5',
                textPrimary: '#323a46',
                textMuted: '#6c757d'
            },
            dark: {
                linkColorRgb: '77, 182, 172',
                linkColor: '#4db6ac',
                linkColorDark: '#00897b',
                navBg: '#1a1e24',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backgroundDefault: '#282c34',
                textPrimary: '#ffffff',
                textMuted: 'rgba(255, 255, 255, 0.7)'
            }
        }
    },
    indigo: {
        light: {
            primary: {
                main: '#3f51b5',
                light: '#7986cb',
                dark: '#303f9f',
                contrastText: '#ffffff',
            }
        },
        dark: {
            primary: {
                main: '#7986cb',
                light: '#9fa8da',
                dark: '#3f51b5',
                contrastText: '#000000',
            }
        },
        cssVars: {
            light: {
                linkColorRgb: '63, 81, 181',
                linkColor: '#3f51b5',
                linkColorDark: '#303f9f',
                navBg: '#ffffff',
                borderColor: '#e0e0e0',
                backgroundDefault: '#f5f5f5',
                textPrimary: '#323a46',
                textMuted: '#6c757d'
            },
            dark: {
                linkColorRgb: '121, 134, 203',
                linkColor: '#7986cb',
                linkColorDark: '#3f51b5',
                navBg: '#1a1e24',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backgroundDefault: '#282c34',
                textPrimary: '#ffffff',
                textMuted: 'rgba(255, 255, 255, 0.7)'
            }
        }
    }
};

const ThemeContext = createContext<ThemeContextType>({
    toggleTheme: () => {},
    isDarkMode: true,
    changeThemeColor: () => {},
    currentThemeColor: 'blue'
});

// Function to get theme design tokens
const getDesignTokens = (mode: PaletteMode, colorOption: ThemeColorOption) => {
    const selectedColor = themeColors[colorOption][mode === 'light' ? 'light' : 'dark'];
    
    return {
        palette: {
            mode,
            primary: selectedColor.primary,
            secondary: {
                main: mode === 'light' ? '#6c757d' : '#a0aec0',
                light: mode === 'light' ? '#868e96' : '#cbd5e0',
                dark: mode === 'light' ? '#495057' : '#718096',
                contrastText: mode === 'light' ? '#ffffff' : '#000000',
            },
            background: {
                default: mode === 'light' ? '#f5f5f5' : '#282c34',
                paper: mode === 'light' ? '#ffffff' : '#1a1e24',
            },
            text: {
                primary: mode === 'light' ? '#323a46' : '#ffffff',
                secondary: mode === 'light' ? '#6c757d' : 'rgba(255, 255, 255, 0.7)',
            },
            divider: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
            error: {
                main: '#e74856',
                light: '#eb6b77',
                dark: '#a1323c',
                contrastText: '#ffffff',
            },
            warning: {
                main: '#ffc107',
                light: '#ffcd39',
                dark: '#b28704',
                contrastText: '#000000',
            },
            info: {
                main: '#00bcd4',
                light: '#33c9dc',
                dark: '#008394',
                contrastText: '#ffffff',
            },
            success: {
                main: '#1abc9c',
                light: '#4fd2b3',
                dark: '#128269',
                contrastText: '#ffffff',
            },
        },
        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
        components: {            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        borderRadius: '4px',
                    } as any
                }
            },            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: '8px',
                    } as any
                }
            }
        }
    };
};

// Function to apply CSS variables
const applyCssVariables = (mode: PaletteMode, colorOption: ThemeColorOption) => {
    const cssVars = themeColors[colorOption].cssVars[mode === 'light' ? 'light' : 'dark'];
    
    document.documentElement.style.setProperty('--link-color-rgb', cssVars.linkColorRgb);
    document.documentElement.style.setProperty('--link-color', cssVars.linkColor);
    document.documentElement.style.setProperty('--link-color-dark', cssVars.linkColorDark);
    document.documentElement.style.setProperty('--nav-bg', cssVars.navBg);
    document.documentElement.style.setProperty('--border-color', cssVars.borderColor);
    document.documentElement.style.setProperty('--background-default', cssVars.backgroundDefault);
    document.documentElement.style.setProperty('--text-primary', cssVars.textPrimary);
    document.documentElement.style.setProperty('--text-muted', cssVars.textMuted);
};

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
    // Get initial theme mode from localStorage or default to dark mode
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem('themeMode');
        return savedTheme ? savedTheme === 'dark' : true;
    });

    // Get initial theme color from localStorage or default to blue
    const [currentThemeColor, setCurrentThemeColor] = useState<ThemeColorOption>(() => {
        const savedColor = localStorage.getItem('themeColor') as ThemeColorOption;
        return savedColor && Object.keys(themeColors).includes(savedColor) 
            ? savedColor 
            : 'blue';
    });

    // Apply dark or light class to body
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        
        // Apply CSS variables
        applyCssVariables(isDarkMode ? 'dark' : 'light', currentThemeColor);
    }, [isDarkMode, currentThemeColor]);

    const themeContextValue = useMemo<ThemeContextType>(
        () => ({
            toggleTheme: () => {
                setIsDarkMode((prevMode) => {
                    const newMode = !prevMode;
                    localStorage.setItem('themeMode', newMode ? 'dark' : 'light');
                    return newMode;
                });
            },
            isDarkMode,
            changeThemeColor: (colorName: ThemeColorOption) => {
                setCurrentThemeColor(colorName);
                localStorage.setItem('themeColor', colorName);
            },
            currentThemeColor,
        }),
        [isDarkMode, currentThemeColor]
    );

    const muiTheme = useMemo<Theme>(
        () => createTheme(getDesignTokens(isDarkMode ? 'dark' : 'light', currentThemeColor)),
        [isDarkMode, currentThemeColor]
    );

    return (
        <ThemeContext.Provider value={themeContextValue}>
            <MuiThemeProvider theme={muiTheme}>
                <CssBaseline enableColorScheme />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextType { 
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
