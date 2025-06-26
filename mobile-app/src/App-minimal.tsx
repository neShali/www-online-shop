import React from 'react';

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Minimal Test App</h1>
      <p>If you see this, React is working</p>
      <button onClick={() => alert('Button works!')}>Test Button</button>
    </div>
  );
};

export default App;