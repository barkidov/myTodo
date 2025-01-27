type PropsType = React.InputHTMLAttributes<HTMLInputElement>

export const Input = ({ ...props }: PropsType) => {
  const { type, checked, onChange, value, onKeyDown, onBlur, autoFocus, placeholder } = props;
  return (
    <input
      autoFocus={autoFocus}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      type={type}
      checked={checked}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  );
};
