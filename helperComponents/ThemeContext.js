// File to create the themeContext used for rendering
//   different themes across the app
import { createContext, useState, useContext, useEffect } from 'react';
import { themes } from './styles';
import { useUser } from './UserContext';

const ThemeContext = createContext(); // Declare the context variable

// Define the useTheme function that will be used in component files to
//   render different themes dynamically
export const useTheme = () => useContext(ThemeContext);

// Define the ThemeProvider that will wrap all components using dynamic theme
export const ThemeProvider = ({ children }) => {
    const { user } = useUser();
    const [theme, setTheme] = useState(themes.dark); // Default theme

    // Function to update theme when changed
    const toggleTheme = (themeName) => {
        setTheme(themes[themeName]);
    };

    useEffect(() => {
        if (user && user.theme) {
            setTheme(themes[user.theme] || themes.neon)
        }
    }, [user ? user.theme : null]);

    // Wrap all components requiring access to the theme
    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
