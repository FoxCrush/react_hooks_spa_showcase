import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'modern-normalize/modern-normalize.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Main from './routes/main-view';
import ErrorPage from './routes/utility/error-page';
import RamMainView from './routes/rick-and-morty-view';
import RamCharacterView from './routes/ram-character-veiw';
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap required

const router = createHashRouter([
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
  {
    path: '/rickandmorty/:id',
    element: <RamCharacterView />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
