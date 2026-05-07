export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { amountINR, orderId } = req.body;

  // IMPORTANT: URLSearchParams 'application/x-www-form-urlencoded' format banata hai
  const formData = new URLSearchParams();
  
  // Yahan API document ke hisaab se payload keys daalein. (Jaise niche example hai)
  formData.append('api_token', process.env.PAYMENT_GATEWAY_TOKEN); // Vercel env se aayega
  formData.append('amount', amountINR);
  formData.append('order_id', orderId);
  // Agar API document mein customer email/phone maanga hai, toh yahan add karein:
  // formData.append('customer_mobile', '9876543210'); 

  try {
    // 👇 YAHAN APNE NAYE GATEWAY KA ASLI CREATE ORDER URL DAALEIN 👇
    const GATEWAY_URL = 'https://www.paypg.in/api/create-order'; 

    const response = await fetch(GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });

    const data = await response.json();
    
    // Frontend ko data wapas bhej do
    res.status(200).json(data);
  } catch (error) {
    console.error("Backend Gateway Error:", error);
    res.status(500).json({ status: false, message: 'Server connection failed' });
  }
}