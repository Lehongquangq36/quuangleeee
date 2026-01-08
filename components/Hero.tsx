
import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { EventData } from '../types';

interface HeroProps {
  data: EventData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 hover:scale-100"
        style={{ backgroundImage: `url('https://picsum.photos/id/491/1920/1080')` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-yellow-500 m-8 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-yellow-500 m-8 opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
        <h2 className="text-yellow-500 font-cursive text-3xl md:text-5xl mb-4 animate-float">
          Mừng Xuân Bính Ngọ
        </h2>
        <h1 className="text-white font-serif text-5xl md:text-8xl mb-8 leading-tight tracking-wider">
          {data.title}
        </h1>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-white/90 mb-12">
          <div className="flex items-center gap-3">
            <Calendar className="text-yellow-500" />
            <span className="text-lg font-medium">{data.date}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="text-yellow-500" />
            <span className="text-lg font-medium">{data.time}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-yellow-500" />
            <span className="text-lg font-medium">{data.location}</span>
          </div>
        </div>

        <p className="text-white/80 text-xl italic font-cursive max-w-2xl mx-auto leading-relaxed px-4">
          "{data.message}"
        </p>

        <div className="mt-12">
          <button 
            onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-gold-gradient text-red-900 font-bold rounded-full shadow-2xl hover:scale-105 transition-transform active:scale-95"
          >
            XÁC NHẬN THAM DỰ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
