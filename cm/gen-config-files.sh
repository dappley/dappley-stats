#!/usr/bin/env bash

# usage: ./gen-config-files.sh views/default.json

set -e

cd ${0%/*}
CONFIG_FILE=$1
MUSTACHE="../node_modules/.bin/mustache"

[[ -f ${CONFIG_FILE} ]] || (echo "Please specify a views file relative to ${PWD} ie. views/default.json" && exit 1)

# generates configuration files using parent of this directory as the root
function gen_config_file() {
    FILE=${1#*/} # drop templates/
    FILE=../${FILE%.*} # drop .mustache
    mkdir -p `dirname ${FILE}`
    ${MUSTACHE} ${CONFIG_FILE} "$1" ${FILE}
    echo "Successfully generated configuration file: ${FILE}"
}

for template_file in `find templates -name "*.mustache"`; do
    gen_config_file ${template_file}
done