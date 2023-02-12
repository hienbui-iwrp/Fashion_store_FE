export default function formatAddress(record: any): string {
  return (
    record?.street +
    (record?.ward ? ', ' + record?.ward : '') +
    (record?.district ? ', ' + record?.district : '') +
    (record?.province ? ', ' + record?.province : '')
  )
}
