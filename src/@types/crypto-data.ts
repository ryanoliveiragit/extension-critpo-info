
interface Status {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
    notice: string | null;
  }
  
  interface Quote {
    price: number;
    volume_24h: number;
    volume_change_24h: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_30d: number;
    percent_change_60d: number;
    percent_change_90d: number;
    market_cap: number;
    market_cap_dominance: number;
    fully_diluted_market_cap: number;
    tvl: number | null;
    tvl_ratio: number | null;
  }
  
  export interface Data {
    logo: string | undefined;
    id: number;
    name: string;
    symbol: string;
    tag?: string;
    slug: string;
    num_market_pairs: number;
    circulating_supply: number;
    max_supply: number;
    date_added: string;
    is_active: number;
    is_fiat: number;
    infinite_supply: boolean;
    last_updated: string;
    platform: null;
    tags: string[];
    total_supply: number;
    quote: {
      USD: Quote;
    };
  }
  interface Status {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
    notice: string | null;
  }
  
  
  
 export interface CryptoAPIResponse {
    status: Status;
    data: {
      [key: string]: Data;
    };
  }
  