import React from "react";
interface SectionHeaderProps {
  title: string;
  description: string;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="text-center mb-8 flex flex-col justify-between items-center ">
      <h2 className="text-xl md:text-2xl font-normal pb-4 tracking-wide">
        {title}
      </h2>
      <p className="text-md font-normal text-center md:w-[60%]  text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;
