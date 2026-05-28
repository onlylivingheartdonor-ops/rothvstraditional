"use client"

import { useState } from "react"

function fmt(num) { return "$" + Math.round(num).toLocaleString("en-US") }

export default function RothVsTraditionalCalculator() {
  const [currentAge,       setCurrentAge]       = useState("30")
  const [retirementAge,    setRetirementAge]    = useState("65")
  const [annualIncome,     setAnnualIncome]     = useState("75000")
  const [currentSavings,   setCurrentSavings]   = useState("0")
  const [annualContribution, setAnnualContribution] = useState("7000")
  const [taxRateNow,       setTaxRateNow]       = useState("22")
  const [taxRateRetirement, setTaxRateRetirement] = useState("15")

  const calculate = () => {
    const current      = parseFloat(currentAge)
    const retire       = parseFloat(retirementAge)
    const income       = parseFloat(annualIncome)
    const savings      = parseFloat(currentSavings) || 0
    const contribution = parseFloat(annualContribution) || 0
    const rateNow      = (parseFloat(taxRateNow) || 22) / 100
    const rateRetire   = (parseFloat(taxRateRetirement) || 15) / 100
    if (!current || !retire || !income) return
    const years = retire - current
    if (years <= 0) return
    const preReturn = 0.07
    const rothContributionAfterTax = contribution * (1 - rateNow)
    let rothBalance = savings
    for (let i = 0; i < years; i++) rothBalance = rothBalance * (1 + preReturn) + rothContributionAfterTax
    let traditionalBalance = savings
    for (let i = 0; i < years; i++) traditionalBalance = traditionalBalance * (1 + preReturn) + contribution
    const traditionalAfterTax = traditionalBalance * (1 - rateRetire)
    const winner     = rothBalance > traditionalAfterTax ? "Roth" : "Traditional"
    const difference = Math.abs(rothBalance - traditionalAfterTax)
    const traditionalPreTax = traditionalBalance
    const rothContributionTotal = contribution * years
    const traditionalContributionTotal = contribution * years
    setResults({ 
      rothBalance: Math.round(rothBalance), 
      traditionalAfterTax: Math.round(traditionalAfterTax),
      traditionalPreTax: Math.round(traditionalPreTax),
      winner, 
      difference, 
      years,
      rothContributionTotal,
      traditionalContributionTotal,
      taxSavedNow: contribution * rateNow,
      taxPaidLater: traditionalBalance * rateRetire
    })
  }

  const [results, setResults] = useState(null)

  return (
    <div className="rvt-card">
      <div className="rvt-field-row">
        <div>
          <label className="rvt-field-label">Current age</label>
          <input className="rvt-input" type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} placeholder="30" />
        </div>
        <div>
          <label className="rvt-field-label">Retirement age</label>
          <input className="rvt-input" type="number" value={retirementAge} onChange={e => setRetirementAge(e.target.value)} placeholder="65" />
        </div>
      </div>

      <div className="rvt-field-row">
        <div>
          <label className="rvt-field-label">Annual income</label>
          <div className="rvt-input-wrap">
            <span className="rvt-prefix">$</span>
            <input className="rvt-input" type="number" value={annualIncome} onChange={e => setAnnualIncome(e.target.value)} placeholder="75000" />
          </div>
        </div>
        <div>
          <label className="rvt-field-label">Current savings</label>
          <div className="rvt-input-wrap">
            <span className="rvt-prefix">$</span>
            <input className="rvt-input" type="number" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} placeholder="0" />
          </div>
        </div>
      </div>

      <div className="rvt-field-row">
        <div>
          <label className="rvt-field-label">Annual contribution</label>
          <div className="rvt-input-wrap">
            <span className="rvt-prefix">$</span>
            <input className="rvt-input" type="number" value={annualContribution} onChange={e => setAnnualContribution(e.target.value)} placeholder="7000" />
          </div>
        </div>
        <div>
          <label className="rvt-field-label">Current tax rate %</label>
          <input className="rvt-input" type="number" value={taxRateNow} onChange={e => setTaxRateNow(e.target.value)} placeholder="22" />
        </div>
      </div>

      <div className="rvt-field-row">
        <div>
          <label className="rvt-field-label">Expected retirement tax rate %</label>
          <input className="rvt-input" type="number" value={taxRateRetirement} onChange={e => setTaxRateRetirement(e.target.value)} placeholder="15" />
          <p style={{ fontSize: "10px", color: "#aaa", marginTop: ".3rem" }}>Most retirees have lower income</p>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <button className="rvt-calc-btn" onClick={calculate}>Compare accounts</button>
        </div>
      </div>

      {results && (
        <div className="rvt-results">
          <div className="rvt-result-grid">
            <div className="rvt-result-cell">
              <p className="rvt-result-label">Roth IRA (after-tax)</p>
              <p className="rvt-result-val purple">{fmt(results.rothBalance)}</p>
              <p style={{ fontSize: "10px", color: "#888", marginTop: ".2rem" }}>Tax-free withdrawal</p>
            </div>
            <div className="rvt-result-cell">
              <p className="rvt-result-label">Traditional IRA (after tax)</p>
              <p className="rvt-result-val">{fmt(results.traditionalAfterTax)}</p>
              <p style={{ fontSize: "10px", color: "#888", marginTop: ".2rem" }}>After retirement tax applied</p>
            </div>
          </div>
          
          <div style={{ padding: "1rem", background: "#f5f3ef", borderRadius: "4px", fontSize: "13px", color: "#444", lineHeight: "1.6", marginBottom: "1rem" }}>
            <strong>{results.winner} IRA</strong> comes out ahead by <strong>{fmt(results.difference)}</strong> over {results.years} years at 7% estimated annual returns.
          </div>

          <div style={{ marginTop: "1rem", borderTop: "1px solid #e0dbd3", paddingTop: "1rem" }}>
            <p style={{ fontSize: "11px", letterSpacing: ".08em", textTransform: "uppercase", color: "#888", marginBottom: ".5rem" }}>What's behind the numbers</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem", fontSize: "12px" }}>
              <div>
                <p style={{ color: "#555" }}>Roth: You pay <strong>{fmt(results.taxSavedNow)}</strong> in tax now on your contributions</p>
                <p style={{ color: "#166534", marginTop: ".25rem" }}>Withdraw {fmt(results.rothBalance)} tax-free in retirement</p>
              </div>
              <div>
                <p style={{ color: "#555" }}>Traditional: You save <strong>{fmt(results.taxSavedNow)}</strong> in tax now</p>
                <p style={{ color: "#b45309", marginTop: ".25rem" }}>Pay <strong>{fmt(results.taxPaidLater)}</strong> in tax on withdrawals later</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}