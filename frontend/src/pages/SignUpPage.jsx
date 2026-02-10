import Button from '../components/Button'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { useForm } from 'react-hook-form'
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

export const signUpSchema = z.object({
    username: z
        .string()
        .trim()
        .min(4, {message: "Minimum length of username should be 3"})
        .max(20, {message: "Maximum length of username is 20"}),
    
    email: z
        .email({message: "Enter correct email"})
        .trim(),

    password: z
        .string()
        .min(8, {message: "Minimum length of password should be 8"})
        .max(13, {message: "Maximum lenght of password is 13"})
});
 
const SignUpPage = () => {
    const navigate = useNavigate();
    const {loading, signup} = useAuthStore();

    const {register, handleSubmit} = useForm({
        resolver: zodResolver(signUpSchema)
    })

    const on_submit = async (data) => {
        try {
            await signup(data);
            navigate('/signin')
        } catch (error) {
            toast.error("Error Registering User")
        }
    }


    return (
        <div className='bg-[#F8FAFC] flex justify-center items-center h-screen'>
            <div className='bg-white flex flex-col h-127 w-xl px-5 py-5'>
                <div className='flex justify-center h-[20%]'>
                    <h1 className='text-[24px]'>
                        Create Your Account
                    </h1>
                </div>

                <form onSubmit={handleSubmit(on_submit)} className='w-full flex flex-col gap-2 h-[80%]'>
                    <label className='flex flex-col h-17'>
                        <span className='text-[14px]'>
                            Username
                        </span>

                        <input type="text" {...register('username')} className='border-2 h-10 px-2' name="username" id="username" placeholder='username' />
                    </label>

                    <label className='flex flex-col h-17'>
                        <span className='text-[14px]'>
                            Email
                        </span>

                        <input type="email" {...register('email')} className='border-2 h-10 px-2' name="email" id="email" placeholder='you@email.com' />
                    </label>

                    <label className='flex flex-col h-17'>
                        <span className='text-[14px]'>
                            Password
                        </span>

                        <div className='w-full flex items-center justify-between border-2 pr-2'>
                            <input type="password" {...register('password')} className='border-0 h-10 px-2 w-[95%] outline-0' name="password" id="password" placeholder='password' />
                        </div>
                    </label>

                    <div className='flex flex-col mt-6'>
                        <Button name={loading ? "Wait" : "Sign Up"} bgColor="#2A6E8C" btnSize="16px" type="submit"/>

                        <p className='text-[16px]'>
                            Already have an account? 
                            <NavLink to={'/signin'} className='text-[#FF7A59]'> sign in</NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage