import React from 'react';
import prisma from '@/lib/db';
import Image from 'next/image';
import { useCountries } from '@/hooks/getCountries';
import { Separator } from '@/components/ui/separator';
import Flag from 'react-world-flags';
import CategoryShowcase from '@/components/category-showcase';
import HomeMap from '@/components/home-map';
import SelectCalendar from '@/components/select-calendar';
import { createReservation } from '@/lib/action';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ReservationSubmitButton } from '@/components/submit-button';

async function getData(homeId: string) {
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,

      Reservation: {
        where: {
          homeId: homeId,
        },
      },

      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });
  return data;
}

const Page = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className='mx-auto mb-12 mt-10 w-[75%]'>
      <h1 className='mb-5 text-2xl font-medium'>{data?.title}</h1>

      <div className='relative h-[550px]'>
        <Image
          src={`https://fqppiiljofoyxgciztec.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          alt='Image of home'
          fill
          sizes='100'
          className='h-full w-full rounded-lg object-cover'
        />
      </div>

      <div className='mt-8 flex justify-between gap-x-24'>
        <div className='w-2/3'>
          <h3 className='flex items-center gap-2 text-xl font-medium'>
            <Flag code={country?.value} className='h-full max-w-6' />{' '}
            {country?.label} / {country?.region}
          </h3>

          <div className='flex gap-x-2 text-muted-foreground'>
            <p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> *{' '}
            <p>{data?.bathrooms} Bathrooms</p>
          </div>

          <div className='mt-6 flex items-center'>
            <img
              src={
                data?.User?.profileImage ??
                'https://preview.redd.it/describe-this-photo-of-anya-in-a-single-word-v0-ry926ofw37jc1.jpeg?auto=webp&s=1edba0b0538d3d910f1adf026ec22277ffe1a348'
              }
              alt='User profile'
              className='h-11 w-11 rounded-full'
            />
            <div className='ml-4 flex flex-col'>
              <h3 className='font-medium'>Hosted by {data?.User?.firstName}</h3>
              <p className='text-sm text-muted-foreground'>Host since</p>
            </div>
          </div>

          <Separator className='my-7' />

          <CategoryShowcase categoryName={data?.categoryName as string} />

          <Separator className='my-7' />

          <p className='text-muted-foreground'>{data?.description}</p>

          <Separator className='my-7' />

          <HomeMap locationValue={country?.value as string} />
        </div>

        <form action={createReservation}>
          <input type='hidden' name='homeId' value={params.id} />
          <input type='hidden' name='userId' value={user?.id} />
          <SelectCalendar reservation={data?.Reservation} />

          {user?.id ? (
            <ReservationSubmitButton />
          ) : (
            <Button className='w-full' asChild>
              <Link href={'/api/auth/login'}>Make a Reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Page;
