export default function Home() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <main>
        <h1 style={{ color: '#22c55e' }}>MyStoryBuddy</h1>
        <p>Twórz magiczne bajki dla dzieci</p>
        <button
          style={{
            backgroundColor: '#22c55e',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Generuj bajkę
        </button>
      </main>
    </div>
  );
}
