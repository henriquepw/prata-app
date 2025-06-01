export async function sleep(time: number): Promise<void> {
  if (__DEV__) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}
