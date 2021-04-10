import logo from './logo.svg';
import './assets/scss/_index.scss';
import Home from './pages/home/Home';
import { usePersistedState } from './utils/helpers';

function App() {

  const [user, setUser] = usePersistedState('user', []);
  
  return (
      <>
      <Home />

      </>
  );

}

export default App;
