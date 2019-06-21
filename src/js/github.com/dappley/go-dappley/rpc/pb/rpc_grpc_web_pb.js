/**
 * @fileoverview gRPC-Web generated client stub for rpcpb
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var github_com_dappley_go$dappley_core_pb_block_pb = require('../../../../../github.com/dappley/go-dappley/core/pb/block_pb.js')

var github_com_dappley_go$dappley_core_pb_transaction_pb = require('../../../../../github.com/dappley/go-dappley/core/pb/transaction_pb.js')

var github_com_dappley_go$dappley_core_pb_utxo_pb = require('../../../../../github.com/dappley/go-dappley/core/pb/utxo_pb.js')

var github_com_dappley_go$dappley_network_pb_peer_pb = require('../../../../../github.com/dappley/go-dappley/network/pb/peer_pb.js')
const proto = {};
proto.rpcpb = require('./rpc_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.rpcpb.RpcServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.rpcpb.RpcServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpcpb.GetVersionRequest,
 *   !proto.rpcpb.GetVersionResponse>}
 */
const methodInfo_RpcService_RpcGetVersion = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpcpb.GetVersionResponse,
  /** @param {!proto.rpcpb.GetVersionRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpcpb.GetVersionResponse.deserializeBinary
);


/**
 * @param {!proto.rpcpb.GetVersionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpcpb.GetVersionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.GetVersionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.RpcServiceClient.prototype.rpcGetVersion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpcpb.RpcService/RpcGetVersion',
      request,
      metadata || {},
      methodInfo_RpcService_RpcGetVersion,
      callback);
};


/**
 * @param {!proto.rpcpb.GetVersionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpcpb.GetVersionResponse>}
 *     A native promise that resolves to the response
 */
proto.rpcpb.RpcServicePromiseClient.prototype.rpcGetVersion =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpcpb.RpcService/RpcGetVersion',
      request,
      metadata || {},
      methodInfo_RpcService_RpcGetVersion);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpcpb.GetBalanceRequest,
 *   !proto.rpcpb.GetBalanceResponse>}
 */
const methodInfo_RpcService_RpcGetBalance = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpcpb.GetBalanceResponse,
  /** @param {!proto.rpcpb.GetBalanceRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpcpb.GetBalanceResponse.deserializeBinary
);


/**
 * @param {!proto.rpcpb.GetBalanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpcpb.GetBalanceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.GetBalanceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.RpcServiceClient.prototype.rpcGetBalance =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpcpb.RpcService/RpcGetBalance',
      request,
      metadata || {},
      methodInfo_RpcService_RpcGetBalance,
      callback);
};


/**
 * @param {!proto.rpcpb.GetBalanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpcpb.GetBalanceResponse>}
 *     A native promise that resolves to the response
 */
proto.rpcpb.RpcServicePromiseClient.prototype.rpcGetBalance =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpcpb.RpcService/RpcGetBalance',
      request,
      metadata || {},
      methodInfo_RpcService_RpcGetBalance);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpcpb.GetBlockchainInfoRequest,
 *   !proto.rpcpb.GetBlockchainInfoResponse>}
 */
const methodInfo_RpcService_RpcGetBlockchainInfo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpcpb.GetBlockchainInfoResponse,
  /** @param {!proto.rpcpb.GetBlockchainInfoRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpcpb.GetBlockchainInfoResponse.deserializeBinary
);


/**
 * @param {!proto.rpcpb.GetBlockchainInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpcpb.GetBlockchainInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.GetBlockchainInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.RpcServiceClient.prototype.rpcGetBlockchainInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpcpb.RpcService/RpcGetBlockchainInfo',
      request,
      metadata || {},
      methodInfo_RpcService_RpcGetBlockchainInfo,
      callback);
};


/**
 * @param {!proto.rpcpb.GetBlockchainInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpcpb.GetBlockchainInfoResponse>}
 *     A native promise that resolves to the response
 */
proto.rpcpb.RpcServicePromiseClient.prototype.rpcGetBlockchainInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpcpb.RpcService/RpcGetBlockchainInfo',
      request,
      metadata || {},
      methodInfo_RpcService_RpcGetBlockchainInfo);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpcpb.GetUTXORequest,
 *   !proto.rpcpb.GetUTXOResponse>}
 */
