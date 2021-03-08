import React from 'react';
import { Sun, Moon } from 'react-feather';
import { useTheme } from '@/hooks/theme';

const ColorSwitcher = () => {
  const { dark, toggleDark } = useTheme();

  return (
    <>
      {dark ? (
        <div className="cursor-pointer dark:text-white" onClick={toggleDark}>
          <Sun />
        </div>
      ) : (
        <div className="cursor-pointer" onClick={toggleDark}>
          <Moon />
        </div>
      )}
    </>
  );
};

export default ColorSwitcher;
