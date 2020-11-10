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

const getDog = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(` Breed: ${data}`);
    const res1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res4 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1, res2, res3, res4]);
    const images = all.map((el) => el.body.message);
    await writeFilePromise("new-dog.txt", images.join("\n\n"));
    console.log("file written");
  } catch (error) {
    console.log(error);
    throw error;
  }
  return "Everything went Ok";
};
(async () => {
  try {
    console.log("1: Phase one of getting data");
    console.log("2: Phase two of getting data");
    const x = await getDog();
    console.log(x);
  } catch (error) {
    console.log("Error found");
  }
})();