const methodInfo_RpcService_RpcGetUTXO = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpcpb.GetUTXOResponse,
  /** @param {!proto.rpcpb.GetUTXORequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpcpb.GetUTXOResponse.deserializeBinary
);


/**
 * @param {!proto.rpcpb.GetUTXORequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpcpb.GetUTXOResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.GetUTXOResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.RpcServiceClient.prototype.rpcGetUTXO =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpcpb.RpcService/RpcGetUTXO',
      request,
      metadata || {},
      methodInfo_RpcService_RpcGetUTXO,
      callback);
};


/**
 * @param {!proto.rpcpb.GetUTXORequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpcpb.GetUTXOResponse>}
 *     A native promise that resolves to the response
 */
proto.rpcpb.RpcServicePromiseClient.prototype.rpcGetUTXO =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpcpb.RpcService/RpcGetUTXO',
      request,
      metadata || {},
      methodInfo_RpcService_RpcGetUTXO);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpcpb.GetBlocksRequest,
 *   !proto.rpcpb.GetBlocksResponse>}
 */
const methodInfo_RpcService_RpcGetBlocks = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpcpb.GetBlocksResponse,
  /** @param {!proto.rpcpb.GetBlocksRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpcpb.GetBlocksResponse.deserializeBinary
);


/**
 * @param {!proto.rpcpb.GetBlocksRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpcpb.GetBlocksResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.GetBlocksResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.RpcServiceClient.prototype.rpcGetBlocks =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpcpb.RpcService/RpcGetBlocks',
      request,
      metadata || {},
      methodInfo_RpcService_RpcGetBlocks,
      callback);
};


/**
 * @param {!proto.rpcpb.GetBlocksRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpcpb.GetBlocksResponse>}
 *     A native promise that resolves to the response
 */
proto.rpcpb.RpcServicePromiseClient.prototype.rpcGetBlocks =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpcpb.RpcService/RpcGetBlocks',
      request,
      metadata || {},
      methodInfo_RpcService_RpcGetBlocks);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpcpb.GetBlockByHashRequest,
 *   !proto.rpcpb.GetBlockByHashResponse>}
 */
const methodInfo_RpcService_RpcGetBlockByHash = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpcpb.GetBlockByHashResponse,
  /** @param {!proto.rpcpb.GetBlockByHashRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpcpb.GetBlockByHashResponse.deserializeBinary
);


/**
 * @param {!proto.rpcpb.GetBlockByHashRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpcpb.GetBlockByHashResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.GetBlockByHashResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.RpcServiceClient.prototype.rpcGetBlockByHash =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpcpb.RpcService/RpcGetBlockByHash',
      request,
      metadata || {},
      methodInfo_RpcService_RpcGetBlockByHash,
      callback);
};


/**
 * @param {!proto.rpcpb.GetBlockByHashRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpcpb.GetBlockByHashResponse>}
 *     A native promise that resolves to the response
 */
proto.rpcpb.RpcServicePromiseClient.prototype.rpcGetBlockByHash =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpcpb.RpcService/RpcGetBlockByHash',
      request,
      metadata || {},
      methodInfo_RpcService_RpcGetBlockByHash);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpcpb.GetBlockByHeightRequest,
 *   !proto.rpcpb.GetBlockByHeightResponse>}
 */
const methodInfo_RpcService_RpcGetBlockByHeight = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpcpb.GetBlockByHeightResponse,
  /** @param {!proto.rpcpb.GetBlockByHeightRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpcpb.GetBlockByHeightResponse.deserializeBinary
);


/**
 * @param {!proto.rpcpb.GetBlockByHeightRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpcpb.GetBlockByHeightResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.GetBlockByHeightResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.RpcServiceClient.prototype.rpcGetBlockByHeight =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpcpb.RpcService/RpcGetBlockByHeight',
      request,
      metadata || {},
      methodInfo_RpcService_RpcGetBlockByHeight,
      callback);
};


/**
 * @param {!proto.rpcpb.GetBlockByHeightRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpcpb.GetBlockByHeightResponse>}
 *     A native promise that resolves to the response
 */
proto.rpcpb.RpcServicePromiseClient.prototype.rpcGetBlockByHeight =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpcpb.RpcService/RpcGetBlockByHeight',
      request,
      metadata || {},
      methodInfo_RpcService_RpcGetBlockByHeight);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpcpb.SendTransactionRequest,
 *   !proto.rpcpb.SendTransactionResponse>}
 */
