import Head from 'next/head';
import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { CSpin, CTable } from '../../components';
import { NotificationWarning } from '../../utils/constants';
import router from 'next/router';
import { InfoScreenLayout } from '../../layout';
import serverService from '../../services/server-service';

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
						title: "IP",
						dataIndex: "ip",
						key: "ip",
					},
					{
						title: "Total",
						dataIndex: "total_cpu",
						key: "total",
					},
					{
						title: "User",
						dataIndex: "user_cpu",
						key: "user",
					},
					{
						title: "System",
						dataIndex: "system_cpu",
						key: "sistem",
					},
					{
						title: "Idle",
						dataIndex: "idle_cpu",
						key: "idle",
					},
					{
						title: "Day",
						dataIndex: "dia",
						key: "day",
					},
				]
			}
		];
		setColumns(columnsCPU);
		const resp = await serverService.getCPU(); 
		setData(resp);
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
						title: "IP",
						dataIndex: "ip",
						key: "ip",
					},
					{
						title: "Total",
						dataIndex: "total_memory",
						key: "total",
					},
					{
						title: "Used",
						dataIndex: "used_memory",
						key: "used",
					},
					{
						title: "Day",
						dataIndex: "dia",
						key: "day",
					},
				]
			}
		];
		setColumns(columnsMemoria);
		const resp = await serverService.getMemory();
		setData(resp);
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
						title: "IP",
						dataIndex: "ip",
						key: "ip",
					},
					{
						title: "Temperature",
						dataIndex: "temperature",
						key: "temperature",
					},
					{
						title: "Day",
						dataIndex: "dia",
						key: "day",
					},
				]
			}
		];
		setColumns(columnsTemperatura);
		const resp = await serverService.getTemperature();
		setData(resp);
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
						title: "IP",
						dataIndex: "ip",
						key: "ip",
					},
					{
						title: "Pressure",
						dataIndex: "pressure",
						key: "pressure",
					},
					{
						title: "Day",
						dataIndex: "dia",
						key: "day",
					},
				]
			}
		];
		setColumns(columnsPressao);
		const resp = await serverService.getPressure();
		setData(resp);
	};

	const getDateLocalization = async () => {
		const columnsLocalizacao = [		
			{
				title: "Localização",
				children :
				[
					{
						title: "IP",
						dataIndex: "ip",
						key: "ip",
					},
					{
						title: "ContryCode",
						dataIndex: "countryCode",
						key: "countryCode",
					},
					{
						title: "RegionCode",
						dataIndex: "regionCode",
						key: "regionCode",
					},
					{
						title: "City",
						dataIndex: "city",
						key: "city",
					},
				]
			}
		];
		setColumns(columnsLocalizacao);
		const resp = await serverService.getLocation();
		setData(resp);
	};

	const getTable = async () => {
		switch (current) {
			case "1":
				await getDateCPU();
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