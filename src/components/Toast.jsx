import React, { useEffect, useState } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onClose) setTimeout(onClose, 300); // Wait for fade-out animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    return (
        <div className={`toast-container ${type}`}>
            <div className="toast-content">
                <span className="toast-icon">
                    {type === 'success' ? '✓' : 'ℹ'}
                </span>
                <span className="toast-message">{message}</span>
            </div>
            <div className="toast-progress" style={{ animationDuration: `${duration}ms` }} />
        </div>
    );
};

export default Toast;
