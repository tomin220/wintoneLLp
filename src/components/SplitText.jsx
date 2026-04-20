/**
 * SplitText — animates each word with a blur-in effect.
 * Usage: <SplitText text="Where Homes Become Legacies" className="hero__heading" />
 */
export default function SplitText({ text, className, tag: Tag = 'h1', delay = 0 }) {
  const words = text.split(' ');

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="split-word"
          style={{ animationDelay: `${delay + i * 90}ms` }}
        >
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}