const methodInfo_RpcService_RpcSendTransaction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpcpb.SendTransactionResponse,
  /** @param {!proto.rpcpb.SendTransactionRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpcpb.SendTransactionResponse.deserializeBinary
);


/**
 * @param {!proto.rpcpb.SendTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpcpb.SendTransactionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.SendTransactionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.RpcServiceClient.prototype.rpcSendTransaction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpcpb.RpcService/RpcSendTransaction',
      request,
      metadata || {},
      methodInfo_RpcService_RpcSendTransaction,
      callback);
};


/**
 * @param {!proto.rpcpb.SendTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpcpb.SendTransactionResponse>}
 *     A native promise that resolves to the response
 */
proto.rpcpb.RpcServicePromiseClient.prototype.rpcSendTransaction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpcpb.RpcService/RpcSendTransaction',
      request,
      metadata || {},
      methodInfo_RpcService_RpcSendTransaction);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpcpb.SendBatchTransactionRequest,
 *   !proto.rpcpb.SendBatchTransactionResponse>}
 */
const methodInfo_RpcService_RpcSendBatchTransaction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpcpb.SendBatchTransactionResponse,
  /** @param {!proto.rpcpb.SendBatchTransactionRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpcpb.SendBatchTransactionResponse.deserializeBinary
);


/**
 * @param {!proto.rpcpb.SendBatchTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpcpb.SendBatchTransactionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.SendBatchTransactionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.RpcServiceClient.prototype.rpcSendBatchTransaction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpcpb.RpcService/RpcSendBatchTransaction',
      request,
      metadata || {},
      methodInfo_RpcService_RpcSendBatchTransaction,
      callback);
};


/**
 * @param {!proto.rpcpb.SendBatchTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpcpb.SendBatchTransactionResponse>}
 *     A native promise that resolves to the response
 */
proto.rpcpb.RpcServicePromiseClient.prototype.rpcSendBatchTransaction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpcpb.RpcService/RpcSendBatchTransaction',
      request,
      metadata || {},
      methodInfo_RpcService_RpcSendBatchTransaction);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpcpb.GetNewTransactionRequest,
 *   !proto.rpcpb.GetNewTransactionResponse>}
 */
const methodInfo_RpcService_RpcGetNewTransaction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpcpb.GetNewTransactionResponse,
  /** @param {!proto.rpcpb.GetNewTransactionRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpcpb.GetNewTransactionResponse.deserializeBinary
);


/**
 * @param {!proto.rpcpb.GetNewTransactionRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.GetNewTransactionResponse>}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.RpcServiceClient.prototype.rpcGetNewTransaction =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/rpcpb.RpcService/RpcGetNewTransaction',
      request,
      metadata || {},
      methodInfo_RpcService_RpcGetNewTransaction);
};


/**
 * @param {!proto.rpcpb.GetNewTransactionRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.GetNewTransactionResponse>}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.RpcServicePromiseClient.prototype.rpcGetNewTransaction =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/rpcpb.RpcService/RpcGetNewTransaction',
      request,
      metadata || {},
      methodInfo_RpcService_RpcGetNewTransaction);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpcpb.SubscribeRequest,
 *   !proto.rpcpb.SubscribeResponse>}
 */
const methodInfo_RpcService_RpcSubscribe = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpcpb.SubscribeResponse,
  /** @param {!proto.rpcpb.SubscribeRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpcpb.SubscribeResponse.deserializeBinary
);


/**
 * @param {!proto.rpcpb.SubscribeRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.SubscribeResponse>}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.RpcServiceClient.prototype.rpcSubscribe =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/rpcpb.RpcService/RpcSubscribe',
      request,
      metadata || {},
      methodInfo_RpcService_RpcSubscribe);
};


/**
 * @param {!proto.rpcpb.SubscribeRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.SubscribeResponse>}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.RpcServicePromiseClient.prototype.rpcSubscribe =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/rpcpb.RpcService/RpcSubscribe',
      request,
      metadata || {},
      methodInfo_RpcService_RpcSubscribe);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpcpb.GetAllTransactionsRequest,
 *   !proto.rpcpb.GetAllTransactionsResponse>}
 */
