import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente Pokedex', () => {
    it( "Testa se existe um h2 com o texto Encountered pokémons", () => {})
        renderWithRouter(<App/>);
        const h2 = screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' });
        expect(h2).toBeInTheDocument();
    it("Testa se é exibido o próximo Pokemon da lista quando o botão Próximo pokémon é clicado", () => {
        renderWithRouter(<App/>);
        const nextPokemonButton = screen.getByRole('button', {name: "Próximo pokémon"});
        expect(nextPokemonButton).toBeInTheDocument();
        const allPokemons = ['Charmander', 'Caterpie', 'Ekans', 
            'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu' 
        ];
        const pagePokemons = [];
        for(let i = 0; i < allPokemons.length;  i++) {
            userEvent.click(nextPokemonButton);
            const pokemon = screen.getByTestId('pokemon-name');
            pagePokemons.push(pokemon.textContent);
        };
        expect(pagePokemons).toStrictEqual(allPokemons);
    });
    it("Testa se é exibido apenas um pokemon por vez", () => {
        renderWithRouter(<App/>);
        const nextPokemonButton = screen.getByRole('button', {name: "Próximo pokémon"});
        userEvent.click(nextPokemonButton);
        const pokemons = screen.getAllByTestId('pokemon-name');
        expect(pokemons.length).toBe(1);
    })
    it("Testa os botões de filtro", () => {
        renderWithRouter(<App/>);
        const nextPokemonButton = screen.getByRole('button', {name: "Próximo pokémon"});
        const filterButtons = screen.getAllByTestId('pokemon-type-button');
        expect(filterButtons.length).toBe(7);
        const fireFilter = screen.getByRole('button', {name: "Fire"});
        userEvent.click(fireFilter);
        const firstFirePokemon = screen.getByText('Charmander');
        userEvent.click(nextPokemonButton);
        const secondFirePokemon = screen.getByText('Rapidash');
        const allFilter = screen.getByRole('button', {name: "All"});
        expect(allFilter).toBeInTheDocument();
        expect(firstFirePokemon).toBeInTheDocument();
        expect(secondFirePokemon).toBeInTheDocument();
    });
    it("Testa o botão All", () => {
        renderWithRouter(<App/>);
        const fireFilter = screen.getByRole('button', {name: "Fire"});
        userEvent.click(fireFilter);
        const allFilter = screen.getByRole('button', {name: "All"});
        expect(allFilter).toBeInTheDocument();
        userEvent.click(allFilter);
        const nextPokemonButton = screen.getByRole('button', {name: "Próximo pokémon"});
        expect(nextPokemonButton).toBeInTheDocument();
        const allPokemons = ['Charmander', 'Caterpie', 'Ekans', 
            'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu' 
        ];
        const pagePokemons = [];
        for(let i = 0; i < allPokemons.length;  i++) {
            userEvent.click(nextPokemonButton);
            const pokemon = screen.getByTestId('pokemon-name');
            pagePokemons.push(pokemon.textContent);
        };
        expect(pagePokemons).toStrictEqual(allPokemons);
    })
});
