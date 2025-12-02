/**
 * Creates a timeout with automatic cleanup
 *
 * @param callback - Function to execute after delay
 * @param delay - Delay in milliseconds
 * @returns Cleanup function to cancel the timeout
 *
 * @example
 * ```typescript
 * // In $effect with cleanup
 * $effect(() => {
 *   const cleanup = withTimeout(() => console.log('done'), 1000);
 *   return cleanup;
 * });
 *
 * // Multiple timeouts
 * $effect(() => {
 *   const cleanup1 = withTimeout(() => doFirst(), 500);
 *   const cleanup2 = withTimeout(() => doSecond(), 1000);
 *   return () => { cleanup1(); cleanup2(); };
 * });
 * ```
 */
export function withTimeout(callback: () => void, delay: number): () => void {
	const timer = setTimeout(callback, delay);
	return () => clearTimeout(timer);
}