const methodInfo_RpcService_RpcGetAllTransactionsFromTxPool = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpcpb.GetAllTransactionsResponse,
  /** @param {!proto.rpcpb.GetAllTransactionsRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpcpb.GetAllTransactionsResponse.deserializeBinary
);


/**
 * @param {!proto.rpcpb.GetAllTransactionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpcpb.GetAllTransactionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.GetAllTransactionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.RpcServiceClient.prototype.rpcGetAllTransactionsFromTxPool =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpcpb.RpcService/RpcGetAllTransactionsFromTxPool',
      request,
      metadata || {},
      methodInfo_RpcService_RpcGetAllTransactionsFromTxPool,
      callback);
};


/**
 * @param {!proto.rpcpb.GetAllTransactionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpcpb.GetAllTransactionsResponse>}
 *     A native promise that resolves to the response
 */
proto.rpcpb.RpcServicePromiseClient.prototype.rpcGetAllTransactionsFromTxPool =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpcpb.RpcService/RpcGetAllTransactionsFromTxPool',
      request,
      metadata || {},
      methodInfo_RpcService_RpcGetAllTransactionsFromTxPool);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.rpcpb.AdminServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.rpcpb.AdminServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpcpb.AddPeerRequest,
 *   !proto.rpcpb.AddPeerResponse>}
 */
const methodInfo_AdminService_RpcAddPeer = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpcpb.AddPeerResponse,
  /** @param {!proto.rpcpb.AddPeerRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpcpb.AddPeerResponse.deserializeBinary
);


/**
 * @param {!proto.rpcpb.AddPeerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpcpb.AddPeerResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.AddPeerResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.AdminServiceClient.prototype.rpcAddPeer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpcpb.AdminService/RpcAddPeer',
      request,
      metadata || {},
      methodInfo_AdminService_RpcAddPeer,
      callback);
};


/**
 * @param {!proto.rpcpb.AddPeerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpcpb.AddPeerResponse>}
 *     A native promise that resolves to the response
 */
proto.rpcpb.AdminServicePromiseClient.prototype.rpcAddPeer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpcpb.AdminService/RpcAddPeer',
      request,
      metadata || {},
      methodInfo_AdminService_RpcAddPeer);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpcpb.SendRequest,
 *   !proto.rpcpb.SendResponse>}
 */
const methodInfo_AdminService_RpcSend = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpcpb.SendResponse,
  /** @param {!proto.rpcpb.SendRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpcpb.SendResponse.deserializeBinary
);


/**
 * @param {!proto.rpcpb.SendRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpcpb.SendResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.SendResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.AdminServiceClient.prototype.rpcSend =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpcpb.AdminService/RpcSend',
      request,
      metadata || {},
      methodInfo_AdminService_RpcSend,
      callback);
};


/**
 * @param {!proto.rpcpb.SendRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpcpb.SendResponse>}
 *     A native promise that resolves to the response
 */
proto.rpcpb.AdminServicePromiseClient.prototype.rpcSend =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpcpb.AdminService/RpcSend',
      request,
      metadata || {},
      methodInfo_AdminService_RpcSend);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpcpb.GetPeerInfoRequest,
 *   !proto.rpcpb.GetPeerInfoResponse>}
 */
const methodInfo_AdminService_RpcGetPeerInfo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpcpb.GetPeerInfoResponse,
  /** @param {!proto.rpcpb.GetPeerInfoRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpcpb.GetPeerInfoResponse.deserializeBinary
);


/**
 * @param {!proto.rpcpb.GetPeerInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpcpb.GetPeerInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.GetPeerInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.AdminServiceClient.prototype.rpcGetPeerInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpcpb.AdminService/RpcGetPeerInfo',
      request,
      metadata || {},
      methodInfo_AdminService_RpcGetPeerInfo,
      callback);
};


/**
 * @param {!proto.rpcpb.GetPeerInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpcpb.GetPeerInfoResponse>}
 *     A native promise that resolves to the response
 */
proto.rpcpb.AdminServicePromiseClient.prototype.rpcGetPeerInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpcpb.AdminService/RpcGetPeerInfo',
      request,
      metadata || {},
      methodInfo_AdminService_RpcGetPeerInfo);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpcpb.SendFromMinerRequest,
 *   !proto.rpcpb.SendFromMinerResponse>}
 */
