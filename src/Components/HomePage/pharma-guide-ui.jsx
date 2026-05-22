import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --mint: #00C9A7;
    --mint-light: #E0FBF5;
    --mint-dark: #009E83;
    --navy: #0A1628;
    --navy-mid: #162240;
    --navy-soft: #1E3259;
    --slate: #4A6080;
    --silver: #A8BCCE;
    --mist: #EFF4F8;
    --white: #FFFFFF;
    --amber: #FFAA00;
    --rose: #FF5A7E;
    --sky: #3DB5FF;
    --r: 14px;
    --r-lg: 22px;
    --shadow: 0 8px 32px rgba(10,22,40,0.12);
    --shadow-lg: 0 20px 60px rgba(10,22,40,0.18);
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--mist); color: var(--navy); }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--silver); border-radius: 10px; }

  /* ── LAYOUT ── */
  .app { display: flex; flex-direction: column; min-height: 100vh; }

  /* ── NAV ── */
  .nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(10,22,40,0.96);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 0 32px;
    display: flex; align-items: center; justify-content: space-between;
    height: 64px;
  }
  .nav-logo {
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 22px;
    color: var(--white); letter-spacing: -0.5px; display: flex; align-items: center; gap: 8px;
  }
  .nav-logo-dot { width: 10px; height: 10px; background: var(--mint); border-radius: 50%; display: inline-block; }
  .nav-links { display: flex; gap: 4px; }
  .nav-link {
    padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 500;
    color: var(--silver); cursor: pointer; transition: all 0.2s; border: none; background: none;
  }
  .nav-link:hover, .nav-link.active { color: var(--white); background: rgba(255,255,255,0.08); }
  .nav-link.active { color: var(--mint); }
  .nav-cta {
    display: flex; gap: 8px; align-items: center;
  }
  .btn {
    padding: 10px 20px; border-radius: 10px; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.2s; border: none; font-family: 'DM Sans', sans-serif;
  }
  .btn-ghost { background: rgba(255,255,255,0.08); color: var(--silver); }
  .btn-ghost:hover { background: rgba(255,255,255,0.14); color: var(--white); }
  .btn-mint { background: var(--mint); color: var(--navy); }
  .btn-mint:hover { background: var(--mint-dark); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,201,167,0.35); }
  .btn-rose { background: var(--rose); color: var(--white); }

  /* ── HERO ── */
  .hero {
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 50%, #0D2444 100%);
    padding: 80px 32px 60px;
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 50% at 70% 50%, rgba(0,201,167,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-grid {
    max-width: 1160px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(0,201,167,0.12); border: 1px solid rgba(0,201,167,0.3);
    padding: 6px 14px; border-radius: 100px; margin-bottom: 24px;
    font-size: 13px; color: var(--mint); font-weight: 500;
  }
  .hero-badge-dot { width: 6px; height: 6px; background: var(--mint); border-radius: 50%; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
  .hero-title {
    font-family: 'Syne', sans-serif; font-size: 52px; font-weight: 800;
    color: var(--white); line-height: 1.08; letter-spacing: -1.5px; margin-bottom: 20px;
  }
  .hero-title span { color: var(--mint); }
  .hero-subtitle { font-size: 17px; color: var(--silver); line-height: 1.65; margin-bottom: 36px; max-width: 440px; }
  .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
  .hero-search {
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
    border-radius: var(--r-lg); padding: 6px 6px 6px 20px;
    display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
    transition: border-color 0.2s;
  }
  .hero-search:focus-within { border-color: var(--mint); }
  .hero-search input {
    background: none; border: none; outline: none;
    font-size: 16px; color: var(--white); flex: 1; font-family: 'DM Sans', sans-serif;
  }
  .hero-search input::placeholder { color: var(--slate); }
  .search-btn {
    background: var(--mint); border: none; border-radius: 10px;
    padding: 12px 24px; font-size: 15px; font-weight: 600; color: var(--navy);
    cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
    white-space: nowrap;
  }
  .search-btn:hover { background: var(--mint-dark); }
  .hero-tags { display: flex; gap: 8px; flex-wrap: wrap; }
  .hero-tag {
    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
    padding: 5px 12px; border-radius: 100px; font-size: 13px; color: var(--silver); cursor: pointer;
    transition: all 0.2s;
  }
  .hero-tag:hover { background: rgba(0,201,167,0.12); border-color: var(--mint); color: var(--mint); }

  /* ── HERO CARD (right side) ── */
  .hero-visual {
    display: flex; flex-direction: column; gap: 16px;
  }
  .drug-card-hero {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--r-lg); padding: 24px; backdrop-filter: blur(10px);
    transition: transform 0.2s;
  }
  .drug-card-hero:hover { transform: translateY(-3px); }
  .drug-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; }
  .drug-name { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; color: var(--white); }
  .drug-generic { font-size: 13px; color: var(--mint); margin-top: 2px; }
  .drug-badge {
    background: rgba(0,201,167,0.15); border: 1px solid rgba(0,201,167,0.3);
    padding: 4px 10px; border-radius: 100px; font-size: 12px; color: var(--mint); font-weight: 600;
  }
  .drug-info-row { display: flex; gap: 16px; margin-bottom: 16px; }
  .drug-info-item { flex: 1; }
  .drug-info-label { font-size: 11px; color: var(--slate); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .drug-info-value { font-size: 14px; color: var(--silver); font-weight: 500; }
  .drug-avail {
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(0,201,167,0.08); border-radius: 10px; padding: 12px 16px;
  }
  .avail-text { font-size: 14px; color: var(--mint); font-weight: 600; }
  .avail-count { font-size: 13px; color: var(--silver); }

  .pharmacy-mini-card {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    border-radius: var(--r); padding: 14px 18px;
    display: flex; align-items: center; gap: 14px;
  }
  .pharm-icon {
    width: 40px; height: 40px; border-radius: 10px;
    background: rgba(61,181,255,0.15); display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
  }
  .pharm-name { font-size: 14px; color: var(--white); font-weight: 600; }
  .pharm-dist { font-size: 12px; color: var(--slate); margin-top: 2px; }
  .pharm-status {
    margin-left: auto; background: rgba(0,201,167,0.15); border-radius: 100px;
    padding: 4px 10px; font-size: 12px; color: var(--mint); font-weight: 600;
  }

  /* ── STATS BAR ── */
  .stats-bar {
    background: var(--white); border-bottom: 1px solid #E8EEF3;
    padding: 24px 32px;
  }
  .stats-inner {
    max-width: 1160px; margin: 0 auto;
    display: flex; justify-content: space-around; gap: 20px;
  }
  .stat-item { text-align: center; }
  .stat-num { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: var(--navy); }
  .stat-num span { color: var(--mint); }
  .stat-label { font-size: 13px; color: var(--slate); margin-top: 2px; }

  /* ── SECTION ── */
  .section { padding: 60px 32px; max-width: 1160px; margin: 0 auto; width: 100%; }
  .section-header { margin-bottom: 36px; }
  .section-eyebrow {
    font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    color: var(--mint); margin-bottom: 10px;
  }
  .section-title { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: var(--navy); letter-spacing: -0.5px; }
  .section-sub { font-size: 16px; color: var(--slate); margin-top: 8px; }

  /* ── DRUG GRID ── */
  .drug-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
  .drug-card {
    background: var(--white); border-radius: var(--r-lg); padding: 24px;
    border: 1px solid #E8EEF3; transition: all 0.25s; cursor: pointer; position: relative; overflow: hidden;
  }
  .drug-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: var(--mint); transform: scaleX(0); transform-origin: left; transition: transform 0.3s;
  }
  .drug-card:hover { box-shadow: var(--shadow); transform: translateY(-3px); border-color: rgba(0,201,167,0.2); }
  .drug-card:hover::before { transform: scaleX(1); }
  .dc-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px; }
  .dc-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0;
  }
  .dc-icon.blue { background: rgba(61,181,255,0.12); }
  .dc-icon.mint { background: rgba(0,201,167,0.12); }
  .dc-icon.amber { background: rgba(255,170,0,0.12); }
  .dc-icon.rose { background: rgba(255,90,126,0.12); }
  .dc-fav {
    width: 32px; height: 32px; border-radius: 8px; background: var(--mist);
    display: flex; align-items: center; justify-content: center; cursor: pointer;
    font-size: 16px; transition: all 0.2s; border: none;
  }
  .dc-fav:hover { background: rgba(255,90,126,0.1); }
  .dc-fav.active { background: rgba(255,90,126,0.1); }
  .dc-name { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; color: var(--navy); margin-bottom: 4px; }
  .dc-generic { font-size: 13px; color: var(--mint); font-weight: 500; margin-bottom: 12px; }
  .dc-meta { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
  .dc-chip {
    padding: 4px 10px; border-radius: 100px; font-size: 12px; font-weight: 500;
    background: var(--mist); color: var(--slate);
  }
  .dc-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid #F0F4F7; }
  .dc-avail { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; }
  .dc-avail.yes { color: var(--mint); }
  .dc-avail.no { color: var(--rose); }
  .dot { width: 7px; height: 7px; border-radius: 50%; }
  .dot.yes { background: var(--mint); }
  .dot.no { background: var(--rose); }
  .dc-pharmacies { font-size: 12px; color: var(--slate); }

  /* ── MAP SECTION ── */
  .map-section { background: var(--navy); padding: 60px 32px; }
  .map-inner { max-width: 1160px; margin: 0 auto; display: grid; grid-template-columns: 340px 1fr; gap: 24px; }
  .map-sidebar { display: flex; flex-direction: column; gap: 12px; }
  .map-search {
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
    border-radius: var(--r); padding: 12px 16px; display: flex; align-items: center; gap: 10px;
  }
  .map-search input {
    background: none; border: none; outline: none;
    color: var(--white); font-size: 14px; flex: 1; font-family: 'DM Sans', sans-serif;
  }
  .map-search input::placeholder { color: var(--slate); }
  .pharm-list-item {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
    border-radius: var(--r); padding: 16px; cursor: pointer; transition: all 0.2s;
  }
  .pharm-list-item:hover, .pharm-list-item.active {
    background: rgba(0,201,167,0.08); border-color: rgba(0,201,167,0.3);
  }
  .pli-top { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
  .pli-icon {
    width: 36px; height: 36px; border-radius: 9px;
    background: rgba(61,181,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 16px;
  }
  .pli-name { font-size: 14px; font-weight: 600; color: var(--white); }
  .pli-dist { font-size: 12px; color: var(--slate); margin-top: 2px; }
  .pli-badge { margin-left: auto; font-size: 12px; font-weight: 700; color: var(--mint); }
  .pli-drugs { display: flex; gap: 6px; flex-wrap: wrap; }
  .pli-drug { background: rgba(255,255,255,0.07); padding: 3px 9px; border-radius: 100px; font-size: 11px; color: var(--silver); }

  .map-frame {
    border-radius: var(--r-lg); overflow: hidden; position: relative; min-height: 420px;
    background: #162240;
  }
  .map-placeholder {
    width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 16px; color: var(--silver);
    background: radial-gradient(ellipse at 50% 50%, #1E3259 0%, #0A1628 100%);
    position: relative; overflow: hidden;
  }
  /* Fake map grid */
  .map-grid-lines {
    position: absolute; inset: 0; opacity: 0.15;
    background-image: linear-gradient(var(--silver) 1px, transparent 1px),
      linear-gradient(90deg, var(--silver) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .map-pins { position: absolute; inset: 0; }
  .map-pin {
    position: absolute; display: flex; flex-direction: column; align-items: center; cursor: pointer;
    transition: transform 0.2s;
  }
  .map-pin:hover { transform: scale(1.15); }
  .pin-icon {
    width: 40px; height: 40px; border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg); display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
  .pin-icon span { transform: rotate(45deg); font-size: 18px; }
  .pin-icon.mint { background: var(--mint); }
  .pin-icon.sky { background: var(--sky); }
  .pin-icon.amber { background: var(--amber); }
  .map-user {
    position: absolute; bottom: 35%; left: 48%;
    width: 20px; height: 20px; border-radius: 50%;
    background: var(--sky); border: 3px solid white; box-shadow: 0 0 0 6px rgba(61,181,255,0.25);
    animation: userPulse 2s infinite;
  }
  @keyframes userPulse { 0%,100%{box-shadow:0 0 0 6px rgba(61,181,255,0.25)} 50%{box-shadow:0 0 0 12px rgba(61,181,255,0.1)} }
  .map-label {
    font-size: 12px; font-weight: 600; color: var(--white);
    background: rgba(10,22,40,0.8); padding: 4px 8px; border-radius: 6px; margin-top: 4px;
    white-space: nowrap;
  }

  /* ── DRUG DETAIL ── */
  .detail-overlay {
    position: fixed; inset: 0; background: rgba(10,22,40,0.7); z-index: 200;
    display: flex; align-items: center; justify-content: center; padding: 20px;
    backdrop-filter: blur(4px);
  }
  .detail-panel {
    background: var(--white); border-radius: var(--r-lg); width: 100%; max-width: 680px;
    max-height: 85vh; overflow-y: auto; box-shadow: var(--shadow-lg);
    animation: slideUp 0.25s ease;
  }
  @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  .detail-header {
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%);
    padding: 28px 32px; position: relative;
  }
  .detail-close {
    position: absolute; top: 20px; right: 20px;
    width: 32px; height: 32px; border-radius: 8px;
    background: rgba(255,255,255,0.1); border: none; color: var(--silver);
    font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .detail-close:hover { background: rgba(255,255,255,0.2); }
  .detail-drug-name { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: var(--white); margin-bottom: 4px; }
  .detail-generic { font-size: 15px; color: var(--mint); font-weight: 500; margin-bottom: 16px; }
  .detail-badges { display: flex; gap: 8px; flex-wrap: wrap; }
  .detail-badge {
    padding: 5px 14px; border-radius: 100px; font-size: 13px; font-weight: 600;
    background: rgba(255,255,255,0.1); color: var(--silver);
  }
  .detail-badge.mint { background: rgba(0,201,167,0.2); color: var(--mint); }
  .detail-body { padding: 28px 32px; display: flex; flex-direction: column; gap: 24px; }
  .detail-section-title {
    font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 1px; color: var(--navy); margin-bottom: 12px;
  }
  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .info-box {
    background: var(--mist); border-radius: 12px; padding: 16px;
  }
  .info-box-label { font-size: 11px; font-weight: 700; color: var(--slate); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
  .info-box-value { font-size: 15px; color: var(--navy); font-weight: 500; }
  .side-effects { display: flex; flex-direction: column; gap: 8px; }
  .side-effect-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px; border-radius: 10px; background: var(--mist);
  }
  .se-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .se-dot.common { background: var(--amber); }
  .se-dot.rare { background: var(--rose); }
  .se-text { font-size: 14px; color: var(--navy); }
  .se-freq { margin-left: auto; font-size: 12px; color: var(--slate); }
  .alt-drugs { display: flex; gap: 10px; flex-wrap: wrap; }
  .alt-drug-chip {
    background: var(--mint-light); border: 1px solid rgba(0,201,167,0.3);
    padding: 8px 16px; border-radius: 100px; font-size: 14px;
    color: var(--mint-dark); font-weight: 600; cursor: pointer; transition: all 0.2s;
  }
  .alt-drug-chip:hover { background: var(--mint); color: var(--navy); }

  /* ── PHARMACY DASHBOARD ── */
  .pharma-dash { background: var(--mist); padding: 32px; }
  .dash-inner { max-width: 1160px; margin: 0 auto; }
  .dash-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
  .dash-title { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: var(--navy); }
  .dash-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
  .ds-card {
    background: var(--white); border-radius: var(--r); padding: 20px 24px;
    border: 1px solid #E8EEF3;
  }
  .ds-card-label { font-size: 12px; color: var(--slate); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
  .ds-card-num { font-family: 'Syne', sans-serif; font-size: 30px; font-weight: 800; color: var(--navy); }
  .ds-card-num.mint { color: var(--mint); }
  .ds-card-num.rose { color: var(--rose); }
  .ds-card-num.amber { color: var(--amber); }
  .ds-card-trend { font-size: 12px; color: var(--mint); margin-top: 4px; }
  .inventory-table {
    background: var(--white); border-radius: var(--r-lg); border: 1px solid #E8EEF3; overflow: hidden;
  }
  .inv-table-header {
    display: grid; grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr;
    padding: 14px 24px; background: var(--mist); font-size: 12px; font-weight: 700;
    color: var(--slate); text-transform: uppercase; letter-spacing: 0.5px;
    border-bottom: 1px solid #E8EEF3;
  }
  .inv-row {
    display: grid; grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr;
    padding: 16px 24px; border-bottom: 1px solid #F5F8FA; align-items: center;
    transition: background 0.15s; cursor: pointer;
  }
  .inv-row:hover { background: var(--mist); }
  .inv-row:last-child { border-bottom: none; }
  .inv-drug-name { font-weight: 600; color: var(--navy); font-size: 15px; }
  .inv-drug-generic { font-size: 12px; color: var(--slate); margin-top: 2px; }
  .inv-qty {
    font-size: 15px; font-weight: 700;
  }
  .inv-qty.high { color: var(--mint); }
  .inv-qty.low { color: var(--amber); }
  .inv-qty.out { color: var(--rose); }
  .inv-status {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 10px; border-radius: 100px; font-size: 12px; font-weight: 600;
  }
  .inv-status.in { background: rgba(0,201,167,0.1); color: var(--mint); }
  .inv-status.low { background: rgba(255,170,0,0.1); color: var(--amber); }
  .inv-status.out { background: rgba(255,90,126,0.1); color: var(--rose); }
  .inv-actions { display: flex; gap: 6px; }
  .inv-btn {
    width: 30px; height: 30px; border-radius: 7px; border: 1px solid #E8EEF3;
    background: var(--white); cursor: pointer; font-size: 14px;
    display: flex; align-items: center; justify-content: center; transition: all 0.15s;
  }
  .inv-btn:hover { background: var(--mist); border-color: var(--silver); }

  /* ── MOBILE PREVIEW ── */
  .mobile-section { background: linear-gradient(135deg, #F5F9FC 0%, var(--mist) 100%); padding: 60px 32px; }
  .mobile-inner { max-width: 1160px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  .mobile-text { }
  .mobile-phones { display: flex; gap: 20px; justify-content: center; }
  .phone-frame {
    width: 220px; flex-shrink: 0;
    background: var(--navy); border-radius: 36px; padding: 10px;
    box-shadow: 0 30px 80px rgba(10,22,40,0.25);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .phone-frame:first-child { margin-top: 32px; }
  .phone-screen { background: var(--mist); border-radius: 28px; overflow: hidden; min-height: 400px; }
  .phone-notch {
    background: var(--navy); height: 28px; display: flex; align-items: center; justify-content: center;
  }
  .notch { width: 80px; height: 16px; background: #0A1628; border-radius: 100px; }
  .phone-content { padding: 16px; }
  .mob-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .mob-greeting { font-size: 11px; color: var(--slate); }
  .mob-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800; color: var(--navy); }
  .mob-avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--mint); display: flex; align-items: center; justify-content: center; font-size: 14px; }
  .mob-search {
    background: var(--white); border-radius: 10px; padding: 10px 14px;
    display: flex; align-items: center; gap: 8px; margin-bottom: 16px;
    font-size: 12px; color: var(--slate);
  }
  .mob-categories { display: flex; gap: 8px; margin-bottom: 16px; overflow-x: auto; }
  .mob-cat {
    padding: 6px 12px; border-radius: 100px; font-size: 11px; font-weight: 600; white-space: nowrap;
    background: var(--white); color: var(--slate); border: 1px solid #E8EEF3;
  }
  .mob-cat.active { background: var(--navy); color: var(--mint); border-color: transparent; }
  .mob-drug-list { display: flex; flex-direction: column; gap: 8px; }
  .mob-drug-item {
    background: var(--white); border-radius: 12px; padding: 12px 14px;
    display: flex; align-items: center; gap: 10px;
  }
  .mob-di-icon {
    width: 36px; height: 36px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0;
  }
  .mob-di-name { font-size: 13px; font-weight: 700; color: var(--navy); }
  .mob-di-gen { font-size: 11px; color: var(--slate); }
  .mob-di-avail { margin-left: auto; font-size: 11px; font-weight: 700; color: var(--mint); }
  .mob-bottom-nav {
    background: var(--white); display: flex; justify-content: space-around;
    padding: 10px 0; border-top: 1px solid #F0F4F7; margin-top: 8px;
  }
  .mob-nav-item { display: flex; flex-direction: column; align-items: center; gap: 3px; font-size: 9px; color: var(--slate); }
  .mob-nav-item.active { color: var(--mint); }
  .mob-nav-icon { font-size: 18px; }

  /* Map mobile screen */
  .mob-map-header { padding: 14px 16px 0; }
  .mob-map-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 800; color: var(--navy); margin-bottom: 10px; }
  .mob-map-frame {
    height: 180px; background: #162240; position: relative; overflow: hidden;
  }
  .mob-map-frame .map-grid-lines { opacity: 0.1; background-size: 30px 30px; }
  .mob-pharm-sheet { padding: 14px 16px; }
  .mob-sheet-title { font-size: 12px; font-weight: 700; color: var(--slate); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
  .mob-pharm-card {
    background: var(--white); border-radius: 12px; padding: 12px; margin-bottom: 8px;
    border: 1px solid #E8EEF3; display: flex; align-items: center; gap: 10px;
  }
  .mob-pc-icon { width: 32px; height: 32px; border-radius: 8px; background: rgba(61,181,255,0.12); display: flex; align-items: center; justify-content: center; font-size: 14px; }
  .mob-pc-name { font-size: 12px; font-weight: 700; color: var(--navy); }
  .mob-pc-dist { font-size: 10px; color: var(--slate); }
  .mob-pc-status { margin-left: auto; font-size: 10px; font-weight: 700; color: var(--mint); }

  /* ── FEATURES ── */
  .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .feat-card {
    background: var(--white); border-radius: var(--r-lg); padding: 28px;
    border: 1px solid #E8EEF3; transition: all 0.25s; cursor: default;
  }
  .feat-card:hover { box-shadow: var(--shadow); transform: translateY(-3px); }
  .feat-icon-wrap {
    width: 52px; height: 52px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 18px;
  }
  .feat-icon-wrap.mint { background: rgba(0,201,167,0.1); }
  .feat-icon-wrap.sky { background: rgba(61,181,255,0.1); }
  .feat-icon-wrap.amber { background: rgba(255,170,0,0.1); }
  .feat-icon-wrap.rose { background: rgba(255,90,126,0.1); }
  .feat-icon-wrap.navy { background: rgba(22,34,64,0.08); }
  .feat-icon-wrap.purple { background: rgba(150,100,255,0.1); }
  .feat-title { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
  .feat-desc { font-size: 14px; color: var(--slate); line-height: 1.6; }

  /* ── FOOTER ── */
  .footer {
    background: var(--navy); padding: 40px 32px; margin-top: auto;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .footer-inner { max-width: 1160px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
  .footer-copy { font-size: 13px; color: var(--slate); }
  .footer-logo { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; color: var(--white); }
  .footer-links { display: flex; gap: 24px; }
  .footer-link { font-size: 13px; color: var(--slate); cursor: pointer; transition: color 0.2s; }
  .footer-link:hover { color: var(--mint); }

  /* ── TAB BAR ── */
  .tab-bar {
    background: var(--white); border-bottom: 1px solid #E8EEF3;
    padding: 0 32px; display: flex; gap: 0;
    position: sticky; top: 64px; z-index: 90;
  }
  .tab {
    padding: 16px 20px; font-size: 14px; font-weight: 600; color: var(--slate);
    cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s;
    white-space: nowrap;
  }
  .tab:hover { color: var(--navy); }
  .tab.active { color: var(--mint); border-bottom-color: var(--mint); }

  /* ── NOTIFICATION TOAST ── */
  .toast {
    position: fixed; bottom: 24px; right: 24px;
    background: var(--navy); border: 1px solid rgba(0,201,167,0.3);
    border-radius: var(--r); padding: 14px 20px;
    display: flex; align-items: center; gap: 12px;
    box-shadow: var(--shadow-lg); z-index: 300;
    animation: toastIn 0.3s ease; font-size: 14px; color: var(--silver); max-width: 320px;
  }
  @keyframes toastIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  .toast-icon { font-size: 20px; }
  .toast-title { color: var(--white); font-weight: 600; margin-bottom: 2px; font-size: 14px; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .hero-grid { grid-template-columns: 1fr; }
    .hero-visual { display: none; }
    .map-inner { grid-template-columns: 1fr; }
    .map-frame { min-height: 280px; }
    .mobile-inner { grid-template-columns: 1fr; }
    .mobile-phones { display: none; }
    .features-grid { grid-template-columns: 1fr 1fr; }
    .dash-stats { grid-template-columns: 1fr 1fr; }
    .inv-table-header, .inv-row { grid-template-columns: 2fr 1fr 1fr; }
    .inv-table-header > *:nth-child(4), .inv-row > *:nth-child(4) { display: none; }
    .inv-table-header > *:nth-child(2), .inv-row > *:nth-child(2) { display: none; }
    .hero-title { font-size: 36px; }
  }
  @media (max-width: 600px) {
    .nav-links { display: none; }
    .features-grid { grid-template-columns: 1fr; }
    .dash-stats { grid-template-columns: 1fr 1fr; }
    .hero { padding: 48px 20px 40px; }
    .section { padding: 40px 20px; }
    .stats-inner { gap: 10px; }
    .stat-num { font-size: 22px; }
  }
`;

const DRUGS = [
  { id: 1, name: "Amoxicillin", generic: "Amoxicillin Trihydrate", conc: "500mg", category: "Antibiotic", usage: "Bacterial infections", icon: "💊", iconClass: "blue", available: true, pharmacies: 14, side_effects: ["Nausea", "Diarrhea", "Allergic reaction", "Headache"], alternatives: ["Ampicillin", "Azithromycin", "Doxycycline"] },
  { id: 2, name: "Paracetamol", generic: "Acetaminophen", conc: "500mg", category: "Analgesic", usage: "Pain relief, Fever", icon: "🔵", iconClass: "mint", available: true, pharmacies: 28, side_effects: ["Liver damage (overdose)", "Nausea", "Rash"], alternatives: ["Ibuprofen", "Aspirin", "Diclofenac"] },
  { id: 3, name: "Omeprazole", generic: "Omeprazole", conc: "20mg", category: "PPI", usage: "Acid reflux, Ulcers", icon: "🟡", iconClass: "amber", available: false, pharmacies: 0, side_effects: ["Headache", "Nausea", "Abdominal pain", "Diarrhea"], alternatives: ["Pantoprazole", "Esomeprazole", "Lansoprazole"] },
  { id: 4, name: "Atorvastatin", generic: "Atorvastatin Calcium", conc: "10mg", category: "Statin", usage: "Cholesterol control", icon: "❤️", iconClass: "rose", available: true, pharmacies: 9, side_effects: ["Muscle pain", "Liver issues", "Headache", "Nausea"], alternatives: ["Rosuvastatin", "Simvastatin", "Pravastatin"] },
  { id: 5, name: "Metformin", generic: "Metformin HCl", conc: "850mg", category: "Antidiabetic", usage: "Type 2 Diabetes", icon: "🩺", iconClass: "blue", available: true, pharmacies: 17, side_effects: ["Nausea", "Diarrhea", "Abdominal pain", "Lactic acidosis (rare)"], alternatives: ["Glibenclamide", "Sitagliptin", "Pioglitazone"] },
  { id: 6, name: "Losartan", generic: "Losartan Potassium", conc: "50mg", category: "ARB", usage: "Hypertension, Heart failure", icon: "💙", iconClass: "mint", available: true, pharmacies: 11, side_effects: ["Dizziness", "Cough", "Elevated potassium", "Fatigue"], alternatives: ["Valsartan", "Irbesartan", "Candesartan"] },
];

const PHARMACIES = [
  { id: 1, name: "Cairo Central Pharmacy", dist: "0.4 km", drugs: ["Amoxicillin", "Paracetamol", "Metformin"], x: "30%", y: "35%", color: "mint" },
  { id: 2, name: "Al-Shifaa Drugstore", dist: "0.9 km", drugs: ["Paracetamol", "Losartan", "Atorvastatin"], x: "58%", y: "28%", color: "sky" },
  { id: 3, name: "Nahdet Misr Pharmacy", dist: "1.4 km", drugs: ["Metformin", "Amoxicillin"], x: "72%", y: "55%", color: "amber" },
  { id: 4, name: "Dr. Ramy's Pharmacy", dist: "2.1 km", drugs: ["Atorvastatin", "Losartan", "Paracetamol"], x: "20%", y: "62%", color: "sky" },
];

const INVENTORY = [
  { name: "Amoxicillin", generic: "Amoxicillin 500mg", qty: 142, status: "in" },
  { name: "Paracetamol", generic: "Acetaminophen 500mg", qty: 28, status: "low" },
  { name: "Losartan", generic: "Losartan 50mg", qty: 0, status: "out" },
  { name: "Metformin", generic: "Metformin HCl 850mg", qty: 75, status: "in" },
  { name: "Omeprazole", generic: "Omeprazole 20mg", qty: 14, status: "low" },
];

export default function PharmaGuide() {
  const [activeTab, setActiveTab] = useState("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [favorites, setFavorites] = useState([2, 5]);
  const [activePharm, setActivePharm] = useState(0);
  const [showToast, setShowToast] = useState(true);
  const [view, setView] = useState("user"); // user | pharmacy

  useEffect(() => {
    const t = setTimeout(() => setShowToast(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const filtered = DRUGS.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.generic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFav = (id, e) => {
    e.stopPropagation();
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo">
            <span className="nav-logo-dot" /> PharmaGuide
          </div>
          <div className="nav-links">
            {["search","map","features"].map(t => (
              <button key={t} className={`nav-link ${activeTab === t ? "active" : ""}`}
                onClick={() => setActiveTab(t)}>
                {t === "search" ? "Drug Search" : t === "map" ? "Find Pharmacies" : "Features"}
              </button>
            ))}
          </div>
          <div className="nav-cta">
            <button className="btn btn-ghost" onClick={() => setView(v => v === "user" ? "pharmacy" : "user")}>
              {view === "user" ? "🏥 Pharmacy Login" : "👤 User View"}
            </button>
            <button className="btn btn-mint">Sign Up Free</button>
          </div>
        </nav>

        {/* TAB BAR */}
        <div className="tab-bar">
          {[
            { id: "search", label: "🔍 Drug Search" },
            { id: "map", label: "📍 Find Pharmacies" },
            { id: "features", label: "✨ Features" },
            { id: "mobile", label: "📱 Mobile App" },
            { id: "dashboard", label: "🏥 Pharmacy Dashboard" },
          ].map(t => (
            <div key={t.id} className={`tab ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}>
              {t.label}
            </div>
          ))}
        </div>

        {/* ── DRUG SEARCH VIEW ── */}
        {activeTab === "search" && (
          <>
            {/* HERO */}
            <div className="hero">
              <div className="hero-grid">
                <div>
                  <div className="hero-badge"><span className="hero-badge-dot" /> AI-Powered Drug Search</div>
                  <h1 className="hero-title">Find the Right<br /><span>Medication</span>,<br />Instantly.</h1>
                  <p className="hero-subtitle">Search 50,000+ medications, check real-time availability at nearby pharmacies, and discover safe alternatives — all in one place.</p>
                  <div className="hero-search">
                    <span style={{fontSize:18}}>🔍</span>
                    <input placeholder="Search by drug name, ingredient, or condition…"
                      value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    <button className="search-btn">Search</button>
                  </div>
                  <div className="hero-tags">
                    {["Paracetamol","Amoxicillin","Metformin","Omeprazole","Losartan"].map(t => (
                      <span key={t} className="hero-tag" onClick={() => setSearchQuery(t)}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="hero-visual">
                  <div className="drug-card-hero">
                    <div className="drug-card-top">
                      <div>
                        <div className="drug-name">Amoxicillin</div>
                        <div className="drug-generic">Amoxicillin Trihydrate · 500mg</div>
                      </div>
                      <div className="drug-badge">Antibiotic</div>
                    </div>
                    <div className="drug-info-row">
                      <div className="drug-info-item"><div className="drug-info-label">Usage</div><div className="drug-info-value">Bacterial Infections</div></div>
                      <div className="drug-info-item"><div className="drug-info-label">Category</div><div className="drug-info-value">Penicillin Group</div></div>
                    </div>
                    <div className="drug-avail">
                      <span className="avail-text">✅ Available nearby</span>
                      <span className="avail-count">14 pharmacies</span>
                    </div>
                  </div>
                  {PHARMACIES.slice(0, 2).map(p => (
                    <div key={p.id} className="pharmacy-mini-card">
                      <div className="pharm-icon">🏪</div>
                      <div>
                        <div className="pharm-name">{p.name}</div>
                        <div className="pharm-dist">📍 {p.dist} away</div>
                      </div>
                      <div className="pharm-status">In Stock</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="stats-bar">
              <div className="stats-inner">
                {[["50,000+","Medications indexed"],["2,400+","Partner Pharmacies"],["99<span>%</span>","Search Accuracy"],["< 2s","Real-time lookup"]].map(([n,l],i) => (
                  <div key={i} className="stat-item">
                    <div className="stat-num" dangerouslySetInnerHTML={{__html: n}} />
                    <div className="stat-label">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* DRUG GRID */}
            <div className="section">
              <div className="section-header">
                <div className="section-eyebrow">Drug Catalog</div>
                <h2 className="section-title">
                  {searchQuery ? `Results for "${searchQuery}"` : "Popular Medications"}
                </h2>
                <p className="section-sub">{filtered.length} medications found</p>
              </div>
              <div className="drug-grid">
                {filtered.map(d => (
                  <div key={d.id} className="drug-card" onClick={() => setSelectedDrug(d)}>
                    <div className="dc-top">
                      <div className={`dc-icon ${d.iconClass}`}>{d.icon}</div>
                      <button className={`dc-fav ${favorites.includes(d.id) ? "active" : ""}`}
                        onClick={e => toggleFav(d.id, e)}>
                        {favorites.includes(d.id) ? "❤️" : "🤍"}
                      </button>
                    </div>
                    <div className="dc-name">{d.name}</div>
                    <div className="dc-generic">{d.generic}</div>
                    <div className="dc-meta">
                      <span className="dc-chip">{d.conc}</span>
                      <span className="dc-chip">{d.category}</span>
                    </div>
                    <div className="dc-footer">
                      <div className={`dc-avail ${d.available ? "yes" : "no"}`}>
                        <span className={`dot ${d.available ? "yes" : "no"}`} />
                        {d.available ? "Available" : "Out of Stock"}
                      </div>
                      {d.available && <div className="dc-pharmacies">{d.pharmacies} nearby</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── MAP VIEW ── */}
        {activeTab === "map" && (
          <div className="map-section" style={{flex:1}}>
            <div style={{maxWidth:1160,margin:"0 auto",padding:"0 0 20px"}}>
              <div style={{paddingTop:32}}>
                <div className="section-eyebrow" style={{color:"var(--mint)"}}>Location Services</div>
                <h2 className="section-title" style={{color:"var(--white)"}}>Find Pharmacies Near You</h2>
                <p className="section-sub" style={{color:"var(--silver)"}}>Real-time stock availability at {PHARMACIES.length} pharmacies nearby</p>
              </div>
            </div>
            <div className="map-inner">
              <div className="map-sidebar">
                <div className="map-search">
                  <span style={{fontSize:16}}>🔍</span>
                  <input placeholder="Search pharmacies or drugs…" />
                </div>
                {PHARMACIES.map((p, i) => (
                  <div key={p.id} className={`pharm-list-item ${activePharm === i ? "active" : ""}`}
                    onClick={() => setActivePharm(i)}>
                    <div className="pli-top">
                      <div className="pli-icon">🏪</div>
                      <div>
                        <div className="pli-name">{p.name}</div>
                        <div className="pli-dist">📍 {p.dist}</div>
                      </div>
                      <div className="pli-badge">✅ Open</div>
                    </div>
                    <div className="pli-drugs">
                      {p.drugs.map(d => <span key={d} className="pli-drug">{d}</span>)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="map-frame">
                <div className="map-placeholder">
                  <div className="map-grid-lines" />
                  <div className="map-pins">
                    {PHARMACIES.map((p, i) => (
                      <div key={p.id} className="map-pin" style={{left:p.x, top:p.y}}
                        onClick={() => setActivePharm(i)}>
                        <div className={`pin-icon ${p.color}`}><span>🏪</span></div>
                        <div className="map-label">{p.name.split(" ").slice(0,2).join(" ")}</div>
                      </div>
                    ))}
                    <div className="map-user" title="Your Location" />
                  </div>
                  <div style={{position:"absolute",bottom:16,right:16,background:"rgba(10,22,40,0.85)",borderRadius:12,padding:"10px 14px",color:"var(--silver)",fontSize:13}}>
                    <div style={{color:"var(--white)",fontWeight:700,marginBottom:4}}>{PHARMACIES[activePharm].name}</div>
                    <div>📍 {PHARMACIES[activePharm].dist} from you</div>
                    <div style={{color:"var(--mint)",fontWeight:600,marginTop:6}}>{PHARMACIES[activePharm].drugs.length} drugs available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── FEATURES VIEW ── */}
        {activeTab === "features" && (
          <div className="section" style={{maxWidth:1160,margin:"0 auto",width:"100%"}}>
            <div className="section-header">
              <div className="section-eyebrow">Platform Capabilities</div>
              <h2 className="section-title">Everything You Need</h2>
              <p className="section-sub">A complete ecosystem for patients and pharmacies alike</p>
            </div>
            <div className="features-grid">
              {[
                { icon: "🔍", cls: "mint", title: "Smart Drug Search", desc: "Fuzzy search with typo tolerance, autocomplete suggestions, and AI-powered recommendations based on your search history." },
                { icon: "📍", cls: "sky", title: "Real-Time Location", desc: "Detect your location automatically and show the closest pharmacies with live inventory. Filter by distance or availability." },
                { icon: "🔄", cls: "amber", title: "Drug Alternatives", desc: "Instantly discover bioequivalent alternatives based on the same active ingredient and concentration when a drug is out of stock." },
                { icon: "🏥", cls: "rose", title: "Pharmacy Management", desc: "Full-featured dashboard for pharmacies to manage inventory, update stock levels, and track demand in real time." },
                { icon: "🔔", cls: "navy", title: "Availability Alerts", desc: "Subscribe to notifications and get alerted the moment an out-of-stock medication becomes available at nearby pharmacies." },
                { icon: "🔒", cls: "purple", title: "Secure Auth & RBAC", desc: "JWT-based authentication with role-based access control for users, pharmacies, and administrators. Fully encrypted data." },
              ].map(f => (
                <div key={f.title} className="feat-card">
                  <div className={`feat-icon-wrap ${f.cls}`}>{f.icon}</div>
                  <div className="feat-title">{f.title}</div>
                  <div className="feat-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── MOBILE VIEW ── */}
        {activeTab === "mobile" && (
          <div className="mobile-section" style={{flex:1}}>
            <div className="mobile-inner" style={{maxWidth:1160,margin:"0 auto",padding:"0 0"}}>
              <div className="mobile-text">
                <div className="section-eyebrow">Mobile Experience</div>
                <h2 className="section-title">Designed for Mobile<br />First</h2>
                <p className="section-sub" style={{marginTop:8,marginBottom:24}}>A fully responsive experience that works beautifully on any device. Native feel on iOS and Android.</p>
                {["Instant drug search on the go","One-tap pharmacy navigation","Push notifications for restocks","Offline favorites access"].map(f => (
                  <div key={f} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <span style={{color:"var(--mint)",fontWeight:700,fontSize:16}}>✓</span>
                    <span style={{fontSize:15,color:"var(--slate)"}}>{f}</span>
                  </div>
                ))}
              </div>
              <div className="mobile-phones">
                {/* Phone 1 - Drug List */}
                <div className="phone-frame">
                  <div className="phone-screen">
                    <div className="phone-notch"><div className="notch" /></div>
                    <div className="phone-content">
                      <div className="mob-header">
                        <div><div className="mob-greeting">Good morning,</div><div className="mob-title">Ahmed 👋</div></div>
                        <div className="mob-avatar">A</div>
                      </div>
                      <div className="mob-search">🔍 Search medications…</div>
                      <div className="mob-categories">
                        {["All","Antibiotic","Analgesic","Cardiac","Diabetes"].map((c,i) => (
                          <div key={c} className={`mob-cat ${i===0?"active":""}`}>{c}</div>
                        ))}
                      </div>
                      <div className="mob-drug-list">
                        {DRUGS.slice(0,3).map(d => (
                          <div key={d.id} className="mob-drug-item">
                            <div className={`mob-di-icon ${d.iconClass}`}>{d.icon}</div>
                            <div>
                              <div className="mob-di-name">{d.name}</div>
                              <div className="mob-di-gen">{d.conc} · {d.category}</div>
                            </div>
                            <div className={`mob-di-avail`} style={{color: d.available ? "var(--mint)" : "var(--rose)"}}>
                              {d.available ? "✓ In Stock" : "✗ N/A"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mob-bottom-nav">
                      {[["🔍","Search"],["📍","Near Me"],["❤️","Saved"],["👤","Profile"]].map(([icon,label],i) => (
                        <div key={label} className={`mob-nav-item ${i===0?"active":""}`}>
                          <div className="mob-nav-icon">{icon}</div>
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Phone 2 - Map */}
                <div className="phone-frame" style={{marginTop:32}}>
                  <div className="phone-screen">
                    <div className="phone-notch"><div className="notch" /></div>
                    <div className="mob-map-header"><div className="mob-map-title">Nearby Pharmacies</div></div>
                    <div className="mob-map-frame">
                      <div className="map-grid-lines" />
                      {PHARMACIES.slice(0,3).map(p => (
                        <div key={p.id} className="map-pin" style={{left:p.x,top:p.y,transform:"scale(0.75)"}}>
                          <div className={`pin-icon ${p.color}`}><span>🏪</span></div>
                        </div>
                      ))}
                      <div className="map-user" style={{bottom:"38%",left:"46%",width:14,height:14}} />
                    </div>
                    <div className="mob-pharm-sheet">
                      <div className="mob-sheet-title">3 pharmacies nearby</div>
                      {PHARMACIES.slice(0,2).map(p => (
                        <div key={p.id} className="mob-pharm-card">
                          <div className="mob-pc-icon">🏪</div>
                          <div>
                            <div className="mob-pc-name">{p.name.split(" ").slice(0,3).join(" ")}</div>
                            <div className="mob-pc-dist">{p.dist} · {p.drugs.length} drugs</div>
                          </div>
                          <div className="mob-pc-status">Open ✅</div>
                        </div>
                      ))}
                    </div>
                    <div className="mob-bottom-nav">
                      {[["🔍","Search"],["📍","Near Me"],["❤️","Saved"],["👤","Profile"]].map(([icon,label],i) => (
                        <div key={label} className={`mob-nav-item ${i===1?"active":""}`}>
                          <div className="mob-nav-icon">{icon}</div>
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── PHARMACY DASHBOARD VIEW ── */}
        {activeTab === "dashboard" && (
          <div className="pharma-dash" style={{flex:1}}>
            <div className="dash-inner">
              <div className="dash-header">
                <div>
                  <div className="section-eyebrow">Pharmacy Portal</div>
                  <div className="dash-title">Cairo Central Pharmacy</div>
                </div>
                <button className="btn btn-mint">+ Add Drug</button>
              </div>
              <div className="dash-stats">
                {[
                  {label:"Total Drugs", val:"142", cls:"", trend:"+8 this week"},
                  {label:"In Stock", val:"118", cls:"mint", trend:"83% of inventory"},
                  {label:"Low Stock", val:"16", cls:"amber", trend:"Reorder soon"},
                  {label:"Out of Stock", val:"8", cls:"rose", trend:"Action needed"},
                ].map(s => (
                  <div key={s.label} className="ds-card">
                    <div className="ds-card-label">{s.label}</div>
                    <div className={`ds-card-num ${s.cls}`}>{s.val}</div>
                    <div className="ds-card-trend">{s.trend}</div>
                  </div>
                ))}
              </div>
              <div className="inventory-table">
                <div className="inv-table-header">
                  <span>Drug</span>
                  <span>Generic Name</span>
                  <span>Qty</span>
                  <span>Status</span>
                  <span>Actions</span>
                </div>
                {INVENTORY.map((item, i) => (
                  <div key={i} className="inv-row">
                    <div><div className="inv-drug-name">{item.name}</div></div>
                    <div><div className="inv-drug-generic">{item.generic}</div></div>
                    <div><div className={`inv-qty ${item.qty > 50 ? "high" : item.qty > 0 ? "low" : "out"}`}>{item.qty}</div></div>
                    <div>
                      <span className={`inv-status ${item.status}`}>
                        {item.status === "in" ? "✅ In Stock" : item.status === "low" ? "⚠️ Low Stock" : "❌ Out of Stock"}
                      </span>
                    </div>
                    <div className="inv-actions">
                      <button className="inv-btn" title="Edit">✏️</button>
                      <button className="inv-btn" title="Restock">📦</button>
                      <button className="inv-btn" title="Remove">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-logo">PharmaGuide</div>
            <div className="footer-links">
              {["About","Privacy","Terms","API Docs","Contact"].map(l => (
                <span key={l} className="footer-link">{l}</span>
              ))}
            </div>
            <div className="footer-copy">© 2026 PharmaGuide. All rights reserved.</div>
          </div>
        </footer>
      </div>

      {/* DRUG DETAIL MODAL */}
      {selectedDrug && (
        <div className="detail-overlay" onClick={() => setSelectedDrug(null)}>
          <div className="detail-panel" onClick={e => e.stopPropagation()}>
            <div className="detail-header">
              <button className="detail-close" onClick={() => setSelectedDrug(null)}>✕</button>
              <div className="detail-drug-name">{selectedDrug.name}</div>
              <div className="detail-generic">{selectedDrug.generic}</div>
              <div className="detail-badges">
                <span className="detail-badge mint">{selectedDrug.category}</span>
                <span className="detail-badge">{selectedDrug.conc}</span>
                <span className="detail-badge" style={{color: selectedDrug.available ? "var(--mint)" : "var(--rose)"}}>
                  {selectedDrug.available ? "✅ Available" : "❌ Out of Stock"}
                </span>
              </div>
            </div>
            <div className="detail-body">
              <div>
                <div className="detail-section-title">Drug Information</div>
                <div className="info-grid">
                  <div className="info-box"><div className="info-box-label">Active Ingredient</div><div className="info-box-value">{selectedDrug.generic}</div></div>
                  <div className="info-box"><div className="info-box-label">Concentration</div><div className="info-box-value">{selectedDrug.conc}</div></div>
                  <div className="info-box"><div className="info-box-label">Usage</div><div className="info-box-value">{selectedDrug.usage}</div></div>
                  <div className="info-box"><div className="info-box-label">Category</div><div className="info-box-value">{selectedDrug.category}</div></div>
                </div>
              </div>
              <div>
                <div className="detail-section-title">Side Effects</div>
                <div className="side-effects">
                  {selectedDrug.side_effects.map((se, i) => (
                    <div key={se} className="side-effect-item">
                      <div className={`se-dot ${i < 2 ? "common" : "rare"}`} />
                      <div className="se-text">{se}</div>
                      <div className="se-freq">{i < 2 ? "Common" : "Rare"}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="detail-section-title">Alternative Drugs</div>
                <div className="alt-drugs">
                  {selectedDrug.alternatives.map(a => (
                    <div key={a} className="alt-drug-chip">{a}</div>
                  ))}
                </div>
              </div>
              {selectedDrug.available && (
                <button className="btn btn-mint" style={{width:"100%",padding:"14px",fontSize:15,borderRadius:12}}>
                  📍 Find Nearest Pharmacy
                </button>
              )}
              {!selectedDrug.available && (
                <button className="btn btn-ghost" style={{width:"100%",padding:"14px",fontSize:15,borderRadius:12,background:"rgba(255,90,126,0.1)",color:"var(--rose)"}}>
                  🔔 Notify When Available
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {showToast && (
        <div className="toast">
          <span className="toast-icon">🔔</span>
          <div>
            <div className="toast-title">Metformin is now available!</div>
            <div>Al-Shifaa Pharmacy · 0.9 km away</div>
          </div>
        </div>
      )}
    </>
  );
}
