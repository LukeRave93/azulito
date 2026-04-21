export default function App() {
  return (
    <div className="size-full bg-[#faf9f6] relative overflow-hidden" style={{ fontFamily: "'EB Garamond', serif" }}>
      {/* Blob stain in upper middle, off-center */}
      <div className="absolute top-[15%] left-[42%]">
        <svg width="280" height="240" viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M120 40C150 25 180 30 200 50C220 70 225 100 215 130C205 160 185 180 155 185C125 190 95 175 75 150C55 125 50 90 65 65C80 40 90 55 120 40Z"
            fill="#03AAE8"
            opacity="0.12"
          />
        </svg>
      </div>

      {/* Massive Azulito text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full">
        <h1
          className="text-[#03AAE8] whitespace-nowrap text-center"
          style={{
            fontFamily: "'Pirata One', cursive",
            fontSize: '22vw',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '0.05em'
          }}
        >
          AZULITO
        </h1>
      </div>

      {/* Content tucked in bottom-right corner */}
      <div className="absolute bottom-8 right-8 max-w-[280px]">
        <div className="space-y-6">
          {/* Description */}
          <div className="text-[#4a4a4a]" style={{ fontSize: '14px', fontWeight: 400, lineHeight: '1.7' }}>
            <p className="mb-2">A container for experiments:</p>
            <ul className="space-y-0.5 ml-4">
              <li>- some serious</li>
              <li>- some playful</li>
              <li>- some half-formed</li>
            </ul>
            <p className="mt-3">A place to put my thoughts and learnings</p>
          </div>

          {/* Contact */}
          <div>
            <a
              href="mailto:luke@azulito.co.nz"
              className="text-[#E95BEB] hover:text-[#F10041] transition-colors"
              style={{ fontSize: '13px', fontWeight: 400, lineHeight: '1.6' }}
            >
              luke@azulito.co.nz
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}