
module.exports = {

  /**
   * Normalize table-names and field-names to be used in the GraphQL editor.
   *
   * Spaces and special characters will all be replaced with the underscore character ("_").
   *
   * @Todo: The entire function should probable be renamed to "sanitize" which better describes what it does.
   *
   * @param {String} s - String to be checked.
   * @returns {String} - The normalized string.
   */
  normalize: s => {
    s = s.replace(/ /g, '_'); // eslint-disable-line no-useless-escape
    s = s.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_'); // eslint-disable-line no-useless-escape
    return s;
  }
};
