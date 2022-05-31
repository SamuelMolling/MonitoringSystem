const SiteDataService = {
	async obterDadosIniciais() {
		const response = await require('./data/inicial.json');
		return response;
	},
};

export { SiteDataService };
