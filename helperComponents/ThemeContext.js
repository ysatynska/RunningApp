// File to create the themeContext used for rendering
//   different themes across the app
import { createContext, useState, useContext } from 'react';
import { themes } from './styles';
import { useUser } from '../helperComponents/UserContext';

const ThemeContext = createContext(); // Declare the context variable

// Define the useTheme function that will be used in component files to
//   render different themes dynamically
export const useTheme = () => useContext(useTheme);

// Define the ThemeProvider that will wrap all components using dynamic theme
export const ThemeProvider = ({ children }) => {
    const { user } = useUser();
    const [theme, setTheme] = useState(themes.light); // Default theme

    // Function to update theme when changed
    const toggleTheme = (themeName) => {
        setTheme(themes[themeName]);
    };

    useEffect(() => {
        setTheme(user.theme)
    }, [user.theme]);

    // Wrap all components requiring access to the theme
    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
