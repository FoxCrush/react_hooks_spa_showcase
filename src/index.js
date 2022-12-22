import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'modern-normalize/modern-normalize.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './routes/main-view';
import ErrorPage from './routes/utility/error-page';
import RamMainView from './routes/rick-and-morty-view';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'rickandmorty',
        element: <RamMainView />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
