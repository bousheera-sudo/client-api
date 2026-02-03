import React from 'react';
import './App.css';
import Apiclient from './Apiclient';
import AddArticle from './AddArticle';
import EditArticle from './EditArticle';

function App() {
  return (
    <div className="App">
      <Apiclient />
      <AddArticle />
      <EditArticle />
    </div>
  );
}

export default App;
