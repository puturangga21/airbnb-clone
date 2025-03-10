import React from 'react';
import { FileQuestion } from 'lucide-react';

interface IProps {
  title: string;
  description: string;
}

const NoItems = ({ description, title }: IProps) => {
  return (
    <div className='mt-10 flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50'>
      <div className='flex h-20 w-20 items-center justify-center rounded-full bg-primary/10'>
        <FileQuestion className='h-10 w-10 text-primary' />
      </div>

      <h2 className='mt-6 text-xl font-semibold'>{title}</h2>

      <p className='mt-2 text-center text-sm leading-6 text-muted-foreground'>
        {description}
      </p>
    </div>
  );
};

export default NoItems;
