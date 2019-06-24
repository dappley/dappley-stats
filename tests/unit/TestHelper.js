import {PeerInfo} from "../../src/js/github.com/dappley/go-dappley/network/pb/peer_pb";
import {MemoryStats, Stat, NumForks, BlockStats} from "../../src/js/github.com/dappley/go-dappley/metrics/pb/datastore_pb";

export default class TestHelper {
    static NewPeerInfo(id, addresses, latency) {
        const peer = new PeerInfo();
        peer.setId(id);
        peer.setAddressList(addresses);
        peer.setLatency(latency);
        return peer;
    }

    static NewMemStat(timestamp, heapInUse, heapSys) {
        const stat = new Stat();
        const memstats = new MemoryStats();
        memstats.setHeapInUse(heapInUse);
        memstats.setHeapSys(heapSys);
        stat.setTimestamp(timestamp);
        stat.setMemoryStats(memstats);
        return stat;
    }

    static NewForkStat(timestamp, longestFork, numForks) {
        const stat = new Stat();
        const forkstat = new NumForks();
        stat.setTimestamp(timestamp);
        forkstat.setLongestFork(longestFork);
        forkstat.setNumForks(numForks);
        stat.setForkStats(forkstat);
        return stat;
    }

    static NewCPUStat(timestamp, percentage) {
        const stat = new Stat();
        stat.setTimestamp(timestamp);
        stat.setCpuPercentage(percentage);
        return stat;
    }

    static NewBlockStat(numTransaction, height) {
        const blockstat = new BlockStats();
        blockstat.setNumTransactions(numTransaction);
        blockstat.setHeight(height);
        return blockstat;
    }
}