export const compareNumbers = (selected: number[], random: number[]) => {
    return selected.filter((number) => random.includes(number)).length
}