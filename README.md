![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Jest](https://img.shields.io/badge/-Jest-20232A?style=for-the-badge&logo=jest&logoColor=red)
![node.js](https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=nodedotjs&logoColor=green)
![Express](https://img.shields.io/badge/-Express-20232A?style=for-the-badge&logo=express&logoColor=yellow)
![Webpack](https://img.shields.io/badge/-webpack-20232A?style=for-the-badge&logo=webpack&logoColor=blueviolet)
![Babel](https://img.shields.io/badge/-Babel-20232A?style=for-the-badge&logo=babel&logoColor=yellow)

![AWS](https://img.shields.io/badge/Amazon_AWS-{232F3E}?style=for-the-badge&logo=amazonaws&logoColor=white)
![eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Trello](https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white)

![white_lotus_banner](docs/img/whiteLotus_banner.png)


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about">About</a></li>
    <li>
      <a href="#app">Application Components</a>
      <ul>
        <li><a href="#po">Product Overview</a></li>
        <li><a href="#qa">Questions & Answers</a></li>
        <li><a href="#rr">Ratings & Reviews</a></li>
      </ul>
    </li>
    <li>
      <a href="#setup">Setup</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

# About

We are a fashion e-commerce app with an emphasis on product detail. White Lotus allows users to browse styles, track ratings and reviews, and submit related questions and answers, all on one page. 

This app was developed according to the specifications and requirements outline by project’s stakeholders, and represents the developers’ fully realized concept for a front end capstone.

# App Components <a name="app"></a>

![white lotus gif](docs/img/whitelotusdemo3.gif)

## Product Overview <a name="po"></a>

- Developed by [Jan Deocampo](https://github.com/Darumin)

## Questions & Answers <a name="qa"></a>

- Developed by [Aaron Tran](https://github.com/aaronlamtran)

The Q&A provides the questions and answers posted by users and sellers. 

All questions and answers are sorted by usefulness that is voted by users while the answers from sellers are listed on the top. 

The Live Search enables searching questions real time. 

The inline modals also allow user to submit questions and post answers to the existing questions. Meanwhile, the form authentication feature in the modal prevents dummy data from being sent to the API. 

## Ratings & Reviews <a name="rr"></a>

- Developed by [Huong Nguyen](https://github.com/huongtran1993)

- The R&R allows users to view a breakdown of the ratings, browse the reviews, and submit reviews for the current product. 

- Users can to filter for reviews based on ratings, sort the review list, and search for reviews with specific keywords. Users can also mark a review as helpful or submit a new review. Upon submission, the review list will automatically update to display the new view without refreshing the page. Lastly, users can report a review, which will remove the review from the review list permanently.

# Setup
## Installation
1. Clone the repository.
```bash
git clone https://github.com/hr-rfp55-iroh/FEC
```
2. Navigate into the root directory.
```bash
cd FEC
```
3. Make a copy of the file `config.example.js` and rename to `config.js`
4. Assign the `API_KEY` variable to your GitHub Auth Token.
5. Install dependencies.
```bash
npm install
```
6. Build the webpack bundle
```bash
npm run build
```
7. Open up another terminal, start the server
```bash
npm start
```

8. Navigate to [localhost:3004](http://localhost:3004) in the browser





