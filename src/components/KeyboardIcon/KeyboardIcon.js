import React, { useState } from 'react';
import { FaKeyboard } from 'react-icons/fa';

const KeyboardIcon = (props) => {
    const [showShortcuts, setShowShortcuts] = useState(false);

    const toggleShortcuts = () => {
        setShowShortcuts(!showShortcuts);
    };

    const shortcuts = [
        { key: 'Ctrl + A', action: 'Select all elements' },
        { key: 'Ctrl + F', action: 'Search labels' },
        { key: 'S', action: 'Activate space tool' },
        { key: 'L', action: 'Activate lasso tool' },
        { key: 'H', action: 'Activate hand tool' },
        { key: 'C', action: 'Activate global connect tool' },
        { key: 'E', action: 'Activate direct editing' },
        { key: 'R', action: 'Activate replace element' }
    ];

    return (
        <div className={props.className}>
            <FaKeyboard
                onClick={toggleShortcuts}
                style={{
                    cursor: 'pointer',
                    fontSize: '24px',
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 1
                }}
            />
            {showShortcuts && (
                <div
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        margin: '10px',
                        position: 'absolute',
                        top: '40px',
                        right: '10px',
                        backgroundColor: 'white',
                        zIndex: 1
                    }}
                >
                    <h2>Keyboard Shortcuts</h2>
                    <ul>
                        {shortcuts.map((shortcut, index) => (
                            <li key={index}>
                                <strong>{shortcut.key}</strong>: {shortcut.action}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default KeyboardIcon;