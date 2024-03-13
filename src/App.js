import { BrowserRouter , Route , Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Board from './Pages/Board';
import Factures from './Pages/Factures';
import Reclamations from './Pages/Reclamations';
import Facture from './Pages/Facture';
import InsererConso from './Pages/InsererConso';
import Admin from './Pages/Admin';
import Clients from './Pages/Clients';
import ModifierClient from './Pages/ModifierClient';
import AjouterClient from './Pages/AjouterClient';
import VoirConsoMen from './Pages/VoirConsoMen';
import VoirConsoAn from './Pages/VoirConsoAn';
import VoirRec from './Pages/VoirRec';
import FactureAdmin from './Pages/FactureAdmin';
import Notification from './Pages/Notification';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path='/board' element={<Board/>}>
              <Route index element={<Factures/>}></Route>
              <Route path='facture' element={<Facture/>}></Route>
              <Route path='reclamations' element={<Reclamations/>}></Route>
              <Route path='insererConsommation' element={<InsererConso/>}></Route>
          </Route>
          <Route path='/admin' element={<Admin/>}>
              <Route index element={<Clients/>}></Route>
              <Route path='ajouterClient' element={<AjouterClient/>}></Route>
              <Route path='reclamations' element={<VoirRec/>}></Route>
              <Route path='mensuelles' element={<VoirConsoMen/>}></Route>
              <Route path='facture' element={<FactureAdmin/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
