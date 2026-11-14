// One site's home page as a PNG, through the DevTools protocol: the real clock (some sites never leave Chrome's virtual
// time), the network quiet for 1.5 s or 20 s at most, and consent banners hidden for the picture — nothing is clicked.
//   node scripts/shot.mjs <url> <out.png> [1440x900 | 390x844m]   (m: a phone — touch, mobile viewport)
import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [url, out, size = '1440x900'] = process.argv.slice(2);
const phone = size.endsWith('m');
const [width, height] = size.replace(/m$/, '').split('x').map(Number);
const prof = mkdtempSync('/tmp/shot-profile-');
// port 0: Chrome picks a free port and writes it to DevToolsActivePort (parallel shots never share a browser)
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--mute-audio', '--remote-debugging-port=0',
  `--user-data-dir=${prof}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const quit = (code) => {
  try { chrome.kill('SIGKILL'); } catch {}
  setTimeout(() => { try { rmSync(prof, { recursive: true, force: true }); } catch {} process.exit(code); }, 300);
};
setTimeout(() => quit(2), 45000);

let target;
for (let i = 0; i < 80 && !target; i++) {
  await sleep(250);
  try {
    const port = readFileSync(`${prof}/DevToolsActivePort`, 'utf8').split('\n')[0].trim();
    target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === 'page');
  } catch {}
}
if (!target) quit(2);
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0, inflight = 0, quietSince = Date.now(), loaded = false;
const wait = new Map();
ws.addEventListener('message', (m) => {
  const d = JSON.parse(m.data);
  if (d.id && wait.has(d.id)) { wait.get(d.id)(d); wait.delete(d.id); return; }
  if (d.method === 'Network.requestWillBeSent') inflight++;
  else if (d.method === 'Network.loadingFinished' || d.method === 'Network.loadingFailed') { inflight = Math.max(0, inflight - 1); if (!inflight) quietSince = Date.now(); }
  else if (d.method === 'Page.loadEventFired') loaded = true;
});
const send = (method, params = {}) => new Promise((r) => { const i = ++id; wait.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

await send('Page.enable');
await send('Network.enable');
await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: phone ? 2 : 1, mobile: phone });
if (phone) {
  await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await send('Emulation.setUserAgentOverride', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' });
}
await send('Page.navigate', { url });
const t0 = Date.now();
while (Date.now() - t0 < 20000 && !(loaded && inflight === 0 && Date.now() - quietSince > 1500)) await sleep(150);
// consent dialogs and cookie bars are hidden for the picture (twice: some arrive late); nothing is accepted or declined
const HIDE = `(() => {
  let hid = 0;
  const off = (e) => { e.style.setProperty('display', 'none', 'important'); hid++; };
  document.querySelectorAll('.fc-consent-root, .fc-dialog-overlay, #onetrust-consent-sdk, #CybotCookiebotDialog, .cky-consent-container, .cky-overlay, #cookie-law-info-bar, .cmplz-cookiebanner, .cc-window, #cookie-notice, #uniccmp, [id^="unic-"], [class^="unic-"]').forEach(off);
  // and ad units that float over the page (AdSense anchors and vignettes): the picture is of the product
  document.querySelectorAll('ins.adsbygoogle[data-anchor-status], [data-anchor-status], .google-auto-placed, iframe[id^="google_ads_iframe"], div[id^="google_ads_iframe"]').forEach(off);
  const fixed = [...document.querySelectorAll('body *')].filter((e) => { const p = getComputedStyle(e).position; return p === 'fixed' || p === 'sticky'; });
  for (const e of fixed) {
    const text = e.textContent || '';
    const z = parseInt(getComputedStyle(e).zIndex) || 0;
    if (/TCF partners|cookie|privacy matters|consent|your privacy|how your data is used|add to home screen/i.test(text) && (text.length < 3000 || z >= 100)) off(e);
  }
  if (hid) for (const e of fixed) {   // the dimmed backdrop a consent dialog leaves behind
    const r = e.getBoundingClientRect(), bg = getComputedStyle(e).backgroundColor;
    if (r.width * r.height >= innerWidth * innerHeight * 0.9 && !(e.textContent || '').trim() && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') off(e);
  }
  for (const e of [document.documentElement, document.body]) e.style.setProperty('overflow', 'visible', 'important');
})()`;
await send('Runtime.evaluate', { expression: HIDE });
await sleep(1200);
await send('Runtime.evaluate', { expression: HIDE });
await sleep(500);
const shot = await send('Page.captureScreenshot', { format: 'png' });
if (shot.result?.data) writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
quit(shot.result?.data ? 0 : 1);
