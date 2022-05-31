import styled from '@emotion/styled';
import { Menu } from 'antd';

const SMenu = styled(Menu)`
	box-shadow: 0px 1px 4px rgb(0 0 0 / 25%);
	border: 0;
	.logo {
		max-width: 406px;
		min-width: 240px;
		width: calc(100vw - 651px);
	}
	.ant-menu-item-selected {
		color: var(--color-primary);
		font-weight: bold;
	}
	&.ant-menu {
		.ant-menu-item {
			padding: 0;
			&:hover .text-item, .ant-menu-item-selected {
				color: white;
				background: var(--color-primary);
				border-radius: 4px;
				&-active,
				&-open,
				&-selected,
				&::before {
					color: var(--color-primary);
					background: transparent;
				}
			}
			&:hover .text-item a {
				color: white;
			}
			&::after {
				transition: none;
			}
			&:active {
				background: transparent;
			}
			&:focus-visible {
				box-shadow: none;
			}
		}
		a {
			color: var(--color-primary);
		}
		.ant-menu-title-content {
			display: flex;
    	align-items: center;
			height: 100%;
			color: var(--color-primary);
			.arrow-icon {
				transition: 0s;
			}
		}
		.ant-menu-item-icon {
			max-height: 20px;
			height: 100%;
			width: 100%;
		}
		.ant-menu-item .anticon {
			height: 20px;
			width: 20px;
		}
		.ant-menu-item-group-list {
			.ant-menu-item {
				line-height: 14px;
				height: auto;
			}
		}
		.group-menu-profile {
			.ant-menu-item-group-title {
				padding: 8px 0 16px;
			}
			.ant-menu-item {
				padding-bottom: 16px;
			}
		}
	}
	&:not(.ant-menu-dark) {
		> .ant-menu-item,
    > .ant-menu-submenu {
			margin: 0;
			&:hover,
			&-active,
			&-open,
			&-selected {
				color: var(--color-primary);
				&::after {
					border: 0;
				}
			}
		}
	}
	&.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected,
	.ant-menu-item:active {
		background-color: white;
	}
	&.ant-menu-light .ant-menu-item-active,
	.ant-menu-item-selected a {
		color: var(--color-primary);
	}
	&.ant-menu-vertical .ant-menu-item {
		margin: 0;
		padding: 0;
		a:hover {
			color: var(--color-primary);
			font-weight: bold;
		}
	}
	&.ant-menu-horizontal > .ant-menu-item {
		top: 0;
	}
	&.ant-menu-vertical > .ant-menu-item {
		height: auto;
		line-height: normal;
		padding-bottom: 12px;
	}
	@media (min-width: 641px) {
		&.ant-menu .ant-menu-item .icon-hamburguer {
			height: 25px;
			width: 25px;
		}
	}
	@media (min-width: 769px) {
		.logo {
			min-width: 0;
		}
		.ant-menu-item-group-list {
			display: flex;
			justify-content: end;
			width: 100%;
		}
		.group-menu-profile .ant-menu-item-group-list {
			flex-direction: column;
		}
	}
`;

export { SMenu };