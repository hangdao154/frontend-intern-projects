import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons'
import { useState } from 'react';


export default function DraggerComponent(props: any) {
    const { field, setFileSend } = props;

    const Dragger = Upload.Dragger;

    const [fileList, setFileList] = useState<any>();


    const propsUpload = {
        onRemove: (file: any) => {
            return setFileSend(null)
        },

        beforeUpload: (file: any) => {
            setFileList(file);
            return false;
        },

        onChange(info: any) {

            const newFile = info.file;
            console.log(newFile);
            // const listFiles = info.fileList.slice(-3);

            // const newArrayFiles = listFiles.map((file: any) => file.originFileObj ? (file.originFileObj) : file);

            const anAsyncFunction = async (item: any) => {
                return convertBase64(item)
            }

            const getData = async () => {
                if (newFile) {
                    const newFileSend = await anAsyncFunction(newFile);
                    setFileSend(newFileSend);
                    console.log(newFileSend);
                    return newFileSend;
                }
            }

            return getData();
        },

        multiple: false,
    };

    const convertBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader?.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    return (
        <>
            <Dragger name={field.name} ref={field.ref} {...propsUpload}>
                <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    File type supported: JPG, PNG.
                    <br />
                    Maximum size: 5MB
                </p>
            </Dragger>
        </>
    )
}