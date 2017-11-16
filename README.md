Repo Content
=====================

An app that lists the content of the origin repository is based on.

### Usage

Clone the boilerplate and create your own git repo.

```
git clone git@github.com:jonnyk20/repo-content.git
cd repo-content
git remote rm origin
npm install
npm start
open http://localhost:3000
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
