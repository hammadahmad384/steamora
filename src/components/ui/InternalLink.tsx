import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import type { PageRoute } from '../../types';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  route: PageRoute;
  param?: string;
  onNavigate: (route: PageRoute, param?: string) => void;
  children: ReactNode;
};

export default function InternalLink({ href, route, param, onNavigate, onClick, children, ...props }: Props) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target === '_blank' || props.download !== undefined) return;
    event.preventDefault();
    onNavigate(route, param);
  };
  return <a href={href} onClick={handleClick} {...props}>{children}</a>;
}
