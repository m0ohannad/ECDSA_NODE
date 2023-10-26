const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");

app.use(cors());
app.use(express.json());

const balances = {
  "0391f67a6a86551e4675cea75cdfe32278ab5140f5d916f8d315f5a25bded1d5d4": 100,
  "03d510a4e0422566776c8d415187b4ed8af9cd0eab7f0f3a88826eaee699ef154f": 50,
  "027e4b812d6e0393fd19245539942370e349f991535adbd77ae83fbb1d0729a32d": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

  // TODO: get a signature from the client-side application
  // recover the public address from the signature

  const { sender, recipient, amount, msg, signature } = req.body;

  const signatureBigInt = {
    r: BigInt(signature.r),
    s: BigInt(signature.s),
    recovery: signature.recovery
  };

  const isSigned = secp.secp256k1.verify(signatureBigInt, msg, sender);
  console.log("isSigned from server: ", isSigned);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  // if (sender !== publickey)
  if (!isSigned) {
    res.status(400).send({ message: "Invalid Signature!" });
  } else if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
