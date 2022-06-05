const SiteDataService = {
	async obterDadosIniciais() {
		const response = await require('./data/inicial.json');
		return response;
	},

	async obterDadosSobreNos() {
		const response = await require('./data/sobre-nos.json');
		return response?.data;
	},
};

export { SiteDataService };
