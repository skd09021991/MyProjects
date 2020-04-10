

## .env config
 npm run start = local and development mode,
 npm run build or npm run build:prod =  Production build,
 npm run build:staging = staging build,
 
 npm run start:prod for production testing purposes, 








This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify




### 'Setup for the SSR '

For SSR (server side rendering ) we are following these steps



1- Replace metatags in public/index.html that should be dynamic with a unique string, so that they can be identified and replaced server side

2-For routes on the server, read in build/index.html then replace these strings with the dynamically set tags before we serve the page.






Step 1 : - add meta tags in index.html file 

<!-- in public/index.html -->
<title>$OG_TITLE</title>
<meta name="description"        content="$OG_DESCRIPTION" />
<meta property="og:title"       content="$OG_TITLE" />
<meta property="og:description" content="$OG_DESCRIPTION" />
<meta property="og:image"       content="$OG_IMAGE" />


Step 2 - 

Now in server.js, we’ll handle each route separately. For each route that we want to handle, we’ll read in the index.html file, and replace the unique string that we set originally.
In Node, we can use the fs package to read and parse strings within each file. My server.js file now looks something like this:

### " For installing express "

npm install express

### " read in the index.html file "

  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
 ###  replace the special strings with server generated strings

    data = data.replace(/\$OG_TITLE/g, 'Home Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "Home page description");
    result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
    response.send(result);
  });
});


### "for building the project through ssr"

npm install

npm run build

node server.js

Then visit localhost:5000 in the browser.