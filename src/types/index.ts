export interface cardType{
    id: string, 
    title: string,
    description: string,
    date: string,
    time: string,
    photo: string;
}
export interface cardUpload{
    id: string, 
    title: string,
    description: string,
    date: string,
    time: string,
    photo: string
    
}
export interface UploadImageProps {
  onUpload: (url: string) => void;
  file: File | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handeCheck: (value: boolean) => void
  upload: boolean,
  photo: string
}
export interface updateDataProps {
    id: string, 
    title: string,
    description: string,
    date: string,
    time: string,
    photo: string
}
