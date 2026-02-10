import './App.css'
import {Routes, Route, Navigate} from "react-router-dom"
import {Toaster} from "react-hot-toast"

import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import Dashboard from './pages/Dashboard'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'

function App() {
    const {profile, loading, user} = useAuthStore();

    useEffect(() => {
        profile();
    }, [profile])

    if (loading && !user) {
        return (
            <div className="flex flex-col h-screen w-full items-center justify-start">
                <Loader className="size-10 animate-spin"/>
            </div>
        )
    }

    console.log("user in app jsx: ", user);

    return (
        <>
            <div className='h-screen w-screen'>
                <Toaster />
                <Routes>
                    <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />

                    <Route path='/signin' element={!user ? <SignInPage /> : <Navigate to={"/"} />} />

                    <Route path="/" element={user ? <Dashboard /> : <Navigate to={"/signin"} />} />
                </Routes>
            </div>
        </>
    )
}

export default App
