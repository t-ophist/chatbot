import ChatInterface from '@/components/ChatInterface'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 顶部标题区域 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            薛公<span className="font-sans">の</span>AI 小秘书
          </h1>
          <p className="mt-4 text-xl text-gray-600 font-['Noto_Serif_SC']">
            行至水穷，便看水穷
          </p>
        </div>
        
        {/* 聊天界面 */}
        <ChatInterface />
      </div>
    </main>
  )
}
