import { useState } from 'react';
import StoryForm from '../components/StoryForm';
import StoryDisplay from '../components/StoryDisplay';
import LoadingIndicator from '../components/LoadingIndicator';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedStory, setGeneratedStory] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Błąd podczas generowania bajki');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setGeneratedStory(data.story);
        
        // Ustawienie przykładowego URL audio
        if (data.fallbackAudioUrl) {
          setAudioUrl(data.fallbackAudioUrl);
        }
      } else {
        throw new Error(data.error || 'Nie udało się wygenerować bajki');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGeneratedStory(null);
    setAudioUrl(null);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f0fdf4', 
      padding: '20px'
    }}>
      <header style={{ 
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{ color: '#22c55e', fontSize: '36px' }}>MyStoryBuddy</h1>
        <p style={{ fontSize: '18px' }}>Twórz magiczne bajki dla dzieci</p>
      </header>

      <main>
        {isLoading ? (
          <div style={{ textAlign: 'center', margin: '50px 0' }}>
            <LoadingIndicator />
            <p style={{ marginTop: '20px' }}>Generuję bajkę dla Twojego dziecka...</p>
          </div>
        ) : generatedStory ? (
          <StoryDisplay 
            story={generatedStory}
            audioUrl={audioUrl}
            onReset={handleReset}
          />
        ) : (
          <>
            <StoryForm onSubmit={handleSubmit} isLoading={isLoading} />
            
            {error && (
              <div style={{ 
                color: 'red', 
                margin: '20px auto',
                maxWidth: '500px',
                padding: '10px',
                backgroundColor: '#ffebee',
                borderRadius: '4px'
              }}>
                <p>{error}</p>
              </div>
            )}
          </>
        )}
      </main>

      <footer style={{ 
        textAlign: 'center', 
        marginTop: '50px',
        fontSize: '14px',
        color: '#666'
      }}>
        &copy; {new Date().getFullYear()} MyStoryBuddy. Wszelkie prawa zastrzeżone.
      </footer>
    </div>
  );
}