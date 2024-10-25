'use client';

import React, { useState } from 'react';
import { categoryItems } from '@/lib/category-items';
import { Card, CardHeader } from '@/components/ui/card';
import Image from 'next/image';

const SelectCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

  return (
    <div className='mx-auto mb-36 mt-10 grid w-3/5 grid-cols-4 gap-8'>
      <input
        type='hidden'
        name='categoryName'
        value={selectedCategory as string}
      />
      {categoryItems.map((item) => (
        <div key={item.id} className='cursor-pointer'>
          <Card
            className={
              selectedCategory === item.name ? 'border-2 border-primary' : ''
            }
            onClick={() => setSelectedCategory(item.name)}
          >
            <CardHeader>
              <Image
                src={item.imageUrl}
                alt={item.name}
                height={32}
                width={32}
                className='h-8 w-8'
              />

              <h3 className='font-medium'>{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SelectCategory;
