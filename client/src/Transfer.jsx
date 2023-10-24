import { useState } from "react";
import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1.js';
// import { toHex } from 'ethereum-cryptography/utils.js';
// const { utf8ToBytes } = require("ethereum-cryptography/utils");
// const { keccak256 } = require("ethereum-cryptography/keccak");
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
// import { Buffer } from "buffer";
import { toHex } from 'ethereum-cryptography/utils.js';



function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const dataj = {
      sender: address,
      // amount: parseInt(sendAmount),
      // amount: parseInt(sendAmount).toString(),
      recipient,
    }

    const msg = keccak256(utf8ToBytes(JSON.stringify(dataj)));

    console.log(toHex(msg));
    const signature = secp.secp256k1.sign(msg, privateKey);

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        // amount: parseInt(sendAmount).toString(),
        recipient,
        msg: toHex(msg),
        signature,
      });
      setBalance(balance);
    } catch (ex) {
      // alert(ex.response.data.message);
      console.log(ex);
      alert(ex.response);
    }
  }

    // try {
    //   const response = await server.post(`send`, {
    //     sender: address,
    //     amount: parseInt(sendAmount),
    //     recipient,
    //     msg,
    //     signature,
    //   });
    //   if (response.data && response.data.balance) {
    //     const { balance } = response.data;
    //     setBalance(balance);
    //   } else {
    //     console.error("Invalid response from server:", response);
    //   }
    // } catch (ex) {
    //   // alert(ex.response.data.message);
    //   console.log(ex.response);
    //   alert(ex.response);
    // }



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





// try {
//   const {
//       data: {balance},
//   } = await server.post('send', {
//       sender: address,
//       recipient: recipient,
//       amount: parseInt(sendAmount),
//       challenge: JSON.parse(challenge),
//       signature: JSON.parse(inputSignature)
//   });
//   setBalance(balance);
// } catch (ex) {
//   alert(ex.response.data.message);
// }