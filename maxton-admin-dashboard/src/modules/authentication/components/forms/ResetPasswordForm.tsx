import { useEffect } from 'react'
import { useForm } from "react-hook-form"
import FilledButton from '../../../../components/buttons/FilledButton';
import { resetPasswordSchema, ResetPasswordSchema } from '../../../../lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { authenticationFormLayouts } from '../../../../lib/constants';
import { useNavigate } from 'react-router-dom';
import { useResetPassword } from '../../hooks/useResetPassword';
import { getForgotEmail } from '../../../../store/authentication/selector';
import { useForgotPassword } from '../../hooks/useForgotPassword';

export default function ResetPasswordForm() {
    const formFields = authenticationFormLayouts.resetPasswordForm;
    const navigate = useNavigate();
    const forgettingEmail = getForgotEmail();
    const { postForgot } = useForgotPassword();
    const { postResetPassword, fetchedData } = useResetPassword();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema)
    });

    const onSubmit = (data: ResetPasswordSchema) => {
        console.log(data);
        postResetPassword(data);
    }

    const displayMessage = (fetchedData: any) => {
        if (fetchedData !== undefined) {
            if (fetchedData.statusCode === 400) {
                return (
                    <>
                        <p style={{ color: 'red', marginTop: "20px" }}>
                            {fetchedData.message}
                        </p>
                        {fetchedData.message === "This otp is expired" && (
                            <p className='mt-[24px]'>OTP expired? <button style={{ color: "#0D6EFD" }} onClick={() => {
                                console.log('Registering email:', forgettingEmail);
                                forgettingEmail && postForgot({ email: forgettingEmail });
                            }}>Resend</button></p>
                        )}
                    </>
                )
            } else {
                return (
                    <p style={{ color: 'green', marginTop: "20px" }}>
                        {fetchedData.message}
                    </p>
                )
            }
        }
    }

    // Clear input data on load of new page
    useEffect(() => {
        console.log(fetchedData);
    }, [fetchedData]);

    return (
        <div className="relative top-[5px] authentication-body rounded-xl">
            <img src="src/assets/images/maxton-logo-title.png" className='h-[40px] mb-[32px]' />
            <h2 className='text-[28px] font-bold'>Reset Password</h2>
            <p className='mb-[48px]'>Enter the OTP and new password to reset your password</p>
            {displayMessage(fetchedData)}

            <form className="mt-[48px]" onSubmit={handleSubmit(onSubmit)}>
                {formFields.map((_field, index) => (
                    <label key={index} htmlFor={_field.name}>{_field.label}
                        <input type={_field.type} className={"dark-style " + (errors[_field.name as keyof ResetPasswordSchema] ? "error" : "")} placeholder={`Enter ${_field.label.toLowerCase()} here...`} {...register(_field.name as keyof ResetPasswordSchema)} />
                        {errors[_field.name as keyof ResetPasswordSchema] && (
                            <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                {errors[_field.name as keyof ResetPasswordSchema]?.message}
                            </p>
                        )}
                    </label>
                ))}

                <FilledButton otherStyle="bg-gradient-to-r from-fuchsia-500 to-pink-500 mt-[16px] w-full" content="Reset" active={true} type="submit" />
                <FilledButton otherStyle="mt-[16px] bg-gradient-to-r from-blue-900 to-slate-700 w-full" content="Back to Login" onClick={() => navigate("/login")} active={true} />
            </form>
        </div>
    )
}