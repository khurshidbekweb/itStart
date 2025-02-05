import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { BadgePlus,  } from "lucide-react";
import { useState } from "react";


const AddModal = () => {
    const [file, setFile] = useState<File | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };
    return (
        <Dialog>
            <DialogTrigger className="flex text-[16px] gap-3 p-2 px-4 rounded-lg font-bold bg-green-400 text-white">Add <BadgePlus/></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-white text-center">Add new Item</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col space-y-3 text-white">
                    <Input type="text" className="w-full" placeholder="Write title"/>
                    <Input type="text" className="w-full" placeholder="Write description"/>
                    <div className="flex items-center gap-x-2">
                        <input type="date" className="bg-inherit border outline-none p-[6px] rounded-lg w-[50%]"/>
                        <input type="time" name="" id="" className="bg-inherit border outline-none p-[6px] rounded-lg w-[50%]" />
                    </div>
                    <FileUpload file={file} handleFileChange={handleFileChange}/>
                    <Button className="w-full text-center font-bold text-[18px] bg-green-600 hover:bg-green-700">Add</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddModal;