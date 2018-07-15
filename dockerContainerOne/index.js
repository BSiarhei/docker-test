let serialNumber = 0;

setInterval(() => {
    console.log(`Docker container one: log ${serialNumber}`);
    serialNumber++;
}, 20 * 1000);
