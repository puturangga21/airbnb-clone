import React from 'react';
import NoItems from '@/components/no-items';
import ListingCard from '@/components/listing-card';
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

async function getData(userId: string) {
  noStore();
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          id: true,
          country: true,
          photo: true,
          description: true,
          price: true,
          Favorite: {
            where: {
              userId: userId,
            },
          },
        },
      },
    },
  });

  return data;
}

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) return redirect('/');

  const data = await getData(user?.id);

  return (
    <section className='container mx-auto mt-10 px-5 lg:px-10'>
      <h2 className='text-3xl font-semibold tracking-tight'>Your Favorites</h2>

      {data.length === 0 ? (
        <NoItems
          title='You dont have any favorite :('
          description='Please add favorite to see them right here'
        />
      ) : (
        <div className='mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {data.map((item) => (
            <ListingCard
              key={item.Home?.id}
              description={item.Home?.description as string}
              location={item.Home?.country as string}
              pathname={'/favorite'}
              homeId={item.Home?.id as string}
              imagePath={item.Home?.photo as string}
              price={item.Home?.price as number}
              userId={user.id}
              favoriteId={item.Home?.Favorite[0]?.id as string}
              isInFavoriteList={
                (item.Home?.Favorite.length as number) > 0 ? true : false
              }
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Page;
