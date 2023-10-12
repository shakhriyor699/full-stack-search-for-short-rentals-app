'use client'
import { FC, useCallback, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { TbPhotoPlus } from 'react-icons/tb';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import Image from 'next/image';


interface ImageUploadProps {
  value: any
  onChange: (value: any) => void
}

const ImageUpload: FC<ImageUploadProps> = ({ value, onChange }) => {
  console.log(value);

  
  

  return (
    <ImageUploading
      multiple
      value={value}
      onChange={onChange}

    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps
      }) => (
        <div className='flex flex-col '>
          <button
            className='flex flex-col items-center border-dashed border-2 border-neutral-300 mb-4'
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
            <TbPhotoPlus size={200} />
            Click or Drop here
          </button>

          {imageList.length > 0 && <button
            className='
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-lg
            hover:opacity-80
            transition
            w-full
            bg-rose-500
            border-rose-500
            text-white
            py-3 text-md font-semibold border-2
            mb-4
            '
            onClick={onImageRemoveAll}>
            Remove all images
          </button>}
          {imageList.map((image, index) => (
            <div key={index}>
              <Image src={image.dataURL ? image.dataURL : ''} alt="" width="100" height={100} />
              <div className="flex w-full mt-4 items-center gap-4 ">
                <button className='
                
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-lg
                hover:opacity-80
                transition
                w-full
                bg-white
                border-black
                text-black
                py-3 text-md font-semibold border-2
                '
                  onClick={() => onImageUpdate(index)}>
                  Update
                </button>
                <button className='disabled:opacity-70
                      disabled:cursor-not-allowed
                      rounded-lg
                      hover:opacity-80
                      transition
                      w-full
                      bg-white
                      border-black
                      text-black
                      py-3 text-md font-semibold border-2'
                  onClick={() => onImageRemove(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  )
}

export default ImageUpload