export default function formatAddress(record: any): string {
  return (
    record?.street +
    (record?.ward ? ', ' + record?.ward : '') +
    (record?.distict ? ', ' + record?.distict : '') +
    (record?.province ? ', ' + record?.province : '')
  )
}
