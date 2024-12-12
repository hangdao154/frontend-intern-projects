import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { ConfigProvider, Divider, Spin, theme } from "antd"
import FilledButton from '../../../../components/buttons/FilledButton';
import { FacebookFilled, GithubFilled, GoogleOutlined, LinkedinFilled, LoadingOutlined } from '@ant-design/icons';
import { loginSchema, LoginSchema } from '../../../../lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { authenticationFormLayouts } from '../../../../lib/constants';
import { useLogin } from '../../hooks/useLogin';
import { useReVerify } from '../../hooks/useReVerify';
import { getActions } from '../../../../store/authentication/selector';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const formFields = authenticationFormLayouts.loginForm;
    const { setRegisterEmail } = getActions();
    const { postReVerify } = useReVerify();
    const navigate = useNavigate();
    const { postLogin, fetchedData, isLoading } = useLogin();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    });

    const [loginEmail, setLoginEmail] = useState<string>()

    const displayMessage = (fetchedData: any, isLoading: boolean | undefined) => {
        while (isLoading) return <Spin className="mt-[20px]" indicator={<LoadingOutlined spin />} />
        if (fetchedData !== undefined) {
            if (fetchedData.statusCode === 400) {
                if (fetchedData.message === "Account is deactivated") {
                    setRegisterEmail(loginEmail);
                    return (
                        <div>
                            <p style={{ color: 'red', marginTop: "20px" }}>
                                {fetchedData.message}
                            </p>
                            <p className='mt-[24px]'>Not receiving the code? <button style={{ color: "#0D6EFD" }} onClick={() => {
                                console.log('Registering email:', loginEmail);
                                loginEmail && postReVerify(loginEmail);
                                navigate("/verify");
                            }}>Resend</button></p>
                        </div>
                    )
                }
                return (
                    <p style={{ color: 'red', marginTop: "20px" }}>
                        {fetchedData.message}
                    </p>
                )
            } else {
                return (
                    <p style={{ color: '#0D6EFD', marginTop: "20px" }}>
                        {fetchedData.message}
                    </p>
                )
            }
        }
    }

    const onSubmit = (data: LoginSchema) => {
        setLoginEmail(data.email);
        postLogin(data);
    }

    // Clear input data on load of new page
    useEffect(() => {
        console.log(fetchedData);
        if (fetchedData !== undefined && fetchedData.statusCode === 200) {
            localStorage.setItem('accessToken', fetchedData.data);
            navigate("/products");
        }
    }, [fetchedData]);

    return (

        <div className="relative top-[5px] authentication-body rounded-xl">
            <img src="src/assets/images/maxton-logo-title.png" className='h-[40px] mb-[32px]' />
            <h2 className='text-[28px] font-bold'>Get Started Now</h2>
            <p>Enter your credentials to login your account</p>
            {displayMessage(fetchedData, isLoading)}

            <form className="mt-[48px]" onSubmit={handleSubmit(onSubmit)}>
                {formFields.map((_field, index) => (
                    <label key={index} htmlFor={_field.name}>{_field.label}
                        <input type={_field.type} className={"dark-style " + (errors[_field.name as keyof LoginSchema] ? "error" : "")} placeholder={`Enter ${_field.label.toLowerCase()} here...`} {...register(_field.name as keyof LoginSchema)} />
                        {errors[_field.name as keyof LoginSchema] && (
                            <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                {errors[_field.name as keyof LoginSchema]?.message}
                            </p>
                        )}
                    </label>
                ))}

                <div className="flex justify-between items-center mb-[24px]">
                    <div className='flex justify-start items-center gap-[10px]'>
                        <label className='switch'>
                            <input type="checkbox" />
                            <span className='slider rounded-[38px]'></span>
                        </label>
                        <span className='text-white'>Remember Me</span>
                    </div>
                    <a href="/forgot-password" className='text-[#0D6EFD]'>Forgot Password?</a>
                </div>

                <FilledButton type="submit" otherStyle="bg-gradient-to-r from-rose-500 to-violet-600 w-full" content="Login" active={true} />

                <p className='mt-[24px]'>Don't have an account yet? <a href="/register" style={{ color: "#0D6EFD" }}>Sign up here</a></p>

                <ConfigProvider theme={{
                    algorithm: theme.darkAlgorithm,
                }}>
                    <Divider style={{ borderColor: "#FFFFFF70" }}>OR SIGN IN WITH</Divider>
                </ConfigProvider>
                <div className="flex justify-center gap-[20px]">
                    <a className={"text-white flex justify-center rounded-[50%] w-[30px] h-[30px] bg-gradient-to-r from-amber-500 to-pink-500"}>
                        <GoogleOutlined />
                    </a>
                    <a className={"text-white flex justify-center rounded-[50%] w-[30px] h-[30px] bg-gradient-to-r from-blue-600 to-violet-600"}>
                        <FacebookFilled />
                    </a>
                    <a className={"text-white flex justify-center rounded-[50%] w-[30px] h-[30px] bg-gradient-to-r from-indigo-400 to-cyan-400"}>
                        <LinkedinFilled />
                    </a>
                    <a className={"text-white flex justify-center rounded-[50%] w-[30px] h-[30px] bg-gradient-to-r from-slate-500 to-slate-800"}>
                        <GithubFilled />
                    </a>
                </div>
            </form>
        </div>
    )
}