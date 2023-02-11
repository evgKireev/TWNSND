import React, { FC, ReactElement } from "react";

import styles from './Button.module.scss'
import classNames from "classnames";

export enum ButtonTypes {
   Primary = "primary",
   Secondary = "secondary",
};

type ButtonProps = {
   title: string | ReactElement;
   type: ButtonTypes;
   onClick?: () => void;
   className?: string;
   disabled?: boolean;
};

const Button: FC<ButtonProps> = (props) => {
   const { type, title, onClick, className, disabled } = props;

   const buttonClassName = styles[type];

   return (
      <div
         className={classNames(styles.button, buttonClassName, className, {
            [styles.disabled]: !!disabled,
         })}
         onClick={onClick}
      >
      {title}
      </div>
   );
};

export default Button;