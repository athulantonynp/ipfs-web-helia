import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { startOrbitDB } from "./orbitdb";
import { createLibp2p } from "libp2p";
import { createHelia } from "helia";
import { identify } from "@libp2p/identify";
import { webSockets } from "@libp2p/websockets";
import { webRTC } from "@libp2p/webrtc";
import { all } from "@libp2p/websockets/filters";
import { noise } from "@chainsafe/libp2p-noise";
import { yamux } from "@chainsafe/libp2p-yamux";
import { gossipsub } from "@chainsafe/libp2p-gossipsub";
import { circuitRelayTransport } from "@libp2p/circuit-relay-v2";

function App() {
  const start = async () => {
    const libp2p = createLibp2p({
      addresses: {
        listen: ["/webrtc", "/ip4/0.0.0.0/tcp/0"],
      },
      transports: [
        webSockets({
          filter: all,
        }),
        webRTC(),
        circuitRelayTransport({
          discoverRelays: 1,
        }),
      ],
      connectionEncryption: [noise()],
      streamMuxers: [yamux()],
      connectionGater: {
        denyDialMultiaddr: () => false,
      },
      services: {
        identify: identify(),
        pubsub: gossipsub({ allowPublishToZeroTopicPeers: true }),
      },
    });
    const ipfs = await createHelia({ libp2p });
    const odb = await startOrbitDB({ ipfs });
    const db = await odb.open("sponeglare123ew2343904");
    // db.events.on("replicated", () => {
    //   console.log("replicated");
    // });
  };
  useEffect(() => {
    console.log("starting");
    start();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
