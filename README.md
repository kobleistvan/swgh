# SWGH - Split With Git History
An minimal NPX command which allows you to quickly & easily clone a file into a copy of it, retaining its git history.

It's most useful when you have a file and you want to break it up into multiple smaller files, retaining the line git history in each of them.


## Usage
```
npx swgh <source> <destination>
```

## Examples
```
npx swgh README.md README2.md

npx swgh README.md cloneWithOtherExtension.txt

npx swgh someFolder/someFile.js someOtherFolder/randomSubfolder/halfOfTheFile.ts
```

Let's assume you have a big file `characters.js` containing many functions which log a character, and you'd like to split it up into 2 files. One for consonant loggers, one for vowel loggers.

```
$ git blame characters.js

  ca123d function a() { console.log('a') }
  b5103d function b() { console.log('b') }
  b5103d function c() { console.log('c') }
  b5103d function d() { console.log('d') }
  ca123d function e() { console.log('e') }
  ...
```
Assume that in commit `ca123d` vowel loggers have been added and in commit `b5103d` consonant loggers have been added.


```
  $ npx swgh characters.js vowelLoggers.js
```
The result is `characters.js` and `vowelLoggers.js` containing the exact same code with the same git history.

Rename the original file to `consonantLoggers.js`
```
mv characters.js consonantLoggers.js
```

Clean up the files to represent what you initially intended:
```
$ git blame consonantLoggers.js

  b5103d function b() { console.log('b') }
  b5103d function c() { console.log('c') }
  b5103d function d() { console.log('d') }
  ...
```
```
$ git blame vowelLoggers.js

  ca123d function a() { console.log('a') }
  ca123d function e() { console.log('e') }
  ...
```

Commit your changes
```
$ git commit -am "Splitted up characters.js into consonantLoggers.js and vowelLoggers.js"
```

## Caveats
- You can only use this command within a GIT repository
- You should not have any uncommitted changes. `git status` should say `"nothing to commit, working tree clean"`
- When the command is executed it will create 3-4 new commits, due the internal process