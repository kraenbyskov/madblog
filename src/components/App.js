import React, { useState, useEffect } from "react"
import { client } from "./client";
import Posts from "./Posts"
import SinglePage from "./SinglePage";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"


function App() {
  const [state, setState] = useState()


  useEffect(() => {
    client.getEntries({
      'content_type': "blogpost"
    })
      .then((response) => {
        setState(response)
      })
      .catch(console.error)

  }, [])


  return (
    <div className="App">
      <Router>
        <Switch>


          <Route exact path="/" >
            <Posts data={state} />
          </Route>


          <Route path="/Posts/:id">
            <SinglePage />
          </Route>
        </Switch>
      </Router>




      {/* <h1>hello world</h1>
      {state && state.items.map((data, index) => (
        <p key={index}>{data.fields.title}</p>
      ))} */}
    </div>
  );
}

export default App;
