import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap required
import 'modern-normalize/modern-normalize.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Main from './routes/main-view';
import ErrorPage from './routes/utility/error-page';
import RamMainView from './routes/rick-and-morty-view';
import RamCharacterView from './routes/ram-character-veiw';
import store from './redux/store';
import { Provider } from 'react-redux';

const router = createHashRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'rickandmorty',
        element: <RamMainView />,
        errorElement: <ErrorPage />,
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
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
