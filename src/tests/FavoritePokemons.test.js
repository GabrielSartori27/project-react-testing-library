import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente FavoritePokemons', () => {
  it('Testa se a mensagem No favorite pokemon found é exibida caso o usuário'
    + ' não tenha nenhum pokemon favorito', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const noFavorite = screen.getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });

  it('Testa se os pokemons favoritados são exibidos', () => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );
    const details = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(details);
    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    const userPokemon = screen.getAllByTestId('pokemon-name');
    expect(userPokemon[0]).toBeInTheDocument();
  });
});
