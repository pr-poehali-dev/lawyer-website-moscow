import json
import os
import urllib.request
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Business: Send contact form to Telegram bot
    Args: event with httpMethod, body containing form data
    Returns: HTTP response with success/error status
    """
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
    except Exception as e:
        print(f"ERROR parsing body: {e}")
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'success': False, 'error': f'Invalid JSON: {str(e)}'})
        }
    
    name = body_data.get('name', 'Не указано')
    phone = body_data.get('phone', 'Не указан')
    email = body_data.get('email', 'Не указан')
    message = body_data.get('message', 'Нет сообщения')
    
    print(f"Received form data: name={name}, phone={phone}, email={email}")
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    print(f"Bot token present: {bool(bot_token)}, Chat ID present: {bool(chat_id)}")
    
    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'success': False, 'error': 'Telegram credentials not configured'})
        }
    
    telegram_message = f"""🆕 Новая заявка с сайта!

👤 Имя: {name}
📞 Телефон: {phone}
📧 Email: {email}

💬 Сообщение:
{message}"""
    
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    
    # Ensure chat_id is string or int
    try:
        chat_id_value = int(chat_id) if chat_id.isdigit() else chat_id
    except:
        chat_id_value = chat_id
    
    data = json.dumps({
        'chat_id': chat_id_value,
        'text': telegram_message
    }).encode('utf-8')
    
    try:
        print(f"Sending to Telegram chat_id={chat_id_value}")
        req = urllib.request.Request(
            url,
            data=data,
            headers={'Content-Type': 'application/json'}
        )
        
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            print(f"Telegram API response: {result}")
            
            if result.get('ok'):
                print("SUCCESS: Message sent to Telegram")
                return {
                    'statusCode': 200,
                    'headers': {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'success': True, 'message': 'Заявка отправлена'})
                }
            else:
                print(f"ERROR: Telegram API returned not ok: {result}")
                return {
                    'statusCode': 500,
                    'headers': {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'success': False, 'error': 'Telegram API error', 'details': result})
                }
    
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8') if e.fp else ''
        print(f"HTTPError sending to Telegram: {e.code} {e.reason}")
        print(f"Error body: {error_body}")
        try:
            error_json = json.loads(error_body)
            error_message = error_json.get('description', str(e))
        except:
            error_message = f"{e.code} {e.reason}"
        
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'success': False, 'error': error_message})
        }
    
    except Exception as e:
        print(f"EXCEPTION sending to Telegram: {type(e).__name__}: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'success': False, 'error': str(e)})
        }