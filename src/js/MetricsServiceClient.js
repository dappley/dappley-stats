import config from "../../config.json";
import {MetricServicePromiseClient} from "./github.com/dappley/go-dappley/rpc/pb/rpc_grpc_web_pb";
import {MetricsServiceRequest} from "./github.com/dappley/go-dappley/rpc/pb/rpc_pb";
import axios from "axios";

export * from "./github.com/dappley/go-dappley/rpc/pb/rpc_pb";

class _MetricServiceClient {
    constructor() {
        this.client = new MetricServicePromiseClient(`http://${config.host}:${config.port}`, null, null);
    }

    static getMetadata() {
        return {Authorization: `Bearer ${sessionStorage.getItem("tkn")}`};
    }

    static getRefreshTkn() {
        return sessionStorage.getItem("refreshTkn");
    }

    static async refreshTokens() {
        const res = await axios.post(
            `http://${config.authServerHost}:${config.authServerPort}/refresh?tkn=${_MetricServiceClient.getRefreshTkn()}`);
        sessionStorage.setItem("tkn", res.data["tkn"]);
        sessionStorage.setItem("refreshTkn", res.data["refreshTkn"]);
    }

    async safeRequest(func, request) {
        try {
            return await this.client[func](request, _MetricServiceClient.getMetadata());
        } catch (e) {
            /* TODO: should only make another request if status code was 401 but grpc-web doesn't return the right
                     status code; https://github.com/grpc/grpc-web/issues/569 */
            await _MetricServiceClient.refreshTokens();
            return await this.client[func](request, _MetricServiceClient.getMetadata());
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

export const MetricsServiceClient = new _MetricServiceClient();
