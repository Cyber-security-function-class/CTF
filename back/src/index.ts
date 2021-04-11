'use strict'

import {createServer} from 'http'
import app from './app'

const port = process.env.PORT || 7000;

(async () => {
    createServer(app).listen(port,() => {
        console.info(`Server running on port ${port}`)
    });
})();