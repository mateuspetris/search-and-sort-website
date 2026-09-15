import type { ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost';

interface CommonProps {
  variant?: Variant;
  size?: 'md' | 'sm';
}

function classes(variant: Variant, size: 'md' | 'sm', extra?: string) {
  return [styles.button, styles[variant], size === 'sm' && styles.small, extra].filter(Boolean).join(' ');
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={classes(variant, size, className)} {...props} />;
}

export function ButtonLink({ variant = 'primary', size = 'md', className, ...props }: CommonProps & LinkProps) {
  return <Link className={classes(variant, size, className)} {...props} />;
}
