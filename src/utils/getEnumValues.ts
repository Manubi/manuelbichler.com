function splitEnumKeysAndValues<T>(value: any): {
  keys: keyof T
  values: Array<string | number>
} {
  const enumKeys = Object.keys(value)

  const indexToSplit = enumKeys.length / 2
  const enumKeysKeyNames = enumKeys.slice(0, indexToSplit) as unknown as keyof T
  const enumKeysKeyValues = enumKeys.slice(indexToSplit)

  return {
    keys: enumKeysKeyNames,
    values: enumKeys,
  }
}

export function getEnumValues<TypeofEnum, PossibleValues>(
  value: TypeofEnum
): PossibleValues[] {
  const { values, keys } = splitEnumKeysAndValues(value)

  return values as unknown as PossibleValues[]
}
