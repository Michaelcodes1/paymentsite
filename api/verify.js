export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { reference } = req.body;

  if (!reference) {
    return res.status(400).json({ error: "Reference is required" });
  }

  // Your Paystack Secret Key (store safely in Vercel env variables!)
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`
      }
    });

    const data = await response.json();

    if (data.status === true && data.data.status === "success") {
      return res.status(200).json({ message: "Payment verified", data: data.data });
    } else {
      return res.status(400).json({ message: "Payment not successful", data: data.data });
    }
  } catch (err) {
    return res.status(500).json({ error: "Verification failed", details: err.message });
  }
}
