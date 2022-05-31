
import { CContainer } from '../';

const CFooter = ({className}: CFooterProps) => {
	return (
		<>
			<footer className={`bg-primary text-white min-h-x105 z-10 ${className}`}>
				<CContainer className="flex w-full min-h-x105">
					<div className="flex justify-between items-center self-center w-full transition-all">
						<div className="flex flex-row items-center transition-all">
							<div className="flex mr-4">
								<div className="flex self-center w-10 min-h-x32 xs:h-14 mr-3">
									<img src={footerItems.logo} alt="logo"/>
								</div>
								<div className="flex justify-center self-center text-xs sm:text-sm xs:whitespace-nowrap">
									{footerItems.copyright}
								</div>
							</div>
						</div>
						<div className="self-center h-12">
							<img src={footerItems.logoMonitoringSystem} alt="logoMonitoringSystem"/>
						</div>
					</div>
				</CContainer>
			</footer>
		</>
	);
};

const footerItems = {
	logo: "/images/MonitoringSystemLogo.svg",
	logoMonitoringSystem: "/images/MonitoringSystemName.svg",
	copyright: `© ${new Date().getFullYear()} | MonitoringSystem`,
}

export default CFooter

export interface CFooterProps {
	className?: string;
}