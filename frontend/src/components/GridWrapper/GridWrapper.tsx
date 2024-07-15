import React from "react";
type GridWrapperProps = {
  children: React.ReactNode;
};

function GridWrapper({ children }: GridWrapperProps) {
  return (
    <section
      id='grid-wrapper'
      className='container gap-2 mx-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {children}
    </section>
  );
}

export default GridWrapper;
