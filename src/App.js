import './assets/scss/_index.scss';
import $ from 'jquery'; 
import Home from './pages/home/Home';
import { init } from 'emailjs-com';
init("user_inyi2AxkXpMsCQZqCOPfK");
function App() {
  
  return (
      <>
      <Home />

      </>
  );

}

export default App;
