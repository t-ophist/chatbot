import ChatInterface from '@/components/ChatInterface'

export default function Home() {
  return (
    <main className="min-h-screen h-[100dvh] bg-white flex flex-col">
      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-8 w-full flex flex-col">
        {/* 顶部标题区域 */}
        <div className="text-center mb-2 sm:mb-12 flex-shrink-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 sm:text-5xl">
            薛公<span className="font-sans">の</span>AI 小秘书
          </h1>
          <p className="mt-1 sm:mt-3 text-base sm:text-lg text-gray-600 font-['Noto_Serif_SC']">
            行至水穷，便看水穷
          </p>
        </div>
        
        {/* 聊天界面 */}
        <ChatInterface />
      </div>
    </main>
  )
}
