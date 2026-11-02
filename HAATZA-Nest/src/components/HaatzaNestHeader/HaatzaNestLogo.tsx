import React from 'react';
import { Link } from 'react-router-dom';
import haatzaNestLogoImg from '../../assets/haatza_nest_logo.png';

export const HaatzaNestLogo: React.FC = () => {
  return (
    <Link
      to="/nest"
      className="flex items-center group select-none shrink-0 transition-transform duration-200 hover:opacity-90 active:scale-[0.98]"
      aria-label="Haatza Nest Home"
    >
      <img
        src={haatzaNestLogoImg}
        alt="Haatza Nest"
        className="h-7 sm:h-8 lg:h-[34px] w-auto object-contain block"
      />
    </Link>
  );
};
