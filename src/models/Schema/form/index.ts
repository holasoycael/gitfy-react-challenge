import { z } from 'zod'

// types and interfaces
import type { JSX, PropsWithChildren } from 'react'
import type { ClassValue } from 'clsx'
import type { SharedSelection } from '@heroui/system'
import type { Key } from '@react-types/shared'

export default new (class {
  ElementProps = z.object({
    className: z.string().optional()
  })

  DataType = z.enum(['TEXTFIELD', 'TEXTAREA', 'SELECT', 'AUTOCOMPLETE', 'NUMBERINPUT'])
  Color = z.union([
    z.literal('success'),
    z.literal('danger'),
    z.literal('default'),
    z.literal('primary'),
    z.literal('secondary'),
    z.literal('warning')
  ])

  InputType = z.custom<React.HTMLInputTypeAttribute>().optional()

  BaseField = z.object({
    title: z.string(),
    name: z.string()
  })

  TextField = this.BaseField.extend({
    type: this.InputType.optional(),
    value: z.string(),
    defaultValue: z.string().optional(),
    currentValue: z.string().optional(),
    isAvailable: z.custom<(value: string) => boolean>(),
    dataType: z.literal(this.DataType.options[0]),
    autoComplete: z.string().optional(),
    autoCorrect: z.string().optional(),
    autoCapitalize: z.string().optional(),
    label: z.string().optional(),
    placeholder: z.string().optional(),
    isRequired: z.boolean().optional(),
    isDisabled: z.boolean().optional(),
    color: this.Color.optional(),
    style: z.custom<React.CSSProperties>().optional(),
    onChange: z.custom<(value: string) => void>().optional(),
    onFocus: z.custom<() => void>().optional(),
    onBlur: z.custom<(value: string) => void>().optional(),
    provider: z.custom<({ children }: PropsWithChildren) => JSX.Element>().optional(),
    startContent: z.custom<JSX.Element>().optional(),
    endContent: z.custom<JSX.Element>().optional(),
    helperText: z.string().optional(),
    className: z.custom<ClassValue>().optional(),
    slotProps: z
      .object({
        root: this.ElementProps.optional(),
        input: this.ElementProps.optional(),
        label: this.ElementProps.optional(),
        helperText: this.ElementProps.optional()
      })
      .optional()
  })

  AutoComplete = this.BaseField.extend({
    name: z.string(),
    title: z.string(),
    placeholder: z.string().optional(),
    value: z.custom<Key | null>(),
    isAvailable: z.custom<(value: Iterable<string>) => boolean>(),
    dataType: z.literal(this.DataType.options[3]),
    isDisabled: z.boolean().optional(),
    label: z.string().optional(),
    helperText: z.string().optional(),
    options: z.array(
      z.object({
        value: z.string(),
        label: z.string()
      })
    ),
    onChange: z.custom<(value: Key | null) => void>().optional()
  })

  TextArea = this.BaseField.extend({
    name: z.string(),
    title: z.string(),
    placeholder: z.string().optional(),
    value: z.string(),
    isAvailable: z.custom<(value: string) => boolean>(),
    dataType: z.literal(this.DataType.options[1]),
    isDisabled: z.boolean().optional(),
    label: z.string().optional(),
    helperText: z.string().optional(),
    onChange: z.custom<(value: string) => void>().optional(),
    onFocus: z.custom<() => void>().optional(),
    onBlur: z.custom<(value: string) => void>().optional()
  })

  Select = this.BaseField.extend({
    name: z.string(),
    title: z.string(),
    placeholder: z.string().optional(),
    value: z.custom<'all' | Iterable<string>>(),
    isAvailable: z.custom<(value: Iterable<string>) => boolean>(),
    dataType: z.literal(this.DataType.options[2]),
    isDisabled: z.boolean().optional(),
    label: z.string().optional(),
    helperText: z.string().optional(),
    options: z.array(
      z.object({
        value: z.string(),
        label: z.string()
      })
    ),
    onChange: z.custom<(value: SharedSelection) => void>().optional()
  })

  NumberInput = this.BaseField.extend({
    name: z.string(),
    title: z.string(),
    placeholder: z.string().optional(),
    value: z.number(),
    isAvailable: z.custom<(value: number) => boolean>(),
    dataType: z.literal(this.DataType.options[4]),
    isDisabled: z.boolean().optional(),
    label: z.string().optional(),
    helperText: z.string().optional(),
    onChange: z.custom<(value: number) => void>().optional(),
    onFocus: z.custom<() => void>().optional(),
    onBlur: z.custom<(value: string) => void>().optional()
  })

  Field = z.discriminatedUnion('dataType', [
    this.TextField,
    this.TextArea,
    this.Select,
    this.AutoComplete,
    this.NumberInput
  ])

  FieldList = z.array(z.union([this.Field, z.custom<React.ReactNode>()]))
})()
