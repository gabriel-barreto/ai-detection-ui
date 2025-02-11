import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Trash, Upload, X } from 'lucide-react';
import { ChangeEvent, useRef, useState } from 'react';
import { DashAction } from './dash-action.component';

interface DropzoneProps {
  caption: string;
  isEnabled: boolean;
  onUpload: (video: File) => void;
  onLoadEnd: (buffer: string | ArrayBuffer | null) => void;
  onLoadStart: () => void;
}

function Dropzone({ caption, isEnabled, onLoadEnd, onLoadStart, onUpload }: DropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!isEnabled) return;
    if (file.type.startsWith('video/')) {
      onLoadStart();
      onUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        onLoadEnd(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.log('>>> Please, select a video file');
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleOpenFileDialog = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const [file] = event.target.files;
    if (file) handleFile(file);
  };

  return (
    <div
      className='bg-black-100 border border-dashed cursor-pointer flex flex-col items-center m-8 p-8 rounded'
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleOpenFileDialog}
    >
      <label className='text-muted-foreground text-sm mb-5' htmlFor='video'>
        {caption}
      </label>
      <Input
        accept='video/*'
        id='video'
        onChange={handleFileInputChange}
        ref={fileInputRef}
        type='file'
      />
    </div>
  );
}

export function UploadDrawer() {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Drawer>
      <DrawerTrigger>
        <DashAction
          description='Faça upload de um vídeo para que a detecção seja feita'
          title='Upload'
          icon={<Upload className='size-12' />}
        />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Upload</DrawerTitle>
          <DrawerDescription>
            Faça upload de um arquivo de vídeo e realize uma detecção assíncrona. Você receberá uma
            notificação quando a detecção finalizar.
          </DrawerDescription>
        </DrawerHeader>
        {preview && !isLoading && (
          <div className='flex flex-col gap-2 justify-center items-center p-8 pb-2 w-full'>
            <video className='h-64 w-full' src={preview as string} controls />
          </div>
        )}
        {isLoading && (
          <div className='flex justify-center w-full'>
            <span className='animate-spin rounded-full bg-transparent flex w-16 h-16 border-8 border-neutral-800 border-b-neutral-300 animated-spin' />
          </div>
        )}
        {!isLoading && !preview && (
          <Dropzone
            caption='Clique e arraste um arquivo de vídeo aqui, or clique para selecionar um'
            isEnabled={!preview}
            onLoadEnd={buffer => {
              setPreview(buffer);
              setIsLoading(false);
            }}
            onLoadStart={() => setIsLoading(true)}
            onUpload={() => {}}
          />
        )}
        <DrawerFooter className='flex flex-row justify-center gap-2'>
          <Button
            disabled={isLoading || !preview}
            onClick={() => setPreview(null)}
            variant='destructive'
          >
            <Trash /> Remover
          </Button>
          <Button disabled={isLoading || !preview}>
            <Upload /> Enviar
          </Button>
          <DrawerClose className='w-fit'>
            <Button variant='secondary'>
              <X /> Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
