import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { ConfigProvider, Divider, theme } from "antd"
import FilledButton from '../../../../components/buttons/FilledButton';
import { FacebookFilled, GithubFilled, GoogleOutlined, LinkedinFilled } from '@ant-design/icons';
import { registerSchema, RegisterSchema } from '../../../../lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { authenticationFormLayouts } from '../../../../lib/constants';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../../hooks/useRegister';
import { getActions } from '../../../../store/authentication/selector';

export default function RegisterForm() {
    const { setRegisterEmail } = getActions();
    const { postRegister, fetchedData } = useRegister();
    const [active, setActive] = useState<boolean>(false)
    const navigate = useNavigate();
    const formFields = authenticationFormLayouts.registerForm;

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema)
    });

    const toggleActive = () => {
        setActive(!active);
    }

    const onSubmit = async (data: RegisterSchema) => {
        postRegister(data);
        setRegisterEmail(data.email);
    }

    const displayMessage = (fetchedData: any) => {
        if (fetchedData !== undefined && fetchedData.statusCode === 400) {
            return (
                <p style={{ color: 'red', marginTop: "20px" }}>
                    {fetchedData.message}
                </p>
            )
        }
    }

    // Clear input data on load of new page
    useEffect(() => {
        console.log(fetchedData);
        if (fetchedData !== undefined && fetchedData.statusCode === 200) {
            console.log('Success email: ', fetchedData.data.email);
            setRegisterEmail(fetchedData.data.email);
            return navigate("/verify");
        }
    }, [fetchedData]);

    return (
        <div className="relative top-[5px] authentication-body rounded-xl">
            <img src="src/assets/images/maxton-logo-title.png" className='h-[40px] mb-[32px]' />
            <h2 className='text-[28px] font-bold'>Get Started Now</h2>
            <p>Enter your credentials to create your account</p>

            {displayMessage(fetchedData)}

            <form className="mt-[48px]" onSubmit={handleSubmit(onSubmit)}>
                {formFields.map((_field, index) => (
                    <label key={index} htmlFor={_field.name}>{_field.label}
                        <input type={_field.type} className={"dark-style " + (errors[_field.name as keyof RegisterSchema] ? "error" : "")} placeholder={`Enter ${_field.label.toLowerCase()} here...`} {...register(_field.name as keyof RegisterSchema)} />
                        {errors[_field.name as keyof RegisterSchema] && (
                            <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                {errors[_field.name as keyof RegisterSchema]?.message}
                            </p>
                        )}
                    </label>
                ))}

                <div className="flex justify-between items-center mb-[24px]">
                    <div className='flex justify-start items-center gap-[10px]'>
                        <label className='switch'>
                            <input type="checkbox" onChange={toggleActive} />
                            <span className='slider rounded-[38px]'></span>
                        </label>
                        <span className='text-white'>I read and agree to Terms & Conditions</span>
                    </div>
                </div>

                <FilledButton type="submit" otherStyle="bg-gradient-to-r from-red-500 to-orange-500 w-full" content="Register" active={active} />

                <p className='mt-[24px]'>Already have an account? <a href="/login" style={{ color: "#0D6EFD" }}>Sign in here</a></p>

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