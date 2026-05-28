import RothVsTraditionalCalculator from "./RothVsTraditionalCalculator"
import { RELATED_LINKS as RELATED } from "./lib/links"

const staticCss = `
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
  .rvt-nav { font-size: 12px; margin-bottom: 1.5rem; }
  .rvt-nav a { color: #7c3aed; text-decoration: none; }
  .rvt-nav a:hover { text-decoration: underline; }
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
  .rvt-result-val.purple { color: #7c3aed; }
  .rvt-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .rvt-prose p:last-child { margin-bottom: 0; }
  .rvt-prose ul { font-size: 13px; color: #444; line-height: 1.8; padding-left: 1.2rem; margin-bottom: .75rem; }
  .rvt-prose ul li { margin-bottom: .3rem; }
  .rvt-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .rvt-info-item { padding: .75rem; border-left: 2px solid #c4a5f4; }
  .rvt-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .rvt-info-body { font-size: 12px; color: #888; line-height: 1.5; }
  .rvt-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .rvt-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #c4a5f4; line-height: 1; margin-bottom: .4rem; }
  .rvt-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .rvt-tip-body { font-size: 12px; color: #888; line-height: 1.5; }
  .rvt-faq-item { border-bottom: 1px solid #e0dbd3; padding: 1rem 0; }
  .rvt-faq-item:last-child { border-bottom: none; padding-bottom: 0; }
  .rvt-faq-q { font-size: 13px; font-weight: 500; color: #1a1a1a; margin-bottom: .4rem; }
  .rvt-faq-a { font-size: 13px; color: #555; line-height: 1.7; }
  .rvt-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .rvt-related-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .75rem; }
  .rvt-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .rvt-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .rvt-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .rvt-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .rvt-footer-links a { color: #888; text-decoration: underline; }
  @media (max-width: 600px) { .rvt-field-row, .rvt-result-grid, .rvt-tip-grid, .rvt-info-grid { grid-template-columns: 1fr; } }
`

