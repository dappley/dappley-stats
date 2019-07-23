#!/usr/bin/env sh

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
