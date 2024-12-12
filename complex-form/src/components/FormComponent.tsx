import { useState } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { Form, Upload, Input, DatePicker, Radio, Select, Checkbox, Button } from "antd"
import { InboxOutlined } from '@ant-design/icons'
import dayjs from 'dayjs';
import { displayDate } from '../helper';

const MAX_FILE_SIZE = 5242880;

interface FormData {
    image?: any;
    fullname: string;
    dateOfBirth: Date;
    gender: string;
    job: string;
    level?: string;
    hobbies?: string[];
    note?: string;
}

const schema = yup.object({
    image: yup.mixed().required().test({
        message: "File's size can't exceed 5MB.",
        test: (file: any) => {
            if (file.item(0)) {
                console.log(file);
                const isValid = file.item(0).size < MAX_FILE_SIZE;
                return isValid;
            }
        }
    }),
    fullname: yup.string().required().max(30, "First name has to include at most 30 characters"),
    dateOfBirth: yup.date().required(),
    gender: yup.string().required(),
    job: yup.string().required(),
    level: yup.string(),
    hobbies: yup.array(),
    notes: yup.string(),
})

export default function FormComponent() {
    const methods = useForm({
        resolver: yupResolver(schema)
    });

    const { register, watch, handleSubmit, reset, control, formState: { errors } } = methods;

    const onSubmit = (data: FormData) => {
        alert("Submit successful.")
        console.log(`Submitted data:`);
        console.log(data);

    }

    const [FileSend, setFileSend] = useState<File>();

    const { TextArea } = Input;

    const watchAll = watch();
    const watchJob = watch("job");
    const watchDate = watch("dateOfBirth");



    return (
        <>
            <div className="container form">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Item layout="vertical" label="Upload image" name="image">
                            <>
                                <input type="file" accept='.jpg, .png'{...register("image")} onChange={(e) => {
                                    if (!e.target.files) return;
                                    setFileSend(e.target.files["0"]);
                                }} />
                                {
                                    errors.image && (
                                        <p style={{ color: 'red' }} onClick={() => console.log(errors)}>
                                            {errors?.image.message}
                                        </p>
                                    )
                                }
                            </>
                        </Form.Item>

                        <Form.Item layout="vertical" label="Fullname" name="fullname">
                            <Controller name="fullname" control={control} render={({ field }) => (
                                <>
                                    <Input {...field} />
                                    {
                                        errors.fullname && (
                                            <p style={{ color: 'red' }} onClick={() => console.log(errors)}>
                                                {errors?.fullname.message}
                                            </p>
                                        )
                                    }
                                </>
                            )} />
                        </Form.Item>

                        <Form.Item layout="vertical" label="Date of Birth" name="dateOfBirth">
                            <>
                                <Controller name="dateOfBirth" control={control} render={({ field }) => (
                                    <DatePicker {...field} format="DD-MM-YYYY" maxDate={dayjs()}></DatePicker>
                                )} />
                                {
                                    errors.dateOfBirth && (
                                        <p style={{ color: 'red' }} onClick={() => console.log(errors)}>
                                            {errors?.dateOfBirth.message}
                                        </p>
                                    )
                                }
                            </>
                        </Form.Item>

                        <Form.Item layout="vertical" label="Gender" name="gender">
                            <Controller name="gender" control={control} render={({ field }) => (
                                <Radio.Group {...field}>
                                    <Radio value="Male">Male</Radio>
                                    <Radio value="Female">Female</Radio>
                                </Radio.Group>
                            )} />
                        </Form.Item>

                        <Form.Item layout="vertical" label="Job" name="job">
                            <>
                                <Controller name="job" control={control} render={({ field }) => (
                                    <Select {...field} placeholder="Select your job..." options={[
                                        { value: "Front-end Developer", label: "Front-end Developer" },
                                        { value: "Back-end Developer", label: "Back-end Developer" },
                                        { value: "UI Designer", label: "UI Designer" }
                                    ]}>
                                    </Select>
                                )} />
                                {
                                    errors.job && (
                                        <p style={{ color: 'red' }} onClick={() => console.log(errors)}>
                                            {errors?.job.message}
                                        </p>
                                    )
                                }
                            </>
                        </Form.Item>

                        <Form.Item layout="vertical" label="Level" name="level">
                            <Controller name="level" control={control} render={({ field }) => (
                                <Select {...field} disabled={!watchJob} options={[
                                    { value: 'Intern', label: 'Intern' },
                                    { value: 'Fresher', label: 'Fresher' },
                                    { value: 'Junior', label: 'Junior' },
                                    { value: 'Middle', label: 'Middle' },
                                    { value: 'Senior', label: 'Senior' }
                                ]} />
                            )} />
                        </Form.Item>

                        <Form.Item layout="vertical" label="Hobbies" name="hobbies">
                            <Controller name="hobbies" control={control} render={({ field }) => (
                                <Checkbox.Group {...field}>
                                    <Checkbox value="Coding">Coding</Checkbox>
                                    <Checkbox value="Reading">Reading</Checkbox>
                                    <Checkbox value="Gaming">Gaming</Checkbox>
                                    <Checkbox value="Traveling">Traveling</Checkbox>
                                </Checkbox.Group>
                            )} />
                        </Form.Item>

                        <Form.Item layout="vertical" label="Notes" name="notes">
                            <Controller name="notes" control={control} render={({ field }) => (
                                <TextArea {...field} rows={4} />
                            )} />
                        </Form.Item>

                        <Form.Item className="buttons">
                            <>
                                <Button danger onClick={() => {
                                    setFileSend(undefined);
                                    reset();
                                }}>Discard</Button>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </>
                        </Form.Item>
                    </form>
                </FormProvider>
            </div>

            <div className="container preview">
                <h1>Preview</h1>
                <hr style={{ marginBottom: "30px" }} />
                {
                    FileSend && (
                        <div className="img-container">
                            <img src={URL.createObjectURL(FileSend)} />
                        </div>
                    )
                }

                <p><b>Name: </b>{watchAll.fullname}</p>
                <p><b>Date of birth: </b>{watchDate ? displayDate(dayjs(watchDate)) : ""}</p>
                <p><b>Gender: </b>{watchAll.gender}</p>
                <p><b>Job: </b>{watchJob}</p>
                <p><b>Hobbies: </b></p>
                {
                    watchAll.hobbies && (
                        <ul>
                            {watchAll.hobbies?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    )
                }
                <p><b>Notes:  </b></p>
                <p>{watchAll.notes}</p>
            </div>
        </>
    )
}
