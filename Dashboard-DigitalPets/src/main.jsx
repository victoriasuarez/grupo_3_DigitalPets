import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css';

import App from './App';
import LastProductsInDb from './components/LastProductInDb';
import ContentWrapper from './components/ContentWrapper';
import UsersInDb from './components/UsersInDb';
import Product from './components/Product';
import SearchProducts from './components/SearchProducts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ContentWrapper />
      },
      {
        path: '/last-product',
        element: <LastProductsInDb />
      },
      {
        path: '/users',
        element: <UsersInDb />
      },
      {
        path: '/products',
        element: <Product />
      },
      {
        path: '/search',
        element: <SearchProducts />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
