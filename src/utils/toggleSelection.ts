export const toggleSelection = (selectedNumbers: number[], number: number): number[] => {
    return selectedNumbers.includes(number)
        ? selectedNumbers.filter((n) => n !== number)
        : [...selectedNumbers, number]
}