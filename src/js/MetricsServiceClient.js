import config from "../../config.json";
import {MetricServicePromiseClient} from "./github.com/dappley/go-dappley/rpc/pb/rpc_grpc_web_pb";
export const MetricsServiceClient = new MetricServicePromiseClient(`http://${config.host}:${config.port}`, null, null);
export * from "./github.com/dappley/go-dappley/rpc/pb/rpc_pb";
