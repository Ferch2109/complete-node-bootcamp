const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});

const app = require('./app');
const port = process.env.PORT;

// NOTE: Start server
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
