import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const HomeMap = ({ locationValue }: { locationValue: string }) => {
  const LazyMap = dynamic(() => import('@/components/map'), {
    ssr: false,
    loading: () => <Skeleton className='h-[50vh] w-full' />,
  });
  return <LazyMap locationValue={locationValue} />;
};

export default HomeMap;
