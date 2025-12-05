import React, { useState } from 'react';

const KnowledgeInput = () => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    setStatus('Mise à jour...');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${API_URL}/api/knowledge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus(`Succès ! ${data.chunk_count} morceaux indexés.`);
        setText(''); // Clear input on success? Maybe keep it.
      } else {
        setStatus('Erreur lors de la mise à jour.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Erreur réseau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="knowledge-panel glass-panel">
      <h2>Base de Connaissances</h2>
      <p className="subtitle">Collez vos documents ici pour entraîner Rafiq-AI.</p>

      <textarea
        className="knowledge-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Collez le texte ici (FAQ, Règles, Planning...)"
      />

      <div className="actions">
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Indexation...' : 'Mettre à jour'}
        </button>
        {status && <span className="status-msg">{status}</span>}
      </div>
    </div>
  );
};

export default KnowledgeInput;
