import { useState } from "react";
import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1.js';
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex } from 'ethereum-cryptography/utils.js';

BigInt.prototype.toJSON = function () {
  return this.toString();
};

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const dataj = {
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
    }

    const msg = keccak256(utf8ToBytes(JSON.stringify(dataj)));

    const signature = secp.secp256k1.sign(msg, privateKey);

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        recipient,
        amount: parseInt(sendAmount),
        msg: toHex(msg),
        signature: signature,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;