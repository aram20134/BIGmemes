import Start from "./pages/Start";
import Profile from './pages/Profile';

export const publicRoutes = [
    {path:'/', element: <Start />, exact: true},
    {path:'/profile/:username', element: <Profile />, exact: true},
]
export const privateRoutes = [
    {path:'/', element: <Start />, exact: true},
    {path:'/profile/:username', element: <Profile />, exact: true},
]