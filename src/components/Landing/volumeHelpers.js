export const calculateVolumeDiscount = (volume) => {
  const LIMITS = [100000, 1000000, 10000000, 100000000, 1000000000];
  const FRACTION = 1 / 5;
  if (volume >= LIMITS[4]) {
    return {
      volumePercentage: 100,
      volumeDiscount: 50,
    };
  }
  if (volume < LIMITS[0]) {
    return {
      volumePercentage: (volume / LIMITS[0]) * FRACTION * 100,
      volumeDiscount: undefined,
    };
  }
  for (let i = 0; i < LIMITS.length; i++) {
    if (volume >= LIMITS[i] && volume < LIMITS[i + 1]) {
      return {
        volumePercentage: ((FRACTION * (i + 1)) + (((volume - LIMITS[i]) / (LIMITS[i + 1] - LIMITS[i])) * FRACTION)) * 100,
        volumeDiscount: 10 * (i + 1),
      };
    }
  }
};
