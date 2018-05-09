
module.exports = {

  // Todo: document
  normalize: s => {
    s = s.replace(/ /g, '_'); // eslint-disable-line no-useless-escape
    s = s.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_'); // eslint-disable-line no-useless-escape
    return s;
  }
};
