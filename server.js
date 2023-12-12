const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

function getInstanceNumber() {
  try {
    const instanceNumber = fs.readFileSync('/usr/src/app/instance.txt', 'utf-8');
    console.log(`instanceNumber ${instanceNumber}`);
    const nextInstanceNumber = parseInt(instanceNumber, 10) + 1;
    fs.writeFileSync('/usr/src/app/instance.txt', nextInstanceNumber.toString());
    return instanceNumber;
  } catch (error) {
    console.error('Error reading/updating instance number:', error.message);
    return 1;
  }
}

const instanceNumber = getInstanceNumber();

app.get('/', (req, res) => {
  res.send(`Hello from instance ${instanceNumber}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} for instance ${instanceNumber}`);
});
