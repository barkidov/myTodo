import { FilterValuesType } from "../../App";

type PropsType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  setFilter?: (filter: FilterValuesType) => void
};

export const Button = ({ children, ...restProps }: PropsType) => {
  return <button {...restProps}>{children}</button>;
};
