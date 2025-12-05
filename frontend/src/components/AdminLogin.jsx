import React, { useState } from 'react';

const AdminLogin = ({ onLogin, onClose }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple client-side check for prototype
        if (password === 'admin123') {
            onLogin();
            onClose();
        } else {
            setError('Incorrect password');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass-panel">
                <h2>Admin Login</h2>
                <p className="subtitle">Enter password to access Knowledge Base</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="login-input"
                        autoFocus
                    />
                    {error && <p className="error-msg">{error}</p>}

                    <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
