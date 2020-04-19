![Demo mobile](https://github.com/adriano-machado/demo-assets/blob/master/fastfeetDemo.gif)
<img src="https://github.com/adriano-machado/demo-assets/blob/master/fastFeetWeb.jpg" alt="app web" width="550" >
<br>
 <p align="center"> <a  href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
   <a  href="#information_source-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a  href="#memo-license">License</a> </p>


## :rocket: Technologies

This project was developed at the [RocketSeat GoStack Bootcamp](https://rocketseat.com.br/bootcamp) with the following technologies:

- [NodeJS](https://nodejs.org)
- [ReactJS](https://reactjs.org/)
- [React Native](https://facebook.github.io/react-native/)
- [react-navigation](https://reactnavigation.org/)
- [Redux](https://redux.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)
- [styled-components](https://www.styled-components.com/)
- [Axios](https://github.com/axios/axios)
- [Immer](https://github.com/immerjs/immer)
- [date-fns](https://date-fns.org/)
- [Reactotron](https://infinite.red/reactotron)
- [VS Code][vc] with [EditorConfig][vceditconfig] and [ESLint][vceslint]
- And another bunch of packages....

## :information_source: How To Use 
####  - The mobile app only runs on Android! - 
To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v10.16][nodejs] or higher + [Yarn v1.13][yarn] or higher installed on your computer.
You'll also need to setup and run a Postgres and a Redis database and insert the access informations into a .env file, based on a .env.example file that is provided in the backend folder.
From your command line:

```bash
# Clone this repository
$ git clone https://github.com/adriano-machado/fullstack-fastFeet.git

# Go into the repository
$ cd fullstack-fastFeet

# Install dependencies for the backend
$ cd backend
$ yarn install

# Run migrations to your database
$ yarn sequelize db:migrate

# Run seed to your database (just a admin user)
$ yarn sequelize db:seed:all

# Run the backend server
$ yarn dev
$ yarn queue

# Install dependencies for the frontend and run the server
$ cd frontend
$ yarn install
$ yarn start

# Install dependencies for the mobile
$ cd mobile
$ yarn install

# Run the app (Android)
$ react-native run-android

# Start React Native Server (only if not start automatically)
$ react-native start
```

## :memo: License

This project is under the MIT license. See the [LICENSE](https://github.com/adriano-machado/fullstack-fastFeet/blob/master/LICENSE) for more information.

---

Made with ♥ by Adriano Machado :wave: [Get in touch!](https://www.linkedin.com/in/adriano-machado-303647161/)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint