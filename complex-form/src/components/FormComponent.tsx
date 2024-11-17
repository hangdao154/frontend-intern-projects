import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button } from "antd"

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

export default function FormComponent() {

}