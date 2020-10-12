import React from 'react';

function App() {
  return (
    <div className="App">
      <Nome texto="Matheus Lima"/>
    </div>
  );
}

interface TitleProps{
  texto:string;
}

function Nome(props:TitleProps){
return <h1>{props.texto}</h1>
}

export default App;
