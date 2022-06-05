import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import { CSpin, CMenu, CFooter, CBanner, CContainer, CButton } from '../../components';
import Head from 'next/head';
import { SiteDataService } from '../../services/site-data-service';
import { NotificationWarning } from '../../utils/constants';
import router from 'next/router';
import { SScreenSize } from '../../components/screen-size/style';

const SobreNos = () => {
	const [loading, setLoading] = useState(true);
	const [info, setInfo] = useState<InfoSobreNosProps>();

	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			try {
				const infoResp = await SiteDataService.obterDadosSobreNos();
				setInfo(infoResp);
			} catch(e) {
				notification.error({
					message: NotificationWarning.MESSAGE,
					description: NotificationWarning.ERROR_GETTING_DATA,
				});
				router.push("/");
			} finally {
				setLoading(false);
			}
		};
		getData();
	}, []);

	return (
		<>
			<Head>
				<title>Credz - Portal do Desenvolvedor</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content="Portal do Desenvolvedor - Sobre Nós" />
			</Head>
			{loading ? (
				<CSpin />
			) : (
				<>
					<CMenu />
					<SScreenSize>
						<CBanner title={info?.title} image="/images/banner-sobre-nos.svg" />
						<CContainer>
							<h3 className="border-b border-secondary w-max">
								{info?.subtitle}
							</h3>
							<div>
								<p>{info?.firstParagraph}</p>
								<p>{info?.secondParagraph}</p>
							</div>
						</CContainer>
					</SScreenSize>
					<CFooter />
				</>
			)}
		</>
	);
};

export interface InfoSobreNosProps {
	title: string;
	subtitle: string;
	firstParagraph: string;
	secondParagraph: string;
	routePortal: string;
}

export default SobreNos;