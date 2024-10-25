'use client';

import React, { useCallback } from 'react';
import { categoryItems } from '@/lib/category-items';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const MapFilterItems = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('filter');
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className='no-scrollbar mt-5 flex w-full gap-x-10 overflow-x-scroll'>
      {categoryItems.map((item) => (
        <Link
          key={item.id}
          href={pathname + '?' + createQueryString('filter', item.name)}
          className={cn(
            search === item.name
              ? 'flex-shrink-0 border-b-2 border-primary pb-1'
              : 'flex-shrink-0 opacity-50',
            'flex flex-col items-center gap-y-3'
          )}
        >
          <div className='relative h-6 w-6'>
            <Image
              src={item.imageUrl}
              alt='Category image'
              className='h-6 w-6'
              width={24}
              height={24}
            />
          </div>

          <p className='text-xs font-medium'>{item.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default MapFilterItems;
