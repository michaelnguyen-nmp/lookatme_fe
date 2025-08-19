export const formatRelativeTime = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diff = (now - past) / 1000;

  if (diff < 60) {
    return `${Math.floor(diff)}s`;
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)}min`;
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)}h`;
  } else if (diff < 2592000) {
    return `${Math.floor(diff / 86400)}d`;
  } else if (diff < 31536000) {
    return `${Math.floor(diff / 2592000)}m`;
  } else {
    return `${Math.floor(diff / 31536000)}y`;
  }
};
