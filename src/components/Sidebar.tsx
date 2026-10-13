import React from 'react';
import { MessageSquare, Code, Cpu, Settings, Plus, Trash2, X } from 'lucide-react';
import { ActiveTab, Conversation } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  conversations: Conversation[];
  currentConvId: string;
  onSelectConv: (id: string) => void;
  onNewConv: () => void;
  onDeleteConv: (id: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  conversations,
  currentConvId,
  onSelectConv,
  onNewConv,
  onDeleteConv,
  darkMode,
  setDarkMode,
}) => {
  return (
    <>
      {/* طبقة شفافة للخلفية عند فتح القائمة على الهواتف */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 right-0 z-50 w-72 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800
        flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        md:static md:z-auto
      `}>
        {/* رأس القائمة */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              AI
            </div>
            <div>
              <h1 className="font-bold text-gray-900 dark:text-white leading-tight">My AI Studio</h1>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Personal AI Workspace</span>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* زر محادثة جديدة */}
        <div className="p-3">
          <button
            onClick={() => { onNewConv(); onClose(); }}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-xl font-medium transition shadow-sm"
          >
            <Plus size={18} />
            <span>محادثة جديدة</span>
          </button>
        </div>

        {/* التنقل الرئيسي */}
        <div className="px-3 py-2 space-y-1 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => { setActiveTab('chat'); onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition ${activeTab === 'chat' ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <MessageSquare size={18} />
            <span>المحادثات</span>
          </button>
          <button
            onClick={() => { setActiveTab('code'); onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition ${activeTab === 'code' ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <Code size={18} />
            <span>مساحة البرمجة (Code Studio)</span>
          </button>
          <button
            onClick={() => { setActiveTab('providers'); onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition ${activeTab === 'providers' ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <Cpu size={18} />
            <span>مزودو الذكاء الاصطناعي</span>
          </button>
          <button
            onClick={() => { setActiveTab('settings'); onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition ${activeTab === 'settings' ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <Settings size={18} />
            <span>الإعدادات والتحكم</span>
          </button>
        </div>

        {/* قائمة المحادثات السابقة */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="text-xs font-semibold text-gray-400 px-3 py-1 uppercase tracking-wider">السجل السابق</div>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => { onSelectConv(conv.id); setActiveTab('chat'); onClose(); }}
              className={`group flex items-center justify-between px-3 py-2 rounded-xl text-sm cursor-pointer transition ${currentConvId === conv.id && activeTab === 'chat' ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
            >
              <span className="truncate flex-1">{conv.title}</span>
              <button
                onClick={(e) => { e.stopPropagation(); onDeleteConv(conv.id); }}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* تذييل القائمة والوضع الداكن */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">الوضع الداكن</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-12 h-6 bg-gray-200 dark:bg-indigo-600 rounded-full relative transition p-1"
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-0' : '-translate-x-6'}`} />
          </button>
        </div>
      </aside>
    </>
  );
};
