/**
 * Download counter API
 * GET  /api/download-count?brief=CB-DXB-001  → returns { count: N }
 * POST /api/download-count  body: { brief: "CB-DXB-001" } → increments and returns { count: N }
 *
 * Requires Vercel KV:  vercel kv create downloads-counter
 * Vercel auto-injects KV_REST_API_URL and KV_REST_API_TOKEN env vars.
 */

const KV_API_URL = process.env.UPSTASH_REDIS_REST_URL;
const KV_API_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function kvRequest(path, method = 'GET', body) {
  const res = await fetch(`${KV_API_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${KV_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  // KV not configured — return gracefully so the page still works
  if (!KV_API_URL || !KV_API_TOKEN) {
    res.status(200).json({ count: 0, error: 'KV not configured' });
    return;
  }

  const briefId = (req.method === 'GET'
    ? req.query.brief
    : (req.body && req.body.brief)) || 'CB-DXB-001';

  const key = `downloads:${briefId}`;

  try {
    if (req.method === 'POST') {
      // INCR returns { result: newCount }
      const data = await kvRequest(`/incr/${key}`);
      res.status(200).json({ count: data.result || 0 });
    } else {
      // GET returns { result: currentCount } or null
      const data = await kvRequest(`/get/${key}`);
      res.status(200).json({ count: Number(data.result) || 0 });
    }
  } catch (err) {
    res.status(200).json({ count: 0, error: 'KV error' });
  }
};
