/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import Dashboard from './Components/Dashboard';
import CONSTANTS_DASHBOARD from './Helpers/Contants';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {CONSTANTS_DASHBOARD.USERS_TXT}
        </p>
      </header>
      <Dashboard />
    </div>
  );
}

export default App;
