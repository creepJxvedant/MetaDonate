import java.util.Arrays;

class Solution {

    public static void main(String[] args) {
        int arr[] = { 10, 3, 5, 6, 2 };
        System.out.println(productExceptSelf(arr));
    }

    public static int[] productExceptSelf(int arr[]) {

        int n = arr.length;
        int left[] = new int[n];
        int right[] = new int[n];

        Arrays.fill(left, 1);
        Arrays.fill(right, 1);

        for (int i = 1; i < n; i++)
            left[i] = arr[i - 1] * left[i - 1];

        for (int i = n - 2; i >= 0; i--)
            right[i] *= arr[i + 1] * right[i + 1];

        for (int i = 0; i < n; i++)
            arr[i] = left[i] * right[i];

        return arr;
    }
}
