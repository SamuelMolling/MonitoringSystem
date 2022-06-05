const CBanner = ({title, subtitle, image}: CBannerProps) => {
	return (
		<div className="flex flex-col justify-center relative text-white h-x200 xs:h-x250 sm:h-x350">
			<div className="z-10 self-center">
				<div className="text-x26 font-bold text-center uppercase h-8 sm:text-x42 sm:h-12 sm:mb-1">
					{title}
				</div>
				<div className="text-xs h-4 sm:text-base sm:h-6">
					{subtitle}
				</div>
			</div>		
			<img src={image} alt={title} className="absolute object-cover w-full" />
		</div>
	);
};

export interface CBannerProps {
	title?: string;
	subtitle?: string;
	image?: string;
}

export default CBanner;