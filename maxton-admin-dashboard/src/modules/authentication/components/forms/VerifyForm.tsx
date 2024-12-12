import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import FilledButton from '../../../../components/buttons/FilledButton';
import { verifySchema, VerifySchema } from '../../../../lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { authenticationFormLayouts } from '../../../../lib/constants';
import { useNavigate } from 'react-router-dom';
import { useVerify } from '../../hooks/useVerify';
import { useReVerify } from '../../hooks/useReVerify';
import { getRegisterEmail } from '../../../../store/authentication/selector';
import Countdown from '../Countdown';

export default function VerifyForm() {
    const [countdown, setCountdown] = useState<number>(60)
    const registeringEmail = getRegisterEmail();
    const formFields = authenticationFormLayouts.verifyForm;
    const { postVerify, fetchedData } = useVerify();
    const { postReVerify } = useReVerify();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<VerifySchema>({
        resolver: zodResolver(verifySchema)
    });

    const displayMessage = (fetchedData: any) => {
        if (fetchedData !== undefined) {
            if (fetchedData.statusCode === 400) {
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


    const onSubmit = (data: VerifySchema) => {
        console.log(data);
        postVerify(data);
    }


    // Clear input data on load of new page
    useEffect(() => {
        console.log(fetchedData);
    }, [fetchedData, countdown]);

    return (
        <div className="relative top-[5px] authentication-body rounded-xl">
            <img src="src/assets/images/maxton-logo-title.png" className='h-[40px] mb-[32px]' />
            <h2 className='text-[28px] font-bold'>Verifying...</h2>
            <p>Enter the code we sent to your email to verify the account</p>
            <Countdown time={countdown}/>

            {displayMessage(fetchedData)}

            <form className="mt-[48px]" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='email'>
                    <input type="hidden" value={registeringEmail ? registeringEmail : ""} {...register("email")} />
                </label>
                {
                    errors.email && (
                        <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                            {errors.email?.message}
                        </p>
                    )
                }
                {formFields.map((_field, index) => (
                    <label key={index} htmlFor={_field.name}>{_field.label}
                        <input type={_field.type} className={"dark-style " + (errors[_field.name as keyof VerifySchema] ? "error" : "")} placeholder={`Enter ${_field.label.toLowerCase()} here...`} {...register(_field.name as keyof VerifySchema)} />
                        {errors[_field.name as keyof VerifySchema] && (
                            <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                {errors[_field.name as keyof VerifySchema]?.message}
                            </p>
                        )}
                    </label>
                ))}

                <p className='mt-[24px]'>Not receiving the code? <span className="text-[#0D6EFD] cursor-pointer" onClick={() => {
                    console.log('Registering email:', registeringEmail);
                    registeringEmail && postReVerify(registeringEmail);
                    setCountdown(60)
                }}>Resend</span></p>

                <FilledButton otherStyle="bg-gradient-to-r from-fuchsia-500 to-pink-500 mt-[16px] w-full" content="Send" active={true} type="submit" />
                <FilledButton otherStyle="mt-[16px] bg-gradient-to-r from-blue-900 to-slate-700 w-full" content="Back to Login" onClick={() => navigate("/login")} active={true} />
            </form>
        </div>
    )
}