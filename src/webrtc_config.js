import { identify } from "@libp2p/identify";
import { webSockets } from "@libp2p/websockets";
import { webRTCDirect } from "@libp2p/webrtc";
import { all } from "@libp2p/websockets/filters";
import { noise } from "@chainsafe/libp2p-noise";
import { yamux } from "@chainsafe/libp2p-yamux";
import { gossipsub } from "@chainsafe/libp2p-gossipsub";
import { circuitRelayTransport } from "@libp2p/circuit-relay-v2";
import { circuitRelayServer } from "@libp2p/circuit-relay-v2";
import * as filters from "@libp2p/websockets/filters";
import { bootstrap } from "@libp2p/bootstrap";

const address = "/dns4/nyk.webrtc-star.bonono.org/tcp/443/wss/p2p-webrtc-star/";

export const webrtcConfig = {
  addresses: {
    swarm: [address],
  },
  transports: [webRTCDirect()],
  connectionEncryption: [noise()],
  streamMuxers: [yamux()],
  services: {
    pubsub: gossipsub(),
  },
};
