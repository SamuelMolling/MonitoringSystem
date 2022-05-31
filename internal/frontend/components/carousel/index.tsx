import { CarouselProps } from 'antd';
import { SCarousel } from './style';

const CCarousel = (props: React.PropsWithChildren<CarouselProps>) => {
	return (
		<SCarousel {...props}>
			{props.children}
		</SCarousel>
	);
};

export default CCarousel;