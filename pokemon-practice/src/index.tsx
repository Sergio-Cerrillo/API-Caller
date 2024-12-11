import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { ThemeProvider } from './context/context';

const rootElement = document.getElementById('root') as HTMLElement | null;

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
         <ThemeProvider>
            <App />
         </ThemeProvider>
    );
} else {
    console.error('No se encontró el elemento con id "root"');
}
