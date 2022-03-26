import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente about', () => {
  it('Testa se as informções sobre a pokedex estão presentes', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const aboutPokedex1 = screen.getByText('This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons');
    const aboutPokedex2 = screen.getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them');
    expect(aboutPokedex1).toBeInTheDocument();
    expect(aboutPokedex2).toBeInTheDocument();
  });

  it('Testa se a página possui um h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const h2 = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(h2).toBeInTheDocument();
  });
  it('Testa se a imagem correta é renderizada', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const pokedexImg = screen.getByAltText(/Pokédex/i);
    expect(pokedexImg).toBeInTheDocument();
    // Para desocbrir como pegar o src da imagem consultei o seguinte site:
    // https://medium.com/@drake_beth/how-to-test-images-in-react-a70053b1634a
    console.log(pokedexImg);
    console.log(pokedexImg.src);
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net'
    + '/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
