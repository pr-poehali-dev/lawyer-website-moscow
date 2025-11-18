/**
 * Business: Send contact form emails via SMTP (nodemailer)
 * Args: event with httpMethod, body containing form data
 * Returns: HTTP response with success/error status
 */

import nodemailer from 'nodemailer';

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
        
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.mail.ru',
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const mailOptions = {
            from: `"Адвокатский сайт" <${process.env.SMTP_USER}>`,
            to: 'advokatmushovets@mail.ru',
            replyTo: formData.email,
            subject: `Новая заявка с сайта от ${formData.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1a1a1a; border-bottom: 3px solid #d4af37; padding-bottom: 10px;">
                        Новая заявка с сайта
                    </h2>
                    
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 10px 0;">
                            <strong style="color: #555;">ФИО:</strong> 
                            <span style="color: #1a1a1a;">${formData.name}</span>
                        </p>
                        <p style="margin: 10px 0;">
                            <strong style="color: #555;">Email:</strong> 
                            <a href="mailto:${formData.email}" style="color: #d4af37;">${formData.email}</a>
                        </p>
                        <p style="margin: 10px 0;">
                            <strong style="color: #555;">Телефон:</strong> 
                            <a href="tel:${formData.phone}" style="color: #d4af37;">${formData.phone}</a>
                        </p>
                    </div>
                    
                    <div style="margin: 20px 0;">
                        <h3 style="color: #1a1a1a; margin-bottom: 10px;">Сообщение:</h3>
                        <div style="background-color: #fff; padding: 15px; border-left: 4px solid #d4af37; line-height: 1.6;">
                            ${formData.message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999;">
                        <p>Заявка отправлена: ${new Date().toLocaleString('ru-RU')}</p>
                        <p>Request ID: ${context.requestId}</p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                success: true, 
                message: 'Email sent successfully' 
            }),
            isBase64Encoded: false
        };

    } catch (error) {
        console.error('Email sending error:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                success: false, 
                error: 'Failed to send email',
                details: error instanceof Error ? error.message : 'Unknown error'
            }),
            isBase64Encoded: false
        };
    }
};
