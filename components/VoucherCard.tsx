
import React from 'react';
import { Voucher } from '../types';

interface VoucherCardProps {
  voucher: Voucher;
  onSelect: (voucher: Voucher) => void;
}

const VoucherCard: React.FC<VoucherCardProps> = ({ voucher, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(voucher)}
      className="group cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-pink-100 transition-shadow h-full flex flex-col">
        <div className="h-32 overflow-hidden relative">
          <img 
            src={voucher.image} 
            alt={voucher.day} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-pink-900/10 group-hover:bg-transparent transition-colors"></div>
        </div>
        <div className="p-4 text-center bg-white flex-grow flex flex-col justify-center border-t border-pink-50">
          <h3 className="font-semibold text-lg text-[#4a4a4a]">{voucher.day}</h3>
          <p className="text-[#d63384] text-sm mt-1 font-medium">
            Preis: {voucher.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoucherCard;