const methodInfo_AdminService_RpcSendFromMiner = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpcpb.SendFromMinerResponse,
  /** @param {!proto.rpcpb.SendFromMinerRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpcpb.SendFromMinerResponse.deserializeBinary
);


/**
 * @param {!proto.rpcpb.SendFromMinerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpcpb.SendFromMinerResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.SendFromMinerResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.AdminServiceClient.prototype.rpcSendFromMiner =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpcpb.AdminService/RpcSendFromMiner',
      request,
      metadata || {},
      methodInfo_AdminService_RpcSendFromMiner,
      callback);
};


/**
 * @param {!proto.rpcpb.SendFromMinerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpcpb.SendFromMinerResponse>}
 *     A native promise that resolves to the response
 */
proto.rpcpb.AdminServicePromiseClient.prototype.rpcSendFromMiner =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpcpb.AdminService/RpcSendFromMiner',
      request,
      metadata || {},
      methodInfo_AdminService_RpcSendFromMiner);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpcpb.AddProducerRequest,
 *   !proto.rpcpb.AddProducerResponse>}
 */
const methodInfo_AdminService_RpcAddProducer = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpcpb.AddProducerResponse,
  /** @param {!proto.rpcpb.AddProducerRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpcpb.AddProducerResponse.deserializeBinary
);


/**
 * @param {!proto.rpcpb.AddProducerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpcpb.AddProducerResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.AddProducerResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.AdminServiceClient.prototype.rpcAddProducer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpcpb.AdminService/RpcAddProducer',
      request,
      metadata || {},
      methodInfo_AdminService_RpcAddProducer,
      callback);
};


/**
 * @param {!proto.rpcpb.AddProducerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpcpb.AddProducerResponse>}
 *     A native promise that resolves to the response
 */
proto.rpcpb.AdminServicePromiseClient.prototype.rpcAddProducer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpcpb.AdminService/RpcAddProducer',
      request,
      metadata || {},
      methodInfo_AdminService_RpcAddProducer);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpcpb.UnlockWalletRequest,
 *   !proto.rpcpb.UnlockWalletResponse>}
 */
const methodInfo_AdminService_RpcUnlockWallet = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpcpb.UnlockWalletResponse,
  /** @param {!proto.rpcpb.UnlockWalletRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpcpb.UnlockWalletResponse.deserializeBinary
);


/**
 * @param {!proto.rpcpb.UnlockWalletRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpcpb.UnlockWalletResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.UnlockWalletResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.AdminServiceClient.prototype.rpcUnlockWallet =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpcpb.AdminService/RpcUnlockWallet',
      request,
      metadata || {},
      methodInfo_AdminService_RpcUnlockWallet,
      callback);
};


/**
 * @param {!proto.rpcpb.UnlockWalletRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpcpb.UnlockWalletResponse>}
 *     A native promise that resolves to the response
 */
proto.rpcpb.AdminServicePromiseClient.prototype.rpcUnlockWallet =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpcpb.AdminService/RpcUnlockWallet',
      request,
      metadata || {},
      methodInfo_AdminService_RpcUnlockWallet);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.rpcpb.MetricServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.rpcpb.MetricServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpcpb.MetricsServiceRequest,
 *   !proto.rpcpb.JSONResponse>}
 */
const methodInfo_MetricService_RpcGetStats = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpcpb.JSONResponse,
  /** @param {!proto.rpcpb.MetricsServiceRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpcpb.JSONResponse.deserializeBinary
);


/**
 * @param {!proto.rpcpb.MetricsServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpcpb.JSONResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpcpb.JSONResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpcpb.MetricServiceClient.prototype.rpcGetStats =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpcpb.MetricService/RpcGetStats',
      request,
      metadata || {},
      methodInfo_MetricService_RpcGetStats,
      callback);
};


/**
 * @param {!proto.rpcpb.MetricsServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpcpb.JSONResponse>}
 *     A native promise that resolves to the response
 */
proto.rpcpb.MetricServicePromiseClient.prototype.rpcGetStats =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpcpb.MetricService/RpcGetStats',
      request,
      metadata || {},
      methodInfo_MetricService_RpcGetStats);
};


module.exports = proto.rpcpb;

