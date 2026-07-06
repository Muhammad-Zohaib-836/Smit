import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import {
  DashboardOutlined,
  FileTextOutlined,
  HomeOutlined,
  LeftOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  RightOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import Home from '../../Pages/Dashboard/Home';

const { Header, Content, Footer, Sider } = Layout;

// Helper function component ke bahar reh sakti hai kyunki ye hook nahi hai
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation(); // current URL track karne ke liye

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const items = [
    getItem(<Link to="/dashboard" className='text-decoration-none'>Dashboard </Link>, '1', <DashboardOutlined className='fs-5' />),
    getItem(<Link to="/dashboard/progress" className='text-decoration-none'>Progress </Link>, 'sub1', <i className="fa-solid fa-book-open fs-5"></i>),
    getItem(<Link to="/dashboard/attendence" className='text-decoration-none'>Attendance </Link>, 'sub2', <i className="fa-regular fa-calendar-check fs-5"></i>),
    getItem(<Link to="/dashboard/payment" className='text-decoration-none'>Payment </Link>, 'sub3', <i className="fa-solid fa-wallet fs-5"></i>),
    getItem(<Link to="/dashboard/assignments" className='text-decoration-none'>Assignments </Link>, 'sub4', <FileTextOutlined className='fs-5' />),
    getItem(<Link to="/dashboard/quiz" className='text-decoration-none'>Quizzes </Link>, 'sub5', <i className="fa-solid fa-clipboard-check fs-5"></i>),

    // getItem(
    //   <span style={{ display: 'flex', width: '100%', gap:"10px",}}>
    //     Logout
    //   </span>,
    //   '10',
    //   <LogoutOutlined />
    // ),
  ];

  // URL path → Menu key mapping, taake refresh/route change pe sahi item highlight ho
  const pathToKey = {
    '/dashboard': '1',
    '/dashboard/progress': 'sub1',
    '/dashboard/attendence': 'sub2',
    '/dashboard/payment': 'sub3',
    '/dashboard/assignments': 'sub4',
    '/dashboard/quiz': 'sub5',
  };

  // Sabse lamba (specific) matching path dhoondo, taake '/dashboard'
  // '/dashboard/progress' jese nested paths ke saath galti se match na ho
  const matchedPath = Object.keys(pathToKey)
    .filter(
      (path) =>
        location.pathname === path || location.pathname.startsWith(path + '/')
    )
    .sort((a, b) => b.length - a.length)[0];

  const currentKey = matchedPath ? pathToKey[matchedPath] : '1';

  const currentYear = new Date().getFullYear();
  const user = JSON.parse(localStorage.getItem("user"))

  // Custom trigger button — top pe show hoga "React Todos" ke saath
  const customTrigger = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-evenly',
        marginBottom: '50px',
        padding: '0px 16px',
        paddingTop: '18px',
        paddingBottom: '18px',
        height: '48px',
        cursor: 'pointer',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      }}
      onClick={() => setCollapsed(!collapsed)}
    >
      {/* Title — collapsed mein hide ho jayega */}
      {!collapsed && (
        <img src={logo} alt="Logo" style={{ height: '65px', padding: '10px 0' }} className="text-center" />
      )}

      {/* Toggle Icon */}
      <div style={{ color: '#fff', fontSize: '16px' }}>
        {collapsed ? <RightOutlined /> : <LeftOutlined />}
      </div>
    </div>
  );

  <Breadcrumb
    items={[
      {
        href: '',
        title: <HomeOutlined />,
      },
      {
        href: '',
        title: (
          <>
            <UserOutlined />
            <span>Application List</span>
          </>
        ),
      },
      {
        title: 'Application',
      },
    ]}
  />

  return (
    <>
    
      <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row', background: '#000000' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={value => setCollapsed(value)}
          style={{ background: '#000000' }}
        >
          <div className="demo-logo-vertical" />

          {/* 🔥 Custom Trigger — Top pe "React Todos" ke saath */}
          {customTrigger}

          <Menu
            theme="dark"
            selectedKeys={[currentKey]}
            mode="inline"
            items={items}
            style={{ background: '#000000' }}
          />
        </Sider>

        <Layout style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', background: '#000000' }}>
          <Header style={{ padding: 0, background: '#000000' }}>
            {/* <h5 style={{display:"flex",alignItems:"center",justifyContent:"end",padding:"10px"}}>{user.email}</h5> */}
            <Breadcrumb style={{ margin: '16px 0' ,color: '#fff'}} />
          </Header>
          <Content style={{ margin: '0 16px', display: 'flex', flexDirection: 'column', background: '#000000' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: '#000000',
                borderRadius: borderRadiusLG,
              }}
            >
              <Home />
              {/* Yahan tumhara component dynamic load ho raha hai */}
            </div>
          </Content>

        </Layout>
      </Layout>
    </>
  );
};

export default App;