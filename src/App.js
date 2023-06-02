import './App.css';
import Holi from './Holi';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Salary from './Salary';
import * as React from 'react'

function App() {

  return (
    <>
      <Route path="/" component={Holi} exact={true} />
      <Route path="/Salary" component={Salary} exact={true}/>
    </>
  );
}

export default App;