const FAQ = [
  {
    q: "What is the core difference between a Roth and Traditional IRA?",
    a: "The difference is when you pay taxes. With a Traditional IRA, contributions may be tax-deductible now and you pay taxes when you withdraw in retirement. With a Roth IRA, you contribute after-tax dollars now and withdrawals in retirement are completely tax-free. Both accounts grow tax-advantaged in the meantime — you just choose whether you want the tax break at the front end or the back end."
  },
  {
    q: "Which is better, Roth or Traditional?",
    a: "It depends entirely on whether your tax rate is higher now or in retirement. If you expect to be in a higher tax bracket in retirement than you are today, a Roth IRA is usually better — you pay taxes at a lower rate now and withdraw tax-free later. If you expect to be in a lower bracket in retirement (which is true for most people), a Traditional IRA typically wins because you get the deduction at a higher rate and pay taxes later at a lower rate. The calculator above models this comparison directly."
  },
  {
    q: "What are the 2026 contribution limits for IRAs?",
    a: "For 2026, the IRA contribution limit is $7,000 per year, or $8,000 if you are 50 or older (the catch-up contribution). This limit applies to your combined contributions across all IRAs — you cannot contribute $7,000 to a Roth and $7,000 to a Traditional in the same year. Roth IRA contributions are also subject to income limits; for 2026, the phase-out begins at $150,000 for single filers and $236,000 for married filing jointly."
  },
  {
    q: "Can I contribute to both a Roth and Traditional IRA in the same year?",
    a: "Yes, but your total combined contributions across all IRAs cannot exceed the annual limit ($7,000 or $8,000 if 50+). So you could contribute $4,000 to a Roth and $3,000 to a Traditional in the same year, for example. Many financial planners recommend this approach as a form of tax diversification — having both pre-tax and after-tax retirement funds gives you flexibility in managing your tax liability in retirement."
  },
  {
    q: "What is a Backdoor Roth IRA?",
    a: "A Backdoor Roth is a strategy for high-income earners who exceed the Roth IRA income limits. It involves making a non-deductible contribution to a Traditional IRA (which has no income limit) and then converting it to a Roth IRA. The conversion is a taxable event, but if done promptly and correctly, there is little to no taxable gain. It is a legal tax strategy explicitly recognized by the IRS, though it is worth consulting a tax professional to implement correctly."
  },
  {
    q: "What happens to my IRA when I retire — how do withdrawals work?",
    a: "With a Traditional IRA, withdrawals in retirement are taxed as ordinary income. Required Minimum Distributions (RMDs) begin at age 73 — you must withdraw a minimum amount each year whether you need the money or not. With a Roth IRA, qualified withdrawals are completely tax-free and there are no RMDs during the owner's lifetime, making it more flexible for estate planning and long-term tax management."
  },
]

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: staticCss }} />
      <main className="rvt-wrap">

        <p className="rvt-nav"><a href="https://moneywisecalculator.com">&#8592; More free tools at MoneyWise Calculator</a></p>

        <div className="rvt-header">
          <p className="rvt-eyebrow">Retirement Planning</p>
          <h1 className="rvt-title">Roth vs Traditional<br /><em>IRA Calculator</em></h1>
        </div>

        <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.7", marginBottom: "1.5rem" }}>
          Free tool to compare Roth IRA and Traditional IRA after-tax values. Enter your age, income, contribution, and tax rates to see which account type comes out ahead for your specific situation.
        </p>

        {/* INTERACTIVE TOOL — client component */}
        <RothCalculator />

        {/* THE KEY QUESTION */}
        <div className="rvt-card">
          <p className="rvt-section-title">The only question that matters</p>
          <div className="rvt-prose">
            <p>Roth and Traditional IRAs are mathematically identical if your tax rate never changes. The entire decision comes down to one question: is your tax rate higher now or in retirement?</p>
            <p>With a Traditional IRA, you deduct contributions now and pay tax on withdrawals later. With a Roth IRA, you pay tax now and withdraw tax-free later. If your tax rate is higher today than it will be in retirement, Traditional wins. If your tax rate is lower today than it will be in retirement, Roth wins.</p>
            <p>For most people, income tends to be lower in retirement than during peak earning years — which is why Traditional IRAs often win on pure math for higher earners. But tax rates are not the only consideration: Roth IRAs have no required minimum distributions, provide tax-free income in retirement (which can help manage Medicare premiums and Social Security taxation), and offer more estate planning flexibility.</p>
          </div>
          <div className="rvt-info-grid">
            <div className="rvt-info-item">
              <p className="rvt-info-title">Traditional IRA</p>
              <p className="rvt-info-body">Contributions may be tax-deductible. Growth is tax-deferred. Withdrawals in retirement are taxed as ordinary income. Required minimum distributions begin at age 73.</p>
            </div>
            <div className="rvt-info-item">
              <p className="rvt-info-title">Roth IRA</p>
              <p className="rvt-info-body">Contributions are after-tax. Growth is tax-free. Qualified withdrawals in retirement are completely tax-free. No required minimum distributions during the owner's lifetime.</p>
            </div>
            <div className="rvt-info-item">
              <p className="rvt-info-title">Income limits</p>
              <p className="rvt-info-body">Roth IRA contributions phase out at higher incomes ($150K+ single, $236K+ married for 2026). Traditional IRA deductibility phases out if you have a workplace retirement plan.</p>
            </div>
            <div className="rvt-info-item">
              <p className="rvt-info-title">Contribution limits</p>
              <p className="rvt-info-body">$7,000 per year for 2026 ($8,000 if age 50+). This limit applies to your combined contributions across all IRAs — Roth and Traditional combined.</p>
            </div>
          </div>
        </div>

        {/* RULES OF THUMB */}
        <div className="rvt-card">
          <p className="rvt-section-title">Practical rules of thumb</p>
          <div className="rvt-tip-grid">
            <div>
              <p className="rvt-tip-num">01</p>
              <p className="rvt-tip-title">Under 30 and in the 12% bracket?</p>
              <p className="rvt-tip-body">Go Roth. You are unlikely to ever have a lower tax rate, and decades of tax-free growth is extremely valuable. The math strongly favors Roth for young, lower-income earners.</p>
            </div>
            <div>
              <p className="rvt-tip-num">02</p>
              <p className="rvt-tip-title">In the 22% or higher bracket?</p>
              <p className="rvt-tip-body">Traditional usually wins on pure math. Most retirees drop at least one tax bracket, so deferring taxes at 22%+ and paying them later at 12-15% is a meaningful advantage.</p>
            </div>
            <div>
              <p className="rvt-tip-num">03</p>
              <p className="rvt-tip-title">Maxing out your 401(k)?</p>
              <p className="rvt-tip-body">A Roth IRA gives you tax diversification — having both pre-tax and after-tax retirement funds gives you flexibility to manage your tax bracket strategically in retirement.</p>
            </div>
            <div>
              <p className="rvt-tip-num">04</p>
              <p className="rvt-tip-title">High income (over $150K single)?</p>
              <p className="rvt-tip-body">You may be phased out of direct Roth contributions. Look into a Backdoor Roth IRA — a legal strategy that converts a non-deductible Traditional IRA contribution into a Roth.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="rvt-card">
          <p className="rvt-section-title">Frequently asked questions</p>
          {FAQ.map((item, i) => (
            <div className="rvt-faq-item" key={i}>
              <p className="rvt-faq-q">{item.q}</p>
              <p className="rvt-faq-a">{item.a}</p>
            </div>
          ))}
        </div>

        {/* RELATED */}
        <div className="rvt-card">
          <p className="rvt-section-title">Related tools</p>
          <p className="rvt-related-label">More free tools from the MoneyWise Calculator network</p>
          <div className="rvt-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="rvt-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="rvt-disclaimer">
            This tool provides estimates for informational purposes only and does not constitute financial or investment advice. Assumes 7% annual returns. Results do not account for state taxes, deductions, credits, or changes in tax law. Consult a qualified financial advisor before making retirement account decisions. This site uses cookies and analytics. By using this site, you agree to our{" "}
            <a href="/privacy" style={{ color: "#888" }}>Privacy Policy</a> and{" "}
            <a href="/terms" style={{ color: "#888" }}>Terms of Service</a>.
            <div className="rvt-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="https://moneywisecalculator.com">MoneyWise Calculator</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}
