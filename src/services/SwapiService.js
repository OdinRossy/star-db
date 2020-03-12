export default class SwapiService {
    _apiBase = 'https://swapi.co/api';
    _imageBase = 'https://starwars-visualguide.com/assets/img';

    getResource = async (url) => {
        const response = await fetch(`${this._apiBase}${url}`, {mode: 'cors'});

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}. Receive ${response.status}`)
        }

        return await response.json()
    };

    getAllPeople = async () => {
        const data = await this.getResource(`/people/`);
        return data.results.map(this._transformPerson)
    };

    getPerson = async id => {
        const person = await this.getResource(`/people/${id}/`);
        return this._transformPerson(person)
    };

    getAllPlanets = async () => {
        const data = await this.getResource(`/planets/`);
        return data.results.map(this._transformPlanet);
    };

    getPlanet = async id => {
        const data = await this.getResource(`/planets/${id}/`);
        return this._transformPlanet(data);
    };

    getAllStarships = async () => {
        const data = await this.getResource(`/starships/`);
        return data.results.map(this._transformStarship)
    };

    getStarship = async id => {
        const starship = await this.getResource(`/starships/${id}/`);
        return this._transformStarship(starship)
    };

    buildRandomId = (min, max, plus) => {
        return Math.floor(Math.random() * max) + plus
    };

    getPersonImage = ({id}) => {
        return `${this._imageBase}/characters/${id}.jpg`
    };

    getStarshipImage = ({id}) => {
        return `${this._imageBase}/starships/${id}.jpg`
    };

    getPlanetImage = ({id}) => {
        return `${this._imageBase}/planets/${id}.jpg`
    };

    _transformStarship = starship => {
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
    };

    _transformPerson = person => {
        return {
            id: this._transformIdFromUrl(person.url),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color,
        }
    };

    _transformPlanet = planet => {
        return {
            id: this._transformIdFromUrl(planet.url),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    };

    _transformIdFromUrl = (url, regExp = /\/([0-9]*)\/$/, matchGroup = 1) => {
        return url.match(regExp)[matchGroup]
    }
}