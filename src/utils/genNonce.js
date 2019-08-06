let t = new Date().valueOf();

export default function genNonce() {
  return t++;
}