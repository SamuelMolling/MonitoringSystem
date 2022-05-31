const CContainer = ({children, className, top}: CContainerProps) => {
	const handleTop = () => {
		if(top) {
			return (
				<div className={`font-montserrat p-4 xs:p-8 sm:p-12 md:p-8 lg:p-24 xl:p-48 transition-all ${className}`} >
					{children}
				</div>
			)
		}
		else {
			return (
				<div className={`font-montserrat px-4 xs:px-8 sm:px-12 md:px-8 lg:px-24 xl:px-48 transition-all ${className}`} >
					{children}
				</div>
			)
		}
	}
	return (
		<>
			{handleTop()}
		</>
	);
};

export default CContainer;

export interface CContainerProps {
	children: React.ReactNode;
	className?: string;
	top?: boolean;
}

CContainer.defaultProps = {
  top: false
};