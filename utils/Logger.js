const fs = require('fs');
const fsPromises = require('fs').promises;

class Logger {
    constructor(logFolder) {
        this.logFolder = logFolder;
    }

    async log(message) {
        const d = new Date();
        const month = getMonthName(d.getMonth());
        const directoryName = month + " " + d.getFullYear();
        let err = false;

        return new Promise(async (resolve, reject) => {
            await fsPromises.access(this.logFolder).catch(e => {
                reject('Specified log folder does not exist.');
                err = true;
            });

            if (err) return;

            const folderLocation = `${this.logFolder}/${directoryName}`;
            const logFileName = `${d.getDate()}-${d.getMonth()}.txt`;
            let currentFileData = '';

            // Make dir if it doesnt exist yet, and check if a file already exists in the dir.
            await fsPromises.access(folderLocation).catch(async e => await fsPromises.mkdir(folderLocation));
            await fsPromises.access(`${folderLocation}/${logFileName}`).catch(async e => err = true);

            // Read file since it already exists, and use that data before writing the new data.
            if (!err)
                currentFileData = await fsPromises.readFile(`${folderLocation}/${logFileName}`);
            
            const minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
            const newFileData = `${currentFileData}\n\n ${'-'.repeat(50)}\n\n (${d.getHours()}:${minutes}) ${message}`;
            await fsPromises.writeFile(`${folderLocation}/${logFileName}`, newFileData);

            resolve(message);
        })
    }
}

function getMonthName(number) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return monthNames[number];
}

module.exports = Logger;