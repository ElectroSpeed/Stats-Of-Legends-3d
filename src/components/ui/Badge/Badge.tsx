import clsx from "clsx";
import styles from "./Badge.module.scss";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "win" | "loss" | "neutral" | "gold";
};

export function Badge({ tone = "neutral", className, ...props }: Props) {
  return <span className={clsx(styles.badge, styles[tone], className)} {...props} />;
}
