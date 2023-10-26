import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1.js';
import { toHex } from 'ethereum-cryptography/utils.js';

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    // address = toHex(secp.secp256k1.getPublicKey(privateKey));
    // const publicKey = secp.secp256k1.getPublicKey(privateKey);
    let publicKey = "";
    try {
      publicKey = secp.secp256k1.getPublicKey(privateKey);
    } catch (error) {
      publicKey = "";
    }
    const address = publicKey ? toHex(publicKey) : null;
    console.log("address", address);
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setAddress("");
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type a private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div className="address">
        Address: {address.slice(0, 6)}...{address.slice(-4)}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
