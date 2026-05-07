export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { amountINR, orderId } = req.body;

  // PayPG API ke exact format ke hisaab se payload
  const formData = new URLSearchParams();
  
  formData.append('customer_mobile', '9999999999'); // Dummy mobile taaki API khush rahe
  formData.append('user_token', process.env.PAYMENT_GATEWAY_TOKEN); // Yahan 'user_token' hona zaroori tha
  formData.append('amount', amountINR.toString());
  formData.append('order_id', orderId);
  formData.append('redirect_url', 'https://gaming-pro-kqve.vercel.app/dashboard'); // Payment ke baad yahan wapas aayega
  formData.append('remark1', 'Add Funds'); // Optional but safe to send
  formData.append('remark2', 'Gaming Pro'); // Optional but safe to send

  try {
    // PayPG ka asli URL jo screenshot mein hai
    const GATEWAY_URL = 'https://www.paypg.in/api/create-order'; 

    const response = await fetch(GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: formData.toString()
    });

    const rawText = await response.text();
    console.log("PayPG Raw Response:", rawText);

    try {
      const data = JSON.parse(rawText);
      res.status(200).json(data);
    } catch (parseError) {
      console.error("Failed to parse JSON. Gateway sent:", rawText);
      res.status(500).json({ status: false, message: 'Gateway sent invalid data.' });
    }

  } catch (error) {
    console.error("Backend Gateway Error:", error);
    res.status(500).json({ status: false, message: 'Server connection failed' });
  }
}