import { useEffect } from 'react'
import { useForm } from "react-hook-form"
import FilledButton from '../../../../components/buttons/FilledButton';
import { forgotPasswordSchema, ForgotPasswordSchema } from '../../../../lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { authenticationFormLayouts } from '../../../../lib/constants';
import { useNavigate } from 'react-router-dom';
import { useForgotPassword } from '../../hooks/useForgotPassword';

export default function ForgotPasswordForm() {
    const navigate = useNavigate();
    const formFields = authenticationFormLayouts.forgotPasswordForm;
    const { postForgot, fetchedData } = useForgotPassword();

    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema)
    });

    const onSubmit = (data: ForgotPasswordSchema) => {
        console.log(data);
        postForgot(data);
    }

    const displayMessage = (fetchedData: any) => {
        if (fetchedData !== undefined) {
            if (fetchedData.statusCode === 400) {
                return (
                    <p style={{ color: 'red', marginTop: "20px" }}>
                        {fetchedData.message}
                    </p>
                )
            }

        }
    }

    // Clear input data on load of new page
    useEffect(() => {
        if (fetchedData !== undefined) {
            if (fetchedData.statusCode === 200) {
                return navigate("/reset-password");
            }
        }
    }, [fetchedData]);

    return (
        <div className="relative top-[5px] authentication-body rounded-xl">
            <img src="src/assets/images/maxton-logo-title.png" className='h-[40px] mb-[32px]' />
            <h2 className='text-[28px] font-bold'>Forgot Password?</h2>
            <p className='mb-[48px]'>Enter your registered email ID to reset the password</p>
            {displayMessage(fetchedData)}

            <form className="mt-[48px]" onSubmit={handleSubmit(onSubmit)}>
                {formFields.map((_field, index) => (
                    <label key={index} htmlFor={_field.name}>{_field.label}
                        <input type={_field.type} className={"dark-style " + (errors[_field.name as keyof ForgotPasswordSchema] ? "error" : "")} placeholder={`Enter ${_field.label.toLowerCase()} here...`} {...register(_field.name as keyof ForgotPasswordSchema)} />
                        {errors[_field.name as keyof ForgotPasswordSchema] && (
                            <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                {errors[_field.name as keyof ForgotPasswordSchema]?.message}
                            </p>
                        )}
                    </label>
                ))}

                <FilledButton otherStyle="bg-gradient-to-r from-pink-500 to-rose-500 mt-[16px] w-full" content="Send" active={true} type="submit" />
                <FilledButton otherStyle="mt-[16px] bg-gradient-to-r from-blue-900 to-slate-700 w-full" content="Back to Login" onClick={() => navigate("/login")} active={true} />
            </form>
        </div>
    )
}