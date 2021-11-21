import React from 'react';
import Form from './components/Form';
import Navbar from './components/Navbar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div>
        <Navbar/>
        <Form/>
      </div>
     );
  }
}
 
export default App;
