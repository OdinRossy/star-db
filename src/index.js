class SwapiService {
    _apiBase = 'https://swapi.co/api';

    async getResource(url) {
        const response = await fetch(`${this._apiBase}${url}`);

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}. Receive ${response.status}`)
        }
        return await response.json()
    };

    async getAllPeople() {
        const data = await this.getResource(`/people/`);
        return data.results
    }

    getPerson(id) {
        return this.getResource(`/people/${id}/`)
    }

    async getAllPlanets() {
        const data = await this.getResource(`/planets/`);
        return data.results
    }

    getPlanet(id) {
        return this.getResource(`/planets/${id}/`)
    }

    async getAllStarships() {
        const data = await this.getResource(`/starships/`);
        return data.results
    }

    getStarship(id) {
        return this.getResource(`/starships/${id}/`)
    }
}

const swapiService = new SwapiService();
swapiService.getAllPeople()
    .then((data) => {
        console.log(data)
    })
    .catch((error) => {
        console.error(error)
    });

swapiService.getPerson(12)
    .then((data) => {
        console.log(data)
    })
    .catch((error) => {
        console.error(error)
    });