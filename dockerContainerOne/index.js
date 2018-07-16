let serialNumber = 0;

setInterval(() => {
    console.log(`Docker container one: log ${serialNumber}`);
    serialNumber++;
}, 10 * 1000);
