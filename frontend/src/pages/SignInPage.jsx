import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import Button from '../components/Button';
import { NavLink } from 'react-router-dom';
import {z} from 'zod';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const LoginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6 , "Password must be atleast of 6 characters"),
})

const SignInPage = () => {
    const navigate = useNavigate();
    const {loading, login} = useAuthStore();

    const {register, handleSubmit} = useForm({
        resolver: zodResolver(LoginSchema)
    });

    const on_submit = async (data) => {
        try {
            await login(data);
            toast.success("User logged in")
            navigate('/')
        } catch (error) {
            toast.error("User is not registerd")
        }
    }

    return (
        <div className='bg-[#F8FAFC] flex justify-center items-center h-screen'>
            <div className='bg-white flex flex-col h-127 w-xl px-5 py-5'>
                <div className='flex justify-center h-[20%]'>
                    <h1 className='text-[24px]'>
                        Welcome Back
                    </h1>
                </div>

                <form onSubmit={handleSubmit(on_submit)} className='w-full flex flex-col gap-2 h-[80%]'>
                    <label className='flex flex-col h-17'>
                        <span className='text-[14px]'>
                            Email
                        </span>

                        <input type="email" {...register("email")} className='border-2 h-10 px-2' name="email" id="email" placeholder='you@email.com' />
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
                        <Button name={loading ? 'Wait' : 'Sign In'} bgColor="#2A6E8C" btnSize="16px" type="submit" />

                        <p className='text-[16px]'>
                            Need an account?
                            <NavLink to={'/signup'} className='text-[#FF7A59]'> sign up</NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignInPage