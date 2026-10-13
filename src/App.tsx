import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ActiveTab, Conversation, Message } from './types';
import { Menu, Send, Sparkles, Terminal, Cpu, Settings as SettingsIcon } from 'lucide-react';

export function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');

  // الحالة الأولية للمحادثات
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: '1', title: 'موقع مكتبة إسلامية', updatedAt: 'اليوم' },
    { id: '2', title: 'تحسين أداء كود React', updatedAt: 'أمس' },
  ]);
  const [currentConvId, setCurrentConvId] = useState<string>('1');

  // رسائل تجريبية لواجهة المحادثة للاختبار
  const [messages, setMessages] = useState<Message[]>([
    { id: 'm1', role: 'user', content: 'أنشئ لي موقع مكتبة إسلامية يدعم البحث والتصنيفات.', timestamp: '10:00 AM' },
    { id: 'm2', role: 'assistant', content: 'أهلاً بك! لقد بدأت بتصميم الهيكلية الأساسية للموقع باستخدام React و Tailwind CSS.', provider: 'Claude API', model: 'claude-3-5-sonnet', timestamp: '10:01 AM' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // تطبيق كلاس الوضع الداكن على الجذر
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // محاكاة رد النظام التجريبي في المرحلة الأولى
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `تم استلام طلبك بنجاح. الواجهة تعمل بشكل مثالي وسنربط الخادم الفعلي في المراحل القادمة!`,
        provider: 'System UI Mock',
        model: 'v1.0-local',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <div dir="rtl" className="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* القائمة الجانبية */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        conversations={conversations}
        currentConvId={currentConvId}
        onSelectConv={setCurrentConvId}
        onNewConv={() => {
          const newId = Date.now().toString();
          setConversations([{ id: newId, title: 'محادثة جديدة', updatedAt: 'الآن' }, ...conversations]);
          setCurrentConvId(newId);
          setMessages([]);
        }}
        onDeleteConv={(id) => setConversations(conversations.filter(c => c.id !== id))}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* المحتوى الرئيسي */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* شريط علوي للهاتف والمتصفح */}
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl md:hidden"
            >
              <Menu size={22} />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-gray-900 dark:text-white">My AI Studio</span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-xs bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full font-medium">
                المرحلة الأولى: مكتملة
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>جاهز للعرض</span>
            </div>
          </div>
        </header>

        {/* عرض المحتوى بناءً على التبويب النشط */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* قائمة الرسائل */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                    <Sparkles size={48} className="text-indigo-500 mb-2 animate-bounce" />
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">كيف يمكنني مساعدتك اليوم؟</h2>
                    <p className="text-sm mt-1 max-w-sm">ابدأ بكتابة طلبك لإنشاء موقع، كتابة كود، أو التحدث مع المساعد الذكي.</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-indigo-600 text-white rounded-bl-sm'
                          : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 rounded-br-sm'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        {msg.provider && (
                          <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
                            <span>{msg.provider} ({msg.model})</span>
                            <span>{msg.timestamp}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* شريط الإدخال */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2 max-w-4xl mx-auto">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="اطرح سؤالاً أو اطلب إنشاء مشروع..."
                    className="flex-1 bg-gray-100 dark:bg-gray-800 border-0 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white p-3 rounded-xl transition shadow-sm flex items-center justify-center"
                  >
                    <Send size={18} className="rotate-180" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
              <Terminal size={48} className="text-indigo-500 mb-3" />
              <h2 className="text-xl font-bold">مساحة البرمجة (Code Studio)</h2>
              <p className="text-sm text-gray-500 mt-1 max-w-md">ستتيح لك هذه المساحة عرض وإدارة ملفات المشاريع، تحرير الأكواد، وربط مستودعات GitHub في المراحل القادمة.</p>
            </div>
          )}

          {activeTab === 'providers' && (
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
              <Cpu size={48} className="text-indigo-500 mb-3" />
              <h2 className="text-xl font-bold">إدارة مزودي الذكاء الاصطناعي (AI Provider Manager)</h2>
              <p className="text-sm text-gray-500 mt-1 max-w-md">هنا سيتم إدخال مفتاح Claude API الرسمي وإدارة خيارات التوجيه الذكي (Smart Model Router) في المراحل القادمة.</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
              <SettingsIcon size={48} className="text-indigo-500 mb-3" />
              <h2 className="text-xl font-bold">الإعدادات ولوحة التحكم</h2>
              <p className="text-sm text-gray-500 mt-1 max-w-md">مراقبة الاستهلاك، ضبط تفضيلات الواجهة، والتحكم بحساب Supabase.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
