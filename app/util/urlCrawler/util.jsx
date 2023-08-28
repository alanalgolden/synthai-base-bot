import { NodeHtmlMarkdown } from "node-html-markdown";
import cheerio from "cheerio";

class Crawler {
  constructor(maxDepth = 2, maxPages = 1) {
    this.maxDepth = maxDepth;
    this.maxPages = maxPages;
    this.seen = new Set();
    this.pages = [];
    this.queue = [];
  }

  async crawl(startUrl) {
    // Add the URL to the Queue
    this.addToQueue(startUrl);

    // Loop through the queue until it is empty or we have reached the max pages
    while (this.shouldContinueCrawling()) {
      // Dequeue the next URL and depth
      const { url, depth } = this.queue.shift();

      // Skip if we have already seen this URL, or if it is too deep
      if (this.isTooDeep(depth) || this.isAlreadySeen(url)) continue;

      // Add the URL to the seen set
      this.seen.add(url);

      // Fetch the HTML
      const html = await this.fetchPage(url);

      // Parse the HTML and add it to the pages array
      this.pages.push({ url, content: this.parseHtml(html) });

      // Extract URLs from the page and add them to the queue
      this.addNewUrlsToQueue(this.extractUrls(html, url), depth);
    }

    // Return the pages array
    return this.pages;
  }

  // Add URLs to Queue
  addToQueue(url, depth = 0) {
    this.queue.push({ url, depth });
  }

  // Loop for each URL and add it to the queue
  shouldContinueCrawling() {
    return this.queue.length > 0 && this.pages.length < this.maxPages;
  }

  // Check if too deep
  isTooDeep(depth) {
    return depth > this.maxDepth;
  }

  // Check if already seen
  isAlreadySeen(url) {
    return this.seen.has(url);
  }

  // Add new URLs to queue
  async fetchPage(url) {
    try {
      const response = await fetch(url);
      return await response.text();
    } catch (error) {
      console.error(`Failed to fetch ${url}: ${error}`);
      return "";
    }
  }

  // Parse HTML from page
  parseHtml(html) {
    const $ = cheerio.load(html);
    $("a").removeAttr("href");
    return NodeHtmlMarkdown.translate($.html());
  }

  // Extract URLs from page
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

module.exports = Crawler;
