export default async function handler(req, res) {
    // Chỉ nhận request dạng POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    
    try {
        // Vercel (Backend) sẽ gọi đến VPS HTTP của bạn
        const pistonRes = await fetch('http://103.56.161.103:3000/api/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const data = await pistonRes.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi kết nối đến VPS Piston' });
    }
}