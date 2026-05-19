"use client"

import { useState } from "react"
import { RELATED_LINKS as RELATED } from "./lib/links"

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
  .rvt-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1.1rem; color: #1a1a1a; padding: .4rem 1.2rem .4rem 1.2rem; outline: none; transition: border-color .2s; }
  .rvt-input.no-prefix { padding-left: 0; }
  .rvt-input:focus { border-color: #7c3aed; }
  .rvt-select { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1rem; color: #1a1a1a; padding: .4rem 0; outline: none; cursor: pointer; }
  .rvt-select:focus { border-color: #7c3aed; }
  .rvt-calc-btn { width: 100%; padding: 1rem; background: #1a1a1a; color: #fff; border: none; font-family: 'DM Mono', monospace; font-size: .9rem; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: background .2s; }
  .rvt-calc-btn:hover { background: #7c3aed; }
  .rvt-results { margin-top: 1.5rem; border-top: 1px solid #e0dbd3; padding-top: 1.5rem; }
  .rvt-result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.5rem; }
  .rvt-result-cell { background: #fff; padding: 1rem 1.25rem; }
  .rvt-result-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .3rem; }
  .rvt-result-val { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: #1a1a1a; }
  .rvt-result-val.green { color: #7c3aed; }
  .rvt-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .rvt-prose p:last-child { margin-bottom: 0; }
  .rvt-prose ul { font-size: 13px; color: #444; line-height: 1.8; padding-left: 1.2rem; margin-bottom: .75rem; }
  .rvt-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .rvt-info-item { padding: .75rem; border-left: 2px solid #c4a5f4; }
  .rvt-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .rvt-info-body { font-size: 12px; color: #888; line-height: 1.5; }
  .rvt-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .rvt-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #c4a5f4; line-height: 1; margin-bottom: .4rem; }
  .rvt-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .rvt-tip-body { font-size: 12px; color: #888; line-height: 1.5; }
  .rvt-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .rvt-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .rvt-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .rvt-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .rvt-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .rvt-footer-links a { color: #888; text-decoration: underline; }
  @media (max-width: 600px) {
    .rvt-field-row, .rvt-result-grid, .rvt-info-grid, .rvt-tip-grid { grid-template-columns: 1fr; }
  }
`

function fmt(num) {
  return "$" + Math.round(num).toLocaleString("en-US")
}

function fmtDec(num) {
  return "$" + num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function Page() {
  const [currentAge, setCurrentAge] = useState("")
  const [retirementAge, setRetirementAge] = useState("")
  const [annualIncome, setAnnualIncome] = useState("")
  const [currentSavings, setCurrentSavings] = useState("")
  const [annualContribution, setAnnualContribution] = useState("")
  const [taxRateNow, setTaxRateNow] = useState("")
  const [taxRateRetirement, setTaxRateRetirement] = useState("")
  const [results, setResults] = useState(null)

  const calculate = () => {
    const current = parseFloat(currentAge)
    const retire = parseFloat(retirementAge)
    const income = parseFloat(annualIncome)
    const savings = parseFloat(currentSavings) || 0
    const contribution = parseFloat(annualContribution) || 0
    const rateNow = (parseFloat(taxRateNow) || 22) / 100
    const rateRetire = (parseFloat(taxRateRetirement) || 15) / 100

    if (!current || !retire || !income) return

    const years = retire - current
    if (years <= 0) return

    // Assumed 7% annual return before retirement, 5% after (conservative)
    const preReturn = 0.07
    const postReturn = 0.05

    // Roth: pay tax now on contributions, grow tax-free, withdraw tax-free
    const rothContributionAfterTax = contribution * (1 - rateNow)
    
    let rothBalance = savings
    for (let i = 0; i < years; i++) {
      rothBalance = rothBalance * (1 + preReturn) + rothContributionAfterTax
    }
    
    // Traditional: contribute pre-tax, grow, pay tax on withdrawals
    let traditionalBalance = savings
    for (let i = 0; i < years; i++) {
      traditionalBalance = traditionalBalance * (1 + preReturn) + contribution
    }
    
    const traditionalAfterTax = traditionalBalance * (1 - rateRetire)
    
    // Also calculate if tax rates change
    const traditionalIfSameRate = traditionalBalance * (1 - rateNow)
    const rothIfHigherRetirement = rothBalance * (1 - (rateRetire + 0.05))
    
    const winner = rothBalance > traditionalAfterTax ? "Roth" : "Traditional"
    const difference = Math.abs(rothBalance - traditionalAfterTax)
    
    setResults({
      rothBalance: Math.round(rothBalance),
      traditionalBalance: Math.round(traditionalBalance),
      traditionalAfterTax: Math.round(traditionalAfterTax),
      traditionalIfSameRate: Math.round(traditionalIfSameRate),
      rothIfHigherRetirement: Math.round(rothIfHigherRetirement),
      winner,
      difference,
      years,
      rateNow: rateNow * 100,
      rateRetire: rateRetire * 100,
    })
  }

  return (
    <>
      <style>{css}</style>
      <main className="rvt-wrap">

        <div className="rvt-header">
          <p className="rvt-eyebrow">Retirement Planning</p>
          <h1 className="rvt-title">Roth vs Traditional<br /><em>IRA Calculator</em></h1>
        </div>

        {/* TOOL */}
        <div className="rvt-card">
          <div className="rvt-field-row">
            <div>
              <label className="rvt-field-label" htmlFor="currentAge">Current age</label>
              <input id="currentAge" className="rvt-input no-prefix" type="number" min="0" placeholder="30"
                value={currentAge} onChange={e => setCurrentAge(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
            </div>
            <div>
              <label className="rvt-field-label" htmlFor="retirementAge">Retirement age</label>
              <input id="retirementAge" className="rvt-input no-prefix" type="number" min="0" placeholder="65"
                value={retirementAge} onChange={e => setRetirementAge(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
            </div>
          </div>

          <div className="rvt-field-row">
            <div>
              <label className="rvt-field-label" htmlFor="annualIncome">Annual income</label>
              <div className="rvt-input-wrap">
                <span className="rvt-prefix">$</span>
                <input id="annualIncome" className="rvt-input" type="number" min="0" placeholder="75000"
                  value={annualIncome} onChange={e => setAnnualIncome(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
              </div>
            </div>
            <div>
              <label className="rvt-field-label" htmlFor="currentSavings">Current retirement savings</label>
              <div className="rvt-input-wrap">
                <span className="rvt-prefix">$</span>
                <input id="currentSavings" className="rvt-input" type="number" min="0" placeholder="0"
                  value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
              </div>
            </div>
          </div>

          <div className="rvt-field-row">
            <div>
              <label className="rvt-field-label" htmlFor="annualContribution">Annual contribution</label>
              <div className="rvt-input-wrap">
                <span className="rvt-prefix">$</span>
                <input id="annualContribution" className="rvt-input" type="number" min="0" placeholder="7000"
                  value={annualContribution} onChange={e => setAnnualContribution(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
              </div>
            </div>
            <div>
              <label className="rvt-field-label" htmlFor="taxRateNow">Current tax rate</label>
              <div className="rvt-input-wrap">
                <input id="taxRateNow" className="rvt-input no-prefix" type="number" min="0" step="1" placeholder="22"
                  value={taxRateNow} onChange={e => setTaxRateNow(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
                <span className="rvt-suffix" style={{ right: "0" }}>%</span>
              </div>
              <p className="rvt-field-label" style={{ marginTop: ".3rem", fontSize: "10px" }}>Estimate from your tax bracket</p>
            </div>
          </div>

          <div className="rvt-field-row">
            <div>
              <label className="rvt-field-label" htmlFor="taxRateRetirement">Expected tax rate in retirement</label>
              <div className="rvt-input-wrap">
                <input id="taxRateRetirement" className="rvt-input no-prefix" type="number" min="0" step="1" placeholder="15"
                  value={taxRateRetirement} onChange={e => setTaxRateRetirement(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
                <span className="rvt-suffix" style={{ right: "0" }}>%</span>
              </div>
              <p className="rvt-field-label" style={{ marginTop: ".3rem", fontSize: "10px" }}>Most retirees have lower income</p>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <button className="rvt-calc-btn" onClick={calculate}>Compare accounts →</button>
            </div>
          </div>

          {results && (
            <div className="rvt-results">
              <div className="rvt-result-grid">
                <div className="rvt-result-cell">
                  <p className="rvt-result-label">Roth IRA (after-tax)</p>
                  <p className="rvt-result-val green">{fmt(results.rothBalance)}</p>
                  <p style={{ fontSize: "10px", color: "#888", marginTop: ".3rem" }}>Tax-free withdrawal</p>
                </div>
                <div className="rvt-result-cell">
                  <p className="rvt-result-label">Traditional IRA (after tax)</p>
                  <p className="rvt-result-val">{fmt(results.traditionalAfterTax)}</p>
                  <p style={{ fontSize: "10px", color: "#888", marginTop: ".3rem" }}>After {results.rateRetire}% tax</p>
                </div>
              </div>

              <div className="rvt-prose" style={{ marginTop: "1rem", padding: "1rem", background: "#f5f3ef", borderRadius: "4px" }}>
                <p style={{ marginBottom: 0, fontWeight: "500" }}>
                  <strong>Winner:</strong> {results.winner} IRA by {fmt(results.difference)}
                </p>
                <p style={{ fontSize: "12px", marginTop: ".5rem", marginBottom: 0 }}>
                  Over {results.years} years at 7% estimated returns.
                </p>
              </div>

              <div className="rvt-info-grid" style={{ marginTop: "1rem" }}>
                <div className="rvt-info-item">
                  <p className="rvt-info-title">If tax rates stay the same</p>
                  <p className="rvt-info-body">Traditional would be worth {fmt(results.traditionalIfSameRate)} after tax — {results.traditionalIfSameRate > results.rothBalance ? "still better" : "worse"} than Roth.</p>
                </div>
                <div className="rvt-info-item">
                  <p className="rvt-info-title">If taxes rise 5% in retirement</p>
                  <p className="rvt-info-body">Roth would be worth {fmt(results.rothBalance)} vs Traditional at {fmt(results.rothIfHigherRetirement)}.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* HOW IT WORKS */}
        <div className="rvt-card">
          <p className="rvt-section-title">The only question that matters</p>
          <div className="rvt-prose">
            <p>Roth and Traditional IRAs are mathematically identical — <strong>if</strong> your tax rate never changes. The entire decision comes down to one question: Is your tax rate higher now or higher in retirement?</p>
            <p><strong>Traditional IRA:</strong> You deduct contributions now (lowering this year's taxes). Money grows tax-deferred. You pay ordinary income tax on withdrawals in retirement.</p>
            <p><strong>Roth IRA:</strong> You pay tax on contributions now. Money grows tax-free. You pay nothing on withdrawals in retirement — not on contributions, not on gains, nothing.</p>
            <p>If your tax rate now is higher than it will be in retirement, Traditional wins. If your tax rate now is lower, Roth wins. If they're the same, it's a tie — both produce identical after-tax spending power.</p>
          </div>
        </div>

        {/* WHY TAX RATES CHANGE */}
        <div className="rvt-card">
          <p className="rvt-section-title">Why your tax rate will (probably) drop</p>
          <div className="rvt-prose">
            <p>Most people have lower taxable income in retirement because:</p>
            <ul>
              <li>You're no longer earning a salary</li>
              <li>You stop paying FICA taxes (7.65% right there)</li>
              <li>You can control how much you withdraw from Traditional accounts</li>
              <li>You may move to a state with lower or no income tax</li>
            </ul>
            <p>A married couple earning $150,000 today (22% bracket) might need only $80,000 in retirement (12% bracket). For them, Traditional is a clear winner.</p>
            <p><strong>The exception:</strong> Young high-earners in low brackets (e.g., a 25-year-old making $50,000 in the 12% bracket) should lean Roth. Their income will almost certainly rise, and they'll never have a lower tax rate than they do right now.</p>
          </div>
        </div>

        {/* STRATEGIES */}
        <div className="rvt-card">
          <p className="rvt-section-title">Practical rules of thumb</p>
          <div className="rvt-tip-grid">
            <div>
              <p className="rvt-tip-num">01</p>
              <p className="rvt-tip-title">Under 30 and in 12% bracket?</p>
              <p className="rvt-tip-body">Go Roth. You will never have a lower tax rate. Pay the small tax now and lock in decades of tax-free growth.</p>
            </div>
            <div>
              <p className="rvt-tip-num">02</p>
              <p className="rvt-tip-title">In the 22% or higher bracket?</p>
              <p className="rvt-tip-body">Traditional usually wins. The upfront deduction is valuable, and most retirees drop at least one bracket.</p>
            </div>
            <div>
              <p className="rvt-tip-num">03</p>
              <p className="rvt-tip-title">Maxing out your 401(k) already?</p>
              <p className="rvt-tip-body">A Roth IRA gives you tax diversification — having both types in retirement lets you manage your tax bracket year by year.</p>
            </div>
            <div>
              <p className="rvt-tip-num">04</p>
              <p className="rvt-tip-title">High income (over $150k single)?</p>
              <p className="rvt-tip-body">You may be phased out of Roth IRA deductibility. Look into a Backdoor Roth or stick with Traditional 401(k).</p>
            </div>
          </div>
        </div>

        {/* REAL EXAMPLE */}
        <div className="rvt-card">
          <p className="rvt-section-title">A concrete example</p>
          <div className="rvt-prose">
            <p>Sarah is 35, earns $80,000 (22% bracket), and has $20,000 saved. She contributes $7,000/year for 30 years until 65.</p>
            <p><strong>Traditional:</strong> Saves $1,540/year in taxes now (22% of $7,000). Grows to ~$710,000. After 15% tax in retirement, she keeps ~$603,000.</p>
            <p><strong>Roth:</strong> Pays $1,540/year in taxes now. Grows to the same ~$710,000. Withdraws every dollar tax-free.</p>
            <p><strong>Result:</strong> Roth wins by ~$107,000 because her retirement tax rate (15%) is lower than her working rate (22%).</p>
            <p>If Sarah's retirement tax rate were 22% (same as today), the two would be nearly identical. The difference is entirely driven by the tax rate change.</p>
          </div>
        </div>

        {/* MONEYWISE LINK */}
        <div style={{ background: "#fff", border: "1px solid #e0dbd3", borderRadius: "4px", padding: "1rem 1.5rem", marginBottom: "1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#888" }}>
            Looking for more free financial tools?{" "}
            <a href="https://moneywisecalculator.com" style={{ color: "#7c3aed", textDecoration: "underline" }}>
              Visit MoneyWiseCalculator.com
            </a>
          </p>
        </div>

        {/* RELATED TOOLS */}
        <div className="rvt-card">
          <p className="rvt-section-title">Related tools</p>
          <div className="rvt-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="rvt-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="rvt-disclaimer">
            This tool provides estimates for informational purposes only and does not constitute financial or tax advice. Assumes 7% pre-retirement and 5% post-retirement returns — actual market performance varies. Consult a qualified professional before making retirement decisions. This site may use cookies and analytics. By using this site, you agree to our Privacy Policy and Terms of Service.
            <div className="rvt-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}
