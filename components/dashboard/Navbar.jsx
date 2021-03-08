import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import ColorSwitcher from '../ColorSwitcher';

const Navbar = () => {
  const auth = useAuth();

  return (
    <div className="w-full flex flex-row justify-between items-center max-w-screen-xl mx-auto py-8 px-4">
      <div className="flex flex-row space-x-4 items-center ml-auto">
        <img
          className="w-8 h-8 rounded-full"
          src={auth?.user?.photoUrl}
          alt=""
        />
        <ColorSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
