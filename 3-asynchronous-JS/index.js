const fs = require('fs');
const superagent = require('superagent');

// Hell Callback
/* fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
        if (err) return console.log(err.message);
        console.log(res.body.message);

        fs.writeFile('dog-img.txt', res.body.message, err => {
            console.log('Dog image file saved!')
        });
    });
}); */

// Then
/* fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then(res => {
        console.log(res.body.message);

        fs.writeFile('dog-img.txt', res.body.message, err => {
            console.log('Dog image file saved!')
        });
    })
    .catch(err => console.log(err.message));
}); */


// Promise function
const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            // Returned data from the Promise object (error case).
            if (err) reject('I could not find that file 🥺');

            // Whatever we pass to the resolve function will be
            // the returned data from the Promise object (success case).
            resolve(data);
        });
    });
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('I could not find that file 🥺');
            resolve('Sucess! 🐶');
        })
    });
}

/* readFilePro(`${__dirname}/dog.txt`)
    .then(data => {
        console.log(`Breed: ${data}`);
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    }).then(res => {
        console.log(res.body.message);
        return writeFilePro('dog-img.txt', res.body.message);
    })
    .then(() => console.log('Dog image file saved!'))
    .catch(err => console.log(err.message));
 */

// Async/Await
const getDogPic = async() => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const response = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(response.body.message);

        await writeFilePro('dog-img.txt', response.body.message);
        console.log('Dog image file saved! 🐶');
    } catch(error) {
        console.log(error);
    }
}

getDogPic();