export default class SwapiService {
    _apiBase = 'https://swapi.co/api';

    async getResource(url) {
        const response = await fetch(`${this._apiBase}${url}`, {mode: 'no-cors'});

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}. Receive ${response.status}`)
        }
        return await response.json()
    };

    async getAllPeople() {
        const data = await this.getResource(`/people/`);
        return data.results.map(this._transformPerson)
    }

    async getPerson(id) {
        const person = await this.getResource(`/people/${id}/`);
        return this._transformPerson(person)
    }

    async getAllPlanets() {
        const data = await this.getResource(`/planets/`);
        return data.results.map(this._transformPlanet);
    }

    async getPlanet(id) {
        const data = await this.getResource(`/planets/${id}/`);
        return this._transformPlanet(data);
    }

    async getAllStarships() {
        const data = await this.getResource(`/starships/`);
        return data.results.map(this._transformStarship)
    }

    async getStarship(id) {
        const starship = await this.getResource(`/starships/${id}/`);
        return this._transformStarship(starship)
    }

    _transformStarship(starship) {
        return {
            id: this._transformIdFromUrl(starship.url),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity,
        }
    }

    _transformPerson(person) {
        return {
            id: this._transformIdFromUrl(person.url),
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor,
        }
    }

    _transformPlanet(planet) {
        return {
            id: this._transformIdFromUrl(planet.url),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }

    _transformIdFromUrl(url, regExp = /\/([0-9]*)\/$/, matchGroup = 1) {
        return url.match(regExp)[matchGroup]
    }
}