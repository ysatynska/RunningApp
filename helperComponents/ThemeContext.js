// File to create the themeContext used for rendering
//   different themes across the app
import { createContext, useState, useContext } from 'react';
import { themes } from './styles';

const ThemeContext = createContext(); // Declare the context variable

// Define the useTheme function that will be used in component files to
//   render different themes dynamically
export const useTheme = () => useContext(ThemeContext);

// Define the ThemeProvider that will wrap all components using dynamic theme
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.default); // Default theme

    // Function to update theme when changed
    const toggleTheme = (themeName) => {
        setTheme(themes[themeName]);
    };

    // Wrap all components requiring access to the theme
    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
