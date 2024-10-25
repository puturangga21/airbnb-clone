import React from 'react';
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import NoItems from '@/components/no-items';
import ListingCard from '@/components/listing-card';

async function getData(userId: string) {
  const data = await prisma.home.findMany({
    where: {
      userId: userId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
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
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
}

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/');
  }

  const data = await getData(user.id);

  return (
    <section className='container mx-auto mt-10 px-5 lg:px-10'>
      <h2 className='text-3xl font-semibold tracking-tight'>Your Home</h2>

      {data.length === 0 ? (
        <NoItems
          title='You dont have any home listed'
          description='Please list a home on airbnb so that you can see it right here'
        />
      ) : (
        <div className='mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {data.map((item) => (
            <ListingCard
              key={item.id}
              imagePath={item.photo as string}
              homeId={item.id}
              price={item.price as number}
              description={item.description as string}
              location={item.country as string}
              userId={user.id}
              pathname={'/my-home'}
              favoriteId={item.Favorite[0]?.id as string}
              isInFavoriteList={item.Favorite.length > 0 ? true : false}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Page;
