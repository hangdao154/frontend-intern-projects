import { useEffect } from 'react'
import { useForm } from "react-hook-form"
import FilledButton from '../../../../components/buttons/FilledButton';
import { changePasswordSchema, ChangePasswordSchema } from '../../../../lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { authenticationFormLayouts } from '../../../../lib/constants';
import { useNavigate } from 'react-router-dom';
import { useChangePassword } from '../../hooks/useChangePassword';

export default function ChangePasswordForm() {
    const formFields = authenticationFormLayouts.changePasswordForm;
    const navigate = useNavigate();
    const { postChangePassword, fetchedData } = useChangePassword();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ChangePasswordSchema>({
        resolver: zodResolver(changePasswordSchema)
    });

    const onSubmit = (data: ChangePasswordSchema) => {
        console.log(data);
        postChangePassword(data);
    }

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
    }, [formFields, reset]);

    return (
        <div className="relative top-[5px] authentication-body rounded-xl">
            <img src="src/assets/images/maxton-logo-title.png" className='h-[40px] mb-[32px]' />
            <h2 className='text-[28px] font-bold'>Generate New Password</h2>
            <p>We received your reset password request. Please enter your new password!</p>
            {displayMessage(fetchedData)}

            <form className='mt-[48px]' onSubmit={handleSubmit(onSubmit)}>
                {formFields.map((_field, index) => (
                    <label key={index} htmlFor={_field.name}>{_field.label}
                        <input type={_field.type} className={"dark-style " + (errors[_field.name as keyof ChangePasswordSchema] ? "error" : "")} placeholder={`Enter ${_field.label.toLowerCase()} here...`} {...register(_field.name as keyof ChangePasswordSchema)} />
                        {errors[_field.name as keyof ChangePasswordSchema] && (
                            <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                {errors[_field.name as keyof ChangePasswordSchema]?.message}
                            </p>
                        )}
                    </label>
                ))}

                <FilledButton otherStyle="bg-gradient-to-r from-teal-200 to-teal-500 mt-[16px] w-full" content="Change Password" active={true} type="submit" />
                <FilledButton otherStyle="mt-[16px] bg-gradient-to-r from-blue-900 to-slate-700 w-full" content="Back to Login" onClick={() => navigate("/login")} active={true} />
            </form>
        </div>
    )
}