'use client'

import { useState } from 'react'
import { SendIcon } from './Icons'
import { ChatMessage } from '@/types/chat'
import { sendMessage } from '@/services/api'
import ReactMarkdown from 'react-markdown'

export default function ChatInterface() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: '你好！我是你的 AI 助手。有什么我可以帮你的吗？'
    }
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    const userMessage: ChatMessage = {
      role: 'user',
      content: message
    }

    setMessages(prev => [...prev, userMessage])
    setMessage('')
    setIsLoading(true)

    try {
      const response = await sendMessage([...messages, userMessage])
      const assistantMessage = response.choices[0].message
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: assistantMessage.content
      }])
    } catch (error) {
      console.error('发送消息失败:', error)
      // 可以添加错误提示
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 聊天消息显示区域 */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 min-h-[600px] mb-4 p-6">
        <div className="flex flex-col space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="flex items-start justify-start">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === 'assistant'
                  ? 'bg-white border border-gray-300'
                  : 'bg-gray-700'
              }`}>
                <span className={`text-sm ${
                  msg.role === 'assistant'
                    ? 'text-gray-800'
                    : 'text-white'
                }`}>
                  {msg.role === 'assistant' ? 'AI' : '君'}
                </span>
              </div>
              <div className={`rounded-2xl px-4 py-2 max-w-[80%] ml-4`}>
                {msg.role === 'assistant' ? (
                  <ReactMarkdown 
                    className="text-gray-800 prose prose-sm max-w-none
                              prose-p:my-1 prose-pre:my-2
                              prose-pre:bg-gray-50 prose-pre:p-2 prose-pre:rounded-md
                              prose-code:text-gray-800 prose-code:bg-gray-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                              prose-strong:text-gray-900
                              prose-a:text-blue-600"
                  >
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {msg.content}
                  </p>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-center">
              <div className="animate-pulse text-gray-500">哥们在沉思中...</div>
            </div>
          )}
        </div>
      </div>

      {/* 输入区域 */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="写下你的问题..."
          disabled={isLoading}
          className="w-full px-4 py-4 pr-12 rounded-lg border border-gray-200 
                   bg-white text-gray-900
                   focus:outline-none focus:ring-2 focus:ring-gray-500
                   disabled:opacity-50"
        />
        <button
          type="submit"
          title="发送消息"
          disabled={isLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full
                   text-gray-600 hover:bg-gray-100
                   transition-colors duration-200
                   disabled:opacity-50"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  )
} 