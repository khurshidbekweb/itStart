import { Button } from "@/components/ui/button";
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
import { Pen,  } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import UploadImage from "@/components/imgbb-upload";
import { updateDataProps } from "@/types";


const EditMOdal = ({date,description,id,photo,time,title}:updateDataProps) => {
    const [open, setOpen] = useState(false)
    const [photoEdit, setPhotoEdit] = useState(photo);
    const [upload, setUpload] = useState(false)
    const [file, setFile] = useState<File | null>(null);
    const queryClient = useQueryClient()
    const [check, setCheck] = useState(false)
    const updateData = useMutation({
        mutationFn: curdUtils.updateData,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['get_data']})
            toast.success('Succes a new item')
            setOpen(false)
            setFile(null)
        },
        onError: (err)=>{
            console.log(err);            
        }
    })
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setUpload(true)
        }
    };
    const handlePost = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        updateData.mutate({
            id: id,
            title: (form.elements.namedItem("title") as HTMLSelectElement).value,
            description: (form.elements.namedItem("description") as HTMLSelectElement).value,
            date: (form.elements.namedItem("date") as HTMLSelectElement).value,
            time: (form.elements.namedItem("time") as HTMLSelectElement).value,
            photo: photoEdit
        })
        console.log(updateData.variables);        
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger type="button" className="text-green-500"><Pen/></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-white text-center">Add new Item</DialogTitle>
                </DialogHeader>
                <form onSubmit={handlePost} className="flex flex-col space-y-3 text-white">
                    <Input onChange={(e) => setCheck(e.target.value.trim() !== "")} defaultValue={title} type="text" name="title" className="w-full" placeholder="Write title"/>
                    <Input onChange={(e) => setCheck(e.target.value.trim() !== "")} defaultValue={description} type="text" name="description" className="w-full" placeholder="Write description"/>
                    <div className="flex items-center gap-x-2">
                        <input onChange={(e) => setCheck(e.target.value.trim() !== "")} defaultValue={date} required type="date" name="date" className="bg-inherit border outline-none p-[6px] rounded-lg w-[50%]"/>
                        <input onChange={(e) => setCheck(e.target.value.trim() !== "")} defaultValue={time} type="time" name="time" id="" className="bg-inherit border outline-none p-[6px] rounded-lg w-[50%]" />
                    </div>
                    <UploadImage photo={photoEdit} handeCheck={(value) => setCheck(value)} file={file} onUpload={(url) => setPhotoEdit(url)} handleFileChange={handleFileChange} upload={upload}/>
                    <Button disabled={!check} type="submit" className="w-full text-center font-bold text-[18px] bg-green-600 hover:bg-green-700">Edit</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditMOdal;