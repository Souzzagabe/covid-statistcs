import React, { createContext, useContext, useState, ReactNode } from "react";

type Theme = "dark" | "light";

type AppContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const AppContext = createContext<AppContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export const useAppContext = () => useContext(AppContext);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};
