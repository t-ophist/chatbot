import { ChatMessage, ChatResponse } from '@/types/chat'

const KIMI_API_KEY = 'sk-c9mZ67Sy1Gf8geCmsuiWO571hJ1kc9ea3tvbMRIoJM0SpPJk'
const API_BASE_URL = 'https://api.moonshot.cn/v1'

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function sendMessage(messages: ChatMessage[], retries = 3): Promise<ChatResponse> {
  for (let i = 0; i < retries; i++) {
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
        if (errorData.error?.type === 'rate_limit_reached_error') {
          await wait(2000)
          continue
        }
        throw new Error(`API 请求失败: ${response.statusText}\n${JSON.stringify(errorData, null, 2)}`)
      }

      return await response.json()
    } catch (error) {
      if (i === retries - 1) throw error
      await wait(2000)
    }
  }
  throw new Error('达到最大重试次数')
} 