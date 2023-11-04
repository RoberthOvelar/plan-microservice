export const throwEx = <Exception extends Error>(
  exception: Exception,
): never => {
  throw exception;
};
