export default function SkillsSection() {
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">What you’ll practice</span>
          <h2>Six skills you’ll use the next workday</h2>
          <p>Every block leaves you with something reusable—not just pages of notes.</p>
        </div>
        <div className="skills">
          <article className="skill-card reveal">
            <span className="skill-num">01</span>
            <h3>Ask Excel better questions with AI</h3>
            <p>
              Write prompts that clean columns, explain trends, and suggest the right chart without guessing formulas from memory.
            </p>
          </article>
          <article className="skill-card reveal">
            <span className="skill-num">02</span>
            <h3>Build decision-ready dashboards fast</h3>
            <p>
              Move from a raw export to a clear KPI view your stakeholders can scan in under a minute.
            </p>
          </article>
          <article className="skill-card reveal">
            <span className="skill-num">03</span>
            <h3>Automate the weekly grind</h3>
            <p>
              Create repeatable refresh, cleanup, and summary steps so reporting does not consume your evenings.
            </p>
          </article>
          <article className="skill-card reveal">
            <span className="skill-num">04</span>
            <h3>Use formulas that stick</h3>
            <p>
              Apply modern lookup, conditional, and aggregation patterns with AI as your co-pilot—not a crutch.
            </p>
          </article>
          <article className="skill-card reveal">
            <span className="skill-num">05</span>
            <h3>Tell stories that drive action</h3>
            <p>
              Package findings into short narratives and slides so insights become decisions instead of ignored attachments.
            </p>
          </article>
          <article className="skill-card reveal">
            <span className="skill-num">06</span>
            <h3>Create your AI + Excel playbook</h3>
            <p>
              Walk away with a simple checklist tailored to the way your team already works in spreadsheets.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
