export default async function handler(req, res) {
  // Allow your website to talk to this backend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { playerId, packageId } = req.body;
  const apiKey = process.env.FAZERCARDS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ success: false, error: 'API key missing on server.' });
  }

  try {
    // Using standard fetch instead of axios to avoid dependency issues
    const response = await fetch('https://api.fzr.cards/api/v2/orders', {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        game: 'free-fire',
        player_id: playerId,
        product_id: packageId
      })
    });

    const data = await response.json();
    
    // Check if FazerCards actually accepted the order
    if (!response.ok) {
      return res.status(response.status).json({ success: false, error: data.message || 'FazerCards rejected the request' });
    }

    return res.status(200).json({ success: true, data });
    
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
