


import { createContext, ReactNode, useState } from "react";

//define the type
type ThemeContextType = {
    theme: "light" | "dark"
    updateTheme: (newTheme:"light"|"dark")=>void
}

//create context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

//define type of provider
interface ThemeProviderProps{
    children:ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps>=({children})=>{
		const [theme, setTheme] = useState<"light" | "dark">("light");

		//change theme
		const updateTheme = (newTheme: "light" | "dark") => {
			setTheme(newTheme);
		};

		return (
			<ThemeContext.Provider value={{ theme, updateTheme }}>
				{children}
			</ThemeContext.Provider>
		);
	}
