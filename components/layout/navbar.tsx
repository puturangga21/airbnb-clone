import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import DesktopLogo from '../../public/airbnb-desktop.png';
import MobileLogo from '../../public/airbnb-mobile.webp';
import UserNav from '@/components/layout/user-nav';
import SearchComponent from '@/components/search-component';

const Navbar = () => {
  return (
    <nav className='w-full border-b'>
      <div className='container mx-auto flex items-center justify-between px-5 py-5 lg:px-10'>
        <Link href='/'>
          <Image
            src={DesktopLogo}
            alt='Desktop'
            className='hidden w-32 lg:block'
          />

          <Image
            src={MobileLogo}
            alt='Mobile Logo'
            className='block w-12 lg:hidden'
          />
        </Link>

        <SearchComponent />

        <UserNav />
      </div>
    </nav>
  );
};

export default Navbar;
