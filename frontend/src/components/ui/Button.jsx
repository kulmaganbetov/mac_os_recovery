import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

/**
 * Button Component
 * Apple-style button with variants
 */
const Button = forwardRef(({
  className,
  variant = 'default',
  size = 'default',
  children,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';

  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  };

  const sizes = {
    default: 'h-11 px-6 py-2',
    sm: 'h-9 px-4 text-sm',
    lg: 'h-12 px-8 text-lg',
    icon: 'h-10 w-10',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
