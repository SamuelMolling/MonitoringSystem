import { API } from "./apis";

const ServerService = {
	async getCPU(index: number) {
		const response = await API.get<any, any>(`/api/cpu/get/${index}`);
		return response?.data.Cpu;
	},

	async getMemory(index: number) {
		const response = await API.get<any, any>(`/api/memory/get/${index}`);
		return response?.data.Memory;
	},

	async getTemperature(index: number) {
		const response = await API.get<any, any>(`/api/temperature/get/${index}`);
		return response?.data.Temperature;
	},

	async getPressure(index: number) {
		const response = await API.get<any, any>(`/api/pressure/get/${index}`);
		return response?.data.Pressure;
	},

	async getLocation(index: number) {
		const response = await API.get<any, any>(`/api/locality/get/${index}`);
		return response?.data.Location;
	},

	async deleteCPU(id: string) {
		const response = await API.delete<any, any>(`/api/cpu/delete/${id}`);
		return response?.data;
	},

	async deleteMemory(id: string) {
		const response = await API.delete<any, any>(`/api/memory/delete/${id}`);
		return response?.data;
	},

	async deleteTemperature(id: string) {
		const response = await API.delete<any, any>(`/api/temperature/delete/${id}`);
		return response?.data;
	},

	async deletePressure(id: string) {
		const response = await API.delete<any, any>(`/api/pressure/delete/${id}`);
		return response?.data;
	},
};

export default ServerService;