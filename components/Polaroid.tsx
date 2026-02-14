
import React from 'react';

interface PolaroidProps {
  src: string;
  alt: string;
}

const Polaroid: React.FC<PolaroidProps> = ({ src, alt }) => {
  return (
    <div className="bg-white p-3 pb-8 shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-500 w-full max-w-[280px] mx-auto border border-pink-50">
      <div className="overflow-hidden bg-gray-100 aspect-[3/4] relative">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Polaroid;
