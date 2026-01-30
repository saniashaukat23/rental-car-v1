import React from "react";
import Image from "next/image";
import {
  LucideIcon,
  LayoutDashboard,
  Settings,
  HelpCircle,
} from "lucide-react";
// Import the module here
import styles from "../../styles/admin/dashboard.module.css";

import { UserButton, useUser } from "@clerk/nextjs";
interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: (label: string) => void;
}

const SidebarItem = ({
  icon: Icon,
  label,
  active,
  onClick,
}: SidebarItemProps) => (
  <button
    onClick={() => onClick(label)}
    className={`${styles.navItem} ${active ? styles.itemActive : styles.itemInactive
      }`}
  >
    <Icon
      className={`${styles.icon} ${active ? styles.iconActive : styles.iconInactive
        }`}
    />
    {label}
  </button>
);

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const { user } = useUser();
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: LayoutDashboard, label: "Total Cars" },
    { icon: LayoutDashboard, label: "Discounted Cars" },
    { icon: LayoutDashboard, label: "Available Brands" },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <Image
          src="https://res.cloudinary.com/dfck2j3nx/image/upload/v1769349404/Logo_ngjhge.jpg"
          width={140}
          height={80}
          alt="Luxury In Motion Logo"
          className="h-auto w-auto"
        />
      </div>

      <nav style={{ flex: 1 }}>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.label}
            {...item}
            active={activeTab === item.label}
            onClick={setActiveTab}
          />
        ))}

        <div className={styles.divider}>
          <SidebarItem
            icon={Settings}
            label="Add Car"
            active={activeTab === "Add Car"}
            onClick={setActiveTab}
          />
          <SidebarItem
            icon={HelpCircle}
            label="Help Center"
            active={activeTab === "Help Center"}
            onClick={setActiveTab}
          />
        </div>
      </nav>

      <div className={styles.footer}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <UserButton afterSignOutUrl="/" />
          <div>
            <p className={styles.userName}>{user?.fullName}</p>
            <p className={styles.userEmail}>{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
