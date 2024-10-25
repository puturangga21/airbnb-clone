import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className='mt-10'>{children}</div>;
};

export default Layout;
