export interface HeaderLinkProps {
  mobile?: boolean;
  toggleNavbar?: () => void;
}

export interface NavLinkProps extends HeaderLinkProps {
  to?: string;
}
