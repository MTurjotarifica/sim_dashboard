import { InputBase } from "@mantine/core";
import React, { useState } from "react";

interface InputFieldProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: any) => void;
}

const InputField = ({ input, setInput, onSubmit }: InputFieldProps) => {
  return (
    <form onSubmit={onSubmit}>
      <InputBase
        className="w-64"
        placeholder="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></InputBase>
    </form>
  );
};

export default InputField;
