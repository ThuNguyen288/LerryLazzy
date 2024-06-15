import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'react-multi-carousel/lib/styles.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import reportWebVitals from './reportWebVitals'
import { AuthProvider } from './context/AuthContext'
import App from './App';
const root = createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);

reportWebVitals();
