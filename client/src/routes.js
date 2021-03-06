import Start from "./pages/Start";
import Profile from './pages/Profile';
import CheckMemes from "./pages/CheckMemes";
import TopMemers from './pages/TopMemers';

export const publicRoutes = [
    {path:'/', element: <Start />, exact: true},
    {path:'/profile/:username', element: <Profile />, exact: true},
    {path:'/checkmemes', element: <CheckMemes />, exact: true},
    {path:'/checkmemes/:id', element: <CheckMemes />, exact: true},
    {path:'/topmemers', element: <TopMemers />, exact: true}
]
export const privateRoutes = [
    {path:'/profile/:username', element: <Profile />, exact: true},
    {path:'/checkmemes', element: <CheckMemes />, exact: true},
    {path:'/checkmemes/:id', element: <CheckMemes />, exact: true},
    {path:'/topmemers', element: <TopMemers />, exact: true}
]