import { z } from 'zod'

// models
import Schema from 'models/Schema'

export type TAcceptType = z.infer<typeof Schema.asset.AcceptType>
export type TContentTypeAccept = z.infer<typeof Schema.asset.ContentTypeAccept>
export type TContentType = z.infer<typeof Schema.asset.ContentType>
export type TDataTypes = z.infer<typeof Schema.asset.DataTypes>
export type TDataType = z.infer<typeof Schema.asset.DataType>
export type TFileLocal<P extends object = object> = z.infer<typeof Schema.asset.FileLocal> & {
  __: P
}
export type TFileCloud = z.infer<typeof Schema.asset.FileCloud>
export type TAsset<P extends object = object> = TFileCloud | TFileLocal<P>
export type TMedia = z.infer<typeof Schema.asset.Media>
export type TSizeUnit = z.infer<typeof Schema.asset.SizeUnit>
export type TSizeLimit = z.infer<typeof Schema.asset.SizeLimit>
