import { Language } from './types';
import en from './languages/en';
import de from './languages/de';
import fr from './languages/fr';
import es from './languages/es';
import it from './languages/it';
import pt from './languages/pt';
import nl from './languages/nl';
import pl from './languages/pl';
import cs from './languages/cs';
import sk from './languages/sk';
import hu from './languages/hu';
import ru from './languages/ru';
import ro from './languages/ro';
import bg from './languages/bg';
import el from './languages/el';
import da from './languages/da';
import sv from './languages/sv';
// Import other language files as they are added

const translations: Record<Language, typeof en> = {
  en,
  de,
  fr,
  es,
  it,
  pt,
  nl,
  pl,
  cs,
  sk,
  hu,
  ru,
  ro,
  bg,
  el,
  da,
  sv,
  // Add other languages as they are added
};

export default translations;