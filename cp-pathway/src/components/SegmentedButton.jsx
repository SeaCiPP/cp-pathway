// Segmented Button Component

import "beercss";

export default function SegmentedButton() {
  return (
    <nav className="no-space">
      <button className="border left-round">
        <span>Button</span>
      </button>
      <button className="border no-round">
        <span>Button</span>
      </button>
      <button className="border right-round fill">
        <span>Button</span>
      </button>
    </nav>
  );
}
