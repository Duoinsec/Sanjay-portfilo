import React from 'react';
import './DownloadButton.css';

const DownloadButton = ({ onDownload }) => {
    return (
        <div className="download-container">
            <label className="download-label">
                <input
                    type="checkbox"
                    className="download-input"
                    onChange={(e) => {
                        if (e.target.checked) {
                            onDownload?.();
                            // Automatically uncheck after animation completes (3.5s + some buffer)
                            setTimeout(() => {
                                e.target.checked = false;
                            }, 6000);
                        }
                    }}
                />
                <span className="download-circle">
                    <svg
                        className="download-icon"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 19V5m0 14-4-4m4 4 4-4"
                        ></path>
                    </svg>
                    <div className="download-square"></div>
                </span>
                <p className="download-title">Download</p>
                <p className="download-title">Open</p>
            </label>
        </div>
    );
};

export default DownloadButton;
