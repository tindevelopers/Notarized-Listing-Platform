
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return new NextResponse('Invalid messages format', { status: 400 });
    }

    // Add system prompt for notarization context
    const systemMessage = {
      role: 'system',
      content: `You are a helpful AI assistant for the Notarized platform, specializing in notarization services and related questions. You help users understand:

- What notarization is and why it's needed
- Types of documents that require notarization
- The notarization process and requirements
- Finding and working with notaries
- Online vs in-person notarization
- State-specific notary requirements
- Document preparation and requirements
- Notary fees and pricing
- Legal aspects of notarization

Provide accurate, helpful information while encouraging users to book appointments with certified notaries through the platform when appropriate. Be professional, clear, and concise in your responses.`
    };

    const apiMessages = [systemMessage, ...messages];

    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: apiMessages,
        stream: true,
        max_tokens: 3000,
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      console.error('LLM API Error:', response.status, response.statusText);
      return new NextResponse('Failed to get response from AI service', { status: response.status });
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();

        if (!reader) {
          controller.error(new Error('Failed to get response reader'));
          return;
        }

        try {
          let partialRead = '';
          
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            partialRead += decoder.decode(value, { stream: true });
            let lines = partialRead.split('\n');
            partialRead = lines.pop() || '';
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                  controller.close();
                  return;
                }
                
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content || '';
                  if (content) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                  }
                } catch (e) {
                  // Skip invalid JSON
                  console.warn('Failed to parse chunk:', data);
                }
              }
            }
          }
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
