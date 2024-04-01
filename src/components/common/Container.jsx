const Container = ({ className, ...props }) => {
  // Concatenate classes directly
  const containerClasses =
    "max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8" + className;

  return <div className={containerClasses} {...props} />;
};

export default Container;
