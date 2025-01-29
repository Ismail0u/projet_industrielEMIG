/*import DashboardContent from './components/Layout/DashboardContent';
import DataTable from './components/Layout/DataTable';
import FilterBar from './components/Layout/DataTable';
import Filter from './components/Layout/DataTable'; */
import FournisseurForm from './components/Fournisseur/FournisseurForm';
import FournisseurList from './components/Fournisseur/FournisseurList';
import MouvementStockForm from './components/MouvementStock/MouvementStockForm';
import MouvementStockList from './components/MouvementStock/MouvementStockList';
import RapportForm from './components/Rapport/RapportForm';
import RapportList from './components/Rapport/RapportList';
import RecuList from './components/Recu/RecuList';
import StockForm from './components/Stock/StockForm';
import TypeRapportList from './components/TypeRapport/TypeRapportList';
import './index.css';
/*import Login from "./pages/Login"; 
import Dashboard from './pages/pages_vendeur/Dashboard';
import Historique from './pages/pages_vendeur/Historique';
import MyPage from './pages/pages_vendeur/Historique'; */
import ProduitList from './pages/produitList';

const App = () => {
  return (
    <div>
      <ProduitList/>
      <TypeRapportList />
      <RapportForm />
      <RapportList />
      <RecuList />
      <MouvementStockForm />
      <MouvementStockList />
      <hr />
      <StockForm />
      <h1>NOuveau</h1>
      <FournisseurList />
    </div>
    
  );
};

export default App;
