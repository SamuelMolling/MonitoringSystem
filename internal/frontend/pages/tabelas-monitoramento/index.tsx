import Head from 'next/head';
import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { CButton, CSpin, CTable } from '../../components';
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
  const [index, setIndex] = useState(0);

	useEffect(() => {
		const obterDados = async () => {
			setLoading(true);
			try {
				await getTable(0, true);
				setIndex(1);
				setLineToDelete("");
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

	const atualizaData = async (result: any, value: number, first?: boolean) => {
		if (result) {
			const resp = result?.map((d: any) => {
				return {
					...d,
					key: d.id
				};
			});
			if (first) {
				setData(resp);
				setIndex(0);
			}
			else { 
				setData(data.concat(resp));
				setIndex(value + 1);
			}
		}
	}

	const getDateCPU = async (value: number, first?: boolean) => {
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
		const result = await serverService.getCPU(value);
		atualizaData(result, value, first);
	};

	const getDateMemory = async (value: number, first?: boolean) => {
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
		const result = await serverService.getMemory(value);
		await atualizaData(result, value, first);
	};

	const getDateTemperature = async (value: number, first?: boolean) => {
		const columnsTemperatura = [		
			{
				title: "Temperatura",
				children :
				[
					{
						title: "ID",
						dataIndex: "id",
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
		const result = await serverService.getTemperature(value);
		atualizaData(result, value, first);
	};

	const getDatePressure = async (value: number, first?: boolean) => {
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
		const result = await serverService.getPressure(value);
		atualizaData(result, value, first);
	};

	const getDateLocalization = async (value: number, first?: boolean) => {
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
		const result = await serverService.getLocation(value);
		atualizaData(result, value, first);
	};

	const getTable = async (value: number, first?: boolean) => {
		switch (current) {
			case "1":
				await getDateCPU(value, first);
				break;
			case "2":
				await getDateMemory(value, first);
				break;
			case "3":
				await getDateTemperature(value, first);
				break;
			case "4":
				await getDatePressure(value, first);
				break;
			case "5":
				await getDateLocalization(value, first);
				break;
			default:
				getDateCPU(value, first);
		}
	};

	const handleLineToDelete = (keys: any) => {
		setLineToDelete(keys);
	};

	const getPositionScroll = () => {
		var element = document.querySelector(".controle");
		if (element) {
			if (element.getBoundingClientRect().top - document.documentElement.scrollHeight < 0) {
				getTable(index);
			}
		}
  };

	const handleDeleteData = async () => {
		switch (current) {
			case "1":
				try {
					await serverService.deleteCPU(lineToDelete);
					setData(data.filter((element: any) => {
						if (element.id != lineToDelete) return element;
					}));
					setLineToDelete("");
				} catch (error) {
					notification.error({
						message: NotificationWarning.MESSAGE,
						description: NotificationWarning.ERROR_DELETE_DATA
					})
				}
				break;
			case "2":
				try {
					await serverService.deleteMemory(lineToDelete);
					setData(data.filter((element: any) => {
						if (element.id != lineToDelete) return element;
					}));
					setLineToDelete("");
				} catch (error) {
					notification.error({
						message: NotificationWarning.MESSAGE,
						description: NotificationWarning.ERROR_DELETE_DATA
					})
				}
				break;
			case "3":
				try {
					await serverService.deleteTemperature(lineToDelete);
					setData(data.filter((element: any) => {
						if (element.id != lineToDelete) return element;
					}));
					setLineToDelete("");
				} catch (error) {
					notification.error({
						message: NotificationWarning.MESSAGE,
						description: NotificationWarning.ERROR_DELETE_DATA
					})
				}
				break;
			case "4":
				try {
					await serverService.deletePressure(lineToDelete);
					setData(data.filter((element: any) => {
						if (element.id != lineToDelete) return element;
					}));
					setLineToDelete("");
				} catch (error) {
					notification.error({
						message: NotificationWarning.MESSAGE,
						description: NotificationWarning.ERROR_DELETE_DATA
					})
				}
				break;
			case "5":
				break;
			default:
				try {
					await serverService.deleteCPU(lineToDelete);
					setData(data.filter((element: any) => {
						if (element.id != lineToDelete) return element;
					}));
					setLineToDelete("");
				} catch (error) {
					notification.error({
						message: NotificationWarning.MESSAGE,
						description: NotificationWarning.ERROR_DELETE_DATA
					})
				}
		}
	}

	return (
		<>
			<Head>
				<title>MonitoringSystem</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content="MonitoringSystem" />
			</Head>
			<InfoScreenLayout setKey={setCurrent} value={current} onScroll={getPositionScroll}>
				{loading ? (
					<CSpin />
				) : (
					<>
						<h1 id="1" className="flex justify-between mb-10">
							<div>Tabela de Monitoramento</div>
							{
								!!lineToDelete && 
								<CButton 
									onClick={handleDeleteData}
									className="fixed right-10 md:right-16 lg:right-28 xl:right-40 z-50"
								>
									Deletar
								</CButton>
							}
						</h1>
						<CTable
							columns={columns}
							dataSource={data}
							selected={handleLineToDelete}
							selectionType="radio"
							service={current}
						/>
						<div className="controle text-white">controle</div>
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