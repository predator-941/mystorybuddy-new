import { useState } from 'react';

export default function StoryForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    interests: '',
    theme: 'adventure',
    language: 'pl'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const themeOptions = [
    { value: 'adventure', label: 'Przygoda' },
    { value: 'space', label: 'Kosmos' },
    { value: 'animals', label: 'Zwierzęta' },
    { value: 'magic', label: 'Magia' }
  ];

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Imię dziecka:
          <input
            type="text"
            name="childName"
            value={formData.childName}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </label>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Wiek dziecka:
          <select
            name="childAge"
            value={formData.childAge}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <option value="">Wybierz wiek</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1} {i === 0 ? 'rok' : i < 4 ? 'lata' : 'lat'}
              </option>
            ))}
          </select>
        </label>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Temat bajki:
          <select
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            {themeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Zainteresowania dziecka:
          <textarea
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            rows="3"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            placeholder="Np. dinozaury, rysowanie, piłka nożna..."
          />
        </label>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        style={{
          backgroundColor: '#22c55e',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.7 : 1,
          width: '100%'
        }}
      >
        {isLoading ? 'Generowanie...' : 'Wygeneruj bajkę'}
      </button>
    </form>
  );
}
