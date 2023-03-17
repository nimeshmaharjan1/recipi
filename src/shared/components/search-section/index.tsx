import React from "react";
import type { SetStateAction } from "react";

const SharedSearch: React.FC<{
  setSearchTerm: React.Dispatch<SetStateAction<string>>;
  placeholder: string;
}> = ({ setSearchTerm, placeholder }) => {
  return (
    <section className="search-section mb-6 grid grid-cols-1">
      <div className="form-control col-span-1 flex items-center justify-center">
        <input
          type="text"
          onChange={(e) => {
            setTimeout(() => {
              setSearchTerm(e.target.value);
            }, 500);
          }}
          placeholder={placeholder}
          className="input-bordered input-primary input w-full max-w-xs"
        />
      </div>
    </section>
  );
};

export default SharedSearch;
