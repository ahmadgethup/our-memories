"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };
const WEDDING_DATE = "2027-11-01";
const MELODY = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46, 523.25, 659.25, 783.99, 1046.5, 880, 783.99, 659.25, 587.33];

function getTimeLeft(date: string): TimeLeft | null {
  if (!date) return null;
  const target = new Date(`${date}T00:00:00`).getTime();
  const difference = target - Date.now();
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference % 86_400_000) / 3_600_000),
    minutes: Math.floor((difference % 3_600_000) / 60_000),
    seconds: Math.floor((difference % 60_000) / 1_000),
  };
}

function playNote(context: AudioContext, frequency: number) {
  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.075, now + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.92);
}

export default function WeddingPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [playing, setPlaying] = useState(false);
  const [musicBlocked, setMusicBlocked] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const noteRef = useRef(0);

  useEffect(() => {
    setTimeLeft(getTimeLeft(WEDDING_DATE));
    const interval = window.setInterval(() => setTimeLeft(getTimeLeft(WEDDING_DATE)), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!playing) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    let cancelled = false;
    const play = () => {
      if (cancelled) return;
      const context = audioRef.current;
      if (context) playNote(context, MELODY[noteRef.current % MELODY.length]);
      noteRef.current += 1;
      timerRef.current = setTimeout(play, 460);
    };
    play();
    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    void audioRef.current?.close();
  }, []);

  const startMusic = useCallback(async () => {
    try {
      const AudioContextClass = window.AudioContext;
      if (!audioRef.current || audioRef.current.state === "closed") {
        audioRef.current = new AudioContextClass();
      }
      if (audioRef.current.state === "suspended") await audioRef.current.resume();
      const allowed = audioRef.current.state === "running";
      setPlaying(allowed);
      setMusicBlocked(!allowed);
      return allowed;
    } catch {
      setMusicBlocked(true);
      return false;
    }
  }, []);

  const toggleMusic = useCallback(async () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    await startMusic();
  }, [playing, startMusic]);

  useEffect(() => {
    const startAfterGesture = () => void startMusic();
    void startMusic();
    window.addEventListener("pointerdown", startAfterGesture, { once: true });
    window.addEventListener("keydown", startAfterGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", startAfterGesture);
      window.removeEventListener("keydown", startAfterGesture);
    };
  }, [startMusic]);

  const formattedDate = new Date(`${WEDDING_DATE}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  return (
    <section className="wedding-page fade-up">
      <style jsx global>{`
        .wedding-page{--w-rose:#ff7898;--w-pink:#ffc4d1;--w-gold:#e8c47f;--w-muted:rgba(255,205,220,.61);position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(350px,1fr);align-items:center;gap:2rem;min-height:610px;padding:2.3rem 1rem 3rem;overflow:hidden}
        .wedding-copy{position:relative;z-index:2;padding:1rem 0}.wedding-eyebrow{color:var(--w-gold);font-size:.67rem;font-weight:500;letter-spacing:.25em;text-transform:uppercase}.wedding-title{max-width:560px;margin:1.15rem 0 1rem;font-family:"Cormorant Garamond",serif;font-size:clamp(2.8rem,5.3vw,4.8rem);font-weight:300;line-height:.98;letter-spacing:-.025em;color:#fff}.wedding-title em{font-weight:300;color:var(--w-pink)}.wedding-description{max-width:440px;color:var(--w-muted);font-size:.91rem;line-height:1.85}.wedding-countdown{display:flex;gap:.7rem;margin:2rem 0 .9rem;flex-wrap:wrap}.wedding-unit{width:83px;padding:1rem .5rem .85rem;border:1px solid rgba(255,160,185,.17);border-radius:18px;background:linear-gradient(145deg,rgba(255,255,255,.075),rgba(255,255,255,.025));text-align:center;box-shadow:inset 0 1px rgba(255,255,255,.06),0 12px 30px rgba(0,0,0,.12)}.wedding-number{display:block;font-family:"Cormorant Garamond",serif;font-size:2rem;font-weight:400;line-height:1;color:#ffe6e8;text-shadow:0 0 18px rgba(255,120,152,.24)}.wedding-unit-label{display:block;margin-top:.5rem;color:rgba(255,205,220,.48);font-size:.57rem;letter-spacing:.15em;text-transform:uppercase}.wedding-date{min-height:1.2rem;color:rgba(255,205,220,.55);font-size:.72rem;letter-spacing:.06em}.wedding-signoff{margin-top:1.8rem;color:#f2c3cf;font-family:"Cormorant Garamond",serif;font-size:1.18rem;font-style:italic}.wedding-form{display:flex;gap:.6rem;align-items:center;margin-top:1.5rem;max-width:400px}.wedding-date-input{min-width:0;flex:1;padding:.72rem .9rem;border:1px solid rgba(255,150,180,.2);border-radius:12px;background:rgba(255,255,255,.045);color:#ffe5ec;color-scheme:dark;font: .78rem "DM Sans",sans-serif;outline:none}.wedding-date-input:focus{border-color:rgba(255,120,152,.58);box-shadow:0 0 0 3px rgba(255,77,109,.1)}.wedding-save{padding:.75rem 1rem;border:1px solid rgba(232,196,127,.38);border-radius:12px;background:rgba(232,196,127,.1);color:#f3d99c;font:500 .75rem "DM Sans",sans-serif;cursor:pointer;transition:background .2s,transform .2s}.wedding-save:hover{background:rgba(232,196,127,.18);transform:translateY(-1px)}.wedding-hint{margin-top:.55rem;color:rgba(255,205,220,.34);font-size:.66rem}
        .wedding-melody{display:inline-flex;align-items:center;gap:.55rem;margin-top:1rem;padding:.58rem .95rem;border:1px solid rgba(255,150,180,.2);border-radius:99px;background:rgba(255,255,255,.04);color:rgba(255,221,230,.83);font:400 .74rem "DM Sans",sans-serif;cursor:pointer;transition:background .2s,border-color .2s}.wedding-melody:hover{background:rgba(255,255,255,.08);border-color:rgba(255,150,180,.34)}.wedding-melody-icon{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:rgba(255,120,152,.15);color:#ffc4d1}.wedding-playing .wedding-melody-icon{animation:wedding-note .65s ease-in-out infinite alternate}
        .wedding-scene{position:relative;display:grid;place-items:center;height:505px;perspective:1000px}.wedding-halo{position:absolute;width:min(90%,400px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(255,120,152,.12),rgba(255,170,185,.045) 42%,transparent 72%);filter:blur(3px)}.wedding-star{position:absolute;color:var(--w-gold);opacity:.67;animation:wedding-twinkle 2.7s ease-in-out infinite alternate}.wedding-star-one{top:15%;left:18%}.wedding-star-two{top:25%;right:10%;animation-delay:.8s}.wedding-star-three{bottom:19%;left:15%;animation-delay:1.3s}.wedding-stage{position:relative;width:370px;height:355px;transform-style:preserve-3d;animation:wedding-float 4.2s ease-in-out infinite}.wedding-shadow{position:absolute;left:52px;bottom:6px;width:265px;height:27px;border-radius:50%;background:rgba(0,0,0,.35);filter:blur(13px)}.wedding-box{position:absolute;left:64px;top:55px;width:242px;height:166px;border:2px solid #e1be7b;border-radius:27px 27px 37px 37px;background:linear-gradient(135deg,#a72c53,#711536 68%,#4c1028);box-shadow:inset 0 3px 9px rgba(255,190,195,.3),0 24px 35px rgba(0,0,0,.32);transform:rotateX(5deg) rotateY(-8deg);transform-style:preserve-3d}.wedding-box:before{position:absolute;inset:12px;border:1px solid rgba(241,207,142,.72);border-radius:19px 19px 29px 29px;content:""}.wedding-box:after{position:absolute;left:50%;top:68%;color:#f2d695;content:"♡";font-size:25px;transform:translate(-50%,-50%);text-shadow:0 0 10px rgba(255,230,170,.3)}.wedding-lid{position:absolute;z-index:1;left:69px;top:19px;width:232px;height:44px;border:2px solid #e4c17c;border-radius:50%;background:linear-gradient(#b44665,#791b3b);box-shadow:0 5px 0 #54112d,0 10px 16px rgba(0,0,0,.22);transform:rotateX(62deg)}.wedding-key{position:absolute;z-index:-1;left:174px;top:215px;width:30px;height:49px;border:3px solid #d9b56f;border-top:0;border-radius:0 0 12px 12px;transform:rotateX(60deg)}.wedding-key:after{position:absolute;left:6px;bottom:-8px;width:12px;height:12px;border:3px solid #d9b56f;border-radius:50%;background:#9b3051;content:""}.wedding-turntable{position:absolute;left:31px;top:168px;width:309px;height:121px;border:3px solid #d4ad6d;border-radius:50%;background:repeating-radial-gradient(ellipse at center,rgba(255,245,220,.1) 0 8px,rgba(102,28,54,.06) 9px 11px),linear-gradient(150deg,#f0d6c8,#c58c8e 75%);box-shadow:0 10px 22px rgba(0,0,0,.3);transform:rotateX(62deg);transform-style:preserve-3d}.wedding-turntable:after{position:absolute;inset:43px 128px;border:2px solid #d2aa69;border-radius:50%;background:#edd7c7;content:""}.wedding-couple{position:absolute;z-index:3;left:50%;top:53px;width:192px;height:206px;transform:translateX(-50%) rotateY(-7deg);transform-style:preserve-3d;animation:wedding-turn 9s ease-in-out infinite}.wedding-person{position:absolute;bottom:10px;width:87px;height:127px;transform-style:preserve-3d}.wedding-person-bride{left:7px;transform:rotate(-5deg)}.wedding-person-groom{right:6px;transform:rotate(5deg)}.wedding-head{position:absolute;z-index:2;left:17px;top:0;width:55px;height:61px;border-radius:48% 48% 45% 45%;background:linear-gradient(140deg,#ffdfc6,#ce8f78);box-shadow:inset -5px -4px 8px rgba(105,47,52,.24),0 5px 8px rgba(54,20,34,.18)}.wedding-person-groom .wedding-head{background:linear-gradient(140deg,#f6d1b2,#ba7a66)}.wedding-hair{position:absolute;left:-2px;top:-6px;width:59px;height:27px;border-radius:50% 50% 35% 35%;background:#38232c}.wedding-person-bride .wedding-hair{height:30px;background:#39242b;box-shadow:7px 8px 0 -2px #39242b,-4px 9px 0 -2px #39242b}.wedding-eyes{position:absolute;left:15px;top:31px;width:4px;height:5px;border-radius:50%;background:#472a32;box-shadow:19px 0 #472a32}.wedding-smile{position:absolute;left:23px;top:41px;width:10px;height:5px;border-bottom:1.5px solid #a34a61;border-radius:50%}.wedding-body{position:absolute;top:53px;left:6px;width:75px;height:72px;border-radius:30px 30px 15px 15px;box-shadow:inset -6px -5px 9px rgba(86,30,48,.15)}.wedding-dress{background:linear-gradient(145deg,#fff5e9,#ecd2d4);clip-path:polygon(23% 0,77% 0,100% 100%,0 100%)}.wedding-bodice{position:absolute;left:24px;top:0;width:28px;height:37px;background:linear-gradient(135deg,#fffdf5,#edd7d4);clip-path:polygon(0 0,100% 0,90% 100%,10% 100%)}.wedding-skirt{position:absolute;inset:34px 6px 0;background:radial-gradient(ellipse at top,#fff8ed,#e3bbc9);clip-path:polygon(20% 0,80% 0,100% 100%,0 100%)}.wedding-suit{background:linear-gradient(135deg,#45323d,#211e2a);clip-path:polygon(17% 0,83% 0,100% 100%,0 100%)}.wedding-shirt{position:absolute;left:27px;top:0;width:22px;height:45px;background:#fff4e8;clip-path:polygon(0 0,100% 0,78% 100%,50% 74%,22% 100%)}.wedding-bowtie{position:absolute;top:8px;left:32px;width:13px;height:7px;background:#d6af72;clip-path:polygon(0 0,45% 30%,55% 30%,100% 0,86% 100%,53% 68%,47% 68%,14% 100%)}.wedding-arm{position:absolute;z-index:3;top:62px;width:14px;height:54px;border-radius:99px;background:#efc1a5;transform-origin:top}.wedding-arm-bride{left:63px;transform:rotate(-29deg)}.wedding-arm-groom{left:9px;transform:rotate(29deg)}.wedding-floating-heart{position:absolute;left:86px;top:105px;color:#cf5276;font-size:21px;text-shadow:0 0 12px rgba(255,220,230,.5);animation:wedding-heart 2.2s ease-in-out infinite}.wedding-pedestal{position:absolute;z-index:4;left:23px;top:267px;width:323px;height:73px;border:2px solid #f0d9a5;border-radius:50%;background:linear-gradient(#d9b776,#a87840);box-shadow:0 14px 23px rgba(0,0,0,.32),inset 0 5px 7px rgba(255,245,200,.27)}.wedding-pedestal:after{position:absolute;inset:29px 0 auto;text-align:center;color:#67223b;content:"OUR LITTLE FOREVER";font-size:7px;font-weight:500;letter-spacing:.24em}.wedding-pedestal-foot{position:absolute;z-index:3;left:168px;top:302px;width:35px;height:28px;border-radius:0 0 9px 9px;background:linear-gradient(#b48a4b,#79532f);box-shadow:inset 0 4px #d5ae6b}.wedding-caption{position:absolute;right:0;bottom:4px;color:rgba(255,205,220,.46);font-size:.63rem;letter-spacing:.05em}.wedding-caption span{color:var(--w-gold)}
        .wedding-page{--w-rose:#c46b37;--w-pink:#f2c18b;--w-gold:#dc9b4f;--w-muted:rgba(249,222,189,.73);min-height:610px;padding:2.3rem 1.5rem 3rem;border:1px solid rgba(228,164,97,.25);border-radius:30px;background:radial-gradient(ellipse at 80% 20%,rgba(154,78,37,.3),transparent 42%),radial-gradient(ellipse at 5% 95%,rgba(101,55,31,.42),transparent 46%),linear-gradient(145deg,#24130f,#160e0d 60%,#21120e);box-shadow:inset 0 1px rgba(255,222,177,.07),0 25px 70px rgba(0,0,0,.22)}
        .wedding-eyebrow{color:#e2aa68}.wedding-title em{color:#f2c18b}.wedding-number{color:#ffe4bc;text-shadow:0 0 20px rgba(224,143,76,.24)}.wedding-unit{border-color:rgba(220,155,79,.25);background:linear-gradient(145deg,rgba(255,235,203,.09),rgba(126,65,37,.08))}.wedding-unit-label,.wedding-date{color:rgba(249,222,189,.61)}.wedding-signoff{color:#edbd87}
        .wedding-scene{display:block;height:auto;min-height:0;padding:1.2rem 0;perspective:none}.wedding-video-frame{position:relative;z-index:1;width:min(100%,510px);margin:auto;padding:12px;border:1px solid rgba(227,172,103,.68);border-radius:25px;background:linear-gradient(145deg,#58301f,#2b1913 45%,#68402a);box-shadow:0 22px 55px rgba(0,0,0,.45),inset 0 1px rgba(255,228,183,.35)}.wedding-video-heading,.wedding-video-footer{padding:.8rem .5rem;text-align:center;color:#f3d09e;font-size:.62rem;letter-spacing:.19em}.wedding-video-heading span{color:#dd9954}.wedding-video-footer{padding:.7rem .5rem .4rem;color:rgba(249,222,189,.62);font-family:"Cormorant Garamond",serif;font-size:1rem;font-style:italic;letter-spacing:.04em}.wedding-video-window{position:relative;width:min(100%,430px);aspect-ratio:72/85;margin:auto;overflow:hidden;border:1px solid rgba(255,223,185,.12);border-radius:15px;background:#100b0a}.wedding-video{position:absolute;inset:0;display:block;width:100%;height:100%;max-height:none;aspect-ratio:auto;object-fit:cover;object-position:center 48.8%;border:0;border-radius:0;background:#100b0a}.wedding-caption{position:relative;right:auto;bottom:auto;margin:1rem 0 0;text-align:center;color:rgba(249,222,189,.56)}.wedding-caption span{color:#df9b53}.wedding-fall-leaf{position:absolute;z-index:2;pointer-events:none;font-size:1.6rem;filter:drop-shadow(0 5px 4px rgba(0,0,0,.3));animation:leaf-drift 7s ease-in-out infinite}.leaf-one{top:5%;left:0}.leaf-two{top:48%;right:-1%;font-size:1.2rem;animation-delay:2s}.leaf-three{bottom:11%;left:4%;font-size:1.05rem;animation-delay:4s}.wedding-melody{border-color:rgba(220,155,79,.4);background:rgba(182,101,52,.12);color:#f4dab6}.wedding-melody-icon{background:rgba(220,155,79,.2);color:#ffd39a}.wedding-melody:hover{background:rgba(182,101,52,.22);border-color:rgba(220,155,79,.58)}.wedding-autoplay-note{margin-top:.9rem;color:rgba(249,222,189,.55);font-size:.72rem}
        @keyframes leaf-drift{0%,100%{transform:translate3d(0,-4px,0) rotate(-9deg)}50%{transform:translate3d(8px,16px,0) rotate(18deg)}}
        @keyframes wedding-float{0%,100%{translate:0 0}50%{translate:0 -8px}}@keyframes wedding-turn{0%,18%{transform:translateX(-50%) rotateY(-9deg)}50%{transform:translateX(-50%) rotateY(12deg)}82%,100%{transform:translateX(-50%) rotateY(-9deg)}}@keyframes wedding-twinkle{from{opacity:.3;transform:scale(.84)}to{opacity:.9;transform:scale(1.15)}}@keyframes wedding-heart{0%,100%{transform:translateY(1px) scale(.92)}50%{transform:translateY(-5px) scale(1.1)}}@keyframes wedding-note{from{transform:translateY(1px)}to{transform:translateY(-3px)}}
        @media(max-width:760px){.wedding-page{grid-template-columns:1fr;gap:.8rem;padding:1.5rem .75rem 2rem}.wedding-copy{text-align:center;padding:.5rem 0}.wedding-title{margin-inline:auto;font-size:clamp(2.9rem,11vw,4rem)}.wedding-description{margin-inline:auto}.wedding-countdown{justify-content:center;margin:1.5rem 0 .75rem}.wedding-unit{width:72px;padding:.85rem .4rem .72rem}.wedding-number{font-size:1.8rem}.wedding-scene{height:auto;margin:0;scale:1}.wedding-signoff{margin-top:1.25rem}.wedding-video-frame{width:min(100%,430px)}.wedding-video-window{width:min(100%,400px)}.wedding-fall-leaf{font-size:1.25rem}}
        @media(max-width:400px){.wedding-page{padding-inline:.55rem}.wedding-unit{width:66px}.wedding-video-frame{padding:8px;border-radius:19px}}
        @media(prefers-reduced-motion:reduce){.wedding-stage,.wedding-couple,.wedding-star,.wedding-floating-heart,.wedding-fall-leaf,.wedding-playing .wedding-melody-icon{animation:none}}
      `}</style>
      <div className="wedding-copy">
        <p className="wedding-eyebrow">✦ &nbsp; our november, our forever &nbsp; ✦</p>
        <h2 className="wedding-title">Falling for you,<br /><em>all over again.</em></h2>
        <p className="wedding-description">Cool November evenings, golden leaves, and one little countdown to the day our forever begins.</p>
        {timeLeft ? (
          <div className="wedding-countdown" aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, and ${timeLeft.seconds} seconds remaining`}>
            {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
              <div className="wedding-unit" key={unit}><span className="wedding-number">{unit === "days" ? timeLeft[unit] : String(timeLeft[unit]).padStart(2, "0")}</span><span className="wedding-unit-label">{unit}</span></div>
            ))}
          </div>
        ) : <p className="wedding-description" style={{ marginTop: "1.65rem", color: "rgba(247,218,185,.43)" }}>The leaves are turning, and our day is getting closer ♡</p>}
        <p className="wedding-date">{timeLeft?.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? "Today is our forever ♡" : formattedDate}</p>
        <p className="wedding-signoff">I choose you, in every season. ♡</p>
        {musicBlocked && <p className="wedding-autoplay-note">Tap once anywhere to let the music begin.</p>}
        <button type="button" className={`wedding-melody ${playing ? "wedding-playing" : ""}`} aria-pressed={playing} onClick={() => void toggleMusic()}>
          <span className="wedding-melody-icon">♪</span>{playing ? "Pause our little melody" : musicBlocked ? "Start our little melody" : "Our melody is starting…"}
        </button>
      </div>
      <div className="wedding-scene">
        <span className="wedding-fall-leaf leaf-one" aria-hidden="true">🍁</span><span className="wedding-fall-leaf leaf-two" aria-hidden="true">🍂</span><span className="wedding-fall-leaf leaf-three" aria-hidden="true">🍁</span>
        <div className="wedding-video-frame">
          <div className="wedding-video-heading"><span>✦</span> OUR LITTLE FOREVER <span>✦</span></div>
          <div className="wedding-video-window">
            <video className="wedding-video" autoPlay loop muted playsInline preload="auto" poster="/media/wedding-couple-autumn-poster.jpg" aria-label="Our animated bride and groom">
              <source src="/media/wedding-couple-autumn.webm" type="video/webm" />
            </video>
          </div>
          <div className="wedding-video-footer">A little piece of our forever ♡</div>
        </div>
        <p className="wedding-caption"><span>✦</span> golden leaves &amp; warmer hearts</p>
      </div>
    </section>
  );
}
