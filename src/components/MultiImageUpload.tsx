
import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MultiImageUploadProps {
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
}

const MultiImageUpload: React.FC<MultiImageUploadProps> = ({ 
  onImagesChange, 
  maxImages = 5 
}) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalFiles = [...imageFiles, ...newFiles];
      
      // Limit the number of images
      const filesToAdd = totalFiles.slice(0, maxImages);
      
      setImageFiles(filesToAdd);
      
      // Generate previews for the images
      const newPreviews = filesToAdd.map(file => URL.createObjectURL(file));
      
      // Revoke old preview URLs to avoid memory leaks
      previews.forEach(preview => URL.revokeObjectURL(preview));
      
      setPreviews(newPreviews);
      onImagesChange(filesToAdd);
    }
  };

  const removeImage = (index: number) => {
    const newFiles = [...imageFiles];
    newFiles.splice(index, 1);
    setImageFiles(newFiles);

    // Revoke the URL for the removed preview
    URL.revokeObjectURL(previews[index]);
    
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
    
    onImagesChange(newFiles);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {previews.map((preview, index) => (
          <div 
            key={index} 
            className="relative group h-32 w-32 rounded-md overflow-hidden border border-gray-200"
          >
            <img 
              src={preview} 
              alt={`Preview ${index}`} 
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        
        {imageFiles.length < maxImages && (
          <button
            type="button"
            onClick={handleClick}
            className="h-32 w-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
          >
            <ImageIcon className="h-8 w-8" />
            <span className="text-sm">Add Image</span>
          </button>
        )}
      </div>
      
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />
      
      <p className="text-sm text-muted-foreground">
        Upload up to {maxImages} images. First image will be the main event image.
      </p>
    </div>
  );
};

export default MultiImageUpload;
