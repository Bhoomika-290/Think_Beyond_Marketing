// ---------------------------------------------------------------------------
// Geographic Registry & Validation Engine
// Provides structured, dependent Country -> State -> City mappings and validation.
// ---------------------------------------------------------------------------

export type OperatingScope = 'local' | 'regional' | 'national' | 'international' | 'undecided';

export interface CountryData {
  id: string;
  name: string;
  states: {
    id: string;
    name: string;
    cities: string[];
  }[];
}

export const GEOGRAPHY_REGISTRY: CountryData[] = [
  {
    id: 'IN',
    name: 'India',
    states: [
      {
        id: 'MH',
        name: 'Maharashtra',
        cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Navi Mumbai', 'Aurangabad', 'All Maharashtra'],
      },
      {
        id: 'RJ',
        name: 'Rajasthan',
        cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer', 'Bhilwara', 'All Rajasthan'],
      },
      {
        id: 'KA',
        name: 'Karnataka',
        cities: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi', 'All Karnataka'],
      },
      {
        id: 'DL',
        name: 'Delhi NCR',
        cities: ['New Delhi', 'Gurgaon / Gurugram', 'Noida', 'Greater Noida', 'Faridabad', 'Ghaziabad', 'All Delhi NCR'],
      },
      {
        id: 'TN',
        name: 'Tamil Nadu',
        cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'All Tamil Nadu'],
      },
      {
        id: 'TS',
        name: 'Telangana',
        cities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'All Telangana'],
      },
      {
        id: 'GJ',
        name: 'Gujarat',
        cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'All Gujarat'],
      },
      {
        id: 'UP',
        name: 'Uttar Pradesh',
        cities: ['Lucknow', 'Kanpur', 'Noida', 'Varanasi', 'Agra', 'Prayagraj', 'All Uttar Pradesh'],
      },
      {
        id: 'WB',
        name: 'West Bengal',
        cities: ['Kolkata', 'Howrah', 'Siliguri', 'Durgapur', 'Asansol', 'All West Bengal'],
      },
      {
        id: 'PB',
        name: 'Punjab',
        cities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'All Punjab'],
      },
      {
        id: 'KL',
        name: 'Kerala',
        cities: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'All Kerala'],
      },
      {
        id: 'GA',
        name: 'Goa',
        cities: ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'All Goa'],
      },
      {
        id: 'HR',
        name: 'Haryana',
        cities: ['Gurgaon', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 'All Haryana'],
      },
      {
        id: 'ALL_IN',
        name: 'All / Pan-India',
        cities: ['Nationwide / Multiple Cities'],
      },
    ],
  },
  {
    id: 'US',
    name: 'United States',
    states: [
      {
        id: 'CA',
        name: 'California',
        cities: ['San Francisco', 'Los Angeles', 'San Diego', 'San Jose', 'Oakland', 'All California'],
      },
      {
        id: 'NY',
        name: 'New York',
        cities: ['New York City', 'Buffalo', 'Rochester', 'Albany', 'All New York'],
      },
      {
        id: 'TX',
        name: 'Texas',
        cities: ['Austin', 'Dallas', 'Houston', 'San Antonio', 'Fort Worth', 'All Texas'],
      },
      {
        id: 'WA',
        name: 'Washington',
        cities: ['Seattle', 'Bellevue', 'Spokane', 'Tacoma', 'All Washington'],
      },
      {
        id: 'MA',
        name: 'Massachusetts',
        cities: ['Boston', 'Cambridge', 'Worcester', 'All Massachusetts'],
      },
      {
        id: 'IL',
        name: 'Illinois',
        cities: ['Chicago', 'Naperville', 'Evanston', 'All Illinois'],
      },
      {
        id: 'FL',
        name: 'Florida',
        cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'All Florida'],
      },
      {
        id: 'ALL_US',
        name: 'All / Nationwide US',
        cities: ['Nationwide / Multiple Cities'],
      },
    ],
  },
  {
    id: 'GB',
    name: 'United Kingdom',
    states: [
      {
        id: 'ENG',
        name: 'England',
        cities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Bristol', 'All England'],
      },
      {
        id: 'SCT',
        name: 'Scotland',
        cities: ['Edinburgh', 'Glasgow', 'Aberdeen', 'All Scotland'],
      },
      {
        id: 'WLS',
        name: 'Wales',
        cities: ['Cardiff', 'Swansea', 'Newport', 'All Wales'],
      },
      {
        id: 'ALL_UK',
        name: 'All / Pan-UK',
        cities: ['Nationwide / Multiple Cities'],
      },
    ],
  },
  {
    id: 'DE',
    name: 'Germany',
    states: [
      {
        id: 'BER',
        name: 'Berlin',
        cities: ['Berlin'],
      },
      {
        id: 'BAY',
        name: 'Bavaria',
        cities: ['Munich', 'Nuremberg', 'Augsburg', 'All Bavaria'],
      },
      {
        id: 'NRW',
        name: 'North Rhine-Westphalia',
        cities: ['Cologne', 'Düsseldorf', 'Dortmund', 'Essen', 'All NRW'],
      },
      {
        id: 'ALL_DE',
        name: 'All / Pan-Germany',
        cities: ['Nationwide / Multiple Cities'],
      },
    ],
  },
  {
    id: 'AE',
    name: 'United Arab Emirates',
    states: [
      {
        id: 'DXB',
        name: 'Dubai',
        cities: ['Dubai', 'Downtown', 'Marina / JLT', 'Deira'],
      },
      {
        id: 'AUH',
        name: 'Abu Dhabi',
        cities: ['Abu Dhabi City', 'Al Ain'],
      },
      {
        id: 'SHJ',
        name: 'Sharjah',
        cities: ['Sharjah City'],
      },
      {
        id: 'ALL_UAE',
        name: 'All / Pan-UAE',
        cities: ['Nationwide / Multiple Emirates'],
      },
    ],
  },
  {
    id: 'SG',
    name: 'Singapore',
    states: [
      {
        id: 'SG_ALL',
        name: 'Singapore',
        cities: ['Singapore City / Islandwide', 'Central Business District', 'Jurong / West', 'Changi / East'],
      },
    ],
  },
  {
    id: 'GLOBAL',
    name: 'Global / Multiple Countries',
    states: [
      {
        id: 'WW',
        name: 'Worldwide / Cross-Border',
        cities: ['Worldwide / Online'],
      },
      {
        id: 'NA',
        name: 'North America',
        cities: ['US & Canada'],
      },
      {
        id: 'EU',
        name: 'European Union',
        cities: ['Pan-EU'],
      },
      {
        id: 'APAC',
        name: 'Asia-Pacific',
        cities: ['Pan-APAC'],
      },
    ],
  },
];

