import styled from '@emotion/styled';
import { Spin, SpinProps } from 'antd';

const CSpin = (props: React.PropsWithChildren<SpinProps>) => {
	return (
		<SSpin className="flex items-center justify-center h-screen" {...props}>
			<Spin size="large" spinning />
		</SSpin>
	);
};

export default CSpin;

const SSpin = styled.div`
	.ant-spin-dot-item {
		background-color: var(--color-primary);
	}
`;