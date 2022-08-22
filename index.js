#!/usr/bin/env node
var shell = require('shelljs');

var $1 = process.argv[2];
var $2 = process.argv[3];

if (!$1 && !$2) {
  shell.echo('Required arguments: <source> <destination>');
  shell.exit(1);
}

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

shell.exec(`git mv ${$1} ${$2}`);
shell.exec(`git commit -n -m "Split history ${$1} to ${$2}"`);
var REV = shell.exec('git rev-parse HEAD').stdout;
shell.exec('git reset --hard "HEAD^"');
shell.exec(`git mv ${$1} temp`);
shell.exec(`git commit -n -m "Split history ${$1} to ${$2}"`);
shell.exec('git merge ' + REV);
shell.exec(`git commit -a -n -m "Split history ${$1} to ${$2}"`);
shell.exec(`git mv temp ${$1}`);
shell.exec(`git commit -n -m "Split history ${$1} to ${$2}"`);

