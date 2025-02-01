import { ChatMessage, ChatResponse } from '@/types/chat'

const KIMI_API_KEY = 'sk-c9mZ67Sy1Gf8geCmsuiWO571hJ1kc9ea3tvbMRIoJM0SpPJk'
const API_BASE_URL = 'https://api.moonshot.cn/v1'

export async function sendMessage(messages: ChatMessage[]): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-32k',
        messages,
        temperature: 0.7,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`API 请求失败: ${response.statusText}\n${JSON.stringify(errorData, null, 2)}`)
    }

    return await response.json()
  } catch (error) {
    console.error('发送消息失败:', error)
    throw error
  }
} 