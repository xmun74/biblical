import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Authorization from './components/Authorization';
import Header from './components/Header';
import ErrorPage from './pages/ErrorPage';
import { RouteInfo } from './utils/route';

const appRoutes = createBrowserRouter(
  RouteInfo.map(route => {
    return route.withAuth
      ? {
          path: route.path,
          errorElement: <ErrorPage />,
          element: (
            <Authorization>
              <Header />
              {route.element}
            </Authorization>
          ),
        }
      : {
          path: route.path,
          errorElement: <ErrorPage />,
          element: (
            <>
              <Header />
              {route.element}
            </>
          ),
        };
  })
);

function App() {
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <RouterProvider router={appRoutes} />
    </React.Suspense>
  );
}
export default App;
