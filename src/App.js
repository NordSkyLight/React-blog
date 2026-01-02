import "./App.css";
import { Header } from './components/Header/Header';
import { Blog } from './components/Blog/Blog';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <div className="App">

      <Header />

      <main>
        <Blog />
      </main>

      <Footer year={new Date().getFullYear()} />
      
    </div>
  );
}

export default App;
