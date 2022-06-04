import styled from '@emotion/styled';
import { Button, ButtonProps } from 'antd';

const CButton = (props: React.PropsWithChildren<ButtonProps>) => {
	return (
		<SButton {...props}>
			{props?.children}
		</SButton>
	);
};

CButton.displayName = "CButton";

const SButton = styled(Button)`
	color: var(--color-white);
	background: var(--color-secondary);
	border: 1px solid var(--color-white);
	font-weight: bold;
	width: 100px;
	&.ant-btn:hover, &.ant-btn:focus, &.ant-btn:active {
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
	}
`;

export default CButton;