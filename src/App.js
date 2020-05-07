import React, { Component } from 'react';
import StoreApp from './storeApp';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      genres: '',
      search: '',
      sort: '',
      error: null
    }
  }

  setGenre(genre) {
    this.setState({
      genre
    });
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const baseUrl = 'http://localhost:8000/apps';
    const params = [];
    if (this.state.genre) {
      params.push(`genre=${this.state.genre}`);
    }
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          apps: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get Apps at this time.'
        });
      })

  }

  render() {
    const apps = this.state.apps.map((app, i) => {
      return <StoreApp {...app} key={i} />
    })
    return (
      <main className="App">
        <h1>Google Play Store</h1>
        <div className="search">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="genre">Genre: </label>
            <select id="genre" name="genre" onChange={e => this.setGenre(e.target.value)} value={this.state.genre}>
              <option value="">None</option>
              <option value="Action">Action</option>
              <option value="puzzle">Puzzle</option>
              <option value="strategy">Strategy</option>
              <option value="arcade">Arcade</option>
              <option value="card">Card</option>


            </select>

            <label htmlFor="sort">Sort: </label>
            <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)} value={this.state.sort}>
              <option value="">None</option>
              <option value="app">App</option>
              <option value="rating">Rating</option>
            </select>
            <button type="submit">Search</button>
          </form>
          <div className="App_error">{this.state.error}</div>
        </div>
        {apps}
      </main>
    );
  }
}

export default App;