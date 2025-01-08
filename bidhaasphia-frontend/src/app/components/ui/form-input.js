import { Input } from "./input"
import { Label } from "./label"

export function FormInput({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      <Label htmlFor={label} className="text-sm font-medium text-gray-700">{label}</Label>
      <Input
        type={type}
        id={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1"
      />
    </div>
  )
}
