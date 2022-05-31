import styled from "@emotion/styled";

const CContainerText = ({ children }: CContainerProps) => {
	return (
		<SContainerText className="font-raleway px-4 xs:px-12 sm:px-6 sm:pt-3 md:px-12 lg:px-24 xl:px-36 transition-all">
			{children}
		</SContainerText>
	);
};

export default CContainerText;

export interface CContainerProps {
	children: React.ReactNode;
}

const SContainerText = styled.div`
	min-height: calc(100vh - 244px);
	@media (min-width: 641px) {
		min-height: calc(100vh - 263px);
	}
`;