// src/app/components/ui/alert.js

export function Alert({ children, type = 'info' }) {
  const alertStyles = {
    info: 'bg-blue-100 text-blue-700',
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
  }

  return (
    <div className={`p-4 mb-4 rounded ${alertStyles[type]}`}>
      <strong>{children}</strong>
    </div>
  )
}

export function AlertDescription({ children }) {
  return <p>{children}</p>
}
