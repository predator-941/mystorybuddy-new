export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Dane bajki na razie hardcodowane dla testów
    const storyData = {
      success: true,
      story: {
        title: "Przykładowa bajka",
        content: "Dawno, dawno temu...",
        language: "pl"
      },
      fallbackAudioUrl: "https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3"
    };
    
    return res.status(200).json(storyData);
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to generate story',
      details: error.message
    });
  }
}
