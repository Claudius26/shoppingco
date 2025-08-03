import React from 'react';
import VersaceLogo from '../../images/versace.svg';
import GucciLogo from '../../images/gucci-logo.svg';
import PradaLogo from '../../images/prada-logo.svg';
import ZaraLogo from '../../images/zara-logo.svg';
import CalvinKeinLogo from '../../images/calvinklein.svg';

const DesignLogo = () => {
  return (
    <div className="bg-black text-white px-6 md:px-20 py-6">
      <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-0">
        <img src={VersaceLogo} alt="Versace" className="h-5 md:h-6" />
        <img src={GucciLogo} alt="Gucci" className="h-5 md:h-6" />
        <img src={PradaLogo} alt="Prada" className="h-5 md:h-6" />
        <img src={ZaraLogo} alt="Zara" className="h-5 md:h-6" />
        <img src={CalvinKeinLogo} alt="Calvin Klein" className="h-5 md:h-6" />
      </div>
    </div>
  );
};

export default DesignLogo;
