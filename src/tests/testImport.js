const axios = require("axios");

async function testImport() {
  const res = await axios.post("http://localhost:3000/api/zaragoza/import");
  console.log(res.data);
}
testImport();