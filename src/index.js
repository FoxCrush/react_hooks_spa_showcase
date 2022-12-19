import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'modern-normalize/modern-normalize.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './routes/main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
