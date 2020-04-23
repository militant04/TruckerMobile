// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyD1vSrbexosObPfZ9NW5LbKv3Eztncd7Bk",
    authDomain: "gdpc-30d63.firebaseapp.com",
    databaseURL: "https://gdpc-30d63.firebaseio.com",
    projectId: "gdpc-30d63",
    storageBucket: "gdpc-30d63.appspot.com",
    messagingSenderId: "1033648889080",
    appId: "1:1033648889080:web:d79467851d5c9f29d4ef0d",
    measurementId: "G-VD2XFFEP9W"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
