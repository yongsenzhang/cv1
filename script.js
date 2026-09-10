const tracks = [
  { title: 'Intro / 关于我', subtitle: 'A short signal from the studio', duration: 72, code: 'A01', type: 'PROFILE NOTE', content: '<p class="quote">“我相信好的设计，应该像一首耐听的歌：第一遍抓住你，之后每一遍都能发现新的细节。”</p><div class="fact-grid"><div><span>BASE</span><strong>Hong Kong / CN</strong></div><div><span>FOCUS</span><strong>Product · Brand · Code</strong></div><div><span>STATUS</span><strong>Open to collaboration</strong></div></div>' },
  { title: 'Work Log / 工作经历', subtitle: 'A few chapters, carefully edited', duration: 96, code: 'B02', type: 'WORK LOG', content: '<div class="work-list"><div class="work-row"><span>2023—NOW</span><b>Independent / Product Designer<br><span>从用户洞察到可交付的完整产品体验。</span></b><small>HONG KONG</small></div><div class="work-row"><span>2020—23</span><b>Creative Studio / Design Lead<br><span>带领跨职能团队完成品牌与数字产品。</span></b><small>SHENZHEN</small></div><div class="work-row"><span>2016—20</span><b>Digital Agency / Visual Designer<br><span>在像素、版式和动效里找到秩序。</span></b><small>GUANGZHOU</small></div></div>' },
  { title: 'Selected Cuts / 精选项目', subtitle: 'Small details, big signals', duration: 84, code: 'C03', type: 'SELECTED WORK', content: '<div class="work-list"><div class="work-row"><span>01 / 2025</span><b>Field Notes<br><span>把城市观察做成可以被收藏的数字杂志。</span></b><small>EDITORIAL</small></div><div class="work-row"><span>02 / 2024</span><b>Loop FM<br><span>一个会根据心情生成电台的音乐产品。</span></b><small>PRODUCT</small></div><div class="work-row"><span>03 / 2022</span><b>Made Human<br><span>让一家科技公司说人话的品牌系统。</span></b><small>BRAND</small></div></div>' },
  { title: 'Contact / 联系我', subtitle: 'Leave a message after the beep', duration: 48, code: 'D04', type: 'OPEN CHANNEL', content: '<div class="contact-panel"><p class="quote">有想法，<br>就让它播放出来。</p><a href="mailto:yongsenzhang@ln.hk">yongsenzhang@ln.hk ↗</a></div>' }
];

const disc = document.querySelector('#disc');
const tonearm = document.querySelector('#tonearm');
const playMain = document.querySelector('#playMain');
const visualizer = document.querySelector('#visualizer');
const progress = document.querySelector('#progress');
const currentTime = document.querySelector('#currentTime');
const totalTime = document.querySelector('#totalTime');
let activeTrack = 0;
let isPlaying = false;
let elapsed = 0;
let timer;

function formatTime(seconds) { const minutes = Math.floor(seconds / 60); const remainingSeconds = seconds % 60; return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`; }
function paintProgress() { const percent = (elapsed / tracks[activeTrack].duration) * 100; progress.value = elapsed; progress.max = tracks[activeTrack].duration; progress.style.background = `linear-gradient(to right, var(--orange) 0%, var(--orange) ${percent}%, rgba(22,25,19,.18) ${percent}%)`; currentTime.textContent = formatTime(elapsed); totalTime.textContent = formatTime(tracks[activeTrack].duration); }
function setPlaying(nextState) { isPlaying = nextState; disc.classList.toggle('playing', isPlaying); tonearm.classList.toggle('playing', isPlaying); visualizer.classList.toggle('active', isPlaying); playMain.querySelector('.play-icon').textContent = isPlaying ? 'Ⅱ' : '▶'; playMain.querySelector('span:last-child').textContent = isPlaying ? 'PAUSE INTRO' : 'PLAY INTRO'; if (isPlaying) { clearInterval(timer); timer = setInterval(() => { elapsed += 1; if (elapsed >= tracks[activeTrack].duration) { elapsed = 0; setPlaying(false); } paintProgress(); }, 1000); } else clearInterval(timer); }
function loadTrack(index, shouldPlay = false) { activeTrack = index; elapsed = 0; const track = tracks[index]; document.querySelector('#trackNumber').textContent = `TRACK ${String(index + 1).padStart(2, '0')} / 04`; document.querySelector('#trackTitle').textContent = track.title; document.querySelector('#trackSubtitle').textContent = track.subtitle; document.querySelector('#panelCode').textContent = track.code; document.querySelector('#panelType').textContent = track.type; document.querySelector('#panelContent').innerHTML = track.content; document.querySelectorAll('.track').forEach((button, i) => button.classList.toggle('active', i === index)); paintProgress(); setPlaying(shouldPlay); }
playMain.addEventListener('click', () => setPlaying(!isPlaying));
document.querySelectorAll('.track').forEach(button => button.addEventListener('click', () => loadTrack(Number(button.dataset.track), true)));
progress.addEventListener('input', () => { elapsed = Number(progress.value); paintProgress(); });
document.addEventListener('keydown', event => { if (event.code === 'Space' && event.target.tagName !== 'INPUT') { event.preventDefault(); setPlaying(!isPlaying); } if (event.code === 'ArrowRight') loadTrack((activeTrack + 1) % tracks.length, isPlaying); if (event.code === 'ArrowLeft') loadTrack((activeTrack - 1 + tracks.length) % tracks.length, isPlaying); });
paintProgress();
