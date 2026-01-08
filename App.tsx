
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import EventDetails from './components/EventDetails';
import Timeline from './components/Timeline';
import RSVPForm from './components/RSVPForm';
import AIGenerator from './components/AIGenerator';
import { EventData, AgendaItem } from './types';
import { initialEventData } from './eventData';
import { Settings, Music, Camera, Copy, Save, RotateCcw, FileJson, Plus, Trash2 } from 'lucide-react';

const App: React.FC = () => {
  const [eventData, setEventData] = useState<EventData>(() => {
    const saved = localStorage.getItem('yep_event_data_v2');
    return saved ? JSON.parse(saved) : initialEventData;
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [showJson, setShowJson] = useState(false);

  useEffect(() => {
    localStorage.setItem('yep_event_data_v2', JSON.stringify(eventData));
  }, [eventData]);

  const handleReset = () => {
    if (confirm("Bạn có chắc chắn muốn đặt lại toàn bộ dữ liệu về mặc định?")) {
      setEventData(initialEventData);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(eventData, null, 2));
    alert("Đã sao chép dữ liệu JSON vào bộ nhớ tạm!");
  };

  const addAgendaItem = () => {
    setEventData({
      ...eventData,
      agenda: [...eventData.agenda, { time: "00:00", activity: "Mô tả hoạt động" }]
    });
  };

  const updateAgendaItem = (index: number, field: keyof AgendaItem, value: string) => {
    const newAgenda = [...eventData.agenda];
    newAgenda[index] = { ...newAgenda[index], [field]: value };
    setEventData({ ...eventData, agenda: newAgenda });
  };

  const removeAgendaItem = (index: number) => {
    const newAgenda = eventData.agenda.filter((_, i) => i !== index);
    setEventData({ ...eventData, agenda: newAgenda });
  };

  return (
    <div className="min-h-screen selection:bg-red-200">
      <button 
        onClick={() => setIsEditMode(!isEditMode)}
        className={`fixed bottom-6 right-6 z-50 p-4 shadow-2xl rounded-full transition-all border ${
          isEditMode ? 'bg-red-600 text-white border-red-500 rotate-90' : 'bg-white text-red-600 border-red-100 hover:scale-110'
        }`}
        title="Chỉnh sửa thiệp"
      >
        <Settings />
      </button>

      <Hero data={eventData} />
      
      <main className="bg-stone-50">
        <EventDetails data={eventData} />
        
        <Timeline agenda={eventData.agenda} />

        <div className="max-w-4xl mx-auto px-4 py-20">
          {isEditMode && (
            <div className="mb-20 space-y-8 bg-white p-6 md:p-10 rounded-3xl shadow-xl border-2 border-red-100 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-serif font-bold text-red-900">Quản Lý Dữ Liệu Thiệp</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowJson(!showJson)}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <FileJson size={20} />
                  </button>
                  <button 
                    onClick={handleReset}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <RotateCcw size={20} />
                  </button>
                </div>
              </div>

              {showJson ? (
                <div className="relative group">
                  <pre className="bg-gray-900 text-green-400 p-6 rounded-xl overflow-x-auto text-xs font-mono max-h-[400px]">
                    {JSON.stringify(eventData, null, 2)}
                  </pre>
                  <button 
                    onClick={copyToClipboard}
                    className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Tiêu Đề Tiệc</label>
                        <input className="w-full p-3 bg-gray-50 rounded-lg border border-gray-100" value={eventData.title} onChange={(e) => setEventData({...eventData, title: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Tên Chủ Tiệc</label>
                        <input className="w-full p-3 bg-gray-50 rounded-lg border border-gray-100" value={eventData.hostName} onChange={(e) => setEventData({...eventData, hostName: e.target.value})} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Ngày Tháng</label>
                        <input className="w-full p-3 bg-gray-50 rounded-lg border border-gray-100" value={eventData.date} onChange={(e) => setEventData({...eventData, date: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Giờ Giấc</label>
                        <input className="w-full p-3 bg-gray-50 rounded-lg border border-gray-100" value={eventData.time} onChange={(e) => setEventData({...eventData, time: e.target.value})} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-xs font-bold uppercase text-gray-400">Lịch Trình Buổi Tiệc</label>
                      <button onClick={addAgendaItem} className="flex items-center gap-1 text-xs font-bold text-red-600 hover:underline">
                        <Plus size={14} /> Thêm hoạt động
                      </button>
                    </div>
                    <div className="space-y-3">
                      {eventData.agenda.map((item, index) => (
                        <div key={index} className="flex gap-2 items-start">
                          <input 
                            className="w-24 p-2 bg-gray-50 rounded border border-gray-100 text-sm" 
                            placeholder="Thời gian"
                            value={item.time} 
                            onChange={(e) => updateAgendaItem(index, 'time', e.target.value)} 
                          />
                          <input 
                            className="flex-1 p-2 bg-gray-50 rounded border border-gray-100 text-sm" 
                            placeholder="Hoạt động"
                            value={item.activity} 
                            onChange={(e) => updateAgendaItem(index, 'activity', e.target.value)} 
                          />
                          <button onClick={() => removeAgendaItem(index)} className="p-2 text-gray-400 hover:text-red-600">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <AIGenerator 
                hostName={eventData.hostName} 
                eventTitle={eventData.title} 
                onUpdateMessage={(msg) => setEventData({...eventData, message: msg})} 
              />
            </div>
          )}

          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4 italic">Tiện Ích & Hoạt Động</h2>
            <div className="flex justify-center gap-8 mt-12">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 transition-transform hover:scale-110">
                  <Music />
                </div>
                <span className="text-sm font-medium text-gray-600">Âm Nhạc</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 transition-transform hover:scale-110">
                  <Camera />
                </div>
                <span className="text-sm font-medium text-gray-600">Chụp Ảnh</span>
              </div>
            </div>
          </div>

          <RSVPForm />
        </div>
      </main>

      <footer className="py-20 bg-stone-900 text-center px-4">
        <div className="max-w-xl mx-auto">
          <h2 className="text-white font-cursive text-4xl mb-6">Hẹn Gặp Lại Bạn!</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-12">
            Mọi thắc mắc vui lòng liên hệ trực tiếp với Ban Tổ Chức qua Hotline: 0900 XXX XXX
          </p>
          <div className="flex justify-center items-center gap-4 text-gray-500">
            <div className="h-px w-12 bg-gray-700"></div>
            <p className="text-xs uppercase tracking-widest">Design for your memories</p>
            <div className="h-px w-12 bg-gray-700"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
