const app = require('./routes');

const port = 3004;

app.listen(port, () => { console.log(`Successfully running on port ${port}`); });
