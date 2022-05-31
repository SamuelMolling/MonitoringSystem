import { Menu } from 'antd';
import { SMenu } from './style';
import { IoIosHome, IoIosMenu, IoIosClose } from 'react-icons/io';
import { CContainer } from '..';
import Link from 'next/link';
import React, { useState } from 'react';
import router from 'next/router';

const CMenu = () => {
	const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

	const handleToggleMenuMobile = (e: any) => {
		setMobileMenuVisible(!mobileMenuVisible);
		refresh(e);
	};

	const refresh = (e: any) => {
		location.pathname == e.target.id && router.reload();
	};

	const handleMenu = () => {
		return (
			<SMenu
				mode="horizontal"
				className="items-center justify-between fixed top-0 w-full z-20 px-4 h-16 xs:px-8 sm:h-x85 sm:px-12 md:px-8 lg:px-24 xl:px-48 transition-all"
				data-test="header-menu"
			>
				<Menu.Item key="logo" style={{order: -1}} className="logo h-8 xs:h-auto sm:min-w-">
					<Link href="/" passHref>
						<img src={menuItems.logo} alt="logo"/>
					</Link>
				</Menu.Item>
				<Menu.ItemGroup className="hidden text-base sm:flex sm:justify-end sm:h-8 sm:w-full sm:ml-8">
					<Menu.Item key="inicio" className="h-full">
						<Link href={menuItems.routeFirstItem} passHref>
							<div className="flex items-center px-5" onClick={refresh}>
								<a id={menuItems.routeFirstItem}><IoIosHome /></a>
							</div>
						</Link>
					</Menu.Item>
					<Menu.Item key="tabelas-monitoramento">
						<Link href={menuItems.routeSecondItem} passHref>
							<div className="flex items-center text-item leading-8 h-8 px-5" onClick={refresh}>
								<a id={menuItems.routeSecondItem}>{menuItems.titleSecondItem}</a>
							</div>
						</Link>
					</Menu.Item>
					<Menu.Item key="sobre-nos">
						<Link href={menuItems.routeThirdItem} passHref>
							<div className="flex items-center text-item leading-8 h-8 px-5" onClick={refresh}>
								<a id={menuItems.routeThirdItem}>{menuItems.titleThirdItem}</a>
							</div>
						</Link>
					</Menu.Item>
				</Menu.ItemGroup>
				<Menu.Item
					key="exibir-menu"
					className="sm:!hidden"
					style={{right: 0, opacity: 1, position: "static", height: "auto", pointerEvents: "auto"}}
				>
					<IoIosMenu className="icon-hamburguer h-full w-6 cursor-pointer" onClick={handleToggleMenuMobile} data-test="exibir-menu" />
				</Menu.Item>
			</SMenu>
		)
	}

	const handleMenuItemsMobile = () => {
		return (
			<SMenu>
				<Menu.Item key="inicio">
					<Link href={menuItems.routeFirstItem} passHref>
						<div className="w-full" onClick={handleToggleMenuMobile}>
							<a id={menuItems.routeFirstItem} className="h-11 leading-10 w-full">
								{menuItems.titleFirstItem}
							</a>
						</div>
					</Link>
				</Menu.Item>
				<Menu.Item key="tabelas-monitoramento">
					<Link href={menuItems.routeSecondItem} passHref>
						<div className="w-full" onClick={handleToggleMenuMobile}>
							<a id={menuItems.routeSecondItem} className="h-11 leading-10 w-full">
								{menuItems.titleSecondItem}
							</a>
						</div>
					</Link>
				</Menu.Item>
				<Menu.Item key="sobre-nos" data-test="redirecionar-lnk-casos-de-usos">
					<Link href={menuItems.routeThirdItem} passHref>
						<div className="w-full" onClick={handleToggleMenuMobile}>
							<a id={menuItems.routeThirdItem} className="h-11 leading-10 w-full">
								{menuItems.titleThirdItem}
							</a>
						</div>
					</Link>
				</Menu.Item>
			</SMenu>
		)
	}

	const handleMenuMobile = () => {
		return (
			<div
				className={`fixed top-0 z-30 bg-white ${mobileMenuVisible ? "left-0 h-full w-4/5 max-w-sm" : "-left-96 sm:hidden"}`}
				style={{transition:"1s"}}
				data-test="header-menu-mobile"
			>
				<CContainer className="flex flex-col items-baseline h-screen w-full transition-none" top>
					<div className="flex flex-col justify-start bg-white h-screen w-full">
						<div className="flex flex-col w-full">
							<div className="flex justify-end h-5 w-full">
								<IoIosClose className={"flex justify-end h-full w-5 cursor-pointer"} onClick={handleToggleMenuMobile} />
							</div>
							<div className="flex h-full mt-3 mb-9">
								<div className="self-center h-4 xs:h-5 md:h-8">
									<img src={menuItems.logo} alt="logo"/>
								</div>
							</div>
						</div>
						<div className="h-full overflow-y-auto mb-14">
							{handleMenuItemsMobile()}
						</div>
					</div>
				</CContainer>
			</div>
		)
	}

	return (
			<>
			  <div className="min-h-x65 sm:min-h-x85 transition-all"></div>
				{handleMenu()}
				{handleMenuMobile()}
			</>
	);
};

const menuItems = {
	logo: "/images/MonitoringSystem.svg",
	titleFirstItem: "Início",
	routeFirstItem: "/",
	titleSecondItem: "Tabelas de Monitoramento",
	routeSecondItem: "/tabelas-monitoramento",
	titleThirdItem: "Sobre Nós",
	routeThirdItem: "/sobre-nos",
}

export default CMenu;