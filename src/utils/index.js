import { parseISO, isAfter, format } from 'date-fns'


const eu2ISO = date => date.split('-')
  .reverse()
  .join('-')

const eeuu2ISO = date => {
  const parts = date.split('-')
  return `${parts[2]}-${parts[0]}-${parts[1]}`
}

export const eu2EeuuDate = date => format(parseISO(eu2ISO(date)), 'MM-dd-yyyy')


export const eeuu2EuDate = date => format(parseISO(eeuu2ISO(date)), 'dd-MM-yyyy')


export const isAfterDateEU = (date1, date2) => {
  const date1parsed = parseISO(eu2ISO(date1), 'dd-MM-yyyy', new Date())
  const date2parsed = parseISO(eu2ISO(date2), 'dd-MM-yyyy', new Date())
  return isAfter(date1parsed, date2parsed)
}
