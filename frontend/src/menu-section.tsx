import { UserRole } from "./types/use-role";
import { FaUserAlt } from "react-icons/fa";
import { HiScissors } from "react-icons/hi2";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { TbMoneybag } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";

export interface MenuItem {
    label: string;
    icon: JSX.Element;
    to: string;
    role?: UserRole[];
}

export interface MenuLabel {
    label: string;
    role?: UserRole[];
}

export interface MenuSection {
    label: MenuLabel[];
    items: MenuItem[];
}


export const menuSection: MenuSection[] = [ 
    {
        label: [
            {
                label: 'Administración',
                role: [UserRole.ADMIN]
            }
        ],
        items: [
            
            {
                label: "Home ",
                icon: <IoMdHome />,
                to: "/home"
            },
            {
                label: "Usuarios",
                icon: <FaUserAlt />, 
                to: "/dashboard/users",
                role: [UserRole.ADMIN]
            },
            {
                label: "Barberos",
                icon: <HiScissors />, 
                to: "/dashboard/barberos",
                role: [UserRole.ADMIN]
            }
        ]
    },
    {
        label: [
            {
                label: 'Planificación',
                role: [UserRole.ADMIN]
            }
        ],
        items: [ 
            {
                label: "Turnos",
                icon: <IoCalendarNumberOutline />, 
                to: "/dashboard/turnos",
                role: [UserRole.ADMIN]
            },
            {
                label: "Ganancias",
                icon: <TbMoneybag />, 
                to: "/dashboard/ganancias",
                role: [UserRole.ADMIN]
            }
        ]
    }
];