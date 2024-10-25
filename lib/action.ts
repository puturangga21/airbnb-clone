'use server';

import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function createAirbnbHome({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (data === null) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data.id}/structure`);
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/structure`);
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/address`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLocation
  ) {
    await prisma.home.create({
      data: {
        userId: userId,
      },
    });
  }
}

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get('categoryName') as string;
  const homeId = formData.get('homeId') as string;

  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      categoryName: categoryName,
      addedCategory: true,
    },
  });

  console.log({ message: 'Home category successfully updated', data: data });

  return redirect(`/create/${homeId}/description`);
}

export async function createDescription(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const price = formData.get('price');
  const imageFile = formData.get('image') as File;
  const homeId = formData.get('homeId') as string;
  const guestNumber = formData.get('guest') as string;
  const roomNumber = formData.get('room') as string;
  const bathroomNumber = formData.get('bathroom') as string;

  const { data: imageData } = await supabase.storage
    .from('images')
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
      cacheControl: '2592000',
      contentType: 'image/png',
    });

  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      title: title,
      description: description,
      price: Number(price),
      bedrooms: roomNumber,
      bathrooms: bathroomNumber,
      guests: guestNumber,
      photo: imageData?.path,
      addedDescription: true,
    },
  });

  console.log({ message: 'Home description successfully updated', data: data });

  return redirect(`/create/${homeId}/address`);
}

export async function createLocation(formData: FormData) {
  const homeId = formData.get('homeId') as string;
  const countryValue = formData.get('countryValue') as string;
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      addedLocation: true,
      country: countryValue,
    },
  });

  console.log({ message: 'Home location successfully updated', data: data });

  return redirect('/');
}

export async function addToFavorite(formData: FormData) {
  const homeId = formData.get('homeId') as string;
  const userId = formData.get('userId') as string;
  const pathname = formData.get('pathname') as string;

  const data = await prisma.favorite.create({
    data: {
      homeId: homeId,
      userId: userId,
    },
  });

  console.log({ message: 'Success add to favorite', data: data });

  revalidatePath(pathname);
}

export async function deleteFromFavorite(formData: FormData) {
  const favoriteId = formData.get('favoriteId') as string;
  const pathname = formData.get('pathname') as string;
  const userId = formData.get('userId') as string;

  const data = await prisma.favorite.delete({
    where: {
      id: favoriteId,
      userId: userId,
    },
  });

  console.log({ message: 'Success deleted favorite', data: data });

  revalidatePath(pathname);
}

export async function createReservation(formData: FormData) {
  const userId = formData.get('userId') as string;
  const homeId = formData.get('homeId') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;

  const data = await prisma.reservation.create({
    data: {
      userId: userId,
      endDate: endDate,
      startDate: startDate,
      homeId: homeId,
    },
  });

  console.log({ message: 'Success create reservation', data: data });

  return redirect('/');
}
