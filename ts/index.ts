import { gunzipSync } from 'zlib';
import {
  Crs,
  newBarretenbergApiAsync,
  RawBuffer,
} from '@aztec/bb.js/dest/node/index.js';
import { executeCircuit, compressWitness } from '@noir-lang/acvm_js';
import { ethers } from 'ethers'; // I'm lazy so I'm using ethers to pad my input
import circuit from "../target/main.json";

async function main() {
  const acirBuffer = Buffer.from(circuit.bytecode, 'base64');
  const acirBufferUncompressed = gunzipSync(acirBuffer);

  const api = await newBarretenbergApiAsync(4);

  const [exact, total, subgroup] = await api.acirGetCircuitSizes(JSON.parse(circuit.bytecode));
  const subgroupSize = Math.pow(2, Math.ceil(Math.log2(total)));
  const crs = await Crs.new(subgroupSize + 1);
  await api.commonInitSlabAllocator(subgroupSize);
  await api.srsInitSrs(
    new RawBuffer(crs.getG1Data()),
    crs.numPoints,
    new RawBuffer(crs.getG2Data()),
  );  

  const acirComposer = await api.acirNewAcirComposer(subgroupSize);

  async function generateWitness(input: any, acirBuffer: Buffer): Promise<Uint8Array> {
    const initialWitness = new Map<number, string>();
    initialWitness.set(1, ethers.utils.hexZeroPad(`0x${input.x.toString(16)}`, 32));
    initialWitness.set(2, ethers.utils.hexZeroPad(`0x${input.y.toString(16)}`, 32));
    initialWitness.set(3, ethers.utils.hexZeroPad(`0x${input.z.toString(16)}`, 32));

    const witnessMap = await executeCircuit(acirBuffer, initialWitness, () => {
      throw Error('unexpected oracle');
    });

    const witnessBuff = compressWitness(witnessMap);
    return witnessBuff;
  }

  async function generateProof(witness: Uint8Array) {
    const proof = await api.acirCreateProof(
      acirComposer,
      acirBufferUncompressed,
      gunzipSync(witness),
      false,
    );
    return proof;
  }


  async function verifyProof(proof: Uint8Array) {
    await api.acirInitProvingKey(acirComposer, acirBufferUncompressed);
    const verified = await api.acirVerifyProof(acirComposer, proof, false);
    return verified;
  }



  

  const input = { x: 3, y: 4, z: 12 };
  const witness = await generateWitness(input, acirBuffer);
  console.log("Witness generated!")
  const proof = await generateProof(witness);
  console.log("Proof generated!")
  await verifyProof(proof);
  console.log("Proof verified!")

  api.destroy();
}

main()
