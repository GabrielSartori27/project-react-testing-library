import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente Pokemon', () => {
  it('Testa se é renderizado um card com as informações do pokemon', () => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    expect(pokemonWeigth).toHaveTextContent('Average weight: 6.0 kg');
    const pokemonImg = screen.getByAltText('Pikachu sprite');
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net'
          + '/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Testa se o card tem um link para exibir informações do pokemon', () => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );
    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    expect(pokemonDetails.href).toContain('pokemons/25');
  });
  it('Testa se o link para exibir informações'
  + ' do pokemon redireciona para a página correta', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Testa se existe o ícone correto nos pokemons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetails);
    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);
    history.push('/favorites');
    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon.src).toContain('/star-icon.svg');
  });
});
