import { useState } from "react";
import axios from "axios";
interface UploadImageProps {
    onUpload: (url: string) => void; // onUpload bu string URL qaytaruvchi funksiya
  }

const UploadImage:React.FC<UploadImageProps>  = ({ onUpload }) => {
    const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        setImage(file);
      }
  };

  const uploadToImgBB = async () => {
    if (!image) {
      alert("Rasm tanlang!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=442a001b4fdb4a3e9dcd4a1ca330fc37",
        formData
      );

      if (response.data.success) {
        const imageUrl = response.data.data.url;
        alert("Rasm yuklandi: " + imageUrl);
        onUpload(imageUrl); // Yuklangan rasm URL'ini callback orqali yuboramiz
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
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={uploadToImgBB} disabled={loading}>
        {loading ? "Yuklanmoqda..." : "Yuklash"}
      </button>
    </div>
  );
};

export default UploadImage;
