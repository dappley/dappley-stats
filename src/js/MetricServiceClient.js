import State from "./State";
import config from "../../config.json";
import {MetricServicePromiseClient} from "./github.com/dappley/go-dappley/rpc/pb/rpc_grpc_web_pb";
import {MetricsServiceRequest} from "./github.com/dappley/go-dappley/rpc/pb/rpc_pb";

export * from "./github.com/dappley/go-dappley/rpc/pb/rpc_pb";

class MetricServiceClient {
    /* https://github.com/grpc/grpc/blob/master/doc/statuscodes.md */
    GRPC_STATUS_UNAUTHENTICATED = 16;
    constructor() {
        this.client = new MetricServicePromiseClient(`http://${config.host}:${config.port}`, null, null);
    }

    static getMetadata() {
        return {Authorization: `Bearer ${State.getters.accessTkn()}`};
    }

    async safeRequest(func, request) {
        try {
            return await this.client[func](request, MetricServiceClient.getMetadata());
        } catch (e) {
            if (e.code === this.GRPC_STATUS_UNAUTHENTICATED) {
                await State.dispatch({type: "refreshTokens"});
                return await this.client[func](request, MetricServiceClient.getMetadata());
            } else {
                throw e;
            }
        }
    }

    async getStats() {
        return await this.safeRequest("rpcGetStats", new MetricsServiceRequest());
    }

    async getNodeConfig() {
        return await this.safeRequest("rpcGetNodeConfig", new MetricsServiceRequest());
    }

    async setNodeConfig(request) {
        return await this.safeRequest("rpcSetNodeConfig", request);
    }
}

export default new MetricServiceClient();
