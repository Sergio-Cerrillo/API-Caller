import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const rootElement = document.getElementById('root') as HTMLElement | null;

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(

        <App />

    );
} else {
    console.error('No se encontró el elemento con id "root"');
}
