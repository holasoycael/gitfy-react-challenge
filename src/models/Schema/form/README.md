
```jsx
// types and interfaces
import { TFieldList } from 'models/Schema/form/types'

export default () => {
  const fields: TFieldList = [
    {
      type: 'text',
      dataType: 'TEXTAREA',
      name: 'inputs[product-name]',
      autoComplete: 'off',
      title: 'Nome do Produto',
      label: 'Ex: Quarter Dollar 1996',
      value: values.title ?? '',
      placeholder: 'Ex: Quarter Dollar 1996',
      helperText: errors.title,
      isAvailable: (value) => {
        return Schema.product.Validations.title.safeParse(value.trim()).success
      },
      onChange: (value) => {
        setValues((prev) => ({ ...prev, title: value }))
        setErrors((prev) => ({ ...prev, title: undefined, message: undefined }))
      },
      onBlur: (value) => {
        const schema = Schema.product.Validations.title.safeParse(value.trim())
        setErrors((prev) => ({
          ...prev,
          name: Utils.schemaParse<string>(schema),
          message: undefined
        }))
      }
    }
  ]

  return (
    <div className="w-full flex flex-col space-y-4 p-6" data-testid="modal__main">
      {fields.map((Data, index) => {
        if (isField(Data)) {
          return (
            <div
              key={Data.name}
              className="w-full flex flex-col space-y-1"
              style={{
                '--border': Data.helperText ? '#d32f2f' : '#d7d7d7'
              }}
              data-testid={`signin__field--${Data.name}`}
            >
              <label className="text-xs font-medium leading-[22px] flex items-center">{Data.title}</label>
              <div className="w-full" data-testid="signin__textinput">
                <Input
                  variant="bordered"
                  fullWidth
                  name={Data.name}
                  type={Data.type}
                  value={Data.value}
                  size="sm"
                  placeholder={Data.placeholder}
                  classNames={{
                    inputWrapper: cn(
                      'h-10 !border shadow-none pl-3',
                      Data.helperText && '!border-[#d32f2f]',
                      {
                        success: 'border-success!',
                        danger: 'border-danger!',
                        none: ''
                      }[
                        Data.color === 'success' ? 'success' : Data.color === 'danger' ? 'danger' : 'none'
                      ]
                    ),
                    input: '!outline-none'
                  }}
                  endContent={Data.endContent}
                  isInvalid={typeof Data.helperText === 'string'}
                  errorMessage={Data.helperText}
                  color={Data.color}
                  data-testid="signin__textfield"
                  onChange={(e) => Data.onChange && Data.onChange(e.target.value)}
                  onFocus={() => Data.onFocus && Data.onFocus()}
                  onBlur={(e) => Data.onBlur && Data.onBlur(e.target.value)}
                />
              </div>
            </div>
          )
        }

        return Data
      })}
    </div>
  )
}
```
