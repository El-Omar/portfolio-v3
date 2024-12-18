type TimeUnit = {
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
};

export const toMs = ({
  seconds = 0,
  minutes = 0,
  hours = 0,
  days = 0,
}: TimeUnit): number => {
  return (
    seconds * 1000 +
    minutes * 60 * 1000 +
    hours * 60 * 60 * 1000 +
    days * 24 * 60 * 60 * 1000
  );
};
