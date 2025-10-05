import React from 'react';
import PropTypes from 'prop-types';

const Counter = ({ count, onIncrement, onDecrement, onReset }) => {
    // Fixed: Added prop validation
    const handleIncrement = () => {
        onIncrement();
    };

    const handleDecrement = () => {
        onDecrement();
    };

    const handleReset = () => {
        onReset();
    };

    return (
        <div className="counter">
            <h2>Counter</h2>
            <div className="counter-display">
                <span className="count-value">{count}</span>
            </div>
            <div className="counter-controls">
                <button onClick={handleDecrement}>-</button>
                <button onClick={handleReset}>Reset</button>
                <button onClick={handleIncrement}>+</button>
            </div>
            <div className="counter-info">
                <p>Current count: {count}</p>
                <p>Count is {count % 2 === 0 ? 'even' : 'odd'}</p>
                {count > 10 && <p>Count is greater than 10!</p>}
            </div>
        </div>
    );
};

// Fixed: Added prop validation
Counter.propTypes = {
    count: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired
};

export default Counter;
