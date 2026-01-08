
import React from 'react';
import { MapPin, Info, Shirt } from 'lucide-react';
import { EventData } from '../types';

interface DetailProps {
  data: EventData;
}

const EventDetails: React.FC<DetailProps> = ({ data }) => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Address Card */}
        <div className="p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow bg-stone-50 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin size={32} />
          </div>
          <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">Địa Điểm</h3>
          <p className="text-gray-600 font-medium mb-2">{data.location}</p>
          <p className="text-gray-500 text-sm">{data.address}</p>
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-red-600 font-semibold hover:underline"
          >
            Xem Bản Đồ
          </a>
        </div>

        {/* Dress Code Card */}
        <div className="p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow bg-stone-50 text-center">
          <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shirt size={32} />
          </div>
          <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">Trang Phục</h3>
          <p className="text-gray-600 font-medium mb-4">{data.dressCode}</p>
          <div className="flex justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-600 border border-gray-300"></div>
            <div className="w-8 h-8 rounded-full bg-yellow-500 border border-gray-300"></div>
            <div className="w-8 h-8 rounded-full bg-white border border-gray-300"></div>
          </div>
          <p className="text-gray-400 text-xs mt-4 italic">* Đỏ - Vàng - Trắng</p>
        </div>

        {/* Important Notes Card */}
        <div className="p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow bg-stone-50 text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Info size={32} />
          </div>
          <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">Ghi Chú</h3>
          <ul className="text-gray-600 text-sm space-y-2 text-left">
            <li>• Vui lòng có mặt đúng giờ để check-in</li>
            <li>• Chương trình bốc thăm trúng thưởng hấp dẫn</li>
            <li>• Tiệc buffet tự chọn đa dạng</li>
            <li>• Đừng quên mang theo tinh thần vui vẻ!</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
