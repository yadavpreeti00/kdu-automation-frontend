import './App.scss';
import Footer from './component/footer/Footer';
import { Header } from './component/header/Header';
import RoutesTable from './routes/routes';

function App() {
  return (
    <div className='App'>
      <Header />
      <main className="container">
        <RoutesTable />
      </main>
      <Footer />
    </div>
  );
}

export default App;
