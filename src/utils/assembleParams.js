export default function assembleParams(paramMap) {
  const paramArr = [];
  for (let key in paramMap) {
    let val = paramMap[key];

    if (val == null || val === false) {
      continue;
    }

    if (val === true) {
      val = 1;
    }

    paramArr.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(val)
    );
  }
  return paramArr.join('&');
}