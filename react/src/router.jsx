// router.jsx
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import Users from './views/Users';
import NotFound from './views/NotFound';
import Dashboard from './views/Dashboard';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import UserForm from './views/UserForm';
import UserLayout from './components/UserLayout';
import UserFeed from './views/UserFeed';
import CommentList from './views/CommentList';
import SuggestionList from './views/SuggestionList';
import Profile from './views/Profile';
import DataStatistics from './views/DataStatistics';
import AccountSettings from './views/AccountSettings';
import ContactMe from './views/ContactMe';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/feed" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/users',
                element: <Users />,
            },
            {
                path: '/comments-list',
                element: <CommentList />,
            },
            {
                path: '/suggestions',
                element: <SuggestionList />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/data-statistics',
                element: <DataStatistics />,
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate" />,
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />,
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Signup />,
            },
        ]
    },
    {
        path: '/',
        element: <UserLayout />,
        children: [
            // {
            //     path: '/',
            //     element: <Navigate to="/feed" />
            // },
            {
                path: '/feed',
                element: <UserFeed/>,
            },
            {
                path: '/settings',
                element: <AccountSettings/>,
            },
            {
                path: '/contacts',
                element: <ContactMe/>,
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;
