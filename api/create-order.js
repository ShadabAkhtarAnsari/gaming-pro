export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { amountINR, orderId } = req.body;

  const formData = new URLSearchParams();
  formData.append('api_token', process.env.PAYMENT_GATEWAY_TOKEN);
  formData.append('amount', amountINR);
  formData.append('order_id', orderId);

  try {
    // 👇 Yahan check kariye ki URL ekdum 100% sahi hai ya nahi 👇
    const GATEWAY_URL = 'https://www.paypg.in/api/create-order'; 

    const response = await fetch(GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });

    // Pehle raw text mein response padhenge taaki error aaye toh crash na ho
    const rawText = await response.text();
    
    // VERCEL LOGS KE LIYE: Yahan hum asli jawab print kar rahe hain
    console.log("Raw Gateway Response:", rawText);

    try {
      // Ab isko JSON banane ki koshish karenge
      const data = JSON.parse(rawText);
      res.status(200).json(data);
    } catch (parseError) {
      // Agar JSON nahi hai, toh humein exactly pata chal jayega
      console.error("Failed to parse JSON. Gateway sent this instead:", rawText);
      res.status(500).json({ status: false, message: 'Gateway sent invalid data. Check Vercel logs.' });
    }

  } catch (error) {
    console.error("Backend Gateway Error:", error);
    res.status(500).json({ status: false, message: 'Server connection failed' });
  }
}