import Head from 'next/head';
import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { CSpin, CTable } from '../../components';
import { NotificationWarning } from '../../utils/constants';
import router from 'next/router';
import { InfoScreenLayout } from '../../layout';

const TabelasMonitoramento = () => {
	const [loading, setLoading] = useState(true);
	const [columns, setColumns] = useState<any[]>([]);
	const [data, setData] = useState<any[]>([]);
	const [lineToDelete, setLineToDelete] = useState<any>();
  const [current, setCurrent] = useState('1');

	useEffect(() => {
		const obterDados = async () => {
			setLoading(true);
			try {
				await getTable();
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

		obterDados();
	}, [current]);

	const getDateCPU = async () => {
		const columnsCPU = [		
			{
				title: "CPU",
				children :
				[
					{
						title: "ID",
						dataIndex: "key",
						key: "id",
					},
					{
						title: "Dado",
						dataIndex: "dado",
						key: "dado",
					},
				]
			}
		];
		setColumns(columnsCPU);
		const dataCPU = [
			{
				key: 1,
				dado: "10",
			},
			{
				key: 2,
				dado: "20",
			},
			{
				key: 3,
				dado: "30",
			},
		];
		setData(dataCPU);
	};

	const getDateMemory = async () => {
		const columnsMemoria = [		
			{
				title: "Memória",
				children :
				[
					{
						title: "ID",
						dataIndex: "key",
						key: "id",
					},
					{
						title: "Dado",
						dataIndex: "dado",
						key: "dado",
					},
				]
			}
		];
		setColumns(columnsMemoria);
		const dataMemoria = [
			{
				key: 1,
				dado: "10",
			},
			{
				key: 2,
				dado: "20",
			},
			{
				key: 3,
				dado: "30",
			},
		];
		setData(dataMemoria);
	};

	const getDateTemperature = async () => {
		const columnsTemperatura = [		
			{
				title: "Temperatura",
				children :
				[
					{
						title: "ID",
						dataIndex: "key",
						key: "id",
					},
					{
						title: "Dado",
						dataIndex: "dado",
						key: "dado",
					},
				]
			}
		];
		setColumns(columnsTemperatura);
		const dataTemperatura = [
			{
				key: 1,
				dado: "10",
			},
			{
				key: 2,
				dado: "20",
			},
			{
				key: 3,
				dado: "30",
			},
		];
		setData(dataTemperatura);
	};

	const getDatePressure = async () => {
		const columnsPressao = [		
			{
				title: "Pressão",
				children :
				[
					{
						title: "ID",
						dataIndex: "key",
						key: "id",
					},
					{
						title: "Dado",
						dataIndex: "dado",
						key: "dado",
					},
				]
			}
		];
		setColumns(columnsPressao);
		const dataPressao = [
			{
				key: 1,
				dado: "10",
			},
			{
				key: 2,
				dado: "20",
			},
			{
				key: 3,
				dado: "30",
			},
		];
		setData(dataPressao);
	};

	const getDateLocalization = async () => {
		const columnsLocalizacao = [		
			{
				title: "Localização",
				children :
				[
					{
						title: "ID",
						dataIndex: "key",
						key: "id",
					},
					{
						title: "Dado",
						dataIndex: "dado",
						key: "dado",
					},
				]
			}
		];
		setColumns(columnsLocalizacao);
		const dataLocalizacao = [
			{
				key: 1,
				dado: "10",
			},
			{
				key: 2,
				dado: "20",
			},
			{
				key: 3,
				dado: "30",
			},
		];
		setData(dataLocalizacao);
	};

	const getTable = async () => {
		switch (current) {
			case "1":
				getDateCPU();
				break;
			case "2":
				await getDateMemory();
				break;
			case "3":
				await getDateTemperature();
				break;
			case "4":
				await getDatePressure();
				break;
			case "5":
				await getDateLocalization();
				break;
			default:
				getDateCPU();
		}
	};

	const handleLineToDelete = (keys: any) => {
		console.log(keys);
		setLineToDelete(keys);
	};

	return (
		<>
			<Head>
				<title>MonitoringSystem</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content="MonitoringSystem" />
			</Head>
			<InfoScreenLayout setKey={setCurrent} value={current}>
				{loading ? (
					<CSpin />
				) : (
					<>
						<h1 id="1" className="mb-10">
							Tabela de Monitoramento
						</h1>
						<CTable
							columns={columns}
							dataSource={data}
							selected={handleLineToDelete}
							selectionType="radio"
							service={current}
						/>
					</>
				)}
			</InfoScreenLayout>
		</>
	);
};

export interface ColumnsData {
	title: string;
	children: {
			title: string;
			dataIndex: string;
			key: string;
	}[];
}

export default TabelasMonitoramento;