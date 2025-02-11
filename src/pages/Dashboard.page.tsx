import { DetectionTable } from '@/components/detection-table.component';
import { Button } from '@/components/ui/button';
import { UploadDrawer } from '@/components/upload-drawer.component';
import { WebcamDrawer } from '@/components/webcam-drawer.component';
import { LogOut } from 'lucide-react';
import { Link } from 'react-router';

export function Dashboard() {
  return (
    <main className='dashboard gap-8 grid p-8 w-full'>
      <header className='header flex justify-between'>
        <p className='text-3xl font-bold'>Olá, Lorem ipsum</p>
        <Button asChild variant='ghost'>
          <Link to='/'>
            Sair <LogOut />
          </Link>
        </Button>
      </header>
      <div className='gap-8 grid grid-cols-2'>
        <WebcamDrawer />
        <UploadDrawer />
      </div>
      <DetectionTable />
    </main>
  );
}
