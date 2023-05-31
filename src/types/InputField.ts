export interface InputFieldProps {
  id: string;
  icon: string;
  name: string;
  value: string;
  hasError: boolean;
  placeholder: string;
  onChange: (name: string, value: string) => void;
}
