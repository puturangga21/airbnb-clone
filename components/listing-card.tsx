import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCountries } from '@/hooks/getCountries';
import Flag from 'react-world-flags';
import {
  AddToFavoriteButton,
  DeleteFromFavoriteButton,
} from '@/components/submit-button';
import { addToFavorite, deleteFromFavorite } from '@/lib/action';

interface Props {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
  homeId: string;
  pathname: string;
}

const ListingCard = ({
  description,
  imagePath,
  location,
  price,
  userId,
  favoriteId,
  isInFavoriteList,
  homeId,
  pathname,
}: Props) => {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);

  return (
    <div className='flex flex-col'>
      <div className='relative h-72'>
        <Image
          src={`https://fqppiiljofoyxgciztec.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt='Image of House'
          fill
          className='image-optimize h-full rounded-lg object-cover'
          sizes='100'
        />

        {userId && (
          <div className='absolute right-2 top-2 z-10'>
            {isInFavoriteList ? (
              <form action={deleteFromFavorite}>
                <input type='hidden' name='favoriteId' value={favoriteId} />
                <input type='hidden' name='userId' value={userId} />
                <input type='hidden' name='pathname' value={pathname} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type='hidden' name='homeId' value={homeId} />
                <input type='hidden' name='userId' value={userId} />
                <input type='hidden' name='pathname' value={pathname} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={`/home/${homeId}`} className='mt-2'>
        <h3 className='flex items-center gap-2 text-base font-medium'>
          {country?.value && (
            <Flag code={country.value} className='h-full max-w-6' />
          )}
          {country?.label} / {country?.region}
        </h3>

        <p className='line-clamp-2 text-sm text-muted-foreground'>
          {description}
        </p>

        <p className='pt-2 text-muted-foreground'>
          <span className='font-medium text-black'>${price}</span>
          {''} Night
        </p>
      </Link>
    </div>
  );
};

export default ListingCard;
