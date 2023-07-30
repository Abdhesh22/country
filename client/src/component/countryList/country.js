import React, { useState } from "react";
import axios from "axios";
import "../../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, InputGroup, FormControl, Button, Card } from "react-bootstrap";

const Country = () => {
    const [searchInput, setSearchInput] = useState("");
    const [countryData, setCountryData] = useState([]);
    const [error, setError] = useState(null);

    const fetchCountry = async () => {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${searchInput}`);
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
    };

    const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania", "Polar", "Others"];

    const fetchContinent = async (input) => {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/region/${input}`);
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
    };

    return (
        <Container className="mt-5 light-theme">
            <Row className="justify-content-center">
                <Col xs={10} md={6}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Please Enter a country"
                            aria-label="Country Name"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <Button variant="primary" onClick={fetchCountry}>
                            Search
                        </Button>
                    </InputGroup>
                    {error && <p className="error-message">{error}</p>}
                </Col>
            </Row>
            <Row className="justify-content-center mb-3">
                {continents.map((continent, index) => (
                    <Col key={index}>
                        <Button variant="secondary" onClick={() => fetchContinent(continent)}>
                            {continent}
                        </Button>
                    </Col>
                ))}
            </Row>
            <Row className="justify-content-center">
                {countryData.map((country, index) => (
                    <Col key={index} xs={12} md={6} lg={4}>
                        <Card className="country-card h-100 border border-primary rounded p-3">
                            <Card.Img variant="top" src={country.flags.png} className="flag border" />
                            <Card.Body className="card-content">
                                <Card.Title className="country-name">{country.name.common}</Card.Title>
                                <Card.Text className="country-info">
                                    <p>
                                        <strong className="info-title">Official Name:</strong> {country.name.official}
                                    </p>
                                    <p>
                                        <strong className="info-title">Capital:</strong>{" "}
                                        {country && country.capital ? country.capital[0] : "--"}
                                    </p>
                                    <p>
                                        <strong className="info-title">Population:</strong>{" "}
                                        {country.population.toLocaleString()}
                                    </p>
                                    <p>
                                        <strong className="info-title">Region:</strong> {country.region}
                                    </p>
                                    <p>
                                        <strong className="info-title">Sub Region:</strong> {country.subregion}
                                    </p>
                                    <p>
                                        <strong className="info-title">Timezones:</strong> {country.timezones.join(", ")}
                                    </p>
                                    <p>
                                        <strong className="info-title">Currency:</strong>{" "}
                                        {Object.values(country.currencies)[0]?.name} (
                                        {Object.values(country.currencies)[0]?.symbol})
                                    </p>
                                    <div className="map-links">
                                        <a href={country.maps.googleMaps} target="_blank" rel="noopener noreferrer" className="map-button">
                                            GoogleMap
                                        </a>
                                        <a href={country.maps.openStreetMaps} target="_blank" rel="noopener noreferrer" className="map-button">
                                            OpenStreetMap
                                        </a>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Country;
