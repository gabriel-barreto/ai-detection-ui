import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { JSX } from 'react';

interface DashActionProps {
  icon: JSX.Element;
  description: string;
  title: string;
}

export function DashAction({ description, icon, title }: DashActionProps) {
  return (
    <Card className='rounded w-full'>
      <CardHeader className='flex items-center text-center w-full'>
        <div className='mb-4'>{icon}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
