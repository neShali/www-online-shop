import { render, screen } from '@testing-library/react';
import { Icon } from './icon';

describe('Icon', () => {
  it('renders correct icon with name prop', () => {
    render(<Icon name="plus" />);
    const svg = screen.getByRole('img', { hidden: true });
    expect(svg.querySelector('use')?.getAttribute('href')).toBe(
      'symbol-defs.svg#icon-plus'
    );
  });
});
