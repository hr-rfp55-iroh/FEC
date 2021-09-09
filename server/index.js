const app = require('./routes.js');

const port = 3004;

app.listen(port, () => {
  console.log(`Successfully running on port ${port}`);
});