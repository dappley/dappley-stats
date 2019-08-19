#!/usr/bin/env sh

: '
    A pre-commit git hook to prevent you from pushing code that will fail the ci build,
    installation on a unix system may look something like:
        sh -c "cd .git/hooks/ && ln -s ../../scripts/pre-commit.sh pre-commit"
'

function run() {
    echo "$1"
    yarn $2

    if [[ $? -ne 0 ]];
    then
        exit 1
    fi
}

run "\nRunning linter...\n" lint
run "\nRunning tests...\n" test
