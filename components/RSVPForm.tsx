
import React, { useState } from 'react';
import { Send, Users, MessageSquare } from 'lucide-react';

const RSVPForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    isAttending: 'true',
    guests: '1',
    note: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, send to backend
  };

  if (submitted) {
    return (
      <div className="text-center p-12 bg-green-50 rounded-3xl border border-green-200 animate-bounce-in">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Send size={40} />
        </div>
        <h3 className="text-3xl font-serif font-bold text-green-800 mb-4">Cảm ơn bạn!</h3>
        <p className="text-green-700">Thông tin của bạn đã được ghi nhận. Hẹn gặp lại bạn tại buổi tiệc!</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-6 text-green-600 underline text-sm"
        >
          Gửi lại nếu có thay đổi
        </button>
      </div>
    );
  }

  return (
    <form id="rsvp" onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-stone-100 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-50 rounded-full opacity-50"></div>
      
      <h2 className="text-4xl font-serif font-bold text-gray-800 mb-8 text-center">Xác Nhận Tham Dự</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Họ và Tên</label>
          <input 
            type="text" 
            required
            placeholder="Nhập tên của bạn..."
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bạn sẽ tham dự chứ?</label>
            <select 
              value={formData.isAttending}
              onChange={(e) => setFormData({...formData, isAttending: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
            >
              <option value="true">Chắc chắn rồi!</option>
              <option value="false">Rất tiếc, mình không thể</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Users size={16} /> Số lượng khách
            </label>
            <input 
              type="number" 
              min="1" 
              max="10"
              value={formData.guests}
              onChange={(e) => setFormData({...formData, guests: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <MessageSquare size={16} /> Lời nhắn gửi (nếu có)
          </label>
          <textarea 
            rows={3}
            placeholder="Vd: Mình có dị ứng với hải sản..."
            value={formData.note}
            onChange={(e) => setFormData({...formData, note: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
          ></textarea>
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transform hover:-translate-y-1 transition-all active:scale-95"
        >
          GỬI XÁC NHẬN
        </button>
      </div>
    </form>
  );
};

export default RSVPForm;
