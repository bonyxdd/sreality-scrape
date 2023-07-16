import React, { Component } from 'react';
import { Client } from 'pg';

interface Property {
  url: string;
  title: string;
}

class App extends Component<{}, { properties: Property[] }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      properties: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const client = new Client({
      host: 'localhost',
      user: 'postgres',
      port: 5432,
      password: 'betuska2004',
      database: 'sreality',
    });

    await client.connect();

    try {
      const res = await client.query('SELECT * FROM property');
      const fetchedProperties: Property[] = res.rows as Property[];
      this.setState({ properties: fetchedProperties });
    } catch (err) {
      console.error('Error fetching data from the database:', err);
    } finally {
      await client.end();
    }
  }

  render() {
    const { properties } = this.state;

    return (
      <div className="wrapper">
        <div className="property-wrap">
          {properties.map((property, index) => (
            <div className="property" key={index}>
              <div className="property-img">
                <img src={property.url} alt="" />
              </div>
              <div className="property-title">{property.title}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
