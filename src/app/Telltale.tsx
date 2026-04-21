import { Link } from "react-router";

export default function Telltale() {
  return (
    <div
      style={{
        minHeight: '100%',
        backgroundColor: '#faf9f6',
        fontFamily: "Georgia, 'Times New Roman', serif",
        color: '#1a1a1a',
        fontSize: '17px',
        lineHeight: '1.7',
      }}
    >
      {/* Blue blob — fixed, behind everything */}
      <div style={{ position: 'fixed', top: '-60px', left: '-40px', pointerEvents: 'none' }}>
        <svg width="320" height="280" viewBox="0 0 280 240" fill="none">
          <path
            d="M120 40C150 25 180 30 200 50C220 70 225 100 215 130C205 160 185 180 155 185C125 190 95 175 75 150C55 125 50 90 65 65C80 40 90 55 120 40Z"
            fill="#03AAE8"
            opacity="0.08"
          />
        </svg>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 24px 80px' }}>

        {/* Back link */}
        <div style={{ marginBottom: '48px' }}>
          <Link to="/" style={{ color: '#888', textDecoration: 'none', fontSize: '14px' }}>
            ← azulito
          </Link>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '24px', fontWeight: 'normal', marginBottom: '4px', color: '#03AAE8' }}>
          Telltale
        </h1>
        <p style={{ color: '#888', fontSize: '15px', marginBottom: '40px', fontStyle: 'italic' }}>
          and what i've learned so far
        </p>

        {/* Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <p>My north star is to be the best in the world at helping brands understand their customers on an intimate level. Better understanding leads to better experiences and sharper decisions.</p>

          <p>Telltale is early. It's live, we have clients, and the learnings are starting to stack up. A few worth sharing here.</p>

          <h2 style={{ fontSize: '17px', fontWeight: 'normal', marginTop: '12px', marginBottom: '0', color: '#03AAE8' }}>
            It started with a post-purchase attribution survey
          </h2>

          <p>It was a custom job for a brand I was already working with. Standard stuff. <em>Where did you hear about us?</em> While I was building it I kept noticing the same thing — pretty much none of the other brands I was talking to actually paid any attention to their survey or the results.</p>

          <p>The more I chatted with brands, the more I realised how many blindspots they had for their customers and users.</p>

          <p>Which got me thinking about the question itself. If you could ask your customer anything at this moment — right after they've just bought — what would you actually ask?</p>

          <p>Which then made me ask a different, bigger question underneath that: why are we still confined to these forms at all?</p>

          <p>I grew up behind a retail counter at Yarntons in Devonport. And the thing you learn fast in that job is that a real conversation tells you everything. What the customer actually needs, what they want, what's going on in their day. I could gather a stupid amount of information in a little 30-second chit-chat, and with that, my ability to serve my customers improves dramatically. A form doesn't do any of that. It returns a checkbox.</p>

          <p>In 2026, with the technology that exists right now, why is a brand not having a conversation with every single customer it has?</p>

          <p>That's what I built. A tool that offers a small incentive, then hosts an AI conversation — trained on the brand's tone of voice, asking questions the brand actually wants answered. The main goal is to get the customer talking. Position the questions so they blab. The value isn't in the answer to a specific question. It's in everything they say around it. The context, the relationships, the reason they bought in the first place.</p>

          <p style={{ color: '#666', fontStyle: 'italic', marginTop: '8px' }}>A few months in, the learnings are getting interesting.</p>

          {/* Learning 01 */}
          <div style={{ marginTop: '8px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 'normal', marginBottom: '12px', color: '#03AAE8' }}>
              Accents matter (and not how you'd expect)
            </h2>
            <p>People talk more, and less transactionally, when the AI voice has an accent different to theirs. My best guess is that it lowers the guard. A familiar accent triggers shorter, more clipped responses. A different one invites them to slow down. It might also be that a slight difference makes the imperfections of AI speech easier to forgive. Either way, it's consistent enough that it's changed how we configure agents.</p>
          </div>

          {/* Learning 02 */}
          <div style={{ marginTop: '8px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 'normal', marginBottom: '12px', color: '#03AAE8' }}>
              $5 is the number
            </h2>
            <p>A $5 Starbucks gift card is enough to get someone to spend 2–3 minutes answering properly. Below that, participation drops. Above 3 minutes, answer quality deteriorates regardless of what you offer. At $5 and under 3 minutes, we're consistently seeing 5–10% participation with high-quality responses. That's not a small thing. It means the format is viable at scale without the economics falling apart.</p>
          </div>

          {/* Learning 03 */}
          <div style={{ marginTop: '8px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 'normal', marginBottom: '12px', color: '#03AAE8' }}>
              Context of use is the thing forms can never get
            </h2>
            <p>One of the biggest unlocks for the brands we currently work with is around context of use — who's actually using the product, how they're using it, what the relationship is between the buyer and the user. This has been very hard to nail down in a form, but something someone can easily explain in a sentence or two. A parent buying for a kid. Someone buying a gift. A person sharing a subscription. A form returns a checkbox. A conversation returns context.</p>
          </div>

          <p style={{ marginTop: '12px' }}>Still early. But the pattern is clear enough. The honest format produces a different category of information. Not better survey data. Something else entirely.</p>

          {/* Sign-off */}
          <div style={{ marginTop: '32px' }}>
            <p style={{ color: '#888', marginBottom: '2px' }}>Cheers,</p>
            <p>Luke</p>
            <a
              href="mailto:luke@azulito.co.nz"
              style={{ color: '#888', fontSize: '14px', textDecoration: 'none', display: 'inline-block', marginTop: '16px' }}
            >
              luke@azulito.co.nz
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
