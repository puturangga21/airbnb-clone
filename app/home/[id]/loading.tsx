import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className='mx-auto mt-10 w-[75%]'>
      <Skeleton className='h-4 w-1/3' />
      <Skeleton className='mt-5 h-[550px] w-full' />

      <div className='mt-8 flex justify-between gap-x-24'>
        <div className='w-2/3'>
          <Skeleton className='h-4 w-1/3' />
          <Skeleton className='mt-3 h-4 w-1/3' />
        </div>

        <div className='w-1/3'>
          <Skeleton className='h-72 w-full' />
        </div>
      </div>
    </div>
  );
};

export default Loading;
