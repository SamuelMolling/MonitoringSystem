import styled from '@emotion/styled';
import { Menu } from 'antd';

const SMenuLateral = styled(Menu)`
	height: 100%;
	color: var(--color-black);
  background: var(--color-secondary);
	&.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
		background-color: var(--color-orange);
	}
	&.ant-menu-inline .ant-menu-item::after {
		border-right: 3px solid var(--color-primary);
	}
	.ant-menu-item-selected, .ant-menu-item:hover {
		color: var(--color-black);
	}
	.ant-menu-item:hover {
		font-weight: bold;
	}
`;

export { SMenuLateral };