import React, { forwardRef } from 'react';
type Variant = 'primary' | 'secondary' | 'ghost' | 'ghost-light';
type Size = 'md' | 'lg';
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  as?: 'button' | 'a';
  href?: string;
};
const base =
'inline-flex items-center justify-center gap-2 font-medium rounded-[20px] transition-colors duration-150 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';
const variants: Record<Variant, string> = {
  primary: 'bg-[#a81e24] text-white hover:bg-[#8f1920] active:bg-[#761519]',
  secondary:
  'bg-white text-black hover:bg-[#F3F5F9] active:bg-[#E5E7EB] border border-[#E5E7EB]',
  ghost:
  'bg-transparent text-white border border-white/80 hover:bg-white/10 active:bg-white/20',
  'ghost-light':
  'bg-transparent text-black border border-black/15 hover:bg-black/5 active:bg-black/10'
};
const sizes: Record<Size, string> = {
  md: 'h-10 px-5 text-[15px]',
  lg: 'h-12 px-6 text-base rounded-[24px]'
};
export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
{
  variant = 'primary',
  size = 'md',
  className = '',
  as = 'button',
  href,
  children,
  ...rest
},
ref)
{
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (as === 'a' || href) {
    return (
      <a href={href} className={cls} role="button">
        {children}
      </a>);

  }
  return (
    <button ref={ref} className={cls} {...rest}>
      {children}
    </button>);

});