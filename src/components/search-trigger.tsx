'use client';

import * as React from 'react';

export function SearchTrigger({
  className = '',
  children,
  label = 'Search'
}: {
  className?: string;
  children?: React.ReactNode;
  label?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => window.dispatchEvent(new Event('maison-search-open'))}
      className={className}
    >
      {children ?? label}
    </button>
  );
}
