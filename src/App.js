import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import People from './components/People';
import Planets from './components/Planets'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Menu, Container, Dimmer, Loader } from 'semantic-ui-react';

function App() {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPeople() {
      let res = await fetch('https://swapi.co/api/people/?format=json');
      let data = await res.json();
      setPeople(data.results)
    }

    async function fetchPlanets() {
      let res = await fetch('https://swapi.co/api/planets/?format=json')
      let data = await res.json();
      setPlanets(data.results)
    }

    fetchPeople();
    fetchPlanets();
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        <Container>
          {loading ? (
            <Dimmer active inverte4d>
              <Loader inverted>
                Loading
              </Loader>
            </Dimmer>
          ) : (
            <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/people'>
              <People />
            </Route>
            <Route exact path='/planets'>
              <Planets />
            </Route>
          </Switch>
          ) }
        </Container>
      </Router>
    </>
  );
}

export default App;
