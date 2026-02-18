import { render, screen } from '../../utils/test-utils';
import Contact from '../Contact';

describe('Contact component', () => {
  beforeEach(() => {
    render(<Contact />);
  });
  it('renders greeting with name', () => {
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    expect(screen.getByText('Contact details')).toBeInTheDocument();
  });

  it('has a submit button', () => {
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});
