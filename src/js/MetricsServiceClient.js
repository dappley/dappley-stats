import config from "../../config.json";
import {MetricServicePromiseClient} from "./github.com/dappley/go-dappley/rpc/pb/rpc_grpc_web_pb";
import {MetricsServiceRequest} from "./github.com/dappley/go-dappley/rpc/pb/rpc_pb";

export * from "./github.com/dappley/go-dappley/rpc/pb/rpc_pb";

class _MetricServiceClient {
    constructor() {
        this.client = new MetricServicePromiseClient(`http://${config.host}:${config.port}`, null, null);
    }

    static getMetadata() {
        return {Authorization: `Bearer ${sessionStorage.getItem("tkn")}`};
    }

    async getStats() {
        return await this.client.rpcGetStats(new MetricsServiceRequest(), _MetricServiceClient.getMetadata());
    }

    async getNodeConfig() {
        return await this.client.rpcGetNodeConfig(new MetricsServiceRequest(), _MetricServiceClient.getMetadata());
    }

    async setNodeConfig(request) {
        return await this.client.rpcSetNodeConfig(request, _MetricServiceClient.getMetadata());
    }
}

export const MetricsServiceClient = new _MetricServiceClient();
