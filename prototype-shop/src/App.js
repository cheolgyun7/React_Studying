import Header from './components/Header';
import Footer from './components/Footer';
import Orders from './components/Orders';
import Prototypes from './components/Prototypes';
import AppStateProvider from './providers/AppStateProvider';

function App() {
  return (
    <AppStateProvider>
      <header />
      <div className='container'>
        <Prototypes />
        <Orders />
        <Footer />
      </div>
    </AppStateProvider>
  );
}

export default App;
