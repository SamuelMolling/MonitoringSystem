import { CMenu, CMenuLateral, CFooter, CContainerText } from '../../components';
import React from 'react';
import styled from '@emotion/styled';

const InfoScreenLayout = ({ children, setKey, value }: InfoScreenLayoutProps) => {

	return (
		<SInfoScreenLayout>
			<div className="container-screen" data-test="container-tela">
				<CMenu />
				<div className="container-info">
					<div className="position-menu-mobile" />
					<div className="container-menu" data-test="container-menu-mobile">
						<CMenuLateral setCurrent={setKey} current={value} />
					</div>
					<div className="container-text-info">
						<div className="min-w-x284 sm:mt-4">
							<CContainerText>
								{children}
							</CContainerText>
							<CFooter className="block sm:hidden" />
						</div>
					</div>
				</div>
				<CFooter className="sm:block" />
			</div>
		</SInfoScreenLayout>
	);
};

export interface InfoScreenLayoutProps {
  children: React.PropsWithChildren<any>;
	setKey: any;
	value: string;
}

export default InfoScreenLayout;

const SInfoScreenLayout = styled.div`
	.container-screen {
		min-height: 0;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		.container-info {
			display: flex;
			flex-direction: column;
			height: 100%;
			width: 100%;
			min-height: 0;
			.container-text-info {
				width: 100%;
			}
			.position-menu-mobile {
				height: 112px;
			}
			.container-menu {
				display: flex;
				flex-direction: column;
				width: 100%;
				position: fixed;
				z-index: 10;
				background: var(--color-white);
			}
		}
	}
	@media (min-width: 769px) {
		.container-screen {
			height: 100vh;
			.container-info {
				position: static;
				flex-direction: row;
				width: auto;
				height: inherit;
				.position-menu-mobile {
					display: none;
				}
				.container-menu {
					position: static;
					display: block;
					height: auto;
					width: auto;
				}
				.container-text-info {
					overflow-y: auto;
				}
			}
		}
	}
`;