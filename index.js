const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, data) => {
      if (error) reject("cannot fetch the dogs");
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("could not write the file");
      resolve("data written");
    });
  });
};

readFilePromise(`${__dirname}/dog.txt`)
  .then((data) => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePromise("new-dog.txt", res.body.message);
  })
  .then(() => {
    console.log("data written successfuly");
  })
  .catch((err) => {
    console.log(err.message);
  });
