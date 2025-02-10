
import { Columns2, ClipboardList, ClipboardCopy, ClipboardPaste, User, LogOut, PackagePlus } from "lucide-react";

export const menuItems = [
    { icon: <Columns2 size={20} />, name: "Tableau de bord", path: "/dashboard_R" },
    { icon: <ClipboardList size={20} />, name: "Réservations", path: "/reservation" },
    { icon: <ClipboardCopy size={20} />, name: "Liste des etudiants", path: "/listeEtudiant" },
  
];

export const userOptions = [
    { icon: <User size={20} />, name: "Profile", path: "/profile_R" },
    { icon: <LogOut size={20} />, name: "Se déconnecter", path: "/logout" },
];