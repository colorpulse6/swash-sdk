interface FeatureFlag {
    id: string;
    name: string;
    enabled: boolean;
    targeting?: {
        default: boolean;
        rules: {
            condition: string;
            enabled: boolean;
        }[];
    };
}
declare class SwashFeatureFlags {
    private readonly apiUrl;
    private readonly apiToken;
    private cache;
    private readonly cacheExpiration;
    private lastFetchTime;
    constructor(apiUrl: string, apiToken: string, cacheTime?: number);
    fetchFlags(): Promise<FeatureFlag[]>;
    refreshFlags(): Promise<FeatureFlag[]>;
    getFlag(flagId: string): FeatureFlag | undefined;
}
export default SwashFeatureFlags;
