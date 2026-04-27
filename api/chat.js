// api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { habitName } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  try {
    const response = await fetch(`https://googleapis.com{API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `你是一位原子習慣專家。使用者想建立一個習慣：「${habitName}」，請根據《原子習慣》的四個法則（提示、渴望、回應、獎賞），給出一句簡短（30字內）的執行建議。` }]
        }]
      })
    });

    const data = await response.json();
    const advice = data.candidates[0].content.parts[0].text;
    res.status(200).json({ advice });
  } catch (error) {
    res.status(500).json({ error: 'AI 取得建議失敗' });
  }
}
