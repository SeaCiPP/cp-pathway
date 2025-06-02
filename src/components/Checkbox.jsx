// Custom Checkbox Component
import "../App.css";

export default function Checkbox({ checked, onChange, label }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 8,
        boxShadow: checked ? '0 1px 4px #7B2CBF18' : '0 1px 2px #0001',
        border: checked ? '1.5px solid #7B2CBF' : '1px solid #eee',
        padding: '3.5px 8px',
        marginBottom: 4,
        transition: 'all 0.16s',
        display: 'flex',
        alignItems: 'center',
        minHeight: 26,
      }}
    >
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          cursor: 'pointer',
          fontSize: '0.95rem',
          fontWeight: 500,
          userSelect: 'none',
          width: '100%',
          minHeight: 18,
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 18,
            height: 18,
            minWidth: 18,
            minHeight: 18,
            borderRadius: 4,
            border: checked ? '1.5px solid #7B2CBF' : '1px solid #ccc',
            background: checked ? '#ede3fa' : '#fff',
            transition: 'all 0.16s',
            boxShadow: checked ? '0 1px 2px #7B2CBF0A' : 'none',
            marginRight: 0,
            flexShrink: 0,
          }}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            style={{
              opacity: 0,
              width: 18,
              height: 18,
              position: 'absolute',
              margin: 0,
              cursor: 'pointer',
            }}
            tabIndex={0}
          />
          {checked && (
            <svg width="10" height="10" viewBox="0 0 20 20" fill="none" style={{ display: 'block' }}>
              <polyline
                points="4,11 9,16 16,5"
                style={{
                  fill: 'none',
                  stroke: '#7B2CBF',
                  strokeWidth: 1.7,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                }}
              />
            </svg>
          )}
        </span>
        <span style={{ flex: 1, lineHeight: 1.25, color: '#222', wordBreak: 'break-word' }}>{label}</span>
      </label>
    </div>
  );
}