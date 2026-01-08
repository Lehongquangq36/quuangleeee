
import React from 'react';
import { Clock } from 'lucide-react';
import { AgendaItem } from '../types';

interface TimelineProps {
  agenda: AgendaItem[];
}

const Timeline: React.FC<TimelineProps> = ({ agenda }) => {
  return (
    <section className="py-24 px-4 bg-stone-50 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4 italic">Chương Trình Buổi Tiệc</h2>
          <div className="w-24 h-1 bg-gold-gradient mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          {/* Vertical Line - Fixed position */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-1/2 z-0"></div>

          <div className="space-y-16">
            {agenda.map((item, index) => (
              <div key={index} className={`relative flex items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                
                {/* Timeline Dot - Ensured Z-index and safe positioning */}
                <div className="absolute left-4 md:left-1/2 w-5 h-5 bg-red-600 rounded-full border-4 border-white shadow-md z-20 transform -translate-x-1/2 ring-4 ring-red-50"></div>

                {/* Content Box - Increased margins to avoid overlap */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'pl-16 md:pl-0 md:pr-16' : 'pl-16 md:pl-16'}`}>
                  <div className={`p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative z-10 ${index % 2 === 0 ? 'md:text-right' : 'text-left'}`}>
                    
                    {/* Decorative element for the box */}
                    <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-t border-l border-gray-100 rotate-45 hidden md:block ${index % 2 === 0 ? '-right-2' : '-left-2'}`}></div>

                    <div className={`flex items-center gap-2 mb-3 text-red-600 font-bold text-lg ${index % 2 === 0 ? 'md:justify-end' : 'justify-start'}`}>
                      <Clock size={20} className="animate-pulse" />
                      <span>{item.time}</span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-800 leading-tight">
                      {item.activity}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
