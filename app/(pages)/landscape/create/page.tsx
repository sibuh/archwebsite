'use client';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import {Button} from "@radix-ui/themes"


interface ProjectForm {
    name: string;
    description: string;
}

const Create = () => {
    const { register, control, handleSubmit } = useForm<ProjectForm>();
    const router = useRouter();

    return (
        <div>
            <form 
            className="max-w-xl space-y-3 min-h-screen" 
            onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.post('/api/example', data);
                    router.push('/landscape');
                } catch (error) {
                    console.log(error)
                }
            })}
        >
            <input 
                className="w-full p-2 border rounded" 
                placeholder="Name" 
                {...register('name')} 
            />

            <Controller 
                name="description"
                control={control}
                render={({ field: { value, onChange } }) => (
                    <SimpleMDE 
                        placeholder="Description of project…" 
                        value={value} 
                        onChange={onChange} 
                    />
                )}
            />
            
            <Button type="submit">Create project</Button>
        </form>
        </div>
    );
}

export default Create;
