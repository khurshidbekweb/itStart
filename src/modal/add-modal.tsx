import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from 'uuid';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { curdUtils } from "@/utils/crud";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BadgePlus,  } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import UploadImage from "@/components/imgbb-upload";


const AddModal = () => {
    const [file, setFile] = useState<File | null>(null);
    const [open, setOpen] = useState(false)
    const [photo, setPhoto] = useState("");
    console.log(photo);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };
    const queryClient = useQueryClient()
    const createData = useMutation({
        mutationFn: curdUtils.createData,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['get_data']})
            toast.success('Succes a new item')
            setOpen(false)
        },
        onError: (err)=>{
            console.log(err);            
        }
    })
    const handlePost = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        createData.mutate({
            id: uuidv4(),
            title: (form.elements.namedItem("title") as HTMLSelectElement).value,
            description: (form.elements.namedItem("description") as HTMLSelectElement).value,
            date: (form.elements.namedItem("date") as HTMLSelectElement).value,
            time: (form.elements.namedItem("time") as HTMLSelectElement).value,
            photo: photo
        })
        console.log(createData.variables);        
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex text-[16px] gap-3 p-2 px-4 rounded-lg font-bold bg-green-400 text-white">Add <BadgePlus/></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-white text-center">Add new Item</DialogTitle>
                </DialogHeader>
                <form onSubmit={handlePost} className="flex flex-col space-y-3 text-white">
                    <Input type="text" name="title" className="w-full" placeholder="Write title"/>
                    <Input type="text" name="description" className="w-full" placeholder="Write description"/>
                    <div className="flex items-center gap-x-2">
                        <input type="date" name="date" className="bg-inherit border outline-none p-[6px] rounded-lg w-[50%]"/>
                        <input type="time" name="time" id="" className="bg-inherit border outline-none p-[6px] rounded-lg w-[50%]" />
                    </div>
                    <UploadImage onUpload={(url) => setPhoto(url)} />
                    {/* <FileUpload file={file} handleFileChange={handleFileChange}/> */}
                    <Button type="submit" className="w-full text-center font-bold text-[18px] bg-green-600 hover:bg-green-700">Add</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddModal;