import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Form,
    Input,
    Button,
    DatePicker,
    Radio,
    Select,
    Upload,
    Checkbox,
    message,
} from 'antd';
import dayjs from 'dayjs';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

interface FormData {
    image?: File;
    fullname: string;
    dateOfBirth: string;
    gender: string;
    job: string;
    level?: string;
    hobbies: string[];
    note?: string;
}

export default function TestForm() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const {
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            gender: 'Male',
        },
    });

    const onSubmit = (data: FormData) => {
        console.log('Submitted Data:', data);
    };

    const handleFileChange = (info: any) => {
        const file = info.file.originFileObj;
        if (file.size > 5 * 1024 * 1024) {
            message.error('Image must be smaller than 5MB!');
            return;
        }
        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            message.error('Only JPG/PNG files are allowed!');
            return;
        }
        setFile(file);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
        setValue('image', file);
    };

    const watchAllFields = watch();
    const jobValue = watch('job');

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            {/* Form */}
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)} style={{ flex: 1 }}>
                <Form.Item label="Upload Image">
                    <Controller
                        name="image"
                        control={control}
                        render={({ field }) => (
                            <Upload
                                maxCount={1}
                                showUploadList={false}
                                beforeUpload={() => false}
                                onChange={handleFileChange}
                            >
                                <Button icon={<UploadOutlined />}>Upload here</Button>
                            </Upload>
                        )}
                    />
                    {preview && <img src={preview} alt="Preview" style={{ marginTop: 10, maxWidth: '100%' }} />}
                </Form.Item>

                <Form.Item label="Fullname" required>
                    <Controller
                        name="fullname"
                        control={control}
                        rules={{ required: 'Fullname is required', maxLength: 30 }}
                        render={({ field }) => <Input {...field} />}
                    />
                    {errors.fullname && <span style={{ color: 'red' }}>{errors.fullname.message}</span>}
                </Form.Item>

                <Form.Item label="Date of Birth" required>
                    <Controller
                        name="dateOfBirth"
                        control={control}
                        rules={{
                            required: 'Date of Birth is required',
                            validate: (value) =>
                                dayjs(value).isBefore(dayjs()) || 'Date cannot be in the future',
                        }}
                        render={({ field }) => (
                            <DatePicker {...field} onChange={(date) => field.onChange(date?.toString())} />
                        )}
                    />
                    {errors.dateOfBirth && <span style={{ color: 'red' }}>{errors.dateOfBirth.message}</span>}
                </Form.Item>

                <Form.Item label="Gender">
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <Radio.Group {...field}>
                                <Radio value="Male">Male</Radio>
                                <Radio value="Female">Female</Radio>
                            </Radio.Group>
                        )}
                    />
                </Form.Item>

                <Form.Item label="Job" required>
                    <Controller
                        name="job"
                        control={control}
                        rules={{ required: 'Job is required' }}
                        render={({ field }) => (
                            <Select {...field} placeholder="Select your job">
                                <Option value="Developer">Developer</Option>
                                <Option value="Designer">Designer</Option>
                                <Option value="Manager">Manager</Option>
                            </Select>
                        )}
                    />
                    {errors.job && <span style={{ color: 'red' }}>{errors.job.message}</span>}
                </Form.Item>

                <Form.Item label="Level">
                    <Controller
                        name="level"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} placeholder="Select your level" disabled={!jobValue}>
                                <Option value="Junior">Junior</Option>
                                <Option value="Mid">Mid</Option>
                                <Option value="Senior">Senior</Option>
                            </Select>
                        )}
                    />
                </Form.Item>

                <Form.Item label="Hobbies">
                    <Controller
                        name="hobbies"
                        control={control}
                        render={({ field }) => (
                            <Checkbox.Group {...field}>
                                <Checkbox value="Coding">Coding</Checkbox>
                                <Checkbox value="Reading">Reading</Checkbox>
                                <Checkbox value="Gaming">Gaming</Checkbox>
                                <Checkbox value="Traveling">Traveling</Checkbox>
                            </Checkbox.Group>
                        )}
                    />
                </Form.Item>

                <Form.Item label="Note">
                    <Controller
                        name="note"
                        control={control}
                        render={({ field }) => <TextArea {...field} rows={4} />}
                    />
                </Form.Item>

                <Form.Item>
                    <Button danger style={{ marginRight: 10 }} htmlType="button" onClick={() => console.log('Discard')}>
                        Discard
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>

            {/* Preview */}
            <div style={{ flex: 1, border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                <h3>Preview</h3>
                <div style={{ textAlign: 'center' }}>
                    {preview ? (
                        <img
                            src={preview}
                            alt="Preview"
                            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}
                        />
                    ) : (
                        <div style={{ width: '100px', height: '100px', background: '#f0f0f0', borderRadius: '50%' }} />
                    )}
                </div>
                <p><strong>Name:</strong> {watchAllFields.fullname || 'Fullname'}</p>
                <p><strong>Date:</strong> {watchAllFields.dateOfBirth ? dayjs(watchAllFields.dateOfBirth).format('DD/MM/YYYY') : '01/01/1970'}</p>
                <p><strong>Gender:</strong> {watchAllFields.gender}</p>
                <p><strong>Hobbies:</strong> {watchAllFields.hobbies?.join(', ') || 'None'}</p>
                <p><strong>Note:</strong> {watchAllFields.note || 'No additional notes'}</p>
            </div>
        </div>
    );
};
