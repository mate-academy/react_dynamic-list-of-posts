export interface TextareaFieldProps {
  id: string;
  name: string;
  labelText: string;
  value: string;
  placeholder: string;
  hasError: boolean;
  onChange: (name: string, value: string) => void;
}
