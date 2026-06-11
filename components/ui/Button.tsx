'use client';

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ElementType,
} from 'react';
type Variant = 'primary' | 'secondary' | 'ghost' | 'ghost-light';
type Size = 'md' | 'lg';
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  as?: ElementType;
  href?: string;
};
const base =
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none whitespace-nowrap';
const variants: Record<Variant, string> = {
  primary: 'btn-chunky-primary',
  secondary: 'btn-chunky-secondary',
  ghost: 'btn-chunky-ghost',
  'ghost-light': 'btn-chunky-ghost-light',
};
const sizes: Record<Size, string> = {
  md: 'h-12 px-5 text-[15px]',
  lg: 'h-12 px-6 text-[15px]',
};
export const Button = forwardRef<HTMLElement, Props>(function Button(
  {
    variant = 'primary',
    size = 'md',
    className = '',
    as: Component = 'button',
    href,
    children,
    ...rest
  },
  ref
) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) {
    return (
      // Spread rest so handlers (e.g. onClick for analytics) attach to links too.
      <a href={href} className={cls} role="button" {...(rest as object)}>
        {children}
      </a>
    );
  }
  const Comp: ElementType = Component;
  return (
    <Comp ref={ref} className={cls} {...rest}>
      {children}
    </Comp>
  );
});
