import cache from "memory-cache";
import fetch from "node-fetch";
import cheerio from "cheerio";

class ScrapperService {
  async fetch_data() {
    const $ = cheerio.load(await this.fetch_from_who());
    let totalCases = $("div[class=maincounter-number]")
      .eq(0)
      .text();
    totalCases = this.extract_int(totalCases);

    let totalDeaths = $("div[class=maincounter-number]")
      .eq(1)
      .text();
    totalDeaths = this.extract_int(totalDeaths);

    let totalRecovered = $("div[class=maincounter-number]")
      .eq(2)
      .text();
    totalRecovered = this.extract_int(totalRecovered);

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

  async fetch_from_who() {
    const res = await fetch("https://www.worldometers.info/coronavirus/");
    return await res.text();
  }

  extract_int(html_string) {
    return parseInt(html_string.trim().replace(/,/g, ""), 10);
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
}

export default new ScrapperService();
