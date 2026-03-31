export default async function handler(req, res) {
  // Sirf POST request allow karenge (Security ke liye)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Frontend se USDT amount aur order_id aayega
  const { amount_in_usdt, order_id } = req.body;

  try {
    // CoinXpay API ko call kar rahe hain backend se
    const response = await fetch('https://api.coinxpay.in/api/v4/payin', { // Dhyan dein: Agar CoinXpay ka base URL alag hai, toh ise change kar lein
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.COINXPAY_API_KEY}` // API key Vercel ke environment se aayegi
      },
      body: JSON.stringify({
        network: "bsc",
        amount: amount_in_usdt, 
        callback_url: "https://gaming-pro-kqve.vercel.app/api/webhook", // Aapki live site ka webhook
        order_id: order_id
      })
    });

    const data = await response.json();
    
    // CoinXpay ka response (payment_url) frontend ko bhej do
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Payment gateway error' });
  }
}