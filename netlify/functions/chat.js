// Netlify Function: /api/chat
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { message } = JSON.parse(event.body);

    // For now, return a simple response
    // In production, integrate with OpenAI API here
    const response = {
      message: `Hi! I'm Camden's AI assistant. You said: "${message}". For a full conversation, please use the ElevenLabs widget or contact Camden directly at contact@appvantix.com.`
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
