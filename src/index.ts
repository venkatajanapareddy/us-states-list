export * from './types';
export * from './data';
import { usEntries, usEntryMapByAbbreviation } from './data';
import { USStateEntry, USStateAbbreviation, USRegion } from './types';

/**
 * Get a USStateEntry by 2-letter abbreviation (case-insensitive).
 * @param abbreviation - 2-letter code
 * @returns USStateEntry or undefined
 */
export function getEntryByAbbreviation(abbreviation: string): USStateEntry | undefined {
  if (!abbreviation || typeof abbreviation !== 'string') return undefined;
  return usEntryMapByAbbreviation[abbreviation.toUpperCase() as USStateAbbreviation];
}

/**
 * Get all USStateEntry objects for a given region (case-insensitive).
 * @param region - Region name
 * @returns Array of USStateEntry
 */
export function getEntriesByRegion(region: USRegion | string): USStateEntry[] {
  if (!region || typeof region !== 'string') return [];
  const regionLower = region.toLowerCase();
  return usEntries.filter((entry) => entry.region.toLowerCase() === regionLower);
}

/**
 * Get all entries that are DC or territories (entryType !== 'state').
 * @returns Array of USStateEntry
 */
export function getTerritories(): USStateEntry[] {
  return usEntries.filter((entry) => entry.entryType !== 'state');
}

/**
 * Check if a 2-letter abbreviation is valid (case-insensitive).
 * @param abbreviation - 2-letter code
 * @returns true if valid
 */
export function isValidAbbreviation(abbreviation: string): boolean {
  if (!abbreviation || typeof abbreviation !== 'string') return false;
  return Boolean(usEntryMapByAbbreviation[abbreviation.toUpperCase() as USStateAbbreviation]);
}

/**
 * Get the capital city for a given abbreviation (case-insensitive).
 * @param abbreviation - 2-letter code
 * @returns Capital city string, null if no capital, or undefined if not found
 */
export function getCapitalByAbbreviation(abbreviation: string): string | null | undefined {
  const entry = getEntryByAbbreviation(abbreviation);
  return entry ? entry.capital : undefined;
}

/**
 * Get the 2-letter abbreviation for a given state/territory name (case-insensitive, trims input).
 * @param name - Full name
 * @returns Abbreviation or undefined
 */
export function getAbbreviationByName(name: string): USStateAbbreviation | undefined {
  if (!name || typeof name !== 'string') return undefined;
  const nameNorm = name.trim().toLowerCase();
  const entry = usEntries.find((e) => e.name.toLowerCase() === nameNorm);
  return entry ? entry.abbreviation : undefined;
}
