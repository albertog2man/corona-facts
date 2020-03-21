import cache from "memory-cache";
import fetch from "node-fetch";
import cheerio from "cheerio";

// Time between webscraps
const TEN_SECONDS_IN_MILLISECONDS = 10000;
class ScrapperService {
  async fetch_data() {
    if (this.cacheIsFresh()) {
      const data = this.fetchCache();
      if (data) {
        return data;
      } else {
        return this.fetchNewData();
      }
    } else {
      return this.fetchNewData();
    }
  }

  async fetchNewData() {
    const data = this.parseWhoData(await this.fetchWhoData());
    this.cacheNewData(data);
    return data;
  }

  cacheNewData(data) {
    cache.put("cachedData", data);
    cache.put("lastCached", Date.now());
  }

  fetchCache() {
    return cache.get("cachedData");
  }

  cacheIsFresh() {
    const lastCached = cache.get("lastCached");
    return lastCached && Date.now() - lastCached < TEN_SECONDS_IN_MILLISECONDS;
  }

  parseWhoData(who_data) {
    const $ = cheerio.load(who_data);
    let totalCases = $("div[class=maincounter-number]")
      .eq(0)
      .text();
    totalCases = this.extractInt(totalCases);

    let totalDeaths = $("div[class=maincounter-number]")
      .eq(1)
      .text();
    totalDeaths = this.extractInt(totalDeaths);

    let totalRecovered = $("div[class=maincounter-number]")
      .eq(2)
      .text();
    totalRecovered = this.extractInt(totalRecovered);

    const deathRate = (totalDeaths / totalCases) * 100;
    const recoveryRate = 100 - deathRate;

    return {
      totalCases: this.formatNumber(totalCases),
      totalDeaths: this.formatNumber(totalDeaths),
      totalRecovered: this.formatNumber(totalRecovered),
      deathRate: parseFloat(deathRate).toFixed(2),
      recoveryRate: parseFloat(recoveryRate).toFixed(2)
    };
  }

  async fetchWhoData() {
    const res = await fetch("https://www.worldometers.info/coronavirus/");
    return await res.text();
  }

  extractInt(html_string) {
    return parseInt(html_string.trim().replace(/,/g, ""), 10);
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
}

export default new ScrapperService();
