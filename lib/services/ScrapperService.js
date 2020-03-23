import cache from "memory-cache";
import fetch from "node-fetch";
import cheerio from "cheerio";

// Time between webscraps
const TEN_SECONDS_IN_MILLISECONDS = 30000;
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
    const whoMainPageData = this.parseWhoMainPageData(
      await this.fetchWhoMainPageData()
    );
    const worldWhoCountryData = this.parseWhoAgePageData(
      await this.fetchWhoAgePageData()
    );
    const data = { ...whoMainPageData, ...worldWhoCountryData };
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

  parseWhoAgePageData(who_data) {
    const $ = cheerio.load(who_data);

    let ageData = [];
    $(".table-condensed tr").each((i, elem) => {
      if (i !== 0 && i < 8) {
        let ageRange = $(elem)
          .find("td div strong")
          .first()
          .text();

        let ageDeathRate = $(elem)
          .find("td div strong")
          .eq(i == 1 ? 2 : 1)
          .text();

        ageData.push({ ageRange: ageRange, ageDeathRate: ageDeathRate });
      }
    });

    return { ageData: ageData };
  }

  async fetchWhoAgePageData() {
    const res = await fetch(
      "https://www.worldometers.info/coronavirus/coronavirus-age-sex-demographics/"
    );
    return await res.text();
  }

  parseWhoMainPageData(who_data) {
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

    let countryData = [];
    $("table#main_table_countries_today tr").each((i, elem) => {
      if (i !== 0) {
        let country_name = $(elem)
          .find("a")
          .html();

        if (country_name === "" || country_name === null) {
          country_name = $(elem)
            .find("td")
            .first()
            .text();
        }

        if (country_name !== "") {
          let country_cases = $(elem)
            .find("td")
            .eq(1)
            .text();
          country_cases = this.extractInt(country_cases);

          let cases_today = $(elem)
            .find("td")
            .eq(2)
            .text();

          let country_deaths = $(elem)
            .find("td")
            .eq(3)
            .text()
            .trim();
          country_deaths = this.extractInt(country_deaths);

          let deaths_today = $(elem)
            .find("td")
            .eq(4)
            .text();

          let country_active = $(elem)
            .find("td")
            .eq(6)
            .text();
          country_active = this.extractInt(country_active);

          countryData.push({
            country_name: country_name,
            country_cases: country_cases,
            country_active: country_active,
            cases_today: cases_today,
            country_deaths: country_deaths,
            deaths_today: deaths_today
          });
        }
      }
    });

    const deathRate = (totalDeaths / totalCases) * 100;
    const recoveryRate = 100 - deathRate;

    return {
      totalCases: this.formatNumber(totalCases),
      totalDeaths: this.formatNumber(totalDeaths),
      totalRecovered: this.formatNumber(totalRecovered),
      deathRate: parseFloat(deathRate).toFixed(2),
      recoveryRate: parseFloat(recoveryRate).toFixed(2),
      countryData: countryData
    };
  }

  async fetchWhoMainPageData() {
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
