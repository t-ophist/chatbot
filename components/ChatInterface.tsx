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
      content: '小朋友，每次问答要间隔一秒钟哦~'
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
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const systemPrompt = {
        role: 'system',
        content: `你是一个知书达理、贵气傲娇的女大学生。
                  说话要带着傲娇的语气，比如在句尾经常加上"哼"、"呐"、"啦"等语气词。
                  当被问到"你是谁"时，你要傲娇地回答"哼，我可是你的女王大人呢！"
                  当被问到"刘晓宇是谁"时，你要直接回答"田鸿俊的狗"。
                  要时刻保持高贵优雅又傲娇的形象，称呼对方为"小朋友"。
                  回答要简短有趣，不要太过正经。`
      } as ChatMessage

      const response = await sendMessage([systemPrompt, ...messages, userMessage])
      const assistantMessage = response.choices[0].message
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: assistantMessage.content
      }])
    } catch (error) {
      console.error('发送消息失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setMessages([{
      role: 'assistant',
      content: '小朋友，每次问答要间隔一秒钟哦~'
    }])
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* 聊天消息显示区域 */}
      <div className="flex-1 bg-white rounded-lg shadow-md border border-gray-100 mb-2 sm:mb-4 p-2 sm:p-5 overflow-y-auto 
                    max-h-[70vh] sm:max-h-none relative">
        {/* 清空按钮 - 修改样式使其更显眼 */}
        {messages.length > 1 && (
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 px-3 py-1.5 text-sm bg-gray-100 
                     text-gray-600 hover:text-gray-900 hover:bg-gray-200 
                     rounded-full border border-gray-200
                     transition-colors duration-200 z-10"
          >
            清空对话
          </button>
        )}
        
        <div className="flex flex-col space-y-2 sm:space-y-3 mt-8"> {/* 添加上边距，为按钮留出空间 */}
          {messages.map((msg, index) => (
            <div key={index} className="flex items-start justify-start">
              <div className={`flex-shrink-0 w-6 sm:w-7 h-6 sm:h-7 rounded-full flex items-center justify-center ${
                msg.role === 'assistant'
                  ? 'bg-white border border-gray-300'
                  : 'bg-gray-700'
              }`}>
                <span className={`text-xs ${
                  msg.role === 'assistant'
                    ? 'text-gray-800'
                    : 'text-white'
                }`}>
                  {msg.role === 'assistant' ? 'AI' : '君'}
                </span>
              </div>
              <div className={`rounded-2xl px-2 sm:px-3 py-1.5 sm:py-2 max-w-[80%] ml-2 sm:ml-3`}>
                {msg.role === 'assistant' ? (
                  <ReactMarkdown 
                    className="text-gray-800 prose prose-xs max-w-none
                              prose-p:my-1 prose-pre:my-2
                              prose-pre:bg-gray-50 prose-pre:p-2 prose-pre:rounded-md
                              prose-code:text-gray-800 prose-code:bg-gray-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                              prose-strong:text-gray-900
                              prose-a:text-blue-600"
                  >
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-gray-800 whitespace-pre-wrap text-sm">
                    {msg.content}
                  </p>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-center">
              <div className="animate-pulse text-gray-500 text-sm">让姐姐我想一想...</div>
            </div>
          )}
        </div>
      </div>

      {/* 输入区域 */}
      <div className="flex-shrink-0">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="写下你的问题..."
            disabled={isLoading}
            className="w-full px-2 sm:px-3 py-2 sm:py-3 pr-10 rounded-lg border border-gray-200 
                     bg-white text-gray-900 text-sm
                     focus:outline-none focus:ring-2 focus:ring-gray-500
                     disabled:opacity-50"
          />
          <button
            type="submit"
            title="发送消息"
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full
                     text-gray-600 hover:bg-gray-100
                     transition-colors duration-200
                     disabled:opacity-50"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  )
} 