'use client';
import { TextField } from "@radix-ui/themes";
import { TextArea } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button } from "@radix-ui/themes";


const Create = () => {
    return ( 
        <div className="max-w-xl space-y-3 min-h-screen">
           <TextField.Root placeholder="Name">
                <TextField.Slot>
                </TextField.Slot>
                
            </TextField.Root>

            {/* <TextArea placeholder="Description of project…" /> */}
            <SimpleMDE placeholder="Description of project…" />
            <Button>Create project</Button>

            
        </div>
     );
}
 
export default Create;