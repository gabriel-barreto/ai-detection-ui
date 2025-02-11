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
import { cn } from '@/lib/utils';
import { Camera, StopCircle, Upload, Video, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { DashAction } from './dash-action.component';

export function WebcamDrawer() {
  const [streams, setStreams] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const camera = useRef<HTMLVideoElement>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const stopStreaming = () => {
    function stopAllTracks(stream: any) {
      (stream as MediaStream).getTracks().forEach(track => {
        track.stop();
      });
    }
    if (streams) stopAllTracks(streams);
    if (camera.current?.srcObject) stopAllTracks(camera.current.srcObject);
  };

  useEffect(() => {
    return stopStreaming;
  }, []);

  const onOpenHandler = () => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStreams(stream);
        if (camera.current) camera.current.srcObject = stream;
      } catch (error) {
        console.error('Unable to access the webcam:', error);
      }
    })();
  };

  const onAnimationEndHandler = (isOpen: boolean) => {
    if (!isOpen) stopStreaming();
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      chunks.current.push(event.data);
    }
  };

  const startRecording = () => {
    if (streams) {
      recorder.current = new MediaRecorder(streams);
      recorder.current.ondataavailable = handleDataAvailable;
      recorder.current.onstop = handleStop;
      recorder.current.start();
      setIsRecording(true);
      chunks.current = [];
    }
  };

  const stopRecording = () => {
    if (recorder.current) {
      recorder.current.stop();
      setIsRecording(false);
    }
  };

  const handleStop = () => {
    const blob = new Blob(chunks.current, { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    // TODO call the API instead of download
    a.href = url;
    a.type = 'video/mp4';
    a.download = 'webcam-stream.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Drawer onOpenChange={onOpenHandler} onAnimationEnd={onAnimationEndHandler}>
      <DrawerTrigger>
        <DashAction
          description='Use sua webcam para fornecer um vídeo em tempo real para detecção'
          title='Webcam'
          icon={<Camera className='size-12' />}
        />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Webcam</DrawerTitle>
          <DrawerDescription>
            Use sua câmera para gravar e utilizar um vídeo para detecção
          </DrawerDescription>
        </DrawerHeader>
        <div className='flex justify-center p-4 w-full'>
          <div className='relative w-full max-w-md aspect-video'>
            <video ref={camera} autoPlay muted className='w-full h-full' />
          </div>
        </div>
        <DrawerFooter className='flex flex-row justify-center gap-2'>
          <Button
            className={cn(isRecording && 'animate-pulse')}
            disabled={!streams}
            onClick={isRecording ? stopRecording : startRecording}
            variant='destructive'
          >
            {isRecording ? <Video /> : <StopCircle />}
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>
          <Button>
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
