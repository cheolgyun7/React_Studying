import Header from './components/Header';
import Footer from './components/Footer';
import Orders from './components/Orders';
import Prototypes from './components/Prototypes';

function App() {
  return (
    <>
      <header />
      <div className='container'>
        <Prototypes />
        <Orders />
        <Footer />
      </div>
    </>
  );
}

export default App;
