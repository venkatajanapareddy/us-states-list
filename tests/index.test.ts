import { describe, it, expect } from 'vitest';

import {
  usEntries,
  getEntryByAbbreviation,
  getEntriesByRegion,
  getTerritories,
  isValidAbbreviation,
  getCapitalByAbbreviation,
  getAbbreviationByName,
} from '../src';

// --- Data Integrity ---
describe('usEntries data integrity', () => {
  it('should include all 50 states, DC, and 5 major territories', () => {
    const states = usEntries.filter((e) => e.entryType === 'state');
    const dc = usEntries.find((e) => e.abbreviation === 'DC');
    const territories = usEntries.filter((e) => e.entryType !== 'state' && e.abbreviation !== 'DC');
    expect(states.length).toBe(50);
    expect(dc).toBeDefined();
    expect(territories.length).toBe(5);
  });

  it('should have no duplicate abbreviations', () => {
    const seen = new Set();
    for (const entry of usEntries) {
      expect(seen.has(entry.abbreviation)).toBe(false);
      seen.add(entry.abbreviation);
    }
  });

  it('should have required fields for each entry', () => {
    for (const entry of usEntries) {
      expect(entry.name).toBeTruthy();
      expect(entry.abbreviation).toBeTruthy();
      expect(entry.entryType).toBeTruthy();
      expect(entry.region).toBeTruthy();
      expect('capital' in entry).toBe(true);
    }
  });

  it('should have correct sample data for CA, NY, DC, PR, GU', () => {
    const ca = usEntries.find((e) => e.abbreviation === 'CA');
    const ny = usEntries.find((e) => e.abbreviation === 'NY');
    const dc = usEntries.find((e) => e.abbreviation === 'DC');
    const pr = usEntries.find((e) => e.abbreviation === 'PR');
    const gu = usEntries.find((e) => e.abbreviation === 'GU');
    expect(ca).toMatchObject({ name: 'California', capital: 'Sacramento', region: 'West' });
    expect(ny).toMatchObject({ name: 'New York', capital: 'Albany', region: 'Northeast' });
    expect(dc).toMatchObject({ name: 'District of Columbia', entryType: 'district' });
    expect(pr).toMatchObject({ name: 'Puerto Rico', entryType: 'commonwealth' });
    expect(gu).toMatchObject({ name: 'Guam', entryType: 'territory' });
  });
});

// --- Utility Functions ---
describe('getEntryByAbbreviation', () => {
  it('returns correct entry for valid codes (case-insensitive)', () => {
    expect(getEntryByAbbreviation('CA')?.name).toBe('California');
    expect(getEntryByAbbreviation('ny')?.name).toBe('New York');
    expect(getEntryByAbbreviation('dC')?.name).toBe('District of Columbia');
  });
  it('returns undefined for invalid codes', () => {
    expect(getEntryByAbbreviation('ZZ')).toBeUndefined();
    expect(getEntryByAbbreviation('')).toBeUndefined();
    expect(getEntryByAbbreviation(undefined as unknown as string)).toBeUndefined();
  });
});

describe('getEntriesByRegion', () => {
  it('returns correct entries for region (case-insensitive)', () => {
    const west = getEntriesByRegion('west');
    expect(west.some((e) => e.abbreviation === 'CA')).toBe(true);
    expect(west.every((e) => e.region === 'West')).toBe(true);
  });
  it('returns empty array for unknown region', () => {
    expect(getEntriesByRegion('unknown')).toEqual([]);
    expect(getEntriesByRegion('')).toEqual([]);
    expect(getEntriesByRegion(undefined as unknown as string)).toEqual([]);
  });
});

describe('getTerritories', () => {
  it('returns all entries that are not states (DC and territories)', () => {
    const terr = getTerritories();
    expect(terr.some((e) => e.abbreviation === 'DC')).toBe(true);
    expect(terr.some((e) => e.abbreviation === 'PR')).toBe(true);
    expect(terr.every((e) => e.entryType !== 'state')).toBe(true);
    expect(terr.length).toBe(6); // DC + 5 territories
  });
});

describe('isValidAbbreviation', () => {
  it('returns true for valid codes (case-insensitive)', () => {
    expect(isValidAbbreviation('CA')).toBe(true);
    expect(isValidAbbreviation('ny')).toBe(true);
    expect(isValidAbbreviation('dC')).toBe(true);
  });
  it('returns false for invalid codes', () => {
    expect(isValidAbbreviation('ZZ')).toBe(false);
    expect(isValidAbbreviation('')).toBe(false);
    expect(isValidAbbreviation(undefined as unknown as string)).toBe(false);
  });
});

describe('getCapitalByAbbreviation', () => {
  it('returns correct capital for valid codes', () => {
    expect(getCapitalByAbbreviation('CA')).toBe('Sacramento');
    expect(getCapitalByAbbreviation('DC')).toBe('Washington');
    expect(getCapitalByAbbreviation('PR')).toBe('San Juan');
  });
  it('returns undefined for invalid codes', () => {
    expect(getCapitalByAbbreviation('ZZ')).toBeUndefined();
    expect(getCapitalByAbbreviation('')).toBeUndefined();
    expect(getCapitalByAbbreviation(undefined as unknown as string)).toBeUndefined();
  });
});

describe('getAbbreviationByName', () => {
  it('returns correct abbreviation for valid names (case-insensitive, trimmed)', () => {
    expect(getAbbreviationByName('California')).toBe('CA');
    expect(getAbbreviationByName('new york')).toBe('NY');
    expect(getAbbreviationByName('  District of Columbia  ')).toBe('DC');
    expect(getAbbreviationByName('puerto rico')).toBe('PR');
  });
  it('returns undefined for invalid names', () => {
    expect(getAbbreviationByName('Atlantis')).toBeUndefined();
    expect(getAbbreviationByName('')).toBeUndefined();
    expect(getAbbreviationByName(undefined as unknown as string)).toBeUndefined();
  });
});
