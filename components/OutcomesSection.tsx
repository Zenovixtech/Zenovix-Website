export default function OutcomesSection() {
  return (
    <section className="section outcomes">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">Outcomes</span>
          <h2>From spreadsheet busywork to better decisions</h2>
          <p>
            Feel the shift in your weekly workflow—and leave with proof of hands-on practice.
          </p>
        </div>
        <div className="outcome-grid">
          <article className="outcome reveal">
            <b>Hours lost</b>
            <h3>Before: Spreadsheet busywork</h3>
            <p>Manual cleanup, copy-paste reports, and last-minute fire drills.</p>
          </article>
          <article className="outcome reveal">
            <b>Faster cycles</b>
            <h3>After: Guided Excel workflows</h3>
            <p>Reusable steps, clearer KPIs, and fewer late nights.</p>
          </article>
          <article className="outcome featured reveal">
            <b>More insight</b>
            <h3>With AI as your co-pilot</h3>
            <p>Ask better questions and deliver useful decisions sooner.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
