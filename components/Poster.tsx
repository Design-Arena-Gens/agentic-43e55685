"use client";

import React, { useMemo, useRef, useState } from 'react';
import { toPng } from 'html-to-image';

const DEFAULT_QUESTION = '?? ?? ??? ??????? ????? ??????? ????????? ???? ??????';

export default function Poster() {
  const posterRef = useRef<HTMLDivElement | null>(null);

  const [question, setQuestion] = useState<string>(DEFAULT_QUESTION);
  const [muftiName, setMuftiName] = useState<string>('Mufti Ahmad');
  const [handle, setHandle] = useState<string>('@YourInstaID');
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [logoPosition, setLogoPosition] = useState<'topRight' | 'bottomLeft'>('topRight');
  const [useGold, setUseGold] = useState<boolean>(true);
  const [questionFontSize, setQuestionFontSize] = useState<number>(120);

  const textClass = useMemo(() => (useGold ? 'goldText' : 'whiteEmboss'), [useGold]);

  async function handleDownload() {
    if (!posterRef.current) return;
    const node = posterRef.current;
    const dataUrl = await toPng(node, {
      cacheBust: true,
      width: 1080,
      height: 1920,
      pixelRatio: 1,
      style: { transform: 'none' },
      backgroundColor: '#0b1732',
    });

    const link = document.createElement('a');
    link.download = 'islamic-qa-poster.png';
    link.href = dataUrl;
    link.click();
  }

  function onLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogoDataUrl(String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <div className="builder">
      <section className="previewWrap">
        <div className="posterFrame">
          <div className="posterScale">
            <div className="poster" ref={posterRef}>
              {/* Light rays and subtle gradients */}
              <div className="layer lightRays" />

              {/* Geometric pattern overlay */}
              <div className="layer patternOverlay" aria-hidden>
                <svg width="100%" height="100%" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="geo" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <path d="M0 0 L80 0 L80 80 L0 80 Z" fill="none" />
                      <path d="M0 40 L80 40 M40 0 L40 80" stroke="#ffffff" strokeOpacity="0.13" strokeWidth="1"/>
                      <circle cx="40" cy="40" r="3" fill="#ffd98e" fillOpacity="0.35"/>
                    </pattern>
                  </defs>
                  <rect x="0" y="0" width="1080" height="1920" fill="url(#geo)" />
                </svg>
              </div>

              {/* Bokeh orbs */}
              <div className="bokeh" style={{ width: 140, height: 140, left: 140, top: 160, background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,.7), rgba(255,255,255,0) 60%)' }} />
              <div className="bokeh" style={{ width: 220, height: 220, right: 180, top: 220, background: 'radial-gradient(circle at 30% 30%, rgba(255,220,160,.6), rgba(255,255,255,0) 60%)' }} />
              <div className="bokeh" style={{ width: 160, height: 160, left: 260, top: 520, background: 'radial-gradient(circle at 30% 30%, rgba(150,200,255,.5), rgba(255,255,255,0) 70%)' }} />
              <div className="bokeh" style={{ width: 260, height: 260, right: 140, top: 720, background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,.35), rgba(255,255,255,0) 70%)' }} />

              {/* Mosque silhouette at bottom */}
              <svg className="mosque" viewBox="0 0 1080 360" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="mosqG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1c2f6e"/>
                    <stop offset="100%" stopColor="#0b1a3a"/>
                  </linearGradient>
                </defs>
                <rect width="1080" height="360" fill="url(#mosqG)"/>
                <g fill="#0e1e47">
                  <path d="M0 260 H1080 V360 H0 Z" opacity="0.5"/>
                  <path d="M100 260 C120 220 140 200 160 200 C180 200 200 220 220 260 H100 Z"/>
                  <path d="M260 260 C280 210 320 170 360 170 C400 170 440 210 460 260 H260 Z"/>
                  <path d="M520 260 C540 190 600 140 660 140 C720 140 780 190 800 260 H520 Z"/>
                  <path d="M860 260 C880 215 920 185 960 185 C1000 185 1040 215 1060 260 H860 Z"/>
                </g>
                <g fill="#162e6a">
                  <rect x="120" y="210" width="32" height="90"/>
                  <rect x="132" y="180" width="8" height="30"/>
                  <circle cx="136" cy="175" r="8"/>

                  <rect x="380" y="170" width="40" height="120"/>
                  <rect x="397" y="140" width="6" height="30"/>
                  <circle cx="400" cy="135" r="10"/>

                  <rect x="880" y="185" width="34" height="105"/>
                  <rect x="895" y="155" width="6" height="30"/>
                  <circle cx="898" cy="150" r="9"/>
                </g>
              </svg>

              {/* Content */}
              <div className="content">
                <div />
                <div className="centerBlock">
                  <h1
                    className={`question ${textClass}`}
                    style={{
                      fontSize: `${questionFontSize}px`,
                      maxWidth: 880,
                    }}
                  >
                    {question}
                  </h1>
                </div>
                <div className="metaRow">
                  <div className="mufti">?????: ???? {muftiName}</div>
                  <div className="handle">{handle}</div>
                </div>

                {logoDataUrl && (
                  <img src={logoDataUrl} alt="logo" className={`logo ${logoPosition}`} />
                )}
              </div>
            </div>
          </div>
          <div className="scaleHelp">Preview is scaled. Export downloads full 1080?1920.</div>
        </div>
      </section>

      <aside className="controls">
        <h2>Poster settings</h2>
        <div className="group">
          <label>Question text</label>
          <textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="???? ?????? ???" />
        </div>
        <div className="group row">
          <div>
            <label>Mufti name</label>
            <input type="text" value={muftiName} onChange={e => setMuftiName(e.target.value)} placeholder="Mufti Name" />
          </div>
          <div>
            <label>Instagram handle</label>
            <input type="text" value={handle} onChange={e => setHandle(e.target.value)} placeholder="@YourInstaID" />
          </div>
        </div>
        <div className="group">
          <label>Question font size: {questionFontSize}px</label>
          <input
            type="range"
            min={72}
            max={170}
            step={1}
            value={questionFontSize}
            onChange={e => setQuestionFontSize(Number(e.target.value))}
          />
        </div>
        <div className="group row">
          <button className="btn secondary" onClick={() => setUseGold(true)}>Gold 3D</button>
          <button className="btn secondary" onClick={() => setUseGold(false)}>White Emboss</button>
        </div>
        <div className="group">
          <label>Logo (optional)</label>
          <input type="file" accept="image/*" onChange={onLogoChange} />
        </div>
        <div className="group row">
          <button className="btn secondary" onClick={() => setLogoPosition('topRight')}>Logo: Top Right</button>
          <button className="btn secondary" onClick={() => setLogoPosition('bottomLeft')}>Logo: Bottom Left</button>
        </div>
        <div className="group">
          <button className="btn" onClick={handleDownload}>Download PNG (1080?1920)</button>
        </div>
      </aside>
    </div>
  );
}
