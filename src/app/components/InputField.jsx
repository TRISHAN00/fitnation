import { AlertCircle } from "lucide-react";

const InputField = ({ field, value, onChange, error, required = false }) => (
  <div className="flex flex-col">
    <label
      htmlFor={field.name}
      className="text-gray-700 font-medium mb-2 flex items-center"
    >
      {field.label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      id={field.name}
      type={field.type}
      name={field.name}
      value={value}
      onChange={onChange}
      placeholder={field.placeholder}
      className={`w-full border rounded-lg px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
        error
          ? "border-red-300 bg-red-50"
          : "border-gray-300 hover:border-gray-400"
      }`}
      required={required}
    />
    {error && (
      <p className="text-red-600 text-sm mt-1 flex items-center">
        <AlertCircle className="h-4 w-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

export default InputField;
