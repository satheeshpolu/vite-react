import { render, screen } from '../../utils/test-utils';
import Contact from '../Contact';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'contact.title': 'Get in Touch',
        'contact.description':
          "We'd love to hear from you. Fill out the form below and we'll get back to you soon!",
        'contact.form.title': 'Contact details',
        'contact.form.description': 'Please provide your contact details below.',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.country': 'Country',
        'contact.form.action': 'Submit',
      };
      return translations[key] ?? key;
    },
    i18n: { changeLanguage: jest.fn() },
  }),
}));

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
