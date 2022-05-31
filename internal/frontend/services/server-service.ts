import { API } from "./apis";

const ServerService = {
	async getCPU() {
		const response = await API.get<any, any>('/api/cpu/get');
		return response?.cpu;
	},

	async getMemory() {
		const response = await API.get<any, any>('/api/memory/get');
		return response?.memory;
	},

	async getTemperature() {
		const response = await API.get<any, any>('/api/temperature/get');
		return response?.temperature;
	},

	async getPressure() {
		const response = await API.get<any, any>('/api/pressure/get');
		return response?.pressure;
	},

	async getLocation() {
		const response = await API.get<any, any>('/api/location/get');
		return response?.location;
	},
};

export default ServerService;