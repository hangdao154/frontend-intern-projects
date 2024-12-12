import { useForm, useFieldArray, Controller, FormProvider } from "react-hook-form"
import { Button, Form, Input } from "antd"
import { yupResolver } from "@hookform/resolvers/yup"

export default function TodoList(props) {
    const { schema } = props;

    const { register, handleSubmit, control, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tasks"
    });

    return (
        <form onSubmit={handleSubmit(data => console.log(data))}>
            <ul className="tasks-container">
                {fields.map((item, index) => (
                    <li key={item.id}>
                        <div className="task-item">
                            <input name={item.id} className={errors.tasks?.[index]?.taskDescription ? "error" : ""} placeholder="Enter description" {...register(`tasks.${index}.taskDescription`)} />
                            <Button type="dashed" onClick={() => remove(index)}>Delete</Button>
                        </div>
                        {
                            errors.tasks?.[index]?.taskDescription && (
                                <span style={{ color: 'red' }} onClick={() => console.log(errors)}>
                                    {errors.tasks[index].taskDescription.message}
                                </span>
                            )
                        }
                    </li>
                ))}
            </ul>
            {
                errors.tasks?.root && (
                    <p style={{ color: 'red' }}>{errors.tasks?.root.message}</p>
                )
            }

            <div className="button-container">
                <Button type="primary" onClick={() => {
                    if (fields.length < 10) append({ taskDescription: "" })
                }}>New Task</Button>
                <Button type="primary" htmlType='submit'>Submit</Button>
            </div>
        </form>
    )
}