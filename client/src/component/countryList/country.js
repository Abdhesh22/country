import React, { useState } from "react";
import axios from "axios";
import "../../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, InputGroup, FormControl, Button, Card } from 'react-bootstrap';

const Country = () => {
    const [searchInput, setSearchInput] = useState("");
    const [countryData, setCountryData] = useState([]);
    const [error, setError] = useState(null);

    const fetchCountry = async () => {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${searchInput}`);
            console.log("🚀 ~ file: country.js:16 ~ fetchCountry ~ response:", response)
            if (response.data && response.data.length > 0) {
                setError(null);
                setCountryData(response.data);
            } else {
                setError("Country not found");
                setCountryData([]);
            }
        } catch (error) {
            setError("An error occurred while fetching the data");
            setCountryData([]);
        }
    }

    const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania", "Polar", "Others"];

    const fetchContinent = async (input) => {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/region/${input}`);
            if (response.data && response.data.length > 0) {
                setError(null);
                setCountryData(response.data);
                console.log("🚀 ~ file: country.js:37 ~ fetchContinent ~ response.data:", response.data)
            } else {
                setError("Country not found");
                setCountryData([]);
            }
        } catch (error) {
            setError("An error occurred while fetching the data");
            setCountryData([]);
        }
    }

    return (
        <Container className="mt-5 light-theme" style={{ background: "#f0f0f0" }}>
            <Row className="justify-content-center">
                <Col xs={10} md={6}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Please Enter a country"
                            aria-label="Country Name"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <Button variant="primary" onClick={fetchCountry}>Search</Button>
                    </InputGroup>
                    {error && <p className="error-message">{error}</p>}
                </Col>
            </Row>
            <Row className="justify-content-center mb-3">
                {continents.map((continent, index) => (
                    <Col key={index}>
                        <Button variant="secondary" onClick={() => fetchContinent(continent)}>{continent}</Button>
                    </Col>
                ))}
            </Row>
            <Row className="justify-content-center">
                {countryData.map((country, index) => (
                    <Col key={index} xs={12} md={6} lg={4}>
                        <Card className="country-card h-100 border border-primary rounded p-3">
                            <Card.Img variant="top" src={country.flags.png} className="flag border" />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>Country: {country.name.common}</Card.Title>
                                <Card.Text className="country-info">
                                    <div><strong className="info-title">Official Name:</strong> {country.name.official}</div>
                                    <div><strong className="info-title">Common Name:</strong> {country.name.common}</div>
                                    <div><strong className="info-title">Capital:</strong> {country && country.capital ? country.capital[0] : '--'}</div>
                                    <div><strong className="info-title">Population:</strong> {country.population.toLocaleString()}</div>
                                    <div><strong className="info-title">Region:</strong> {country.region}</div>
                                    <div><strong className="info-title">Sub Region:</strong> {country.subregion}</div>
                                    <div><strong className="info-title">Timezones:</strong> {country.timezones.join(", ")}</div>
                                    <div><a href={country.maps.googleMaps} target="_blank" rel="noopener noreferrer">Open Google Map</a></div>
                                    <div><a href={country.maps.openStreetMaps} target="_blank" rel="noopener noreferrer">Open OpenStreetMaps</a></div>
                                    <div><strong className="info-title">Currency:</strong> {Object.values(country.currencies)[0]?.name} ({Object.values(country.currencies)[0]?.symbol})</div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Country;
