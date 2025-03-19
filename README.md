# vuesax-next (v4.x) (forked)

**Main Repository**: [lusaxweb/vuesax-next](https://github.com/lusaxweb/vuesax-next)

## Status: Alpha

We have forked this library due to inactivity in the main repository. This allows us to directly implement customizations in the forked repo.

### Getting started

To update the code, ensure you have a Node version manager installed. We recommend using [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm use 14
```

**Install the Project**

```bash
npm install
```

```bash
cd packages/vuesax
npm install
```

**Checkout Feature Branch**  
heckout to the desired feature branch:

```bash
git checkout feat/feature-name master
```

**Update and Test Code**  
After updating the code, ensure you've tested the installed version of this project with your dummy project on your machine. If you feel confident, you can run a build to ensure there are no errors:

```bash
npm run build
```

**Deploy the Packages**  
After the package is deployed, ensure you also create a PR to the master branch.

```bash
npm run deploy
```
