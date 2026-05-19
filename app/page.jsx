"use client";

import { useState } from "react";
import { RELATED_LINKS as RELATED } from "./lib/links";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #faf8f4; font-family: 'DM Mono', monospace; color: #1a1a1a; }
  .rvt-wrap { max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem; }
  .rvt-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .rvt-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
  .rvt-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.1; }
  .rvt-title em { font-style: italic; color: #7c3aed; }
  .rvt-card { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .rvt-section-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; margin-bottom: 1rem; color: #1a1a1a; }
  .rvt-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem; }
  .rvt-field-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; display: block; margin-bottom: .4rem; }
  .rvt-input-wrap { position: relative; }
  .rvt-prefix { position: absolute; left: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .rvt-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1.1rem; color: #1a1a1a; padding: .4rem 1.2rem .4rem 1.2rem; outline: none; }
  .rvt-input:focus { border-color: #7c3aed; }
  .rvt-calc-btn { width: 100%; padding: 1rem; background: #1a1a1a; color: #fff; border: none; font-family: 'DM Mono', monospace; font-size: .9rem; text-transform: uppercase; cursor: pointer; border-radius: 2px; }
  .rvt-calc-btn:hover { background: #7c3aed; }
  .rvt-results { margin-top: 1.5rem; border-top: 1px solid #e0dbd3; padding-top: 1.5rem; }
  .rvt-result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.5rem; }
  .rvt-result-cell { background: #fff; padding: 1rem 1.25rem; }
  .rvt-result-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .3rem; }
  .rvt-result-val { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: #1a1a1a; }
  .rvt-result-val.green { color: #7c3aed; }
  .rvt-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .rvt-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .rvt-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #c4a5f4; line-height: 1; margin-bottom: .4rem; }
  .rvt-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .rvt-tip-body { font-size: 12px; color: #888; line-height: 1.5; }
  .rvt-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .rvt-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; }
  .rvt-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .rvt-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .rvt-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .rvt-footer-links a { color: #888; text-decoration: underline; }
  @media (max-width: 600px) { .rvt-field-row, .rvt-result-grid, .rvt-tip-grid { grid-template-columns: 1fr; } }
`;

function fmt(num) { return "$" + Math.round(num).toLocaleString("en-US"); }

export default function Page() {
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [annualContribution, setAnnualContribution] = useState("");
  const [taxRateNow, setTaxRateNow] = useState("");
  const [taxRateRetirement, setTaxRateRetirement] = useState("");
  const [results, setResults] = useState(null);

  const calculate = () => {
    const current = parseFloat(currentAge);
    const retire = parseFloat(retirementAge);
    const income = parseFloat(annualIncome);
    const savings = parseFloat(currentSavings) || 0;
    const contribution = parseFloat(annualContribution) || 0;
    const rateNow = (parseFloat(taxRateNow) || 22) / 100;
    const rateRetire = (parseFloat(taxRateRetirement) || 15) / 100;
    if (!current || !retire || !income) return;
    const years = retire - current;
    if (years <= 0) return;
    const preReturn = 0.07;
    const rothContributionAfterTax = contribution * (1 - rateNow);
    let rothBalance = savings;
    for (let i = 0; i < years; i++) rothBalance = rothBalance * (1 + preReturn) + rothContributionAfterTax;
    let traditionalBalance = savings;
    for (let i = 0; i < years; i++) traditionalBalance = traditionalBalance * (1 + preReturn) + contribution;
    const traditionalAfterTax = traditionalBalance * (1 - rateRetire);
    const winner = rothBalance > traditionalAfterTax ? "Roth" : "Traditional";
    const difference = Math.abs(rothBalance - traditionalAfterTax);
    setResults({ rothBalance: Math.round(rothBalance), traditionalAfterTax: Math.round(traditionalAfterTax), winner, difference, years });
  };

  return (
    <>
      <style>{css}</style>
      <main className="rvt-wrap">
        <div className="rvt-header">
          <p className="rvt-eyebrow">Retirement Planning</p>
          <h1 className="rvt-title">Roth vs Traditional<br /><em>IRA Calculator</em></h1>
        </div>
        <div className="rvt-card">
          <div className="rvt-field-row">
            <div><label className="rvt-field-label">Current age</label><input className="rvt-input" type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} /></div>
            <div><label className="rvt-field-label">Retirement age</label><input className="rvt-input" type="number" value={retirementAge} onChange={e => setRetirementAge(e.target.value)} /></div>
          </div>
          <div className="rvt-field-row">
            <div><label className="rvt-field-label">Annual income</label><div className="rvt-input-wrap"><span className="rvt-prefix">$</span><input className="rvt-input" type="number" value={annualIncome} onChange={e => setAnnualIncome(e.target.value)} /></div></div>
            <div><label className="rvt-field-label">Current savings</label><div className="rvt-input-wrap"><span className="rvt-prefix">$</span><input className="rvt-input" type="number" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} /></div></div>
          </div>
          <div className="rvt-field-row">
            <div><label className="rvt-field-label">Annual contribution</label><div className="rvt-input-wrap"><span className="rvt-prefix">$</span><input className="rvt-input" type="number" value={annualContribution} onChange={e => setAnnualContribution(e.target.value)} /></div></div>
            <div><label className="rvt-field-label">Current tax rate</label><div className="rvt-input-wrap"><input className="rvt-input" type="number" value={taxRateNow} onChange={e => setTaxRateNow(e.target.value)} /><span className="rvt-suffix">%</span></div></div>
          </div>
          <div className="rvt-field-row">
            <div><label className="rvt-field-label">Expected retirement tax rate</label><div className="rvt-input-wrap"><input className="rvt-input" type="number" value={taxRateRetirement} onChange={e => setTaxRateRetirement(e.target.value)} /><span className="rvt-suffix">%</span></div><p className="rvt-field-label" style={{ marginTop: ".3rem", fontSize: "10px" }}>Most retirees have lower income</p></div>
            <div style={{ display: "flex", alignItems: "flex-end" }}><button className="rvt-calc-btn" onClick={calculate}>Compare accounts →</button></div>
          </div>
          {results && (<div className="rvt-results"><div className="rvt-result-grid"><div className="rvt-result-cell"><p className="rvt-result-label">Roth IRA (after-tax)</p><p className="rvt-result-val green">{fmt(results.rothBalance)}</p><p style={{ fontSize: "10px" }}>Tax-free withdrawal</p></div><div className="rvt-result-cell"><p className="rvt-result-label">Traditional IRA (after tax)</p><p className="rvt-result-val">{fmt(results.traditionalAfterTax)}</p><p style={{ fontSize: "10px" }}>After tax</p></div></div><div className="rvt-prose" style={{ marginTop: "1rem", padding: "1rem", background: "#f5f3ef", borderRadius: "4px" }}><p><strong>Winner:</strong> {results.winner} IRA by {fmt(results.difference)} over {results.years} years at 7% estimated returns.</p></div></div>)}
        </div>
        <div className="rvt-card"><p className="rvt-section-title">The only question that matters</p><div className="rvt-prose"><p>Roth and Traditional IRAs are mathematically identical if your tax rate never changes. The entire decision comes down to: Is your tax rate higher now or in retirement?</p><p><strong>Traditional:</strong> Deduct contributions now, pay tax on withdrawals. <strong>Roth:</strong> Pay tax now, withdraw tax-free.</p></div></div>
        <div className="rvt-card"><p className="rvt-section-title">Practical rules of thumb</p><div className="rvt-tip-grid"><div><p className="rvt-tip-num">01</p><p className="rvt-tip-title">Under 30 and in 12% bracket?</p><p className="rvt-tip-body">Go Roth. You will never have a lower tax rate.</p></div><div><p className="rvt-tip-num">02</p><p className="rvt-tip-title">In the 22% or higher bracket?</p><p className="rvt-tip-body">Traditional usually wins. Most retirees drop at least one bracket.</p></div><div><p className="rvt-tip-num">03</p><p className="rvt-tip-title">Maxing out your 401(k)?</p><p className="rvt-tip-body">A Roth IRA gives you tax diversification for retirement.</p></div><div><p className="rvt-tip-num">04</p><p className="rvt-tip-title">High income (over $150k single)?</p><p className="rvt-tip-body">You may be phased out of Roth — look into a Backdoor Roth.</p></div></div></div>
        <div className="rvt-card"><p className="rvt-section-title">Related tools</p><div className="rvt-related-links">{RELATED.map((r, i) => (<a key={i} className="rvt-related-link" href={r.href}>{r.label}</a>))}</div><div className="rvt-disclaimer">This tool provides estimates. Assumes 7% returns. Consult a professional before making retirement decisions.<div className="rvt-footer-links"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a></div></div></div>
      </main>
    </>
  );
}