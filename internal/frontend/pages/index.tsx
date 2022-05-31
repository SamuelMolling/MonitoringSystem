import Head from 'next/head';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { notification, Spin } from 'antd';
import { CCarousel, CMenu, CFooter, CSpin } from '../components';
import { SiteDataService } from '../services/site-data-service';
import { NotificationWarning } from '../utils/constants';
import { SScreenSize } from '../components/screen-size/style';
import router from 'next/router';

const Home = () => {
	const [loading, setLoading] = useState(true);
	const [info, setInfo] = useState<InicialProps>()

	useEffect(() => {
		const obterDados = async () => {
			let erro;
			setLoading(true);
			try {
				const infoResp = await SiteDataService.obterDadosIniciais();
				setInfo(infoResp);
			} catch(e) {
				notification.error({
					message: NotificationWarning.MESSAGE,
					description: NotificationWarning.ERROR_GETTING_DATA,
				});
				erro = e;
				router.push("/");
			} finally {
				if (!erro) {
					setLoading(false);
				}
			}
		};
		obterDados();
	}, []);

	const SampleArrow = (props: any) => {
		const { className, style, onClick } = props
		return (
			<div
				className={className}
				style={{ ...style, display: 'block' }}
				onClick={onClick}
			/>
		)
	}

	const settings = {
		nextArrow: <SampleArrow />,
		prevArrow: <SampleArrow />
	}

	return (
		<>
			<Head>
				<title>MonitoringSystem</title>
				<link rel="icon" href="/favicon.svg" />
				<meta name="description" content="MonitoringSystem" />
			</Head>
			{loading ? (
				<CSpin />
			) : (
				<>
					<CMenu />
					<SScreenSize>
						<SCarouselContainer>
							<Spin spinning={info!.carrossel.length == 0} />
							<CCarousel
								autoplay
								autoplaySpeed={5000}
								arrows
								draggable={true}
								{...settings}
							>
								{info?.carrossel.map(
									(banner, index) =>
									!!banner.routeImage && (
										<div className="relative transition-all" data-test="banners" key={index}>
											<img src={banner.routeImage} alt={banner.tituloImagem} />
											<div className="flex absolute top-0 h-full w-full font-montserrat px-9 xs:px-24 md:px-36 lg:px-44 xl:px-52 transition-all">
												<div className="flex flex-col justify-center w-2/3 xs:w-1/2">
													<div className="font-bold sm:text-x24 md:text-x36 transition-all">{banner.titulo}</div>
													<div className="text-xs sm:text-sm md:text-base xl:text-xl transition-all">{banner.subtitulo}</div>
												</div>
											</div>
										</div>
									),
								)}
							</CCarousel>
						</SCarouselContainer>
					</SScreenSize>
					<CFooter />
				</>
			)}
		</>
	);
};

export default Home;

export interface InicialProps {
	carrossel: CarrosselProps[],
}

export interface CarrosselProps {
	routeImage: string,
	tituloImagem: string,
	titulo: string,
	subtitulo: string,
}		

const SCarouselContainer = styled.div`
	height: 80vh;
	.ant-spin {
		position: relative;
		top: 60px;
		left: calc(50% - 10px);
	}
	.ant-carousel {
		.slick-slide img {
			height: 82vh;
			width: 100%;
			object-fit: cover;
			display: inline-block;
		}
		.slick-next {
			background-image: url("/images/icons/down.png");
			background-position: center;
    		background-repeat: no-repeat;
			background-size: contain;
			height: 10px;
			right: 12px;
		}
		.slick-prev {
			background-image: url("/images/icons/down.png");
			background-position: center;
    		background-repeat: no-repeat;
			background-size: contain;
			transform: rotateY(180deg);
			height: 10px;
			width: 16px;
			z-index: 1;
			left: 12px;
		}
		.slick-dots-bottom {
			bottom: 16px;
		}
	}
	@media (min-width: 641px) {
		height: 80vh;
		.ant-carousel {
			.slick-slide img {
				height: 82vh;
			}
			.slick-next {
				height: 18px;
				width: 29px;
				right: 48px;
			}
			.slick-prev {
				height: 18px;
				width: 29px;
				left: 48px;
			}
		}
	}
	@media (min-width: 769px) {
		height: 79vh;
		.ant-carousel {
			.slick-slide img {
				height: 80vh;
			}
			.slick-next {
				right: 32px;
			}
			.slick-prev {
				left: 32px;
			}
		}
	}
	@media (min-width: 1024px) {
		.ant-spin {
			top: 190px;
		}
		.ant-carousel {
			.slick-next {
				right: 69px;
			}
			.slick-prev {
				left: 69px;
			}
		}
	}
	@media (min-width: 1536px) {
		.ant-carousel {
			.slick-next {
				right: 100px;
			}
			.slick-prev {
				left: 100px;
			}
		}
	}
`;