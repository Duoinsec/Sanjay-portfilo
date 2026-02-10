import { useEffect } from 'react';

const CopyProtection = () => {
    useEffect(() => {
        // Disable right-click context menu
        const handleContextMenu = (e) => {
            e.preventDefault();
            return false;
        };

        // Disable copy
        const handleCopy = (e) => {
            // Allow copying from input and textarea elements
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return true;
            }
            e.preventDefault();
            return false;
        };

        // Disable cut
        const handleCut = (e) => {
            // Allow cutting from input and textarea elements
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return true;
            }
            e.preventDefault();
            return false;
        };

        // Disable keyboard shortcuts (Ctrl+C, Ctrl+X, Ctrl+U)
        const handleKeyDown = (e) => {
            // Allow shortcuts in input and textarea elements
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return true;
            }

            if (
                (e.ctrlKey && (e.key === 'c' || e.key === 'C')) || // Copy
                (e.ctrlKey && (e.key === 'x' || e.key === 'X')) || // Cut
                (e.ctrlKey && (e.key === 'u' || e.key === 'U')) || // View Source
                (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) || // Inspect
                (e.ctrlKey && e.shiftKey && (e.key === 'j' || e.key === 'J')) || // Console
                (e.key === 'F12') // DevTools
            ) {
                e.preventDefault();
                return false;
            }
        };

        // Add event listeners
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('copy', handleCopy);
        document.addEventListener('cut', handleCut);
        document.addEventListener('keydown', handleKeyDown);

        // Add CSS to prevent text selection (but allow in inputs)
        const style = document.createElement('style');
        style.id = 'copy-protection-styles';
        style.innerHTML = `
            body, body * {
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
            input, textarea, [contenteditable="true"] {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
            }
        `;
        document.head.appendChild(style);

        // Cleanup function
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('copy', handleCopy);
            document.removeEventListener('cut', handleCut);
            document.removeEventListener('keydown', handleKeyDown);
            const existingStyle = document.getElementById('copy-protection-styles');
            if (existingStyle) {
                document.head.removeChild(existingStyle);
            }
        };
    }, []);

    return null; // This component doesn't render anything
};

export default CopyProtection;
