import { NumberInput } from "@heroui/react";
import { useState, useRef } from "react";

interface WeightMinFilterProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  maxValue: number | undefined;
}

export const WeightMinFilter = ({ value, onChange, maxValue }: WeightMinFilterProps) => {

  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Обработчики поля
  const handleChange = (newValue: number) => {
    onChange(newValue);
    setTouched(true);
  };
  const handleClear = () => {
    onChange(undefined);
    setTouched(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  // Валидация поля
  const errors: string[] = [];
  if (touched && value !== undefined) {
    if (value <= 0) {
      errors.push("Значение должно быть больше 0!");
    } else if (value > 100000) {
      errors.push("Значение должно быть меньше 100000!");
    }
  }
  if (value !== undefined && maxValue !== undefined && value > maxValue) {
    errors.push(`Максимум ${maxValue}!`);
  }

  return (
    <div className="col-span-2 col-start-5 border border-green-600">
      <NumberInput ref={inputRef} isClearable hideStepper isWheelDisabled radius="lg" size={"sm"}
        errorMessage={
          errors.length > 0 ? (
            <ul>
              {errors.map((error, i) => (
                <li key={i} className="text-sm text-red-500">{error}</li>
              ))}
            </ul>
          ) : undefined
        }
        isInvalid={errors.length > 0}
        placeholder="От"
        value={value}
        onValueChange={handleChange}
        onClear={handleClear}
        classNames={{
          base: "w-full",
          input: "min-h-[20px] py-1 text-red-800",
          inputWrapper: ["h-9", "bg-gray-400/30"],
          clearButton: "hover:text-red-600"
        }}
      />
    </div>
  );
};