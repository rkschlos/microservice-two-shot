import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



async function loadHatsandShoes() {
  const responseHats = await fetch('http://localhost:8090/api/hats/');
  const responseShoes = await fetch('http://localhost:8080/api/shoes/');
  if (responseHats.ok && responseShoes.ok) {
    const dataHats = await responseHats.json();
    const dataShoes = await responseShoes.json()
    root.render(
      <React.StrictMode>
        <App hats={dataHats.hats} shoes={dataShoes.shoes} />
      </React.StrictMode>
    );
  } else {
    console.error(responseHats); console.error(responseShoes);
  }
}
loadHatsandShoes();

// async function loadShoes() {
//   const response = await fetch('http://localhost:8080/api/shoes/');
//   if (response.ok) {
//     const data = await response.json();
//     root.render(
//       <React.StrictMode>
//         <App shoes={data.shoes} />
//       </React.StrictMode>
//     );
//   } else {
//     console.error(response);
//   }
// }
//loadShoes();
