import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';

function History() {
    const { transactionHistory } = useGlobalContext();
    
    const [showAll, setShowAll] = useState(false);
    
    // Get the full transaction history
    const history = transactionHistory();

    // Toggle function for showing full history
    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    // Use all history if showAll is true; otherwise, show the last 3
    const limitedHistory = showAll ? history : history.slice(0, 3);

    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            {/* Render the history only once based on showAll */}
            <div className={showAll ? "history-container" : ""}>
                {limitedHistory.length > 0 ? (
                    limitedHistory.map((item) => {
                        const { _id, title, amount, type } = item;
                        return (
                            <div key={_id} className="history-item">
                                <p style={{
                                    color: type === 'expense' ? 'red' : 'var(--color-green)'
                                }}>
                                    {title}
                                </p>
                                <p style={{
                                    color: type === 'expense' ? 'red' : 'var(--color-green)'
                                }}>
                                    {type === 'expense' ? `-${amount}` : `+${amount}`}
                                </p>
                            </div>
                        );
                    })
                ) : (
                    <p>No transaction history available.</p>
                )}
            </div>

            {/* Button to toggle between "See All" and "Show Less" */}
            {history.length > 3 && (
                <button className="toggle-button" onClick={toggleShowAll}>
                    {showAll ? 'Show Less' : 'See All'}
                </button>
            )}
        </HistoryStyled>
    );
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
        margin-bottom: 1rem;
    }

    .history-container {
        max-height: 300px; /* Set a height for the scrollable area */
        overflow-y: auto; /* Enables vertical scrolling */
        border: 1px solid #ddd; /* Optional: Adds a border around the scrollable area */
        border-radius: 10px; /* Optional: Rounds the corners */
        padding: 1rem; /* Optional: Adds padding inside the scrollable area */
        scrollbar-width: thin; /* For Firefox */
        scrollbar-color: #888 #f1f1f1; /* For Firefox */
    }

    /* Custom styles for webkit browsers (Chrome, Safari) */
    .history-container::-webkit-scrollbar {
        width: 8px; /* Width of the scrollbar */
    }

    .history-container::-webkit-scrollbar-thumb {
        background-color: #888; /* Color of the scrollbar */
        border-radius: 10px; /* Round edges of the scrollbar */
    }

    .history-container::-webkit-scrollbar-track {
        background: #f1f1f1; /* Background color of the scrollbar track */
    }

    .history-item {
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .toggle-button {
        padding: 0.5rem 1rem;
        background-color: var(--color-green);
        border: none;
        color: white;
        border-radius: 10px;
        cursor: pointer;
        align-self: center;
        margin-top: 1rem;
        transition: background-color 0.3s ease;
    }

    .toggle-button:hover {
        background-color: #2a9d8f;
    }
`;

export default History;
