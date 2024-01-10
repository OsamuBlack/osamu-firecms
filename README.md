## Firecms Flow App

Welcome to FireCMS Flow App!

Then simply run:

### Running the project

```bash
yarn dev
```

### Building the project

Make sure you update your `package.json` `build` script with the correct 
project name. Then run:

```bash
yarn build
```

### Deploying the project

#### Install the firebase tools globally
```bash
yarn add -g firebase-tools

```

```bash
firebase login
```

```bash
firebase init
```

```bash
firebase deploy --project [id-of-the-project-from-firebase-console]
```

> Note: This may not work if you have set up your Firebase hosting with 
> a custom config.

Make sure to add a `.env` file with the `VITE_SITEURL` and `VITE_SITELOGO` to it.