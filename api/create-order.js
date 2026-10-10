module.exports = async (req, res) => {
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

  // FAKE TEST: Instantly return success without talking to FazerCards
  // If this works, we know the backend is perfect.
  return res.status(200).json({ 
    success: true, 
    message: "Backend reached successfully!" 
  });
};
