/**
 * Business: Send contact form to Telegram bot
 * Args: event with httpMethod, body containing form data
 * Returns: HTTP response with success/error status
 */

interface CloudFunctionEvent {
    httpMethod: string;
    headers: Record<string, string>;
    queryStringParameters?: Record<string, string>;
    body?: string;
    isBase64Encoded: boolean;
}

interface CloudFunctionContext {
    requestId: string;
    functionName: string;
    functionVersion: string;
    memoryLimitInMB: number;
}

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export const handler = async (event: CloudFunctionEvent, context: CloudFunctionContext): Promise<any> => {
    const { httpMethod, body } = event;
    
    if (httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            body: '',
            isBase64Encoded: false
        };
    }
    
    if (httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Method not allowed' }),
            isBase64Encoded: false
        };
    }

    try {
        const formData: ContactFormData = JSON.parse(body || '{}');
        
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        
        if (!botToken || !chatId) {
            return {
                statusCode: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ 
                    success: false, 
                    error: 'Telegram credentials not configured' 
                }),
                isBase64Encoded: false
            };
        }
        
        const message = `🆕 Новая заявка с сайта!

👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
📧 Email: ${formData.email}

💬 Сообщение:
${formData.message}`;
        
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const payload = JSON.stringify({
            chat_id: chatId,
            text: message
        });
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Telegram API error:', errorText);
            return {
                statusCode: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ 
                    success: false, 
                    error: 'Failed to send to Telegram',
                    details: errorText
                }),
                isBase64Encoded: false
            };
        }
        
        console.log('Telegram notification sent successfully');

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                success: true, 
                message: 'Заявка отправлена' 
            }),
            isBase64Encoded: false
        };

    } catch (error) {
        console.error('Telegram sending error:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                success: false, 
                error: 'Failed to send to Telegram',
                details: error instanceof Error ? error.message : 'Unknown error'
            }),
            isBase64Encoded: false
        };
    }
};
