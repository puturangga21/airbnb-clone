import React from 'react';
import SelectCategory from '@/components/select-category';
import { createCategoryPage } from '@/lib/action';
import SubmitButtonBar from '@/components/submit-button-bar';

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className='mx-auto w-3/5'>
        <h2 className='text-3xl font-semibold tracking-tight transition-colors'>
          Which of these best describe your home?
        </h2>
      </div>

      <form action={createCategoryPage}>
        <input type='hidden' name='homeId' value={params.id} />
        <SelectCategory />
        <SubmitButtonBar />
      </form>
    </>
  );
};

export default Page;
