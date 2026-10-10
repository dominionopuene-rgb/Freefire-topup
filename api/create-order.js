export default async function handler(req, res) {
  // Allow your website to talk to this backend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle the browser's preflight check
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // SIMPLE TEST: Just return success to prove the connection works
  return res.status(200).json({ 
    success: true, 
    message: "Backend reached successfully! Module issue fixed." 
  });
}
