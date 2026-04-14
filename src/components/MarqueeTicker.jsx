import './MarqueeTicker.css';

const items = [
  'LUXURY VILLAS',
  'WHITEFIELD · BANGALORE',
  'RERA REGISTERED',
  'PREMIUM DEVELOPMENTS',
  'KORAMANGALA RESIDENCES',
  'AWARD-WINNING DESIGN',
  'SARJAPUR TOWNSHIP',
  'SMART HOME TECHNOLOGY',
  'INDIRANAGAR COMMERCIAL',
  'EST. 2018',
];

export default function MarqueeTicker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="ticker__item">
            {item}
            <span className="ticker__dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
