# Setup
### 1. Install dependencies
I use `nvm` for least-headache-inducing Node version management. If using nvm:

    1. Install nvm [here](https://github.com/creationix/nvm)
    2. Install Node LTS: `nvm install --lts`. If already installed: `nvm use --lts`
    3. `npm install`

### 2. Run tests:
```
npm test
```

### 3. Start server:
```
npm start && open http://localhost:3000/
```

This app uses [webpack dashboard](https://github.com/FormidableLabs/webpack-dashboard), so please note the following:

If using OS X Terminal.app: make sure that **View → Allow Mouse Reporting** is enabled, otherwise scrolling through logs and modules won't work. If your version of Terminal.app doesn't have this feature, you may want to check out an alternative such as [iTerm2](https://www.iterm2.com/).

### 4. Recommended: Install React dev tools for Chrome here.


## After making updates:

### 1. Write tests and run them:
```
npm test
```
### 2. Lint your code:
```
npm run lint
```
Using [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb).
### 3. Generate production build:
```
npm run build
```
Build will be placed in the `build` folder.

Make sure to change `publicPath` in webpack.config.js:
```
output: {
  path: buildPath,
  publicPath: '/public-app/',
  filename: 'app-[hash].js',
}
```
### 3. Preview build with
```
npm run preview
```

## Notes on Babel:
**Avoid Stage 0 features**. This is that place where *cutting-edge* slithers into *not worth it*,
and eventually into *well that was dumb*. Once the committee drops a proposal (chances of this are highest for
Stage 0 features and go down as the Stage level goes up), Babel is dropping support for it, which means
you're now stuck with your very own ecmascript extension with no transpiling support for it. Not to mention
the extra tooling complexity inherent to brand-new features.


## Todos:
- [ ] Add tests.
- [ ] Bump up to v4 of D3 and use only necessary modules.