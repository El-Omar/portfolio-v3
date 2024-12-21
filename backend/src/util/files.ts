// bytesConverter.ts

/**
 * Represents the units of digital storage that can be converted to bytes.
 * All properties are optional and default to 0 if not provided.
 */
type ByteUnit = {
  /** Number of bytes (B) */
  bytes?: number | string;
  /** Number of kilobytes (KB) where 1 KB = 1024 bytes */
  KB?: number | string;
  /** Number of megabytes (MB) where 1 MB = 1024 KB */
  MB?: number | string;
  /** Number of gigabytes (GB) where 1 GB = 1024 MB */
  GB?: number | string;
  /** Number of terabytes (TB) where 1 TB = 1024 GB */
  TB?: number | string;
};

/**
 * Converts a combination of byte units into total bytes.
 * Uses binary conversion (1024) rather than decimal (1000).
 *
 * @param {ByteUnit} units - Object containing the number of bytes in different units
 * @param {number} [units.bytes=0] - Number of bytes
 * @param {number} [units.KB=0] - Number of kilobytes
 * @param {number} [units.MB=0] - Number of megabytes
 * @param {number} [units.GB=0] - Number of gigabytes
 * @param {number} [units.TB=0] - Number of terabytes
 * @returns {number} Total number of bytes
 *
 * @example
 * // Convert 5 megabytes to bytes
 * const fiveMB = toBytes({ MB: 5 }); // 5,242,880 bytes
 *
 * @example
 * // Convert 1.5 gigabytes to bytes
 * const mixedSize = toBytes({
 *   GB: 1,
 *   MB: 512
 * }); // 1,610,612,736 bytes
 */
export const toBytes = ({
  bytes = 0,
  KB = 0,
  MB = 0,
  GB = 0,
  TB = 0,
}: ByteUnit): number => {
  return (
    Number(bytes) +
    Number(KB) * 1024 +
    Number(MB) * 1024 ** 2 +
    Number(GB) * 1024 ** 3 +
    Number(TB) * 1024 ** 4
  );
};
