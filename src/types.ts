/**
 * A valid 2-letter U.S. state or territory abbreviation (e.g., 'CA', 'NY', 'PR').
 */
export type USStateAbbreviation = string;

/**
 * The type of U.S. entry (state, district, territory, commonwealth, insular area).
 */
export type USEntryType = 'state' | 'district' | 'territory' | 'commonwealth' | 'insular area';

/**
 * U.S. Census Bureau region or custom region for territories.
 */
export type USRegion = 'Northeast' | 'Midwest' | 'South' | 'West' | string;

/**
 * Metadata for a U.S. state, district, or territory.
 */
export interface USStateEntry {
  /** Full name (e.g., 'California', 'Puerto Rico', 'District of Columbia') */
  name: string;
  /** 2-letter postal abbreviation */
  abbreviation: USStateAbbreviation;
  /** Entry type (e.g., 'state', 'district', 'territory', etc.) */
  entryType: USEntryType;
  /** Capital city, or null if not applicable */
  capital: string | null;
  /** Region (e.g., 'West', 'South', 'Territories') */
  region: USRegion;
  /** State FIPS code (optional) */
  fipsCode?: string;
  /** Land area in square miles (optional) */
  landAreaSqMi?: number;
}
