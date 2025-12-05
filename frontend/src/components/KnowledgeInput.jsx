import React, { useState } from 'react';

const KnowledgeInput = () => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    setStatus('Updating...');

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
        setStatus(`Success! ${data.chunk_count} chunks indexed.`);
        setText(''); // Clear input on success? Maybe keep it.
      } else {
        setStatus('Error updating knowledge base.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Network error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="knowledge-panel glass-panel">
      <h2>Knowledge Base</h2>
      <p className="subtitle">Paste your documents here to train Rafiq-AI.</p>

      <textarea
        className="knowledge-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste text here (FAQ, Rules, Schedule...)"
      />

      <div className="actions">
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Indexing...' : 'Update Knowledge'}
        </button>
        {status && <span className="status-msg">{status}</span>}
      </div>
    </div>
  );
};

export default KnowledgeInput;
