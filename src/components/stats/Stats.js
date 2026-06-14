export default function Stats({ items }) {
  return (
    <dl className="flex flex-wrap gap-x-8 gap-y-4">
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center gap-8">
          <div>
            <dt className="font-display text-2xl font-semibold text-ink md:text-3xl">
              {item.value}
            </dt>
            <dd className="text-sm text-muted">{item.label}</dd>
          </div>
          {i < items.length - 1 && (
            <span className="hidden h-10 w-px bg-line sm:block" aria-hidden="true" />
          )}
        </div>
      ))}
    </dl>
  );
}
