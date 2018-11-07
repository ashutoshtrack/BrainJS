const brain = require("brain.js");
const fs = require("fs");
const networkPath = "trainedhardsoftwares.json";

// var network = new brain.NeuralNetwork();

// network.train([
//   { input: [1, 2], output: [1] },
//   { input: [1, 3], output: [1] },
//   { input: [2, 3], output: [0] },
//   { input: [2, 4], output: [1] }
// ]);

// var output = network.run([1, 4]);






// var net = new brain.recurrent.LSTM();

// net.train([
//   "doe, a deer, a female deer",
//   "ray, a drop of golden sun",
//   "me, a name I call myself"
// ]);

// var output = net.run("deer");

// console.log(`Probss: ${output}`);










const data = require("./data.json");

const trainingData = data.map(item => ({
  input: item.text,
  output: item.category
}));

const network = new brain.recurrent.LSTM();

let networkData = null;
if (fs.existsSync(networkPath)) {
  console.log("here");
  networkData = JSON.parse(fs.readFileSync(networkPath));
  network.fromJSON(networkData);
} else {
  network.train(trainingData, {
    iterations: 2000
  });
  fs.writeFileSync(networkPath, JSON.stringify(network.toJSON(), undefined, 2));
}

const output = network.run("bugs");

console.log(`Category: ${output}`);
