import React from 'react';
import { SidebarProvider, SidebarTrigger } from './ui/sidebar';
import AppSidebar from './app-sidebar';

const Layout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
