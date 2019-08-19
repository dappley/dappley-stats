#!/usr/bin/env bash

: '
    Generates a client side javascript library for communicating with a dappley nodes gRPC services
'

# dependencies: protoc, protoc-gen-grpc-web
# usage: ./scripts/generate-proto-lib.sh <branch>

set -ex

cd ${0%/*}

GIT_BRANCH="${1:-master}"
PROTO_PATH_BASE="github.com"
PROTO_PATH="${PROTO_PATH_BASE}/dappley/go-dappley"
GIT_BRANCH_URL="https://${PROTO_PATH}.git"
OUTPUT_DIR="../src/js/"

PROTO_FILES=(
${PROTO_PATH}/rpc/pb/rpc.proto
${PROTO_PATH}/core/pb/block.proto
${PROTO_PATH}/core/pb/transaction.proto
${PROTO_PATH}/core/pb/utxo.proto
${PROTO_PATH}/network/pb/peer.proto
${PROTO_PATH}/metrics/pb/datastore.proto)

[[ ! -d ${PROTO_PATH_BASE} ]] || (echo "Failed to generate proto files, ${PROTO_PATH_BASE} directory already exists." && exit 1)
mkdir -p ${PROTO_PATH}
git clone -b ${GIT_BRANCH} ${GIT_BRANCH_URL} ${PROTO_PATH}

protoc \
-I=. \
--js_out=import_style=commonjs:${OUTPUT_DIR} \
--grpc-web_out=import_style=commonjs,mode=grpcwebtext:${OUTPUT_DIR} ${PROTO_FILES[@]}

rm -rf ${PROTO_PATH_BASE}
