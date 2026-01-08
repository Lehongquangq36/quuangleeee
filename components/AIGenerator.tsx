
import React, { useState } from 'react';
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { generateInvitationMessage } from '../services/geminiService';

interface AIGeneratorProps {
  hostName: string;
  eventTitle: string;
  onUpdateMessage: (msg: string) => void;
}

const AIGenerator: React.FC<AIGeneratorProps> = ({ hostName, eventTitle, onUpdateMessage }) => {
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState('ấm cúng');

  const handleGenerate = async () => {
    setLoading(true);
    const msg = await generateInvitationMessage(hostName, style, eventTitle);
    onUpdateMessage(msg);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-3xl border border-red-200 shadow-lg my-12">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="text-red-500" fill="currentColor" />
        <h3 className="text-xl font-bold text-red-900">AI Personalize - Tạo Lời Chúc Riêng</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <label className="block text-sm font-medium text-red-700 mb-3 uppercase tracking-wider">Chọn phong cách lời mời</label>
          <div className="flex flex-wrap gap-2">
            {['ấm cúng', 'sang trọng', 'hài hước', 'truyền thống', 'hiện đại'].map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  style === s 
                    ? 'bg-red-600 text-white shadow-md scale-105' 
                    : 'bg-white text-red-600 border border-red-200 hover:bg-red-50'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center justify-center gap-3 min-w-[220px] px-8 py-4 bg-red-600 text-white font-bold rounded-2xl shadow-lg hover:bg-red-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <Loader2 className="animate-spin shrink-0" size={20} />
            ) : (
              <RefreshCw className="group-hover:rotate-180 transition-transform duration-500 shrink-0" size={20} />
            )}
            <span className="whitespace-nowrap">
              {loading ? 'Đang soạn thảo...' : 'Tạo lời nhắn mới'}
            </span>
          </button>
        </div>
      </div>
      
      <p className="mt-6 text-[10px] text-red-400 italic text-center md:text-left">
        * Công nghệ AI giúp bạn tạo ra những lời mời mang đậm dấu ấn cá nhân và cảm xúc hơn.
      </p>
    </div>
  );
};

export default AIGenerator;
