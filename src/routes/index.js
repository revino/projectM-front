import React, { lazy } from 'react';

import { createBrowserRouter } from "react-router-dom";
import ErrorPage from '../page/Error';

//
import WrapRoute from "./WrapRoute";

const MainLayout      = lazy(() => import('../layout/MainLayout'));
const HomeView        = lazy(() => import('../page/Home'));
const ItemView        = lazy(() => import('../page/Item'));
const ContentView     = lazy(() => import('../page/Contents'));
const LoginView       = lazy(() => import('../page/Login'));
const SettingView     = lazy(() => import('../page/Settings'));
const ChannelEditView = lazy(() => import('../page/Settings/channel'));

const GoogleRedirectView = lazy(() => import('../redirect/googleRedirect'));
const LogoutRedirectView = lazy(() => import('../redirect/logoutRedirect'));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WrapRoute Component={HomeView} Wrap={MainLayout}/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/item",
    element: <WrapRoute Component={ItemView} Wrap={MainLayout}/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/contents/:itemId", 
    element: <WrapRoute Component={ContentView} Wrap={MainLayout}/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/settings",
    element: <WrapRoute Component={SettingView} Wrap={MainLayout}/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/settings/channel/:channelId", 
    element: <WrapRoute Component={ChannelEditView} Wrap={MainLayout}/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/login",
    element: <WrapRoute allow Component={LoginView} Wrap={MainLayout}/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/logout",
    element: <LogoutRedirectView/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/oauth2/redirect/google",
    element: <GoogleRedirectView/>,
    errorElement: <ErrorPage/>,
  },
]);
