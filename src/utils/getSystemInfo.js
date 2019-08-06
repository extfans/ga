export default function getSystemInfo() {
  return {
    sr: screen.width + 'x' + window.screen.height,
    sd: screen.colorDepth + '-bits',
    ul: navigator.language
  }
}