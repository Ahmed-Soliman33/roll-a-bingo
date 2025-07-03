const Button = ({
  children,
  variant = "",
  size = "md",
  className = "",
  disabled = false,
  action,
}) => {
  const baseStyles = `
    font-medium
    rounded-lg
    border-0
    shadow-md
    hover:shadow-lg
    transition-all
    duration-300
    ease-in-out
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    cursor-pointer
  `;

  const variantStyles = {
    primary: `
      bg-primaryColor
      hover:bg-lightBlueColor
      text-white
      focus:ring-tertiaryColor
    `,
    secondary: `
      bg-tertiaryColor
      hover:bg-secondaryColor
      hover:text-white
      text-primaryTextColor
      focus:ring-tertiaryColor
    `,
    outline: `
      bg-transparent
      border-1
      border-primaryColor/70
      hover:bg-primaryColor/95
      hover:text-white
      text-primaryColor
      focus:ring-primaryColor
    `,
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2 text-lg",
    lg: "px-10 py-4 text-xl",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed hover:shadow-md"
    : "cursor-pointer";

  return (
    <button
      onClick={action}
      className={` ${baseStyles} ${variant && variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className} `}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// {
//   children: PropTypes.node.isRequired,
//   variant: PropTypes.oneOf(["primary", "secondary", "outline"]),
//   size: PropTypes.oneOf(["sm", "md", "lg"]),
//   className: PropTypes.string,
//   disabled: PropTypes.bool,
// };

export default Button;
