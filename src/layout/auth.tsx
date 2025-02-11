import { Outlet } from 'react-router';

export function Auth() {
  return (
    <main className='main h-screen grid grid-cols-7'>
      <aside className='company col-span-4 flex flex-col h-full justify-between p-16'>
        <div className='header'>
          <h1 className='text-3xl font-bold'>Acme Inc.</h1>
          <p className='text-lg'>Iusto quia quos molestiae praesentium aut omnis impedit.</p>
        </div>
        <div className='footer'>
          <p className='text-xl'>
            Velit quae quam dolorum. Et delectus laudantium autem. Quaerat ducimus corporis et
            perferendis.
          </p>
        </div>
      </aside>
      <aside className='form h-full col-span-3'>
        <Outlet />
      </aside>
    </main>
  );
}
