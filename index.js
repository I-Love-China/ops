// import mysqldump from 'mysqldump';
const mysqldump = require('mysqldump')

// dump the result straight to a compressed file
mysqldump({
    connection: {
        host: '192.168.1.23',
        user: 'root',
        password: '1qa@WS3ed',
        database: 'oms-system',
    },
    dumpToFile: './dump.sql',
    compressFile: false,
});
