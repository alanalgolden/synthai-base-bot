import cheerio from "cheerio";
import { NodeHtmlMarkdown } from "node-html-markdown";

// ! This was revised by Perplexity to work as a JavaScript module, so it may have bugs.

class Crawler {
  constructor(maxDepth = 2, maxPages = 1) {
    this.seen = new Set();
    this.pages = [];
    this.queue = [];
    this.maxDepth = maxDepth;
    this.maxPages = maxPages;
  }

  async crawl(startUrl) {
    // Add the starting URL to the Queue
    this.addToQueue(startUrl);

    // While the queue is not empty and we haven't reached the max number of pages, keep crawling
    while (this.shouldContinueCrawling()) {
      // Retrieves the next URL from the queue and it's cooresponding depth
      const { url, depth } = this.queue.shift();

      // Checks if the depth is too deep or if the URL has been scene
      if (this.isTooDeep(depth) || this.isAlreadySeen(url)) continue;

      // If it makes it here, add it to the seen dataset
      this.seen.add(url);

      // This makes the request to the URL and returns the HTML
      const html = await this.fetchPage(url);

      // Parses the HTML and adds it to the pages dataset
      this.pages.push({ url, content: this.parseHtml(html) });

      // ! I want to manually control the queue (at least for testing), so I'm commenting this out.
      // This extras new URLs from the HTML and adds them to the queue
      // this.addNewUrlsToQueue(this.extractUrls(html, url), depth);
    }

    return this.pages;
  }

  isTooDeep(depth) {
    return depth > this.maxDepth;
  }

  isAlreadySeen(url) {
    return this.seen.has(url);
  }

  shouldContinueCrawling() {
    return this.queue.length > 0 && this.pages.length < this.maxPages;
  }

  addToQueue(url, depth = 0) {
    this.queue.push({ url, depth });
  }

  addNewUrlsToQueue(urls, depth) {
    this.queue.push(...urls.map((url) => ({ url, depth: depth + 1 })));
  }

  async fetchPage(url) {
    try {
      const response = await fetch(url);
      return await response.text();
    } catch (error) {
      console.error(`Failed to fetch ${url}: ${error}`);
      return "";
    }
  }

  parseHtml(html) {
    const $ = cheerio.load(html);
    $("a").removeAttr("href");
    return NodeHtmlMarkdown.translate($.html());
  }

  extractUrls(html, baseUrl) {
    const $ = cheerio.load(html);
    const relativeUrls = $("a")
      .map((_, link) => $(link).attr("href"))
      .get();
    return relativeUrls.map(
      (relativeUrl) => new URL(relativeUrl, baseUrl).href
    );
  }
}

export { Crawler };
