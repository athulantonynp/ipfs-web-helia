import { identify } from "@libp2p/identify";
import { webSockets } from "@libp2p/websockets";
import { tcp } from "@libp2p/tcp";
import { all } from "@libp2p/websockets/filters";
import { noise } from "@chainsafe/libp2p-noise";
import { yamux } from "@chainsafe/libp2p-yamux";
import { gossipsub } from "@chainsafe/libp2p-gossipsub";
import { circuitRelayTransport } from "@libp2p/circuit-relay-v2";
import { circuitRelayServer } from "@libp2p/circuit-relay-v2";
import * as filters from "@libp2p/websockets/filters";
import { bootstrap } from "@libp2p/bootstrap";

export const tcpConfig = {
  addresses: {
    listen: [
      // add a listen address (localhost) to accept TCP connections on a random port
      "/ip4/127.0.0.1/tcp/0",
    ],
  },
  transports: [tcp()],
  connectionEncryption: [noise()],
  streamMuxers: [yamux()],
  peerDiscovery: [
    bootstrap({
      list: [
        "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ",
      ],
    }),
  ],
  services: {
    identify: identify(),
  },
};
