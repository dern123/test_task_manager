import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Head from './components/Head/Head';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <Head/>
      <AppRoutes/>
    </>
  );
}

export default App;
