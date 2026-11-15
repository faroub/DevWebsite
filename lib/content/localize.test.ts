import { describe, it, expect } from 'vitest';
import { getLocalizedField } from './localize';

describe('getLocalizedField', () => {
  const mockItem = {
    title: 'Focus Flow',
    title_fr: 'Flux de Concentration',
    title_ar: 'تدفق التركيز',
    tagline: 'Minimalist timer',
    tagline_fr: 'Minuteur minimaliste',
    description: 'Detailed description',
  };

  it('returns French field when locale is fr and translation exists', () => {
    expect(getLocalizedField(mockItem, 'title', 'fr')).toBe('Flux de Concentration');
    expect(getLocalizedField(mockItem, 'tagline', 'fr')).toBe('Minuteur minimaliste');
  });

  it('returns Arabic field when locale is ar and translation exists', () => {
    expect(getLocalizedField(mockItem, 'title', 'ar')).toBe('تدفق التركيز');
  });

  it('falls back to English when localized field is missing', () => {
    expect(getLocalizedField(mockItem, 'description', 'fr')).toBe('Detailed description');
    expect(getLocalizedField(mockItem, 'description', 'ar')).toBe('Detailed description');
  });

  it('falls back to English when locale is en', () => {
    expect(getLocalizedField(mockItem, 'title', 'en')).toBe('Focus Flow');
  });
});
