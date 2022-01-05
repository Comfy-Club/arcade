import app from './app';
import TablesConfig from './config/Tables';

const table = new TablesConfig();
const port = process.env.PORT || 3000;

table.init();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
