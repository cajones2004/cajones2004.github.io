// will be an interactive command line program that will add an article to the json entry

// welcome
// get date
// ask for title
// ask for category
// ask for number of images
// for each image ask for filepath - first image will be cover image
// ask for path to text file containing article content

// get existing JSON
// push to the articles array a new JSON object for this new article
// overwrite previous JSON with new JSON

const fs = require('fs')
const prompt = require('prompt-sync')();
const currentJSON = require('./src/articles.json')

console.log('\n//// Add article to overwatch-news ////\n')
const title = prompt('What is the title of the new article? ')
const tag = prompt('What category should the new article be in? [overwatch league, power rankings, run it back, overwatch world cup] ')
const num_images = prompt('How many images will accompany this article? ')
const imgPathArray = []
console.log('\n--> Please ensure all image files are already in /src/images before continuing')
for (let i = 0; i < num_images; i++) {
    imgPathArray.push(prompt('Please enter the filename of image ' + (i+1) + ': '))
}
const contentPath = prompt('Please enter the file path to a text file containing article content: ')

let lines = ""
try {
    // read contents of the file
    const data = fs.readFileSync(contentPath, 'UTF-8');

    // split the contents by new line
    lines = data.split(/\r?\n/);

    // print all lines
    lines.forEach((line) => {
        console.log(line);
    });
} catch (err) {
    console.error(err);
}

let JSONlines = ""
lines.forEach((line) => {
    JSONlines += (line + '\n')
})

console.log(JSONlines)
console.log('\nModifying JSON to add new article... \n')

currentJSON.number_of_articles += 1

var d = new Date();
let month = String(d.getMonth()+1)
if (d.getMonth()+1 < 10) {
    month = "0" + month
}
dateString = "" + String(d.getFullYear()) + month + String(d.getDate())

newArticleJSON = (
    {
        "date": dateString,
        "title": title,
        "number_of_images": num_images,
        "tag": tag,
        "images": [],
        "content": JSONlines
        }
)
for (let img of imgPathArray) {
    newArticleJSON.images.push(img)
}

console.log(newArticleJSON)
console.log('\n')

currentJSON.articles.unshift(newArticleJSON)
fs.writeFile('./src/articles.json', JSON.stringify(currentJSON), function (err) {
    if (err) return console.log(err);
    console.log('Article successfully added to ./src/articles.json\n');
  });
fs.writeFile('./public/articles.json', JSON.stringify(currentJSON), function (err) {
    if (err) return console.log(err);
    console.log('Article successfully added to ./src/articles.json\n');
  });
console.log('\n')
console.log('To update the website, do the following: ')
console.log('--> Commit this change to the dev branch with \'git commit -m "added new article" \'')
console.log('--> Deploy the site with \'npm run deploy\'\n')

