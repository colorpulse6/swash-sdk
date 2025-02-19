"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class SwashFeatureFlags {
    constructor(apiUrl, apiToken, cacheTime = 60000) {
        this.cache = [];
        this.lastFetchTime = null;
        this.apiUrl = apiUrl;
        this.apiToken = apiToken;
        this.cacheExpiration = cacheTime; // Default: 60 seconds
    }
    // ✅ Fetch all feature flags with caching
    fetchFlags() {
        return __awaiter(this, void 0, void 0, function* () {
            const now = Date.now();
            // ✅ Return cached data if it's still valid
            if (this.lastFetchTime && now - this.lastFetchTime < this.cacheExpiration) {
                console.log("⚡ Returning cached feature flags");
                return this.cache;
            }
            try {
                const response = yield axios_1.default.get(`${this.apiUrl}/flags`, {
                    headers: { Authorization: `Bearer ${this.apiToken}` },
                });
                this.cache = response.data; // Store in cache
                this.lastFetchTime = now; // Update last fetch time
                console.log("✅ Fetched feature flags from API");
                return this.cache;
            }
            catch (error) {
                console.error("🚨 Error fetching feature flags:", error);
                return this.cache.length ? this.cache : []; // Return cache if available
            }
        });
    }
    // ✅ Manually refresh flags (force fetch)
    refreshFlags() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("🔄 Manually refreshing feature flags...");
            this.lastFetchTime = null; // Invalidate cache
            return this.fetchFlags();
        });
    }
    // ✅ Get a specific flag from cache
    getFlag(flagId) {
        return this.cache.find((flag) => flag.id === flagId);
    }
}
exports.default = SwashFeatureFlags;
