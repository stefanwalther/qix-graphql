
// The idea of a schema cache has been introduced here as generating a schema is pretty expensive as the app
// has to be opened with data, opening the data without the data will not return the table_and_keys properly.
//
// For now, this is a very simple implementation, which can
// a) either be completely removed if the engine can return the meta data without opening the app with data
// b) be extended in a multi-server environment with e.g. a Redis cache

class SchemaCache {
  constructor() {
    this.cache = {};
  }

  find(qDocId) {
    if (this.cache[qDocId]) {
      return this.cache[qDocId];
    }
  }

  /**
   * Returns if the doc with the given qDocId exists in cache or not.
   * @param qDocId
   * @returns {boolean}
   */
  exists(qDocId) {
    return (this.cache[qDocId] !== (null || undefined));
  }

  /**
   * Adds or replaces a cache.
   * @param qDocId
   */
  add(qDocId, val) {
    this.cache[qDocId] = val;
  }

  count() {
    return Object.keys(this.cache).length;
  }

  reset() {
    this.cache = {};
  }
}

module.exports = new SchemaCache();
