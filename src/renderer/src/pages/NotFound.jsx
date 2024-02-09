/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404 - Not Found</h1>
            <p className="not-found-text">Oops! The page you are looking for might be in another castle.</p>
            <Link to="/" className="not-found-link">Go to Home</Link>
        </div>
    );
}

export default NotFound;
