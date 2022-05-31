import React from 'react';
import {
  DesktopOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { MdOutlineMemory, MdLocationOn } from 'react-icons/md';
import { FaTemperatureLow } from 'react-icons/fa';
import { BsArrowsCollapse } from 'react-icons/bs';
import { SMenuLateral } from './style';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const items: MenuItem[] = [
  getItem('CPU', '1', <DesktopOutlined />),
  getItem('Memória', '2', <MdOutlineMemory />),
  getItem('Temperatura', '3', <FaTemperatureLow />),
  getItem('Pressão', '4', <BsArrowsCollapse />),
  getItem('Localização', '5', <MdLocationOn />),
];

const CMenuLateral = ({setCurrent, current}: any) => {

  const handleClick = (e: any) => {
    setCurrent(e.key);
  }

  return (
    <div style={{ width: 256, height: '100%' }}>
      <SMenuLateral
        defaultSelectedKeys={[current]}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={items}
        onClick={handleClick}
      />
    </div>
  );
};

export default CMenuLateral;