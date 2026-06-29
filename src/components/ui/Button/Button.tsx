import styles from "./Button.module.scss";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", className, ...props }: Props) {
  return <button className={`${styles.button} ${styles[variant]} ${className ?? ""}`} {...props} />;
}
