let serialNumber = 0;

setInterval(() => {
    console.log(`Second docker container: log ${serialNumber}`);
    serialNumber++;
}, 10 * 1000);
