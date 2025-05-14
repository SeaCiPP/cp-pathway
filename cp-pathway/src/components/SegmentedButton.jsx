// Segmented Button Component

import "beercss";

export default function SegmentedButton() {
  return (
    <nav className="no-space">
      <button 
      className="border left-round"
      onClick={() => onchange("Low")}
      >
        <span>Low</span>
      </button>

      <button 
      className="border no-round"
      onClick={() => onchange("Medium")}
      >
        <span>Medium</span>
      </button>

      <button 
      className="border right-round fill"
      onClick={() => onchange("High")}
      >
        <span>High</span>
      </button>
    </nav>
  );
}
