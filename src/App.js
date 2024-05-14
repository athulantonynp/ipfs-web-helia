import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { startOrbitDB } from "./orbitdb";
import { createLibp2p } from "libp2p";
import { createHelia } from "helia";
import { webrtcConfig } from "./webrtc_config";
import { MemoryBlockstore } from "blockstore-core";
import { MemoryDatastore } from "datastore-core";

function App() {
  const start = async () => {
    try {
      // the blockstore is where we store the blocks that make up files
      const blockstore = new MemoryBlockstore();

      // application-specific data lives in the datastore
      const datastore = new MemoryDatastore();

      // webrtc config
      const options = createLibp2p({
        datastore,
        ...webrtcConfig,
      });

      // tcp config which will not work simply
      // const options = createLibp2p(tcpConfig);
      const ipfs = await createHelia(datastore, blockstore, { ...options });
      const odb = await startOrbitDB({ ipfs });
      const db = await odb.open("sponeglare123ew2343904");
      console.log("Peer id: ", ipfs.libp2p.peerId.toString());

      // Listen for updates from peers
      db.events.on("update", async (entry) => {
        console.log(entry);
        const all = await db.all();
        console.log(all);
      });

      db.events.on("replicated", () => {
        console.log("replicated");
      });

      // setTimeout(() => {
      //   ipfs.libp2p.peerStore.forEach((peer) => {
      //     console.log(peer.id.toString());
      //   });
      // }, 10000);
    } catch (e) {}
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
