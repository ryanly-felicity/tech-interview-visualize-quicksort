function createShuffledNumbers(length: number = 20): number[] {
  const numbers = Array.from({ length }, (_, index) => index + 1);

  // Fisher-Yates shuffle algorithm
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    swap(numbers, i, j);
  }

  return numbers;
}

function getAt<T>(arr: T[], index: number): T {
  if (index < 0 || index >= arr.length) {
    throw new RangeError(
      `Index ${index} is out of bounds for array of length ${arr.length}.`
    );
  }

  return arr[index] as T;
}

function swap(arr: number[], i: number, j: number): void {
  if (i === j) {
    return;
  }

  const temp = getAt(arr, i);
  arr[i] = getAt(arr, j);
  arr[j] = temp;
}

function partition(arr: number[], left: number, right: number): number {
  const pivot = getAt(arr, Math.floor((left + right) / 2));

  while (left <= right) {
    while (getAt(arr, left) < pivot) {
      left++;
    }

    while (getAt(arr, right) > pivot) {
      right--;
    }

    if (left <= right) {
      swap(arr, left, right);
      left++;
      right--;
    }
  }

  return left;
}

function quicksort(arr: number[], left = 0, right = arr.length - 1): void {
  if (left >= right) {
    return;
  }

  const index = partition(arr, left, right);
  quicksort(arr, left, index - 1);
  quicksort(arr, index, right);
}

// Called by the button in the HTML file.
function onButtonClick(): void {
  const numbers = createShuffledNumbers();
  quicksort(numbers);

  console.log("Sorted numbers:", numbers);
}
