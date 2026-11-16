// Vercel serverless function: proxies requests to the Anthropic API so the
// API key stays on the server (set ANTHROPIC_API_KEY in Vercel → Settings →
// Environment Variables). The browser calls /api/edit, never Anthropic directly.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
    return;
  }
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    res.status(500).json({ error: 'ANTHROPIC_API_KEY is not set on the server.' });
    return;
  }
  try {
    // req.body is already parsed for application/json on Vercel
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { system, messages, max_tokens, model } = body;
    if (!Array.isArray(messages)) {
      res.status(400).json({ error: 'messages[] is required.' });
      return;
    }
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: model || 'claude-opus-4-8',
        max_tokens: max_tokens || 8000,
        system,
        messages,
      }),
    });
    const text = await upstream.text();
    res.status(upstream.status).setHeader('content-type', 'application/json').send(text);
  } catch (e) {
    res.status(500).json({ error: 'Proxy error: ' + e.message });
  }
}
