export default async function handler(req, res) {
  try {
    // Yahan apni original API ka link daaliye
    const response = await fetch('AAPKI_API_KA_URL_YAHAN_DAALEIN');
    const data = await response.json();
    
    // Ye Vercel ka server aapke frontend ko data bhej dega (Bina CORS error ke)
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch price' });
  }
}