import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MenuIcon } from 'lucide-react';
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import { createAirbnbHome } from '@/lib/action';
import Image from 'next/image';

const UserNav = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const createHomeWithId = createAirbnbHome.bind(null, {
    userId: user?.id as string,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='flex items-center gap-x-3 rounded-full border px-2 py-2 lg:px-4 lg:py-2'>
          <MenuIcon className='h-6 w-6 lg:h-5 lg:w-5' />

          <Image
            src={
              user?.picture ??
              'https://preview.redd.it/describe-this-photo-of-anya-in-a-single-word-v0-ry926ofw37jc1.jpeg?auto=webp&s=1edba0b0538d3d910f1adf026ec22277ffe1a348'
            }
            alt='Image of the user'
            className='hidden rounded-full lg:block'
            width={32}
            height={32}
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-[200px]'>
        {user ? (
          <>
            <DropdownMenuItem>
              <form action={createHomeWithId} className='w-full'>
                <button type='submit' className='w-full text-start'>
                  Airbnb your home
                </button>
              </form>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href='/my-home' className='w-full'>
                My Listings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href='/favorite' className='w-full'>
                Favorite
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href='/reservation' className='w-full'>
                Reservation
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutLink className='w-full'>Logout</LogoutLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <RegisterLink className='w-full'>Register</RegisterLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LoginLink className='w-full'>Login</LoginLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
