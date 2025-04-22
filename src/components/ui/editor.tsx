
import React from "react";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <textarea
        className="w-full min-h-[200px] p-4 resize-y"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
