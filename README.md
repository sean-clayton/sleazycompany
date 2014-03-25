# Sleazy Company
## Source code for [sleazycompany.com](http://sleazycompany.com)

### Word of Caution
This branch is currently ***UNSTABLE*** and is not guaranteed to work correctly. When this site hits 1.0, all development will be moved to the [dev branch](../../tree/dev), and only *stable* and *working* code will live in this branch (master).

### Prerequisites
- [Node.js](http://nodejs.org)
- [MongoDB](http://mongodb.org)

### Install
1. `cd` into whatever directory you wish to contain this repository
2. Run `git clone https://github.com/skulbuny/sleazycompany.git`
3. Run `npm i` to install all Node dependencies
4. Run `mongod` to start your Mongo database
5. Run `forever start keystone.js`
6. Open [http://localhost:8008](http://localhost:8008) in your browser.