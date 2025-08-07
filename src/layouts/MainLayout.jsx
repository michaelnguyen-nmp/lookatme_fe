import React from "react";
import SidebarLayout from "../components/SidebarLayout/SidebarLayout";
import RightbarLayout from "../components/RightbarLayout/RightbarLayout";

import styles from "./MainLayout.module.scss";

const MainLayout = ({ children, mainHeader }) => {
  return (
    <div className={styles.container}>
      <SidebarLayout />
      <main className={styles.main}>
        <header className={styles.mainHeader}>{mainHeader}</header>
        {children}
      </main>
      <RightbarLayout />
    </div>
  );
};

export default MainLayout;
