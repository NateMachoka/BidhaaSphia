export function FormInput({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 px-4 py-2 border border-gray-300 rounded w-full"
      />
    </div>
  )
}
