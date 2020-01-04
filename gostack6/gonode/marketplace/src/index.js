const dotenv = require('dotenv');

dotenv.config();
const app = require('./server');

const PORT = 3333 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server rendering in port ${PORT}`);
});
