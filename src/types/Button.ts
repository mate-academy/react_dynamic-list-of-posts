export interface ButtonProps {
  children: string | React.ReactNode;
  type?: 'button' | 'reset' | 'submit';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  dataCy?: string;
  onClick?: () => void;
}
