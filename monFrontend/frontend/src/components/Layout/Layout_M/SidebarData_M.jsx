
import { Columns2, ClipboardList, ClipboardCopy, ClipboardPaste, User, LogOut, PackagePlus, ClipboardPlus, ReceiptText } from "lucide-react";

export const menuItems = [
    { icon: <Columns2 size={20} />, name: "Tableau de bord", path: "/dashboard_M" },
    { icon: <ClipboardList size={20} />, name: "Stock", path: "/stock" },
    { icon: <ClipboardCopy size={20} />, name: "Entrées", path: "/entree" },
    { icon: <ClipboardPaste size={20} />, name: "Sorties", path: "/sortie" },
    { icon: <PackagePlus size={20} />, name: "Fournisseurs", path: "/fournisseurs" },
    { icon: <ReceiptText size={20} />, name: "Historique reçus", path: "/reculist"},
];

export const userOptions = [
    { icon: <User size={20} />, name: "Profile", path: "/profile_M" },
    { icon: <LogOut size={20} />, name: "Se déconnecter", path: "/logout" },
];