'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Heart, Loader2 } from 'lucide-react';

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button size='lg' disabled>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Please wait
        </Button>
      ) : (
        <Button size='lg' type='submit'>
          Next
        </Button>
      )}
    </>
  );
};

export default SubmitButton;

export function AddToFavoriteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          variant='outline'
          size='icon'
          className='bg-primary-foreground'
          disabled
        >
          <Loader2 className='h-4 w-4 animate-spin text-primary' />
        </Button>
      ) : (
        <Button
          variant='outline'
          size='icon'
          className='bg-primary-foreground'
          type='submit'
        >
          <Heart className='h-4 w-4' />
        </Button>
      )}
    </>
  );
}

export function DeleteFromFavoriteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          variant='outline'
          size='icon'
          className='bg-primary-foreground'
          disabled
        >
          <Loader2 className='h-4 w-4 animate-spin text-primary' />
        </Button>
      ) : (
        <Button
          variant='outline'
          size='icon'
          className='bg-primary-foreground'
          type='submit'
        >
          <Heart className='h-4 w-4 text-primary' fill='#e21c49' />
        </Button>
      )}
    </>
  );
}

export function ReservationSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button className='w-full' disabled>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Please wait
        </Button>
      ) : (
        <Button className='w-full' type='submit'>
          Make a Reservation
        </Button>
      )}
    </>
  );
}
