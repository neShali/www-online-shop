import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from './accordion';
import '@testing-library/jest-dom';

describe('Accordion', () => {
  it('renders with title', () => {
    render(<Accordion title="FAQ">Content</Accordion>);
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('does not render content by default', () => {
    render(<Accordion title="FAQ">Hidden Content</Accordion>);
    expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument();
  });

  it('renders content after clicking the header', () => {
    render(<Accordion title="FAQ">Visible Content</Accordion>);
    const button = screen.getByRole('button', { name: /faq/i });
    fireEvent.click(button);
    expect(screen.getByText('Visible Content')).toBeInTheDocument();
  });

  it('toggles content on multiple clicks', () => {
    render(<Accordion title="FAQ">Toggle Content</Accordion>);
    const button = screen.getByRole('button', { name: /faq/i });

    // Открыть
    fireEvent.click(button);
    expect(screen.getByText('Toggle Content')).toBeInTheDocument();

    // Закрыть
    fireEvent.click(button);
    expect(screen.queryByText('Toggle Content')).not.toBeInTheDocument();
  });
});
