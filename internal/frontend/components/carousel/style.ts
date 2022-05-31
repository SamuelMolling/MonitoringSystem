import styled from '@emotion/styled';
import { Carousel } from 'antd';

const SCarousel = styled(Carousel)`
	text-shadow: 2px 1px 4px black;
	&.slick-dots {
		li {
			height: fit-content;
			> button {
				height: 14px;
				width: 14px;
				border-radius: 50%;
				border: 1px solid #fff;
				background: none;
				margin: 0;
			}
			&.slick-active {
				width: 15px;
			}
		}
		&.dots-primary {
			li {
				> button {
					border-color: var(--color-primary);
				}
				&.slick-active button {
					background: var(--color-primary);
				}
			}
		}
	}
`;

export { SCarousel };
