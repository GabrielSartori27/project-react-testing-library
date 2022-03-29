import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente PokemonDetails', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
  });
  it('Testa se as informações do pokemon selecionado são mostradas', () => {
    const nameDetails = screen.getByText('Pikachu Details');
    expect(nameDetails).toBeInTheDocument();
    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();
    const resume = screen.getByText('This intelligent Pokémon roasts hard berries'
        + ' with electricity to make them tender enough to eat.');
    expect(resume).toBeInTheDocument();
    const links = screen.getAllByRole('link');
    const numberOflinks = 3;
    expect(links.length).toBe(numberOflinks);
  });
  it('Testa se existe os mapas mostrando a localização do pokemon', () => {
    const pokemonName = screen.getByTestId('pokemon-name');
    const locationTitle = screen.getByRole('heading', { level: 2,
      name: `Game Locations of ${pokemonName.innerHTML}` });
    expect(locationTitle).toBeInTheDocument();
    const firstLocation = screen.getByText('Kanto Viridian Forest');
    const secondLocation = screen.getByText('Kanto Power Plant');
    expect(firstLocation).toBeInTheDocument();
    expect(secondLocation).toBeInTheDocument();
    const locationImg = screen.getAllByAltText('Pikachu location');
    expect(locationImg[0].src).toBe('https://cdn2.bulbagarden.net'
        + '/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationImg[1].src).toBe('https://cdn2.bulbagarden.net'
        + '/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(locationImg.length).toBe(2);
  });
  it('Testa se o usuário pode favoritar um pokemon', () => {
    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    let favorite = document.getElementsByClassName('favorite-icon');
    expect(favorite[0]).toBeInTheDocument();
    userEvent.click(checkbox);
    favorite = document.getElementsByClassName('favorite-icon');
    expect(favorite[0]).toBe(undefined);
  });
});
