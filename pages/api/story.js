import OpenAI from 'openai';
// Inicjalizacja klienta OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const formData = req.body;
    
    // Sprawdzenie wymaganych pól
    if (!formData.childName || !formData.childAge) {
      return res.status(400).json({ error: 'Brak wymaganych danych' });
    }
    
    // Ustawienie języka
    const language = formData.language || 'pl';
    
    let title, content;
    
    // Stworzenie promptu dla OpenAI na podstawie danych z formularza
    const prompt = `Napisz krótką bajkę dla ${formData.childAge}-letniego dziecka o imieniu ${formData.childName}.
    Zainteresowania dziecka: ${formData.interests || 'różne zabawy'}.
    Temat bajki: ${formData.theme || 'przygoda'}.
    Bajka powinna być krótka (max 5 akapitów), pouczająca, pozytywna i dostosowana do wieku dziecka.
    Podziel tekst na akapity.
    Na początku podaj tytuł bajki.`;
    
    // Wywołanie API OpenAI
    console.log("Wysyłanie zapytania do OpenAI...");
    
    // OPCJA 1: Użycie API OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": prompt}],
      max_tokens: 1000,
      temperature: 0.7,
    });
    
    // Pobranie wygenerowanego tekstu
    const storyText = completion.choices[0].message.content;
    
    // Wyodrębnienie tytułu i treści
    const lines = storyText.split('\n');
    title = lines[0].replace(/^(#|\d+\.|Tytuł:)?\s*/, '');
    content = lines.slice(1).join('\n').trim();
    
    // OPCJA 2: Stały przykład (do testów bez używania API)
    // Jeśli chcesz użyć tej opcji, zakomentuj całą sekcję OPCJA 1 powyżej
    /*
    title = `Przygoda ${formData.childName} w Zaczarowanym Lesie`;
    content = `Dawno, dawno temu, w Zaczarowanym Lesie mieszkał ${formData.childAge}-letni odkrywca o imieniu ${formData.childName}. Wszyscy w lesie znali ${formData.childName} z wielkiej ciekawości świata i odwagi.
Pewnego słonecznego poranka, gdy ptaki wesoło śpiewały swoje melodie, ${formData.childName} postanowił wyruszyć na poszukiwanie legendarnego Drzewa Marzeń. Według leśnej legendy, każdy kto odnajdzie to magiczne drzewo, może wypowiedzieć jedno życzenie, które się spełni.
${formData.childName} zabrał swój mały plecak, włożył do niego kanapkę, butelkę wody i swój ulubiony kompas. "Dziś jest idealny dzień na przygodę!" - pomyślał z ekscytacją.
W trakcie wędrówki przez las, ${formData.childName} spotkał wiele leśnych stworzeń. Najpierw natknął się na rodzinę królików, które pokazały mu skrót przez polanę pełną kolorowych kwiatów. Następnie spotkał mądrą sowę, która podzieliła się z nim cenną wskazówką o drodze do Drzewa Marzeń.
Po długiej wędrówce, ${formData.childName} w końcu znalazł Drzewo Marzeń. Było ogromne i mieniło się wszystkimi kolorami tęczy. ${formData.childName} zamknął oczy i wypowiedział swoje życzenie. Od tego dnia, wszystkie dzieci w lesie miały kolorowe i radosne sny, a ${formData.childName} stał się najbardziej szanowanym odkrywcą w całym Zaczarowanym Lesie.`;
    */
    
    // Przygotowanie odpowiedzi
    const response = {
      success: true,
      story: {
        title,
        content,
        language,
        childName: formData.childName,
        theme: formData.theme || 'przygoda'
      },
      fallbackAudioUrl: "https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3"
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error generating story:', error);
    return res.status(500).json({
      error: 'Failed to generate story',
      details: error.message
    });
  }
}
