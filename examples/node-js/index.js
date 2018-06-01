const client = require('graphql-client')({
  url: 'http://localhost:3004/global/graphql'
});

async function getDocs() {
  const query = `{
              docs {
                qDocId
                qDocName
              }
            }`;
  const vars = '';
  return await client.query(query, vars);
}

(async () => {
  let result = await getDocs();
  console.log('');
  console.log('Apps in the current environment:\n');
  result.data.docs.forEach(item => {
    console.log(`\t- ${item.qDocName}`);
  });
  console.log('');
})();

module.exports = {
  getDocs
};
