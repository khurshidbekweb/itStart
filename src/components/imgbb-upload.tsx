import { useState } from "react";
import axios from "axios";
import { ImageDown } from "lucide-react";
interface UploadImageProps {
  onUpload: (url: string) => void;
  file: File | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handeCheck: (value: boolean) => void
  upload: boolean
}

const UploadImage: React.FC<UploadImageProps> = ({ onUpload, file, handleFileChange, handeCheck, upload }) => {
  const [loading, setLoading] = useState(false);
  const uploadToImgBB = async () => {
    if (!file) {
      alert("Rasm tanlang!");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=442a001b4fdb4a3e9dcd4a1ca330fc37",
        formData
      );

      if (response.data.success) {
        const imageUrl = response.data.data.url;
        alert("Rasm yuklandi: " + imageUrl);
        onUpload(imageUrl); 
        handeCheck(false)
      } else {
        alert("Yuklashda xatolik!");
      }
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Rasm yuklashda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2 items-start">
      <div className="flex items-start gap-4 gap-x-8 my-2">
        <label className="relative">
          <p className="border p-1 rounded-md font-semibold mt-2 shadow-md cursor-pointer flex gap-3">Upload <ImageDown /> </p>
          <input
            type="file"
            className="opacity-0 w-1 absolute"
            onChange={handleFileChange}
          />
        </label>
        {file && (
          <div className="text-center mt-2">
            <p>File: {file.name}</p>
            {file.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-md"
              />
            )}
          </div>
        )}
      </div>
      {upload && <button onClick={uploadToImgBB} disabled={loading}>
        {loading ? "Yuklanmoqda..." : "Rasmni serverga yuklash"}
      </button>
      }
    </div>
  );
};

export default UploadImage;
