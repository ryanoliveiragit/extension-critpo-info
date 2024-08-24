export interface Data {
    id: number;
    name: string;
    symbol: string;
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
    id: number;
    name: string;
    symbol: string;
    slug: string;
    category: string;
    description: string;
    logo: string;
    date_added: string;
    date_launched: string;
    infinite_supply: boolean;
    is_hidden: number;
    platform: null;
    self_reported_circulating_supply: number | null;
    self_reported_market_cap: number | null;
    self_reported_tags: string[] | null;
    subreddit: string;
    tag_groups: string[];
    tag_names: string[];
    tags: string[];
    twitter_username: string;
  }
 export interface CryptoAPIDatailsResponse {
    status: Status;
    data: {
      [key: string]: Data;
    };
  }