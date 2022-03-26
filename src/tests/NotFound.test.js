import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente NotFound', () => {
  it('Testa se a página possui um h2 com o texto correto', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/url-desconhecida');
    const notFound = screen.getByRole('heading', { level: 2,
      name: 'Page requested not found Crying emoji' });
    expect(notFound).toBeInTheDocument();
    const notFoundImg = screen.getByAltText('Pikachu crying because'
        + ' the page requested was not found');
    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });

  it('Testa se a página possui a imagem correta', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/url-desconhecida');
    const notFoundImg = screen.getByAltText('Pikachu crying because'
        + ' the page requested was not found');
    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
