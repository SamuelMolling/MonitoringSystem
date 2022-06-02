import { API } from "./apis";

const ServerService = {
	async getCPU() {
		const response = await API.get<any, any>('/api/cpu/get/1');
		return response?.data.Cpu;
	},

	async getMemory() {
		const response = await API.get<any, any>('/api/memory/get/1');
		return response?.data.Memory;
	},

	async getTemperature() {
		const response = await API.get<any, any>('/api/temperature/get/1');
		return response?.data.Temperature;
	},

	async getPressure() {
		const response = await API.get<any, any>('/api/pressure/get/1');
		return response?.data.Pressure;
	},

	async getLocation() {
		const response = await API.get<any, any>('/api/locality/get/0');
		return response?.data.Location;
	},

	async deleteCPU(id: string) {
		const response = await API.delete<any, any>(`/api/cpu/delete/${id}`);
		return response?.data;
	},
};

export default ServerService;