import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined, 
} from '@ant-design/icons';
import { Outlet } from "react-router-dom";
import { Button, Layout,theme  } from 'antd';
import BaseNavLink from "../components/Nav/BaseNavLink";

const { Sider, Content,Header } = Layout;
const LayoutRoot: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
   
  return (
    <Layout className="h-screen w-screen">
      {/* Sider */}
      <Sider 
        width={150} 
        className="bg-[#1d4ed8] border-r-2 border-[#27272a]"
        theme="dark"
        collapsed={collapsed}
      >
        <div className="text-white flex flex-col h-full">
          {/* Logo/Title */}
          <div className="p-6 border-b border-[#27272a]">
            <span className="font-bold text-xl text-white">My App</span>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              <BaseNavLink 
                to="/" 
                end
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors text-white"
              >
                Home
              </BaseNavLink>
              <BaseNavLink 
                to="/about"
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors text-white"
              >
                About
              </BaseNavLink>
              <BaseNavLink 
                to="/contact"
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors text-white"
              >
                Contact
              </BaseNavLink>
            </div>
          </nav>
          
          {/* User Info */}
          <div className="p-4 border-t border-[#27272a]">
            <span className="text-sm text-white">Welcome, User!</span>
          </div>
        </div>
      </Sider>
     <Layout >
        <Header >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ 
              color: 'white',
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content className="bg-[#4F4557] overflow-auto">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutRoot;
