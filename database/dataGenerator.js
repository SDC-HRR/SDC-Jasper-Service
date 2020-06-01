/* eslint-disable no-shadow */
/* eslint-disable no-loop-func */
/* eslint-disable no-console */
const faker = require('faker');
const fs = require('fs');

const options = ['Overwhelmingly Positive', 'Very Positive', 'Positive', 'Mostly Positive', 'Mixed', 'Mostly Negative', 'Negative', 'Very Negative', 'Overwhelmingly Negative'];

const imgOptions = ['https://fecpictures.s3.us-east-2.amazonaws.com/pics/1.jpg', 'https://fecpictures.s3.us-east-2.amazonaws.com/pics/2.jpg', 'https://fecpictures.s3.us-east-2.amazonaws.com/pics/3.jpg', 'https://fecpictures.s3.us-east-2.amazonaws.com/pics/4.jpg', 'https://fecpictures.s3.us-east-2.amazonaws.com/pics/5.jpg', 'https://fecpictures.s3.us-east-2.amazonaws.com/pics/6.jpg', 'https://fecpictures.s3.us-east-2.amazonaws.com/pics/7.jpg', 'https://fecpictures.s3.us-east-2.amazonaws.com/pics/8.jpg', 'https://fecpictures.s3.us-east-2.amazonaws.com/pics/9.jpg', 'https://fecpictures.s3.us-east-2.amazonaws.com/pics/10.jpg', 'https://fecpictures.s3.us-east-2.amazonaws.com/pics/11.jpg', 'https://fecpictures.s3.us-east-2.amazonaws.com/pics/12.jpg', 'https://fecpictures.s3.us-east-2.amazonaws.com/pics/13.jpg', 'https://fecpictures.s3.us-east-2.amazonaws.com/pics/14.jpg', 'https://fecpictures.s3.us-east-2.amazonaws.com/pics/15.jpg'];

const vidOptions = [{video: 'https://www.youtube.com/embed/ftLzQefpBvM',thumbnail: 'https://i.ytimg.com/vi/ftLzQefpBvM/mqdefault.jpg'},{video: 'https://www.youtube.com/embed/JMBUWQ1ipZM',thumbnail: 'https://i.ytimg.com/vi/JMBUWQ1ipZM/mqdefault.jpg'},{video: 'https://www.youtube.com/embed/ZWzkgKPZWcw',thumbnail: 'https://i.ytimg.com/vi/ZWzkgKPZWcw/mqdefault.jpg'},{video: 'https://www.youtube.com/embed/-gsXevAjNbw',thumbnail: 'https://i.ytimg.com/vi/-gsXevAjNbw/mqdefault.jpg'},{video: 'https://www.youtube.com/embed/nCzwGVKpjpo',thumbnail: 'https://i.ytimg.com/vi/nCzwGVKpjpo/mqdefault.jpg'},{video: 'https://www.youtube.com/embed/s8ulsVULANg',thumbnail: 'https://i.ytimg.com/vi/s8ulsVULANg/mqdefault.jpg'},{video: 'https://www.youtube.com/embed/15-7tBKVPBA',thumbnail: 'https://i.ytimg.com/vi/15-7tBKVPBA/mqdefault.jpg'},];

const splashOptions = ['https://fecpictures.s3.us-east-2.amazonaws.com/pics/16.jpg', 'https://fecpictures.s3.us-east-2.amazonaws.com/pics/17.jpg', 'https://fecpictures.s3.us-east-2.amazonaws.com/pics/18.jpg', 'https://fecpictures.s3.us-east-2.amazonaws.com/pics/19.jpg', 'https://fecpictures.s3.us-east-2.amazonaws.com/pics/20.jpg'];


const writer = fs.createWriteStream('./database/data.csv');
writer.write('description|developer|images|percentage|publisher|release_date|review_total|reviews_general|splash|tags|thumbnails|title|videos\n');

const seeder = () => {
  let counter = 1;
  const write = () => {
    let ok = true;
    do {
      if (counter % 10000 === 0) {
        console.log(counter);
      }
      const pics = [];
      for (let i = 0; i < Math.ceil(Math.random() * 10); i += 1) {
        pics.push(imgOptions[Math.floor(Math.random() * 14)]);
      }

      const tagList = [];
      for (let i = 0; i < 20; i += 1) {
        tagList.push(faker.company.bsAdjective());
      }

      const vids = [];
      for (let i = 0; i < Math.ceil(Math.random() * 3); i += 1) {
        vids.push(vidOptions[Math.floor(Math.random() * 6)]);
      }
      const title = faker.commerce.productName();
      const splash = splashOptions[Math.floor(Math.random() * 3)];
      const description = faker.lorem.paragraph();
      const reviewsGeneral = options[Math.floor(Math.random() * 9)];
      const reviewTotal = faker.random.number();
      const releaseDate = faker.date.past();
      const developer = faker.company.companyName();
      const publisher = faker.company.companyName();
      const tags = tagList;
      const percentage = Math.ceil(Math.random() * 100);
      const videos = vids.map(video => video.video);
      const thumbnails = vids.map(video => video.thumbnail);
      const images = pics;

      const JSONData = `"${description}"|"${developer}"|"${JSON.stringify(images)}"|${percentage}|"${publisher}"|"${releaseDate}"|"${reviewsGeneral}"|${reviewTotal}|"${splash}"|"${JSON.stringify(tags)}"|"${JSON.stringify(thumbnails)}"|"${title}"|"${JSON.stringify(videos)}"`;
      counter += 1;
      if (counter === 10000001) {
        writer.write(JSONData + "\n");
      } else {
        ok = writer.write(JSONData + "\n");
      }
    } while (counter < 10000001 && ok);
    if (counter < 10000001) {
      writer.once('drain', write);
    }
  };
  write();
};

seeder();
