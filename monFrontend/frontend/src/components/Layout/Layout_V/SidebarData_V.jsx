import { Columns2, FileClock, User, LogOut } from "lucide-react";
export const menuItems = [
    { icon: <Columns2 size={20} />, name: "Tableau de bord", path: "/dashboard" },
    {
      icon: <FileClock size={20} />,
      name: "Historique",
      subItems: [
        {
          
          name: "Historique des lots",
          path: "/H_lot",
        },
        {
          
          name: "Historique des montants remis",
          path: "/H_montant",
        },
      ],
    },
  ];

export const userOptions = [
    { icon: <User size={20} />, name: "Profile", path: "/profile_V" },
    { icon: <LogOut size={20} />, name: "Logout", path: "/logout" },
  ];