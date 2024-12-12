import { useEffect } from 'react'
import { useForm, Controller, FormProvider } from "react-hook-form"
import { Button, Form, Input } from "antd"
import { yupResolver } from "@hookform/resolvers/yup"


export default function FormComponent(props) {
    /* formLayout - array of all input fields: [{ type: "username", "displayText: Username" }, {}] */
    const { formLayout, schema, formHandlers } = props;

    const methods = useForm({
        defaultValues: {
            username: "",
            password: ""
        }, resolver: yupResolver(schema)
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = methods;

    const onSubmit = (data) => console.log(data);

    // Clear input data on load of new page
    useEffect(() => {
        const defaultValues = formLayout.reduce((acc, input) => {
            acc[input.name] = "";
            return acc;
        }, {});
        reset(defaultValues);
    }, [formLayout, reset]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(formHandlers)}>
                {formLayout.map((_field, index) => (
                    <Form.Item key={index} label={_field.label} name={_field.name}
                        rules={[{ required: true, message: 'Required' }]}
                        layout="vertical">
                        <Controller name={_field.name} control={control} render={({ field }) => (
                            <>
                                <Input {...field} type={_field.type} status={errors[_field.name] ? "error" : ""} placeholder={`Enter ${_field.label}`} />
                                {
                                    errors[_field.name] && (
                                        <span style={{ color: 'red' }} onClick={() => console.log(errors)}>
                                            {errors[_field.name].message}
                                        </span>
                                    )
                                }
                            </>
                        )} />
                    </Form.Item>
                ))}

                <Form.Item>
                    <Button type="primary" block htmlType="submit">Submit</Button>
                </Form.Item>
            </form>
        </FormProvider>
    )
}