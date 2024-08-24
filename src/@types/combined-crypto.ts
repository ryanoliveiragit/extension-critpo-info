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
  interface Status {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
    notice: string | null;
  }
  
  export interface CryptoAPIDatailsResponse {
    status: Status;
    data: {
      [key: string]: Data;
    };
  }
  
  // Tipo de resposta combinada
  export interface CombinedCryptoData {
    cryptoData: Data;
    tickerData: CryptoAPIDatailsResponse;
  }
  