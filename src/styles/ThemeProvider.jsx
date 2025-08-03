import { createGlobalStyle, ThemeProvider } from "styled-components";
import { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";

const GlobalStyle = createGlobalStyle`
  :root {
    ${({ theme }) => theme.variables}
  }

  html, body {
    background-color: var(--bg-page);
    color: var(--text-page);
    transition: background-color 0.3s ease, color 0.3s ease;
    margin: 0;
    padding: 0;
  }
`;

const themes = {
  light: {
    variables: `
      --bg-sidebar: var(--color-sidebar-background-light-default);
      --bg-hover: var(--color-sidebar-background-light-hover);
      --bg-active: var(--color-sidebar-background-light-active);
      --text-default: var(--color-text-light-default);
      --text-hover: var(--color-text-light-hover);
      --text-active: var(--color-text-light-active);
      --logo-color: var(--color-text-logo-light-default);
      --btn-bg: var(--color-button-background-light-default);
      --btn-bg-active: var(--color-button-background-light-active);
      --bg-page: var(--color-background-light);
      --text-page: var(--color-text-light);
    `,
  },
  dark: {
    variables: `
      --bg-sidebar: var(--color-sidebar-background-dark-default);
      --bg-hover: var(--color-sidebar-background-dark-hover);
      --bg-active: var(--color-sidebar-background-dark-active);
      --text-default: var(--color-text-dark-default);
      --text-hover: var(--color-text-dark-hover);
      --text-active: var(--color-text-dark-active);
      --logo-color: var(--color-text-logo-dark-default);
      --btn-bg: var(--color-button-background-dark-default);
      --btn-bg-active: var(--color-button-background-dark-active);
      --bg-page: var(--color-background-dark);
      --text-page: var(--color-text-dark);
    `,
  },
};

const ThemeSwitcherContext = createContext(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeSwitcherContext);
  if (!context) {
    throw new Error("useTheme must be used within a CustomThemeProvider");
  }
  return context;
};

export const CustomThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeSwitcherContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={themes[theme]}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeSwitcherContext.Provider>
  );
};

CustomThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
