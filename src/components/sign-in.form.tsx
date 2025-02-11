import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Link } from 'react-router';

export function SignInForm({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('bg-black flex flex-col gap-8 h-full justify-center', className)} {...props}>
      <Card className='bg-transparent border-transparent p-8'>
        <CardHeader>
          <CardTitle>Entre na sua conta</CardTitle>
          <CardDescription>Informe abaixo o e-mail usado no app para entrar</CardDescription>
        </CardHeader>
        <CardContent>
          <form name='sign-in'>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email' placeholder='ola@gmail.com' required />
              </div>
              <div className='grid gap-3'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Senha</Label>
                </div>
                <Input
                  id='password'
                  placeholder='de 8 a 32 caracteres'
                  type='password'
                  minLength={8}
                  maxLength={32}
                  required
                />
              </div>
              <div className='flex flex-col gap-3'>
                <Button asChild className='w-full' type='submit'>
                  <Link to='/dashboard'>Entrar</Link>
                </Button>
              </div>
            </div>
            <div className='mt-4 text-center text-sm'>
              Ainda não tem conta?{' '}
              <Link to='/registre-se' className='underline underline-offset-4'>
                Registre-se
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
