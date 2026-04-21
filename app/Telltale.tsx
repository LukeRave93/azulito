import { Link } from "react-router";

export default function Telltale() {
  return (
    <div
      className="min-h-full bg-[#faf9f6]"
      style={{ fontFamily: "'EB Garamond', serif" }}
    >
      {/* Subtle blob — top left, faint */}
      <div className="fixed top-[-60px] left-[-40px] pointer-events-none opacity-60">
        <svg width="320" height="280" viewBox="0 0 280 240" fill="none">
          <path
            d="M120 40C150 25 180 30 200 50C220 70 225 100 215 130C205 160 185 180 155 185C125 190 95 175 75 150C55 125 50 90 65 65C80 40 90 55 120 40Z"
            fill="#03AAE8"
            opacity="0.08"
          />
        </svg>
      </div>

      {/* Back nav */}
      <div className="fixed top-8 left-8">
        <Link
          to="/"
          className="text-[#E95BEB] hover:text-[#F10041] transition-colors"
          style={{ fontSize: '13px', letterSpacing: '0.02em' }}
        >
          ← azulito
        </Link>
      </div>

      {/* Main content */}
      <div
        className="mx-auto py-24 px-8"
        style={{ maxWidth: '580px' }}
      >

        {/* Header */}
        <div className="mb-16">
          <h1
            style={{
              fontFamily: "'Pirata One', cursive",
              fontSize: '4.5rem',
              fontWeight: 400,
              lineHeight: 1,
              color: '#03AAE8',
              letterSpacing: '0.03em',
              marginBottom: '1.5rem'
            }}
          >
            Telltale
          </h1>
          <p style={{ fontSize: '15px', color: '#888', lineHeight: '1.6', fontStyle: 'italic' }}>
            and what we've learned so far
          </p>
        </div>

        {/* Body */}
        <div
          className="space-y-6 text-[#3a3a3a]"
          style={{ fontSize: '17px', lineHeight: '1.85' }}
        >
          <p>
            My north star is to be the best in the world at helping brands understand their customers on an intimate level. Better understanding leads to better experiences and sharper decisions.
          </p>
          <p>
            Telltale is early. We're live, we have paying clients, and the learnings are starting to stack up. A few worth sharing here.
          </p>

          {/* Divider */}
          <div className="py-4">
            <div style={{ width: '32px', height: '1px', background: '#03AAE8', opacity: 0.4 }} />
          </div>

          <h2 style={{ fontFamily: "'Pirata One', cursive", fontSize: '1.4rem', color: '#1a1a1a', fontWeight: 400, letterSpacing: '0.02em' }}>
            It started with a post-purchase attribution survey
          </h2>
          <p>
            It was a custom job for a brand I was already working with. Standard stuff. <em>Where did you hear about us?</em> While I was building it I kept noticing the same thing — pretty much none of the other brands I was talking to actually paid any attention to their survey or the results.
          </p>
          <p>
            The more I chatted with brands, the more I realised how many blindspots they had for their customers and users.
          </p>
          <p>
            Which got me thinking about the question itself. If you could ask your customer anything at this moment — right after they've just bought — what would you actually ask?
          </p>
          <p>
            Which then made me ask a different, bigger question underneath that: why are we still confined to these forms at all?
          </p>
          <p>
            I grew up behind a retail counter at Yarntons in Devonport. And the thing you learn fast in that job is that a real conversation tells you everything. What the customer actually needs, what they want, what's going on in their day. I could gather a stupid amount of information in a little 30-second chit-chat, and with that, my ability to serve my customers improves dramatically. A form doesn't do any of that. It returns a checkbox.
          </p>
          <p>
            In 2026, with the technology that exists right now, why is a brand not having a conversation with every single customer it has?
          </p>
          <p>
            That's what I built. A tool that offers a small incentive, then hosts an AI conversation — trained on the brand's tone of voice, asking questions the brand actually wants answered. The main goal is to get the customer talking. Position the questions so they blab. The value isn't in the answer to a specific question. It's in everything they say around it. The context, the relationships, the reason they bought in the first place.
          </p>

          {/* Divider */}
          <div className="py-4">
            <div style={{ width: '32px', height: '1px', background: '#03AAE8', opacity: 0.4 }} />
          </div>

          <p style={{ fontSize: '15px', color: '#888', fontStyle: 'italic' }}>
            A few months in, the learnings are getting interesting.
          </p>

          {/* Learning 01 */}
          <div className="py-2">
            <p style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#03AAE8', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Learning 01
            </p>
            <h3 style={{ fontFamily: "'Pirata One', cursive", fontSize: '1.25rem', color: '#1a1a1a', fontWeight: 400, marginBottom: '1rem', letterSpacing: '0.02em' }}>
              Accents matter (and not how you'd expect)
            </h3>
            <p>
              People talk more, and less transactionally, when the AI voice has an accent different to theirs. My best guess is that it lowers the guard. A familiar accent triggers shorter, more clipped responses. A different one invites them to slow down. It might also be that a slight difference makes the imperfections of AI speech easier to forgive. Either way, it's consistent enough that it's changed how we configure agents.
            </p>
          </div>

          {/* Learning 02 */}
          <div className="py-2">
            <p style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#03AAE8', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Learning 02
            </p>
            <h3 style={{ fontFamily: "'Pirata One', cursive", fontSize: '1.25rem', color: '#1a1a1a', fontWeight: 400, marginBottom: '1rem', letterSpacing: '0.02em' }}>
              $5 is the number
            </h3>
            <p>
              A $5 Starbucks gift card is enough to get someone to spend 2–3 minutes answering properly. Below that, participation drops. Above 3 minutes, answer quality deteriorates regardless of what you offer. At $5 and under 3 minutes, we're consistently seeing 5–10% participation with high-quality responses. That's not a small thing. It means the format is viable at scale without the economics falling apart.
            </p>
          </div>

          {/* Learning 03 */}
          <div className="py-2">
            <p style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#03AAE8', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Learning 03
            </p>
            <h3 style={{ fontFamily: "'Pirata One', cursive", fontSize: '1.25rem', color: '#1a1a1a', fontWeight: 400, marginBottom: '1rem', letterSpacing: '0.02em' }}>
              Context of use is the thing forms can never get
            </h3>
            <p>
              One of the biggest unlocks for the brands we currently work with is around context of use — who's actually using the product, how they're using it, what the relationship is between the buyer and the user. This has been very hard to nail down in a form, but something someone can easily explain in a sentence or two. A parent buying for a kid. Someone buying a gift. A person sharing a subscription. A form returns a checkbox. A conversation returns context.
            </p>
          </div>

          {/* Divider */}
          <div className="py-4">
            <div style={{ width: '32px', height: '1px', background: '#03AAE8', opacity: 0.4 }} />
          </div>

          <p>
            Still early. But the pattern is clear enough. The honest format produces a different category of information. Not better survey data. Something else entirely.
          </p>

          {/* Sign-off */}
          <div className="pt-8 pb-24">
            <p style={{ color: '#888', fontSize: '15px' }}>Cheers,</p>
            <p style={{ color: '#3a3a3a' }}>Luke</p>
            <div className="mt-6">
              <a
                href="mailto:luke@azulito.co.nz"
                className="text-[#E95BEB] hover:text-[#F10041] transition-colors"
                style={{ fontSize: '13px' }}
              >
                luke@azulito.co.nz
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
