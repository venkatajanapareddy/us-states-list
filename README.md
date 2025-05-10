# us-states-list

[![NPM version](https://img.shields.io/npm/v/us-states-list.svg)](https://www.npmjs.com/package/us-states-list)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Build Status](https://github.com/venkatajanapareddy/us-states-list/actions/workflows/ci.yml/badge.svg)](https://github.com/venkatajanapareddy/us-states-list/actions)
[![Test Coverage](https://img.shields.io/coveralls/github/venkatajanapareddy/us-states-list/main)](https://github.com/venkatajanapareddy/us-states-list/actions)
[![Types](https://img.shields.io/npm/types/us-states-list.svg)](https://www.npmjs.com/package/us-states-list)

> A clean, typed, and comprehensive list of all U.S. states and territories with full metadata. The most complete, developer-friendly dataset for U.S. states, DC, and major territories—perfect for forms, civic tech, shipping, and more.

## Features

- **All 50 states, DC, and major U.S. territories** (PR, GU, VI, AS, MP)
- **Accurate metadata**: name, abbreviation, capital, region, type, FIPS code, land area
- **Strong TypeScript types** and zero runtime dependencies
- **Utility functions** for lookups, validation, and region/territory queries
- **Dual ESM/CJS** support, tree-shakable
- **Thoroughly tested** with Vitest
- **MIT Licensed**

## Installation

```sh
npm install us-states-list
```

## Usage

```ts
import {
  usEntries,
  usEntryMapByAbbreviation,
  getEntryByAbbreviation,
  getEntriesByRegion,
  getTerritories,
  isValidAbbreviation,
  getCapitalByAbbreviation,
  getAbbreviationByName,
  USStateEntry,
  USStateAbbreviation,
  USEntryType,
  USRegion,
} from 'us-states-list';

// Get all entries
console.log(usEntries);

// Lookup by abbreviation
const ca = getEntryByAbbreviation('CA');

// Lookup by region
const westStates = getEntriesByRegion('West');

// Get all territories (including DC)
const territories = getTerritories();

// Validate abbreviation
isValidAbbreviation('NY'); // true
isValidAbbreviation('ZZ'); // false

// Get capital by abbreviation
getCapitalByAbbreviation('PR'); // 'San Juan'

// Get abbreviation by name
getAbbreviationByName('California'); // 'CA'
```

## API Reference

### Data Exports

- `usEntries: Readonly<USStateEntry[]>` — All states, DC, and territories
- `usEntryMapByAbbreviation: Readonly<Record<USStateAbbreviation, USStateEntry>>` — Map by abbreviation

### Utility Functions

- `getEntryByAbbreviation(abbreviation: string): USStateEntry | undefined`
- `getEntriesByRegion(region: USRegion | string): USStateEntry[]`
- `getTerritories(): USStateEntry[]`
- `isValidAbbreviation(abbreviation: string): boolean`
- `getCapitalByAbbreviation(abbreviation: string): string | null | undefined`
- `getAbbreviationByName(name: string): USStateAbbreviation | undefined`

### Types

- `USStateEntry`, `USStateAbbreviation`, `USEntryType`, `USRegion`

## Data Sources

- [USPS Postal Abbreviations](https://pe.usps.com/text/pub28/28apb.htm)
- [U.S. Census Bureau Regions & FIPS Codes](https://www.census.gov/programs-surveys/geography/guidance/geo-identifiers.html)
- [Official Territorial Government Data](https://www.usa.gov/state-government)

## License

MIT

## Contributing

Pull requests welcome! Please open an issue or PR for improvements, corrections, or new features. See [CONTRIBUTING.md](./CONTRIBUTING.md) if available.