export interface GeoValidationResult {
  isValid: boolean;
  errorMessage?: string;
  suggestedState?: string;
}

/**
 * Validates whether a given city exists in the selected country and state.
 */
export function validateGeographySelection(
  countryName: string,
  stateName: string,
  cityName: string,
): GeoValidationResult {
  const cNorm = countryName.trim().toLowerCase();
  const sNorm = stateName.trim().toLowerCase();
  const ciNorm = cityName.trim().toLowerCase();

  // If uncommitted / not specified: valid empty state
  if (!cNorm || cNorm === 'not specified' || cNorm === 'location not decided') {
    return { isValid: true };
  }

  const country = GEOGRAPHY_REGISTRY.find(
    (c) => c.name.toLowerCase() === cNorm || c.id.toLowerCase() === cNorm,
  );

  // If custom country not in preset list: allow with warning/flexibility
  if (!country) {
    return { isValid: true };
  }

  if (!sNorm || sNorm.includes('all') || sNorm.includes('nationwide') || sNorm === 'not specific') {
    return { isValid: true };
  }

  const state = country.states.find(
    (s) => s.name.toLowerCase() === sNorm || s.id.toLowerCase() === sNorm,
  );

  if (!state) {
    // Check if the state belongs to another known country
    for (const otherCountry of GEOGRAPHY_REGISTRY) {
      if (otherCountry.id !== country.id) {
        const found = otherCountry.states.find((s) => s.name.toLowerCase() === sNorm);
        if (found) {
          return {
            isValid: false,
            errorMessage: `'${stateName}' is a region in ${otherCountry.name}, not ${country.name}.`,
          };
        }
      }
    }
    return { isValid: true };
  }

  if (!ciNorm || ciNorm.includes('all') || ciNorm.includes('nationwide') || ciNorm === 'not specific') {
    return { isValid: true };
  }

  const cityMatchesState = state.cities.some(
    (c) => c.toLowerCase() === ciNorm || ciNorm.includes(c.toLowerCase()) || c.toLowerCase().includes(ciNorm),
  );

  if (!cityMatchesState) {
    // Check if the city belongs to another state in the same country
    for (const otherState of country.states) {
      if (otherState.id !== state.id) {
        const foundCity = otherState.cities.find(
          (c) => c.toLowerCase() === ciNorm || ciNorm.includes(c.toLowerCase()) || c.toLowerCase().includes(ciNorm),
        );
        if (foundCity) {
          return {
            isValid: false,
            errorMessage: `'${cityName}' is located in ${otherState.name}, not ${state.name}. Please select a valid city in ${state.name} or change state to ${otherState.name}.`,
            suggestedState: otherState.name,
          };
        }
      }
    }
  }

  return { isValid: true };
}
