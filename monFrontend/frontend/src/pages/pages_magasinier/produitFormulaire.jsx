import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import { menuItems, userOptions } from "../../components/Layout/Layout_M/SidebarData_M";
import ProduitForm from "../../components/Produit/ProduitForm";

const handleProduitAjoute = () => {
  alert("Produit ajouté avec succès !");
  // Ici, tu peux recharger la liste des produits après ajout
};

const ProduitFormulaire = () => {
  return (
    <div className="h-screen flex w-full overflow-hidden">
      {/* Barre latérale */}
      <Sidebar title="My Dashboard" menuItems={menuItems} userOptions={userOptions} />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col h-screen">
        <Header h_title="Ajout de Produit" h_role="Magasinier" h_user="Soumana" />

        <div className="flex-1 overflow-hidden p-1">
          <div className="container mx-auto p-4">
            <ProduitForm onProduitAjoute={handleProduitAjoute} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProduitFormulaire;
