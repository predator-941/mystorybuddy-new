export default function StoryDisplay({ story, audioUrl, onReset }) {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        textAlign: 'center',
        fontSize: '24px',
        color: '#333'
      }}>
        {story.title}
      </h2>
      
      {audioUrl && (
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <audio 
            src={audioUrl} 
            controls 
            style={{ width: '100%', maxWidth: '500px' }}
          />
        </div>
      )}
      
      <div style={{ lineHeight: '1.6', fontSize: '16px' }}>
        {story.content.split('\n').map((paragraph, index) => (
          <p key={index} style={{ marginBottom: '16px' }}>
            {paragraph}
          </p>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button 
          onClick={onReset}
          style={{ 
            backgroundColor: '#22c55e', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Stwórz nową bajkę
        </button>
      </div>
    </div>
  );
}