/*import DashboardContent from './components/Layout/DashboardContent';
import DataTable from './components/Layout/DataTable';
import FilterBar from './components/Layout/DataTable';
import Filter from './components/Layout/DataTable'; */
import RapportForm from './components/Rapport/RapportForm';
import RapportList from './components/Rapport/RapportList';
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
    </div>
    
  );
};

export default App;
