module.exports = {

  /**
   * Sanitize table-names and field-names to be used in the GraphQL editor.
   *
   * Spaces and special characters will all be replaced with the underscore character ("_").
   *
   * @param {String} s - String to be checked.
   * @returns {String} - The normalized string.
   */
  sanitize: s => {
    s = s.replace(/ /g, '_'); // eslint-disable-line no-useless-escape
    s = s.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_'); // eslint-disable-line no-useless-escape
    return s;
  },

  sort_objects: src => {
    const keys = Object.keys(src);
    keys.sort();
    return keys.reduce((target, key) => {
      target[key] = src[key];
      return target;
    }, {});
  }
};
