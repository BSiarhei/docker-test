let serialNumber = 0;

setInterval(() => {
    console.log(`First docker container: log ${serialNumber}`);
    serialNumber++;
}, 10 * 1000);
